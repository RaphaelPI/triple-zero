import { PromotionCard } from "@/components/cards/promotion-card"
import { Locale } from "@/i18n/config"
import { Media, Product, ProductOption, ProductOptionValue } from "@/payload-types"
import { getTranslations } from "next-intl/server"
import { getMetadata } from "../metadata"
import { getPromotionsData } from "./data"

export const dynamic = "force-static"

interface Props {
  params: Promise<{
    locale: Locale
    categorySlug: string
  }>
}

export const generateMetadata = async (props: Props) => {
  const t = await getTranslations()

  return getMetadata({
    title: t("promotions.nav"),
    description: t("promotions.meta_description"),
    pathname: `/promotions`,
  })
}

export default async (props: Props) => {
  const promotions = await getPromotionsData()
  const t = await getTranslations()

  return (
    <main className="bg-flake bg-flake-bl md:bg-flake-tr bg-no-repeat">
      <section className="section space-y-4 lg:space-y-8">
        <h1>{t("promotions.title")}</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-10 xl:grid-cols-3">
          {promotions.docs.map((promotion) => {
            const product = promotion.reference.value as Product
            const options = promotion.options as [ProductOption, ProductOptionValue][]
            const image = (promotion.image ?? product.images?.[0]?.image) as Media

            return (
              <PromotionCard
                key={promotion.id}
                title={promotion.title}
                description={promotion.description ?? product.description}
                image={image}
                options={options}
                discount={promotion.value}
                slug={promotion.slug}
              />
            )
          })}
        </div>
      </section>
    </main>
  )
}
