"use client"

import { formatAmount } from "@/lib/text"

import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import { useCheckout } from "@/providers/checkout/checkout"
import { useTranslations } from "next-intl"
import { CheckoutSkeleton } from "../../_components/checkout-skeleton"
import { CheckoutSummary } from "../../_components/checkout-summary"
import { CartLine } from "./cart-line"

export const Cart = () => {
  const { loading, cart, total, deliveryFee } = useCheckout()
  const t = useTranslations()

  if (loading) {
    return <CheckoutSkeleton />
  }

  if (cart.lines.length === 0) {
    return (
      <section className="w-section px-section">
        <div className="panel px-panel py-panel">{t("cart.empty")}...</div>
      </section>
    )
  }

  return (
    <section className="w-section px-section flex gap-8 max-lg:flex-col">
      <div className="panel flex-1">
        <div className="border-grey-light flex border-b-2 max-xl:hidden">
          {[t("menu.products"), t("cart.features"), t("cart.quantity"), t("cart.priceVTA")].map(
            (title, index) => (
              <div
                key={index}
                className={cn("panel-table-cell w-1/3 text-lg font-semibold", {
                  "w-1/2": index === 1,
                  "w-1/4": index > 1,
                })}
              >
                {title}
              </div>
            ),
          )}
        </div>
        <ul>
          {cart.lines.map((line, index) => (
            <li key={index} className="border-b-grey-light border-b-2 last:border-0">
              <CartLine line={line} index={index} />
            </li>
          ))}
        </ul>
      </div>
      <CheckoutSummary>
        <Link prefetch={false} href="/coordonnees">
          <Button className="mx-auto block lg:w-full" aria-label={t("cart.validate")}>
            {t("cart.validate")}
          </Button>
        </Link>
      </CheckoutSummary>
      <div className="bg-blue-light border-blue-grey fixed right-0 bottom-0 left-0 z-10 flex items-center border-t border-solid p-4 shadow-xl lg:hidden">
        <div className="max-xs:hidden leading-5">
          <div>{t("cart.total")}</div>
          <strong className="tracking-wider">{formatAmount(total + (deliveryFee ?? 0))}</strong>
        </div>
        <Link prefetch={false} href="/coordonnees" className="mx-auto block">
          <Button aria-label={t("cart.validate")} loading={loading}>
            {t("cart.validate")}
          </Button>
        </Link>
      </div>
    </section>
  )
}
