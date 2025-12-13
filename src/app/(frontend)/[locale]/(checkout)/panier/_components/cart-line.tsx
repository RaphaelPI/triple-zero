"use client"

import { Amount } from "@/components/amount"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CartLine as CartLineType, useCheckout } from "@/providers/checkout/checkout"
import { LucideMinus, LucidePlus } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { MouseEvent } from "react"

interface CartLineProps {
  line: CartLineType
  index: number
}

export const CartLine = ({ line, index }: CartLineProps) => {
  const { updateLineQuantity } = useCheckout()
  const t = useTranslations()

  const handleMinusClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (line.quantity === 1 && !confirm(t("cart.removeLine"))) {
      return
    }

    updateLineQuantity(index, line.quantity - 1)
  }
  const handlePlusClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    updateLineQuantity(index, line.quantity + 1)
  }

  return (
    <div className="max-xs:flex-col flex items-start max-xl:flex-wrap">
      <div className="panel-table-cell xs:w-40 w-full sm:w-60 xl:w-1/4">
        {line.image && (
          <Link prefetch={false} href={line.url} aria-label={line.title} className="font-semibold">
            {line.title}
            {line.discount && <div>Promo : {line.discount}%</div>}
          </Link>
        )}
      </div>
      <div className="w-full flex-1 xl:flex">
        <div className="panel-table-cell xl:w-1/2">
          <div className="flex items-center gap-2">
            <div>{t("color")} :</div>
            {line.colors.map(([name, color]) => (
              <div key={color} className="flex items-center gap-1">
                <div
                  style={{ backgroundColor: color }}
                  className={cn("h-4 w-4 rounded-full", {
                    "border-primary border": color.toLowerCase() === "#ffffff",
                  })}
                />
                ({name})
              </div>
            ))}
          </div>
          {line.options.map(([title, value]) => (
            <div key={title}>
              {title} : <strong>{value}</strong>
            </div>
          ))}
        </div>
        <div className="panel-table-cell xl:w-1/4">
          <div className="flex items-center gap-1">
            <Button
              onClick={handleMinusClick}
              variant="icon"
              size="icon"
              aria-label={t("cart.line.remove")}
            >
              <LucideMinus />
            </Button>
            <div className="bg-blue-light border-blue-grey w-10 shrink-0 cursor-default rounded-lg border py-1 text-center select-none">
              {line.quantity}
            </div>
            <Button
              disabled={Boolean(line.promotion)}
              onClick={handlePlusClick}
              variant="icon"
              size="icon"
              aria-label={t("cart.line.add")}
            >
              <LucidePlus />
            </Button>
          </div>
        </div>
        <div className="panel-table-cell space-x-2 text-xl select-none xl:w-1/4">
          {line.discount ? (
            <>
              <Amount
                amount={line.price}
                quantity={line.quantity}
                className="text-sm font-normal line-through"
              />
              <Amount amount={line.price * (1 - line.discount / 100)} quantity={line.quantity} />
            </>
          ) : (
            <Amount amount={line.price} quantity={line.quantity} />
          )}
        </div>
      </div>
    </div>
  )
}
