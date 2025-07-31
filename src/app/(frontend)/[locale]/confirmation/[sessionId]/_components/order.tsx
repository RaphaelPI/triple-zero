"use client"

import { Order } from "@/payload-types"
import { formatDate } from "date-fns"
import { Loader2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import Logo from "src/assets/logo.svg"
import { useServerAction } from "zsa-react"
import { updateOrder } from "../actions"

export const OrderDetail = () => {
  const { execute: updateOrderAction, isPending } = useServerAction(updateOrder)
  const t = useTranslations()
  const [order, setOrder] = useState<Partial<Order>>()

  useEffect(() => {
    const orderId = localStorage.getItem("current-order-id")
    if (orderId) {
      updateOrderAction({ id: orderId }).then(() => {
        localStorage.removeItem("current-order-id")
      })
    }

    const order = localStorage.getItem("current-order")
    if (order) {
      setOrder(JSON.parse(order))
    }
  }, [])

  return (
    <>
      {isPending && (
        <div className="text-center">
          <Loader2 className="mx-auto size-12 animate-spin" />
        </div>
      )}
      {!isPending && (
        <div className="space-y-4">
          <div className="text-lg whitespace-pre-line">{t("payment.confirmation.description")}</div>
          {order?.delay && (
            <div className="border-blue rounded-lg border bg-white p-2 text-sm leading-tight italic">
              {t.rich("checkout.confirmation-delay", {
                date: () => formatDate(String(order?.delay), "dd/MM/yyyy"),
                strong: () => <strong>{formatDate(String(order?.delay), "PPPP")}</strong>,
              })}
            </div>
          )}
        </div>
      )}
      <Logo className="mx-auto h-28 w-10/12 max-w-xs" />
    </>
  )
}
