import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getMetadata } from "../../metadata"
import { BlocText } from "./_components/BlocText"
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
    description: page.meta?.description || "",
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
      {page.blocks.map((block) => {
        if (block.blockType === "text-block") {
          return <BlocText key={block.id} block={block} />
        }
      })}
    </main>
  )
}
