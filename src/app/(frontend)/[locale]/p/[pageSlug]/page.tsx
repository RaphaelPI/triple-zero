import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getMetadata } from "../../metadata"
import { BlocText } from "./_components/bloc-text"
import { BlockImg } from "./_components/block-img"
import { BlockTextImg } from "./_components/block-text-img"
import { BlockTitle } from "./_components/block-title"
import { getPageData } from "./data"

export const dynamic = "force-static"

interface Props {
  params: Promise<{ pageSlug: string }>
}

const getData = async (pageSlug: string) => {
  const page = await getPageData(pageSlug)

  if (!page || !page.blocks || page.blocks.length === 0) {
    notFound()
  }

  return page
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pageSlug } = await params
  const page = await getData(pageSlug)

  return getMetadata({
    title: page.title,
    pathname: `/p/${pageSlug}`,
    description: page.meta?.description ?? undefined,
  })
}

export default async ({ params }: Props) => {
  const { pageSlug } = await params
  const page = await getData(pageSlug)

  return (
    <main>
      <section className="section">
        <h1>{page.title}</h1>
      </section>
      <div className="space-y-8 pb-32">
        {page.blocks.map((block) => {
          if (block.blockType === "text-block") {
            return <BlocText key={block.id} block={block} />
          }
          if (block.blockType === "text-img-block") {
            return <BlockTextImg key={block.id} block={block} />
          }
          if (block.blockType === "img-block") {
            return <BlockImg key={block.id} block={block} />
          }
          if (block.blockType === "title-block") {
            return <BlockTitle key={block.id} block={block} />
          }
        })}
      </div>
    </main>
  )
}
