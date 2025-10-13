import { revalidatePath } from "next/cache"

export const POST = async () => {
  revalidatePath(`/(frontend)/[locale]/[categorySlug]/[productSlug]`, "page")

  return Response.json({ success: true })
}
