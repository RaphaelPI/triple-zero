"use server"

import { getClient } from "@/lib/payload"

export const getProduct = async (id: string | number) => {
  const client = await getClient()
  const product = await client.findByID({
    collection: "product",
    id,
  })

  return product
}
