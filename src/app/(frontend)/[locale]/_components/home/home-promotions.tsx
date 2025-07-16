import { PromotionDiscount } from "@/components/discount"
import { Image } from "@/components/image"
import { Locale } from "@/i18n/config"
import { Link } from "@/i18n/navigation"
import { Media, Product, ProductOption, ProductOptionValue } from "@/payload-types"
import { getLocale, getTranslations } from "next-intl/server"
import { getPromotionsData } from "../../data"

export const HomePromotions = async () => {
  const locale = await getLocale()
  const promotions = await getPromotionsData(locale as Locale)
  const t = await getTranslations()

  if (promotions.docs.length === 0) {
    return null
  }

  return (
    <section className="py-section space-y-8">
      <h1 className="w-section px-section">{t("promotions")}</h1>
      <div className="max-md:scrollable md:w-section md:px-section max-md:pb-8 md:grid md:grid-cols-2 md:gap-10 lg:grid-cols-3">
        {promotions.docs.map((promotion) => {
          const product = promotion.reference.value as Product
          const options = promotion.options as [ProductOption, ProductOptionValue][]
          const image = (promotion.image ?? product.images?.[0]?.image) as Media

          return (
            <Link
              key={promotion.id}
              href={`/promotions/${promotion.slug}`}
              className="hover:ring-blue panel relative block snap-start hover:ring-8 max-md:min-w-xs md:h-full"
            >
              <PromotionDiscount>{promotion.value}%</PromotionDiscount>
              <Image
                priority
                media={image}
                alt={product.title}
                width={350}
                height={300}
                className="h-52 w-full rounded-t-2xl object-contain"
                sizes="350px"
              />
              <div className="px-panel py-panel space-y-2">
                <div className="text-lg font-semibold">{promotion.title}</div>
                <div className="line-clamp-3 min-h-12 text-sm">{promotion.description}</div>
                <div>
                  <ul className="flex flex-wrap gap-1">
                    {options.map(([option, optionValue]) => (
                      <li key={option.title} className="bg-blue-grey rounded px-2 py-1 text-xs">
                        {option.title} : {optionValue.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
