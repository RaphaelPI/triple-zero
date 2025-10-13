// import { getClient } from "@/lib/payload"
// import { Category } from "@/payload-types"
// import { localeRevalidatePath } from "../cache"

// export const revalidateProducts = async () => {
//   const client = await getClient()
//   const products = await client.find({
//     collection: "product",
//     limit: 999,
//   })

//   products.docs.forEach(async (product) => {
//     localeRevalidatePath(`/${(product.category as Category).slug}/${product.slug}`)
//   })
// }
