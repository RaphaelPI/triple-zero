import { PromotionCard } from "@/components/cards/promotion-card"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { Media, Product, ProductOption, ProductOptionValue } from "@/payload-types"
import { getTranslations } from "next-intl/server"
import { getHomePromotionsData } from "../../data"

export const HomePromotions = async () => {
  const promotions = await getHomePromotionsData()
  const t = await getTranslations()

  if (promotions.docs.length === 0) {
    return null
  }

  return (
    <section className="pt-section space-y-4 lg:space-y-8">
      <h1 className="w-section px-section">{t("promotions.title")}</h1>
      <div className="max-md:scrollable md:w-section md:px-section max-md:pb-8 md:grid md:grid-cols-2 md:gap-10 xl:grid-cols-3">
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
              shortDescription
            />
          )
        })}
      </div>
      {promotions.totalDocs > promotions.limit && (
        <div className="w-section px-section text-center">
          <Link href="/promotions">
            <Button variant="outline">
              {t("promotions.seeAll")} (${promotions.totalDocs})
            </Button>
          </Link>
        </div>
      )}
    </section>
  )
}
