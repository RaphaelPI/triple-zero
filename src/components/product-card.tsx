import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import { Media } from "@/payload-types"
import { useTranslations } from "next-intl"
import { ReactNode } from "react"
import { Amount } from "./amount"
import { Image } from "./image"
import { Button } from "./ui/button"

interface Props {
  href: string
  image?: Media
  title: string
  description: ReactNode
  price?: number
  className?: string
}

export const ProductCard = ({ href, image, title, description, price, className }: Props) => {
  const t = useTranslations()

  return (
    <Link
      prefetch={false}
      href={href}
      className={cn(
        "panel ring-blue relative flex flex-wrap gap-8 hover:ring-8 md:h-64",
        className,
      )}
    >
      <div className="w-full md:h-full md:w-5/12">
        {image && (
          <Image
            media={image}
            alt={title}
            className="mx-auto h-60 w-auto rounded-2xl object-cover object-right md:h-full md:rounded-r-none"
          />
        )}
      </div>
      <div className="w-full flex-1 space-y-4 px-8 pb-8 md:pt-8">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="line-clamp-2">{description}</div>
        {price && (
          <div className="text-lg font-semibold">
            {t("priceFrom")}
            <Amount amount={price} taxIncluded />
          </div>
        )}
        <Button aria-label={t("product.see")}>{t("product.see")}</Button>
      </div>
    </Link>
  )
}
