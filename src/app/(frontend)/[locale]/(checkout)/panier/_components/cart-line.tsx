"use client"

import { Amount } from "@/components/amount"
import { Button } from "@/components/ui/button"
import { CartLine as CartLineType, useCheckout } from "@/providers/checkout"
import { LucideMinus, LucidePlus } from "lucide-react"
import { useTranslations } from "next-intl"
import NextImage from "next/image"
import Link from "next/link"
import { MouseEvent } from "react"

interface CartLineProps {
  line: CartLineType
  index: number
}

export const CartLine = ({ line, index }: CartLineProps) => {
  const { updateLineQuantity } = useCheckout()
  // const [product, setProduct] = useState<Product>()
  const t = useTranslations()

  // useEffect(() => {
  //   checkData(line)
  // }, [line])

  // const checkData = async (line: CartLineType) => {
  //   const product = await getCartData(line)
  //   setProduct(product)
  // }

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
        <div>
          {line.image && (
            <Link prefetch={false} href={line.url} aria-label={line.title}>
              <NextImage
                src={line.image}
                width={320}
                height={320}
                className="h-auto w-full"
                alt={line.title}
              />
            </Link>
          )}
        </div>
      </div>
      <div className="w-full flex-1 xl:flex">
        <div className="panel-table-cell xl:w-1/2">
          <Link
            prefetch={false}
            href={line.url}
            aria-label={line.title}
            className="block font-bold"
          >
            {line.title}
          </Link>
          <div className="flex items-center gap-2">
            <div>{t("color")} :</div>
            {line.colors.map((color) => (
              <div
                key={color}
                style={{ backgroundColor: color }}
                className="h-4 w-4 rounded-full"
              />
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
            <Button onClick={handleMinusClick} variant="icon" size="icon">
              <LucideMinus />
            </Button>
            <div className="bg-blue-light border-dark w-8 flex-shrink-0 cursor-default rounded-lg border py-1 text-center select-none">
              {line.quantity}
            </div>
            <Button onClick={handlePlusClick} variant="icon" size="icon">
              <LucidePlus />
            </Button>
          </div>
        </div>
        <div className="panel-table-cell text-xl select-none xl:w-1/4">
          <Amount amount={line.price * line.quantity} taxIncluded />
        </div>
      </div>
    </div>
  )
}
