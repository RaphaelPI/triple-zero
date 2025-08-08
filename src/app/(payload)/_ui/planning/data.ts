import { getClient } from "@/lib/payload"
import { Order } from "@/payload-types"

export const getWeekOrder = async (week: Order["week"]) => {
  const client = await getClient()
  const weekOrder = await client.find({
    collection: "order",
    where: {
      week: {
        equals: week,
      },
    },
  })

  return weekOrder.docs
}
