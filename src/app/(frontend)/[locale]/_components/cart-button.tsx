"use client"

import Basket from "src/assets/basket.svg"

import { Link } from "@/i18n/navigation"
import { useCheckout } from "@/providers/checkout/checkout"
import { useTranslations } from "next-intl"

export const CartButton = () => {
  const t = useTranslations()
  const { cart } = useCheckout()

  return (
    <Link
      aria-label={t("cart.title")}
      prefetch={false}
      href="/panier"
      className="bg-green border-dark relative flex size-10 items-center justify-center rounded-full border hover:hover:bg-[#b2e571]"
    >
      <Basket className="fill-dark h-1/2 w-auto" />
      {cart.lines.length > 0 && (
        <div className="bg-dark absolute -right-1 -bottom-1 flex h-4 w-4 items-center justify-center rounded-full text-xs text-white">
          {cart.lines.reduce((acc, line) => acc + line.quantity, 0)}
        </div>
      )}
    </Link>
  )
}
