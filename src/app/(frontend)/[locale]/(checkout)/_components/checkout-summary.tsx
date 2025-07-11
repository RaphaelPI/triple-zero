"use client"

import Info from "@/assets/info.svg"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { formatAmount } from "@/lib/text"
import { useCheckout } from "@/providers/checkout"
import { useTranslations } from "next-intl"

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
        {t("cart.totalCart")} : {formatAmount(total)}
        <br />
        {t("cart.delivery")} : {formatAmount(deliveryFee)}
        <div className="mt-1 flex cursor-default items-center gap-1 text-xs">
          <Info className="size-3" /> {t("cart.shippingFees")}
        </div>
        <br />
        <div className="text-2xl">
          {t("cart.total")} :{" "}
          <strong className="tracking-wider">{formatAmount(total + deliveryFee)}</strong>
        </div>
        {displayButton && (
          <Link href="/coordonnees">
            <Button className="mx-auto block">{t("cart.validate")}</Button>
          </Link>
        )}
      </div>
    </div>
  )
}
