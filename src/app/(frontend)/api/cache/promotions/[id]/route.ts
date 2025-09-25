// export const POST = async (request: NextRequest) => {

import { localeRevalidatePath } from "@/lib/cache"
import { getClient } from "@/lib/payload"

//   res.
//   const payload = await getClient()
//   const promotions = await payload.find({
//     collection: "promotion",
//   })
// }

export const POST = async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params // 'a', 'b', or 'c'

  const payload = await getClient()
  const promotion = await payload.findByID({
    collection: "promotion",
    id,
  })

  if (!promotion) {
    return Response.json({ success: false })
  }

  localeRevalidatePath(`/promotions/${promotion.slug}`)
  localeRevalidatePath(`/promotions`)
  localeRevalidatePath(`/`)

  return Response.json({ success: true })
}
