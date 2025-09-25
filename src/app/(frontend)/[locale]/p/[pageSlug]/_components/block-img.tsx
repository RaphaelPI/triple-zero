import { Image } from "@/components/image"
import { cn } from "@/lib/utils"
import { ImgBlock, Media } from "@/payload-types"

interface Props {
  block: ImgBlock
}

export const BlockImg = ({ block }: Props) => {
  return (
    <section className="w-section px-section">
      <Image media={block.image as Media} className={cn("w-full")} />
    </section>
  )
}
