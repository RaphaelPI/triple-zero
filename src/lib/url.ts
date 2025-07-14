import { env } from "@/env"

export const getUrl = (path: string, locale?: string) => {
  let localizedPath = path

  if (locale && !path.startsWith(`/${locale}`)) {
    localizedPath = `/${locale}${path}`
  }

  const url = new URL(localizedPath, env.NEXT_PUBLIC_URL)

  return url.toString()
}
