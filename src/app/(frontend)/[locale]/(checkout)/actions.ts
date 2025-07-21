"use server"

import { logger } from "@/lib/logger"
import { getClient } from "@/lib/payload"
import { rawProcedure } from "@/lib/safe-action"
import z from "zod"

const FREE_SHIPPING_TOTAL = 2000

export const getShippingFees = rawProcedure
  .createServerAction()
  .input(z.object({ country: z.string().optional(), total: z.number().optional() }))
  .handler(async ({ input }) => {
    if (!input.country) {
      return undefined
    }

    if (input.total > FREE_SHIPPING_TOTAL) {
      return 0
    }

    const payload = await getClient()
    const shippingFees = await payload.find({
      collection: "shipping-fees",
      where: {
        countries: {
          contains: input.country,
        },
      },
    })

    if (shippingFees.docs.length === 0) {
      return undefined
    }

    if (shippingFees.docs.length > 1) {
      logger.error(
        "getShippingFees",
        "multiple shipping fees found",
        JSON.stringify(shippingFees, null, 2),
      )
    }

    return shippingFees.docs[0].value
  })

export const getDelay = rawProcedure.createServerAction().handler(async () => {
  const payload = await getClient()
  const delay = await payload.findGlobal({
    slug: "delay",
  })

  if (delay.active) {
    return delay.date
  }

  return undefined
})
