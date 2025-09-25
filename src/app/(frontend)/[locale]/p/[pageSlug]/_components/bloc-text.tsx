import { RichText } from "@/components/rich-text"
import { TextBlock } from "@/payload-types"

interface Props {
  block: TextBlock
}

export const BlocText = ({ block }: Props) => {
  return (
    <section className="w-section px-section">
      {/* <div className="panel px-panel py-panel"> */}
      <h3 className="pb-2 text-xl font-semibold">{block.title}</h3>
      <RichText data={block.content} />
      {/* </div> */}
    </section>
  )
}
