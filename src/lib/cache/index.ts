import { env } from "@/env"
import { LOCALES } from "@/i18n/config"
import { PayloadRequest } from "payload"

interface Props {
  type?: "layout" | "page"
  path: string
  req?: PayloadRequest
}

const callRevalidateRoute = async (pathname: string, type?: "layout" | "page") => {
  const url = new URL("/api/revalidate", env.NEXT_PUBLIC_URL)
  url.searchParams.set("pathname", pathname)
  if (type) {
    url.searchParams.set("type", type)
  }

  console.log(`Revalidating path: ${url.toString()}`)

  await fetch(url, {
    method: "POST",
    headers: {
      "x-revalidate-token": env.SERVER_REVALIDATE_SECRET,
    },
  })
}

export const revalidateLocalePath = async ({ path, type, req }: Props) => {
  // Commit transaction to avoid circular issues
  if (req) {
    await req.payload.db.commitTransaction(req.transactionID as string)
  }

  await Promise.all(
    LOCALES.map(async (locale) => {
      await callRevalidateRoute(`/${locale}${path}`, type)
    }),
  )
}

export const revalidateGlobalPath = async ({ path, type, req }: Props) => {
  // Commit transaction to avoid circular issues
  if (req) {
    await req.payload.db.commitTransaction(req.transactionID as string)
  }

  await callRevalidateRoute(path, type)
}

export const revalidateGenericPath = async ({ path, type, req }: Props) => {
  // Commit transaction to avoid circular issues
  if (req) {
    await req.payload.db.commitTransaction(req.transactionID as string)
  }

  await callRevalidateRoute(path, type)
}

export const deployHook = async () => {
  await fetch(env.SERVER_DEPLOY_HOOK_URL)
}
