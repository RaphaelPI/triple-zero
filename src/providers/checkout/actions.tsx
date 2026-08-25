"use server"

import { logger } from "@/lib/logger"
import { sendOrderConfirmationEmail } from "@/lib/order-email.server"
import { getClient } from "@/lib/payload"
import { getNextAvailableWeek } from "@/lib/planning.server"
import { rawProcedure } from "@/lib/safe-action"
import { OrderCartLine } from "@/types/global"
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
      return 80
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

export const saveOrder = rawProcedure
  .createServerAction()
  .input(
    z.object({
      amount: z.number(),
      date: z.string(),
      delay: z.string().optional(),
      status: z.enum(["pending", "paid", "shipped"]),
      shippingFee: z.number(),
      detail: z.object({
        total: z.number(),
        totalWithDiscount: z.number(),
        discount: z.number().optional(),
        lines: z.array(z.any()),
        deliveryData: z.any(),
        ttc: z.boolean(),
      }),
      payment: z.enum(["card", "check", "transfer"]),
      uid: z.string(),
      workTime: z.number(),
      comment: z.string().optional(),
      customer: z.string(),
      email: z.string(),
    }),
  )
  .handler(async ({ input }) => {
    const payload = await getClient()
    const orderWeek = await getNextAvailableWeek(input.workTime)

    // Create order
    const order = await payload.create({
      collection: "order",
      data: { ...input, week: orderWeek },
    })

    // Deactivate promotions if exists
    input.detail.lines.forEach(async (line: OrderCartLine) => {
      if (line.promotion) {
        const promotion = await payload.findByID({
          collection: "promotion",
          id: line.promotion,
        })

        if (promotion) {
          await payload.update({
            collection: "promotion",
            id: line.promotion,
            data: {
              ...promotion,
              active: false,
            },
          })
        }
      }
    })

    await sendOrderConfirmationEmail(order)

    return [order.id, order.delay]
  })

/**
 *
 */
export const savePreOrder = rawProcedure
  .createServerAction()
  .input(
    z.object({
      amount: z.number(),
      date: z.string(),
      delay: z.string().optional(),
      status: z.enum(["pending", "paid", "shipped"]),
      shippingFee: z.number(),
      detail: z.object({
        total: z.number(),
        totalWithDiscount: z.number(),
        discount: z.number().optional(),
        lines: z.array(z.any()),
        deliveryData: z.any(),
        ttc: z.boolean(),
      }),
      payment: z.enum(["card", "check", "transfer"]),
      uid: z.string(),
      workTime: z.number(),
      comment: z.string().optional(),
      customer: z.string(),
      email: z.string(),
    }),
  )
  .handler(async ({ input }) => {
    const payload = await getClient()
    const orderWeek = await getNextAvailableWeek(input.workTime)

    // Create order
    const preOrder = await payload.create({
      collection: "pre-order",
      data: { ...input, week: orderWeek },
    })

    return [preOrder.id, preOrder.delay]
  })
