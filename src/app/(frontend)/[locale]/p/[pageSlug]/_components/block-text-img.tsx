import { Image } from "@/components/image"
import { RichText } from "@/components/rich-text"
import { cn } from "@/lib/utils"
import { Media, TextImgBlock } from "@/payload-types"

interface Props {
  block: TextImgBlock
}

export const BlockTextImg = ({ block }: Props) => {
  return (
    <section className="w-section px-section">
      <div
        className={cn("flex gap-4 max-md:flex-col-reverse md:gap-8", {
          "flex-row-reverse": block.align === "right",
        })}
      >
        <div className="flex-1">
          <h3 className="pb-2 text-xl font-semibold">{block.title}</h3>
          <RichText data={block.content} />
        </div>
        {block.image && (
          <div className={cn("w-full flex-shrink-0 md:w-1/3")}>
            <Image media={block.image as Media} />
          </div>
        )}
      </div>
    </section>
  )
}
