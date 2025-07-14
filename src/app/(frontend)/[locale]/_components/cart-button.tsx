"use client"

import Basket from "src/assets/basket.svg"

import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import { useCheckout } from "@/providers/checkout"

export const CartButton = () => {
  const { cart } = useCheckout()

  return (
    <Link
      href={`/panier`}
      className="bg-green border-dark relative flex size-10 items-center justify-center rounded-full border"
    >
      <Basket className="fill-dark h-1/2 w-auto" />
      <div
        className={cn(
          "bg-dark absolute -right-1 -bottom-1 flex h-4 w-4 items-center justify-center rounded-full text-xs text-white",
          {
            hidden: cart.lines.length === 0,
          },
        )}
      >
        {cart.lines.length}
      </div>
    </Link>
  )
}
