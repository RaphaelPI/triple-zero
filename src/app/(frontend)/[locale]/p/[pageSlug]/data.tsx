import { getClient } from "@/lib/payload"
import { cache } from "react"

export const getPageData = cache(async (slug: string) => {
  const payload = await getClient()

  const page = await payload.find({
    collection: "pages",
    where: { slug: { equals: slug }, isPublished: { equals: true } },
  })

  return page.docs[0]
})
