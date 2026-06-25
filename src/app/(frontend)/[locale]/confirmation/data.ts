import { sendOrderConfirmationEmail } from "@/lib/order-email.server"
import { getClient } from "@/lib/payload"
import { uuid } from "@/lib/uuid"
import { addDays, format, setDay } from "date-fns"

export const getOrder = async (orderId: string) => {
  const client = await getClient()
  const order = await client.findByID({
    collection: "order",
    id: orderId,
  })

  return order
}

export const createOrderFromPreOrder = async (preOrderId: string) => {
  const client = await getClient()

  const preOrder = await client.findByID({
    collection: "pre-order",
    id: preOrderId,
  })

  if (preOrder.status !== "pending") {
    throw new Error("Pre-order has already been processed")
  }

  const delayDate = preOrder.delay ? new Date(preOrder.delay) : new Date()
  const saturday = setDay(delayDate, 6, { weekStartsOn: 1 })
  const week = format(saturday <= delayDate ? addDays(saturday, 7) : saturday, "dd/MM/yyyy")

  const order = await client.create({
    collection: "order",
    draft: false,
    data: {
      uid: uuid().toUpperCase(),
      customer: preOrder.customer,
      email: preOrder.email,
      date: preOrder.date,
      amount: preOrder.amount,
      shippingFee: preOrder.shippingFee,
      workTime: preOrder.workTime,
      locale: preOrder.locale ?? "fr",
      delay: preOrder.delay,
      comment: preOrder.comment,
      detail: preOrder.detail as Record<string, unknown> | undefined,
      payment: "card",
      status: "paid",
      week,
    },
  })

  await sendOrderConfirmationEmail(order)

  await client.update({
    collection: "pre-order",
    id: preOrderId,
    data: { status: "processed" },
  })

  return order
}
