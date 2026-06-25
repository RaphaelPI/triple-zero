"use server"

import { getClient } from "@/lib/payload"
import { uuid } from "@/lib/uuid"
import { Order, PreOrder } from "@/payload-types"
import { addDays, format, setDay } from "date-fns"

const STATUS_BY_PAYMENT: Record<NonNullable<Order["payment"]>, Order["status"]> = {
  transfer: "pending",
  card: "paid",
  check: "pending",
}

export const processPreOrder = async (
  preOrderId: string,
  payment: NonNullable<Order["payment"]>,
  data: {
    customer: string
    email: string
    date: string
    amount: number
    shippingFee: number
    workTime: number
    locale: string
    delay: string
    comment?: string
    detail: unknown
  },
) => {
  const client = await getClient()

  const delayDate = data.delay ? new Date(data.delay) : new Date()
  const saturday = setDay(delayDate, 6, { weekStartsOn: 1 })
  const week = format(saturday <= delayDate ? addDays(saturday, 7) : saturday, "dd/MM/yyyy")

  await client.create({
    collection: "order",
    draft: false,
    data: {
      uid: uuid().toUpperCase(),
      customer: data.customer,
      email: data.email,
      date: data.date,
      amount: data.amount,
      shippingFee: data.shippingFee,
      workTime: data.workTime,
      locale: (data.locale as "fr" | "en") || "fr",
      delay: data.delay,
      comment: data.comment,
      detail: data.detail as Record<string, unknown> | undefined,
      payment,
      status: STATUS_BY_PAYMENT[payment],
      week,
    },
  })

  await client.update({
    collection: "pre-order",
    id: preOrderId,
    data: { status: "processed" as PreOrder["status"] },
  })
}
