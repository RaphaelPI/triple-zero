import Info from "@/assets/info.svg"
import { Popover } from "@/components/popover"
import { Skeleton } from "@/components/ui/skeleton"
import { formatAmount } from "@/lib/text"
import { useCheckout } from "@/providers/checkout"
import { useTranslations } from "next-intl"

export const ShippingFees = () => {
  const { deliveryFee, loadingShippingFees } = useCheckout()
  const t = useTranslations()

  return (
    <div className="flex items-center gap-1">
      {t("cart.delivery")} :{" "}
      {loadingShippingFees ? (
        <Skeleton className="h-6 w-16" />
      ) : deliveryFee ? (
        formatAmount(deliveryFee)
      ) : (
        <Popover content={t("cart.shippingFeesDescription")}>
          <div className="flex items-center gap-1">
            {t("cart.toDetermine")} <Info className="size-4" />
          </div>
        </Popover>
      )}
    </div>
  )
}
