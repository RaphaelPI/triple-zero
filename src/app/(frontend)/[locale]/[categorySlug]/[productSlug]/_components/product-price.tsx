"use client"

import { Amount } from "@/components/amount"
import { useProduct } from "./product-provider"

export const ProductPrice = () => {
  const { technicalValues, promotion } = useProduct()
  return (
    <div className="flex w-fit items-end text-4xl font-bold">
      {promotion?.value ? (
        <>
          <Amount
            amount={Number(technicalValues?.price)}
            taxIncluded
            className="translate-y-1 scale-75 font-normal line-through"
          />
          <Amount
            amount={Number(technicalValues?.price) * (1 - promotion.value / 100)}
            taxIncluded
          />
        </>
      ) : (
        <Amount amount={Number(technicalValues?.price)} taxIncluded />
      )}
    </div>
  )
}
