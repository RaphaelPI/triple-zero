"use client"

import { Amount } from "@/components/amount"
import { cn } from "@/lib/utils"
import { CartLine as CartLineType } from "@/providers/checkout/checkout"
import Link from "next/link"
import { Fragment } from "react"

interface CartLineProps {
  line: CartLineType
}

export const PlanningOrderLine = ({ line }: CartLineProps) => {
  return (
    <div className="max-xs:flex-col flex items-start max-xl:flex-wrap">
      <div className="w-full flex-1 xl:flex">
        <div className="p-2 xl:w-1/2">
          <Link
            prefetch={false}
            href={line.url}
            aria-label={line.title}
            className="block font-bold"
          >
            {line.title}
          </Link>
          <div className="flex items-center gap-2">
            <div>Couleur :</div>
            {line.colors.map(([colorName, color]) => (
              <Fragment key={color}>
                <div
                  style={{ backgroundColor: color }}
                  className={cn("h-4 w-4 rounded-full", {
                    "border-primary border": color.toLowerCase() === "#ffffff",
                  })}
                />
                <div className="font-semibold">{colorName}</div>
              </Fragment>
            ))}
          </div>
          {line.options.map(([title, value]) => (
            <div key={title}>
              {title} : <strong>{value}</strong>
            </div>
          ))}
        </div>
        <div className="p-2 xl:w-1/4">
          <div className="flex items-center gap-1">
            <div className="bg-blue-light border-blue-grey w-10 shrink-0 cursor-default rounded-lg border py-1 text-center select-none dark:bg-gray-800">
              {line.quantity}
            </div>
          </div>
        </div>
        <div className="space-x-2 p-2 text-xl select-none xl:w-1/4">
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
