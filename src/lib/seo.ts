import { DEFAULT_OG_IMAGE } from "@/app/(frontend)/[locale]/metadata"
import { Media } from "@/payload-types"
import { OGImageConfig } from "payload"

export const getOgImage = (image: string | Media | null | undefined): OGImageConfig => {
  if (typeof image === "string" || !image?.url) {
    return DEFAULT_OG_IMAGE
  }

  return {
    url: image.url,
    width: image.width ?? undefined,
    height: image.height ?? undefined,
  }
}
