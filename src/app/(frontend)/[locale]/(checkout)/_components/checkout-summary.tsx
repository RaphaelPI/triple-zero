"use client"

import { Amount } from "@/components/amount"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { useCheckout } from "@/providers/checkout"
import { useTranslations } from "next-intl"
import { ShippingFees } from "./shipping-fees"

interface Props {
  displayButton?: boolean
}

export const CheckoutSummary = ({ displayButton = true }: Props) => {
  const { total, deliveryFee } = useCheckout()
  const t = useTranslations()

  return (
    <div className="panel bg-blue-light sticky top-20 w-full self-start lg:w-xs">
      <div className="panel-table-cell border-b-2 border-[#E5ECF7] text-lg font-semibold">
        {t("cart.resume")}
      </div>
      <div className="panel-table-cell space-y-4 text-lg">
        <div className="space-y-1">
          <div>
            {t("cart.totalCart")} : <Amount amount={total} taxIncluded />
          </div>
          <ShippingFees />
        </div>
        <div className="text-2xl">
          {t("cart.total")} :{" "}
          <strong className="tracking-wider">
            <Amount amount={total + (deliveryFee ?? 0)} taxIncluded />
          </strong>
        </div>
        {displayButton && (
          <Link prefetch={false} href="/coordonnees">
            <Button className="mx-auto block" aria-label={t("cart.validate")}>
              {t("cart.validate")}
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
