import { LOCALES } from "@/i18n/config"
import { revalidatePath } from "next/cache"
import { PayloadRequest } from "payload"
import { logger } from "../logger"

interface Props {
  type?: "layout" | "page"
  path: string
  req?: PayloadRequest
}

export const revalidateLocalePath = async ({ path, type, req }: Props) => {
  // Commit transaction to avoid circular issues
  if (req) {
    await req.payload.db.commitTransaction(req.transactionID as string)
  }

  LOCALES.forEach((locale) => {
    logger.log(`Revalidating path: /${locale}${path}`)
    revalidatePath(`/${locale}${path}`, type)
  })
}

export const revalidateGlobalPath = async ({ path, type, req }: Props) => {
  // Commit transaction to avoid circular issues
  if (req) {
    await req.payload.db.commitTransaction(req.transactionID as string)
  }
  logger.log(`Revalidating global path: ${path}`)
  revalidatePath(path, type)
}

export const revalidateGenericPath = async ({ path, type, req }: Props) => {
  // Commit transaction to avoid circular issues
  if (req) {
    await req.payload.db.commitTransaction(req.transactionID as string)
  }

  revalidatePath(path, type)
}
