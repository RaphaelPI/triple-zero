"use client"

import { Button } from "@/components/ui/button"
import { Category, Media } from "@/payload-types"
import { useCheckout } from "@/providers/checkout"
import { useTranslations } from "next-intl"
import { useProduct } from "./product-provider"

interface Props {
  children?: React.ReactNode
}

export const ProductAddToCart = ({ children }: Props) => {
  const { addItem } = useCheckout()
  const { technicalValues, activeOptions, activeColor, product, promotion } = useProduct()
  const t = useTranslations()

  const image = ((promotion?.image ?? product.images?.[0]?.image) as Media)?.url ?? ""

  return (
    <Button
      aria-label={t("cart.add")}
      size="lg"
      onClick={() =>
        addItem({
          product: product.id,
          promotion: promotion?.id,
          title: promotion?.title ?? product.title,
          image,
          options: activeOptions,
          color: activeColor,
          price: Number(technicalValues?.price),
          discount: promotion?.value,
          categorySlug: (product.category as Category).slug ?? "",
          categoryTitle: (product.category as Category).title ?? "",
        })
      }
      className="w-full"
    >
      {children ?? t("cart.add")}
    </Button>
  )
}
