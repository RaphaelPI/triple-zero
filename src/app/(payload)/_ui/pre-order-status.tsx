"use client"

import { processPreOrder } from "@/app/(payload)/_actions/pre-order"
import { cn } from "@/lib/utils"
import { Order, PreOrder } from "@/payload-types"
import { Button, useDocumentInfo, useField } from "@payloadcms/ui"
import { useState } from "react"

interface Props {
  path: string
}

const PAYMENT_OPTIONS: { value: Order["payment"]; label: string }[] = [
  { value: "transfer", label: "Virement bancaire" },
  { value: "card", label: "Carte de crédit" },
  { value: "check", label: "Chèque" },
]

export const PreOrderStatus = ({ path }: Props) => {
  const { value, setValue } = useField<PreOrder["status"]>({ path })
  const { id } = useDocumentInfo()
  const [payment, setPayment] = useState<Order["payment"]>(null)

  const { value: customer } = useField<string>({ path: "customer" })
  const { value: email } = useField<string>({ path: "email" })
  const { value: date } = useField<string>({ path: "date" })
  const { value: amount } = useField<number>({ path: "amount" })
  const { value: shippingFee } = useField<number>({ path: "shippingFee" })
  const { value: workTime } = useField<number>({ path: "workTime" })
  const { value: locale } = useField<string>({ path: "locale" })
  const { value: delay } = useField<string>({ path: "delay" })
  const { value: comment } = useField<string>({ path: "comment" })
  const { value: detail } = useField<unknown>({ path: "detail" })

  const handleCreateOrder = async () => {
    if (!payment) {
      return
    }

    await processPreOrder(id as string, payment, {
      customer: customer!,
      email: email!,
      date: date!,
      amount: amount!,
      shippingFee: shippingFee!,
      workTime: workTime!,
      locale: locale || "fr",
      delay: delay!,
      comment: comment ?? undefined,
      detail,
    })

    setValue("processed")
  }

  return (
    <div className="mb-5">
      <div>Status pré - commande</div>
      <div
        className={cn("space-y-4 p-4", {
          "bg-green-100": value === "processed",
          "bg-yellow-100": value === "pending",
        })}
      >
        <div className="flex items-center gap-2 text-xl font-semibold">
          La pré commande {value === "processed" ? "a été traitée" : "est en attente"}
        </div>
        {value === "pending" && (
          <div className="space-y-3">
            <div className="font-medium">Mode de paiement</div>
            <div className="flex gap-2">
              {PAYMENT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setPayment(option.value)}
                  className={cn("rounded border px-3 py-1.5 text-sm transition-colors", {
                    "border-green-700 bg-green-700 text-white": payment === option.value,
                    "border-gray-300 bg-white hover:border-gray-400": payment !== option.value,
                  })}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <Button
              onClick={handleCreateOrder}
              disabled={!payment}
              className="my-0 bg-green-700 hover:bg-green-600 disabled:opacity-50"
            >
              Paiement effectué
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
