"use client"

import { formatAmount } from "@/lib/text"

import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import { useCheckout } from "@/providers/checkout"
import { useTranslations } from "next-intl"
import { CheckoutSummary } from "../../_components/checkout-summary"
import { CartLine } from "./cart-line"

export const Cart = () => {
  const { loading, cart, total, deliveryFee } = useCheckout()
  const t = useTranslations()

  if (loading) {
    return (
      <section className="w-section px-section flex gap-8">
        <div className="panel h-72 w-3/4 animate-pulse" />
        <div className="panel bg-blue-light h-72 w-1/4 animate-pulse self-start" />
      </section>
    )
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
      <CheckoutSummary />
      {/* <div className="panel bg-blue-light sticky top-20 w-full self-start lg:w-xs">
        <div className="panel-table-cell border-b-2 border-[#E5ECF7] text-lg font-semibold">
          {t("cart.resume")}
        </div>
        <div className="panel-table-cell space-y-4 text-lg">
          {t("cart.totalCart")} : {formatAmount(totalCart)}
          <br />
          {t("cart.delivery")} : {formatAmount(deliveryFee)}
          <div className="mt-1 flex cursor-default items-center gap-1 text-xs">
            <Info className="size-3" /> {t("cart.shippingFees")}
          </div>
          <br />
          <div className="text-2xl">
            {t("cart.total")} :{" "}
            <strong className="tracking-wider">{formatAmount(totalCart + deliveryFee)}</strong>
          </div>
          <Link prefetch={false}  href="/coordonnees">
            <Button className="mx-auto block">{t("cart.validate")}</Button>
          </Link>
        </div>
      </div> */}
      <div className="bg-blue-light border-blue-grey fixed right-0 bottom-0 left-0 flex items-center border-t border-solid p-4 shadow-xl lg:hidden">
        <div className="max-xs:hidden leading-5">
          <div>{t("cart.total")}</div>
          <strong className="tracking-wider">{formatAmount(total + deliveryFee)}</strong>
        </div>
        <Link prefetch={false} href="/coordonnees" className="mx-auto block">
          <Button aria-label={t("cart.validate")}>{t("cart.validate")}</Button>
        </Link>
      </div>
    </section>
  )
}

export default Cart
