"use client"

import { Order } from "@/components/order"
import { CartLine, formSchema } from "@/providers/checkout/checkout"
import { OrderCartLine } from "@/types/global"
import { Button, useAllFormFields, useField } from "@payloadcms/ui"
import { reduceFieldsToValues } from "payload/shared"
import { z } from "zod"

interface Props {
  path: string
}

export const OrderDetail = ({ path }: Props) => {
  const { value } = useField<CartLine[]>({ path })
  const [fields, dispatchFields] = useAllFormFields()

  // Pass in fields, and indicate if you'd like to "unflatten" field data.
  // The result below will reflect the data stored in the form at the given time
  const formData = reduceFieldsToValues(fields, true)
  const label = <div>Détail de la commande</div>

  if (!value || value.length === 0) {
    return (
      <div>
        {label}
        <div className="opacity-50">Cette commande est vide...</div>
      </div>
    )
  }

  const deliveryData = formData.detail.deliveryData as z.infer<typeof formSchema>
  const lines = formData.detail.lines as OrderCartLine[]

  return (
    <div className="space-y-4">
      {label}
      <div className="text-center">
        <Button
          onClick={() => {
            const table = document.getElementById("order-detail")
            if (table) {
              const printWindow = window.open("", "_blank")
              printWindow?.document.write(table.outerHTML)
              printWindow?.document.close()
              printWindow?.print()
              printWindow?.close()
            }
          }}
        >
          Imprimer
        </Button>
      </div>
      <Order
        deliveryData={deliveryData}
        lines={lines}
        detail={formData.detail}
        comment={formData.comment}
        shippingFee={formData.shippingFee}
        amount={formData.amount}
        delay={formData.delay}
        uid={formData.uid}
        date={formData.date}
      />
    </div>
  )
}
