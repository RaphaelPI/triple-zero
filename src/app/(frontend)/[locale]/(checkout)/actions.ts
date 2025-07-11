"use server"

import { logger } from "@/lib/logger"
import { getClient } from "@/lib/payload"
import { rawProcedure } from "@/lib/safe-action"
import z from "zod"

export const getShippingFees = rawProcedure
  .createServerAction()
  .input(z.object({ country: z.string().optional() }))
  .handler(async ({ input }) => {
    if (!input.country) {
      return undefined
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
