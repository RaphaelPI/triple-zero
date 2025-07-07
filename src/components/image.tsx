import { Media } from "@/payload-types"
import NextImage, { ImageProps } from "next/image"

interface Props extends Omit<ImageProps, "src" | "alt"> {
  media: Media
  width?: number
  height?: number
  alt?: string
}

export const Image = ({ media, width, height, ...props }: Props) => {
  const w = width ?? media.width
  const h = height ?? media.height

  if (!media.url || !w || !h) {
    return null
  }

  return <NextImage {...props} src={media.url} width={w} height={h} alt={media.alt} />
}
