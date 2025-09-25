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

export const getColors = async () => {
  const client = await getClient()
  const colors = await client.find({
    collection: "color",
  })

  return colors.docs
}
