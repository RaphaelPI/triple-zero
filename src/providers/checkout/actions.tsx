"use server"

import { OrderView } from "@/components/order-view"
import {
  TEMPLATE_EMAIL_ORDER_CONFIRMATION_CUSTOMER_EN,
  TEMPLATE_EMAIL_ORDER_CONFIRMATION_CUSTOMER_FR,
} from "@/constants"
import { logger } from "@/lib/logger"
import { sendEmail } from "@/lib/mailjet.server"
import { getClient } from "@/lib/payload"
import { rawProcedure } from "@/lib/safe-action"
import { OrderCartLine } from "@/types/global"
import { format } from "date-fns"
import { getLocale, getTranslations } from "next-intl/server"
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
    const order = await payload.create({
      collection: "order",
      data: input,
    })

    // Deactivate promotions if exists
    input.detail.lines.forEach(async (line: OrderCartLine) => {
      if (line.promotion) {
        const promotion = await payload.findByID({
          collection: "promotion",
          id: line.promotion,
        })

        if (promotion) {
          console.log("---- deactivate promotion", line.promotion)
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

    // Prepare email content
    const { renderToString } = await import("react-dom/server")
    const content = renderToString(
      <OrderView
        deliveryData={input.detail.deliveryData}
        lines={input.detail.lines}
        detail={input.detail}
        comment={input.comment}
        shippingFee={input.shippingFee}
        amount={input.amount}
        uid={input.uid}
        date={input.date}
      />,
    )
    const locale = await getLocale()
    const t = await getTranslations({ locale })
    const templateId =
      locale === "fr"
        ? TEMPLATE_EMAIL_ORDER_CONFIRMATION_CUSTOMER_FR
        : TEMPLATE_EMAIL_ORDER_CONFIRMATION_CUSTOMER_EN

    const payment = renderToString(
      t.rich(`email.orderConfirmation.${input.payment as "card" | "check" | "transfer"}`, {
        strong: (chunks) => <strong>{chunks}</strong>,
        br: () => (
          <>
            <br />
            <br />
          </>
        ),
      }),
    )

    // send email to customer
    await sendEmail({
      to: [{ Email: input.email, Name: input.customer }],
      // bcc: [{ Email: "triplezero@triplezero.fr", Name: "Triple Zero" }],
      subject: t("email.orderConfirmation.subject"),
      templateId,
      variables: {
        order: content,
        payment,
        delay: input.delay ? format(input.delay, "dd/MM/yyyy") : "",
      },
    })

    return order.id
  })
