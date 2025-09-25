import { TitleBlock } from "@/payload-types"

interface Props {
  block: TitleBlock
}

export const BlockTitle = ({ block }: Props) => {
  return (
    <section className="w-section px-section">
      <div className="text-spectral text-h1">{block.title}</div>
    </section>
  )
}
