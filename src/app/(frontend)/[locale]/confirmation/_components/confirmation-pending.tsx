"use client"

import { useRouter } from "@/i18n/navigation"
import { saveOrder } from "@/providers/checkout/actions"
import { Loader2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import { useServerAction } from "zsa-react"
import { ConfirmationSuccess } from "./confirmation-success"

export const ConfirmationPending = () => {
  const router = useRouter()
  const t = useTranslations()
  const { execute: executeSaveOrder } = useServerAction(saveOrder)

  const [pendingOrder, setPendingOrder] = useState(true)
  const [delay, setDelay] = useState()

  useEffect(() => {
    const createOrder = async () => {
      const pendingOrder = localStorage.getItem("pending-order")
      if (!pendingOrder) {
        router.push("/")
        return
      }
      const pendingOrderData = JSON.parse(pendingOrder)
      const [[_, delay]] = await executeSaveOrder({ ...pendingOrderData, status: "paid" })

      localStorage.removeItem("pending-order")
      setPendingOrder(false)
      setDelay(delay)
    }

    createOrder()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="section flex min-h-[600px] flex-col items-center justify-center max-md:min-h-[400px]">
      {pendingOrder && (
        <div>
          <Loader2 className="mx-auto size-12 animate-spin" />
          <div>{t("payment.confirmation.pending")}</div>
        </div>
      )}
      {!pendingOrder && <ConfirmationSuccess delay={delay} />}
    </div>
  )
}
