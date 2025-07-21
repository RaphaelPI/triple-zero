"use client"

import Info from "@/assets/info.svg"
import { Amount } from "@/components/amount"
import { Popover } from "@/components/popover"
import { Skeleton } from "@/components/ui/skeleton"
import { formatAmount } from "@/lib/text"
import { DISCOUNTS, useCheckout } from "@/providers/checkout"
import { useTranslations } from "next-intl"
import { CheckoutDelay } from "./checkout-delay"

interface Props {
  children: React.ReactNode
}

export const CheckoutSummary = ({ children }: Props) => {
  const { total, deliveryFee, loadingShippingFees, nextDiscount, currentDiscount, totalToPay } =
    useCheckout()
  const t = useTranslations()
  const discountContent = nextDiscount
    ? t.rich("checkout.globalDiscount", {
        amount: () => <span className="font-semibold">{formatAmount(nextDiscount[0])}</span>,
        discount: () => <span className="font-semibold">{nextDiscount[1]}%</span>,
      })
    : t.rich("checkout.globalDiscountMax", {
        amount: () => (
          <span className="font-semibold">{formatAmount(DISCOUNTS[DISCOUNTS.length - 1][0])}</span>
        ),
        discount: () => (
          <span className="font-semibold">{DISCOUNTS[DISCOUNTS.length - 1][1]}%</span>
        ),
      })

  return (
    <div className="panel bg-blue-light sticky top-20 w-full self-start lg:w-xs">
      <div className="panel-table-cell border-b-2 border-[#E5ECF7] text-lg font-semibold">
        {t("cart.resume")}
      </div>
      <div className="panel-table-cell space-y-4 text-lg">
        <div>
          <Popover content={discountContent}>
            <div className="flex items-center gap-1">
              {t("cart.totalCart")} : <Amount amount={total} taxIncluded />{" "}
              <Info className="size-4" />
            </div>
          </Popover>
          {currentDiscount && <div>Réduction : {currentDiscount[1]}%</div>}
          <div className="flex items-center gap-1">
            {t("cart.delivery")} :{" "}
            {loadingShippingFees ? (
              <Skeleton className="h-6 w-16" />
            ) : deliveryFee ? (
              formatAmount(deliveryFee)
            ) : deliveryFee === 0 ? (
              <Popover content={t("checkout.freeShippingDescription")}>
                <div className="flex items-center gap-1">
                  {t("checkout.freeShipping")} <Info className="size-4" />
                </div>
              </Popover>
            ) : (
              <Popover content={t("cart.shippingFeesDescription")}>
                <div className="flex items-center gap-1">
                  {t("cart.toDetermine")} <Info className="size-4" />
                </div>
              </Popover>
            )}
          </div>
        </div>
        <div className="text-2xl">
          {t("cart.total")} :{" "}
          <strong className="tracking-wider">
            <Amount amount={totalToPay} taxIncluded />
          </strong>
        </div>
        <CheckoutDelay />
        {children}
      </div>
    </div>
  )
}
