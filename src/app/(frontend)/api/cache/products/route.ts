import { localeRevalidatePath } from "@/lib/cache"
import { getClient } from "@/lib/payload"
import { Category } from "@/payload-types"

export const POST = async () => {
  const client = await getClient()
  const products = await client.find({
    collection: "product",
    limit: 999,
  })

  products.docs.forEach(async (product) => {
    localeRevalidatePath(`/${(product.category as Category).slug}/${product.slug}`)
  })

  return Response.json({ success: true })
}
