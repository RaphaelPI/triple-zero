"use client"

import Basket from "src/assets/basket.svg"

import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import { useCart } from "@/providers/cart"

export const CartButton = () => {
  const { cart } = useCart()

  return (
    <Link
      href={`/panier`}
      className="bg-green border-dark buttonClick relative flex size-10 items-center justify-center rounded-full border"
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
