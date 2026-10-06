import { env } from "@/env"
import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  if (!env.SERVER_INDEXING_ENABLED) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    }
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${env.NEXT_PUBLIC_URL}/sitemap.xml`,
  }
}
