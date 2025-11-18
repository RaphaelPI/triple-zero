import { getClient } from "@/lib/payload"

export const getOrder = async (orderId: string) => {
  const client = await getClient()
  const order = await client.findByID({
    collection: "order",
    id: orderId,
  })

  return order
}
