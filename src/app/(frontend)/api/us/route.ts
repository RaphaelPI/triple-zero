import { getClient } from "@/lib/payload"
import { slugify } from "@/lib/slugify"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const payload = await getClient()
  const products = await payload.find({
    collection: "product",
    locale: "fr",
    depth: 2,
    limit: 999,
  })

  const actions = products.docs.map(async (product) => {
    const data: any = {}
    if (product.options && product.options.length > 0) {
      const options = [...product.options]
      options.forEach((option) => {
        option.option.slug = slugify(option.option.title)
      })
      data.options = options
    }

    if (product.advanced && product.advanced.length > 0) {
      const optionsAdvanced = [...product.advanced]
      optionsAdvanced.forEach((option) => {
        option.option.slug = slugify(option.option.title)
      })
      data.advanced = optionsAdvanced
    }

    // console.log("options", options)
    // console.log("product.options", product.options)

    return payload.update({
      collection: "product",
      id: product.id,
      data: {
        ...data,
      },
    })
  })

  const responses = await Promise.all(actions)
  // console.log("responses", responses)
  return NextResponse.json({ responses: responses.map((response) => response?.id) })
}
