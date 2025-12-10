"use client"

import { cn } from "@/lib/utils"
import { Order } from "@/payload-types"
import { Button, useField } from "@payloadcms/ui"
import { OptionObject, SelectField } from "payload"

interface Props {
  path: string
  field: SelectField
}

export const OrderStatus = ({ path, field }: Props) => {
  const { value, setValue } = useField<Order["status"]>({ path })
  const shippingInfoField = useField<Order["shippingInfo"]>({ path: "shippingInfo" })
  const parcelIdField = useField<Order["parcelId"]>({ path: "parcelId" })
  const option = field.options.find((o) => (o as OptionObject).value === value) || field.options[0]

  const handlePaid = () => {
    setValue("paid")
  }

  const handleShipped = async () => {
    setValue("shipped")
  }

  const handleCancelled = () => {
    setValue("cancelled")
  }

  return (
    <div className="mb-5">
      <div>Status commande</div>
      <div
        className={cn("space-y-4 p-4", {
          "bg-green-100": value === "paid",
          "bg-red-100": value === "cancelled",
          "bg-yellow-100": value === "pending",
          "bg-blue-100": value === "shipped",
        })}
      >
        <div className="flex items-center gap-2 text-xl font-semibold">
          La commande est
          <div
            className={cn("w-fit rounded-lg px-2 py-1", {
              "bg-green-400": value === "paid",
              "bg-red-400": value === "cancelled",
              "bg-yellow-400": value === "pending",
              "bg-blue-400": value === "shipped",
            })}
          >
            {String((option as OptionObject).label)}
          </div>
        </div>
        <div className="space-y-4">
          {value === "pending" && (
            <div>
              <div>Valider le paiement</div>
              <Button onClick={handlePaid} className="my-0 bg-green-700 hover:bg-green-600">
                Paiement effectué
              </Button>
            </div>
          )}
          {value === "paid" && (
            <div>
              <div>Informations supplémentaires</div>
              <div>
                <textarea
                  className="min-h-20 w-full"
                  onChange={(e) => shippingInfoField.setValue(e.target.value)}
                  value={shippingInfoField.value ?? ""}
                />
              </div>
              <div>Identifiant colis</div>
              <div className="mb-4">
                <input
                  type="text"
                  onChange={(e) => parcelIdField.setValue(e.target.value.trim())}
                />
              </div>
              <Button onClick={handleShipped} className="my-0 bg-blue-700 hover:bg-blue-600">
                Commande expédiée
              </Button>
            </div>
          )}
          {value === "shipped" && (
            <div>
              <div>Informations supplémentaires</div>
              <div className="rounded bg-white p-1 whitespace-pre-line">
                {shippingInfoField.value ?? "Aucune information de colis"}
              </div>
              <div>Identifiant colis</div>
              <div className="rounded bg-white p-1 whitespace-pre-line">{parcelIdField.value}</div>
            </div>
          )}
          {value && !["cancelled", "shipped"].includes(value) && (
            <div>
              <div>Annuler la commande</div>
              <Button className="my-0 bg-red-700 hover:bg-red-600" onClick={handleCancelled}>
                Annuler la commande
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
