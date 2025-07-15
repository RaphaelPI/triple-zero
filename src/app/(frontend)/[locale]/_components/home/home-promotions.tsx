import { getTranslations } from "next-intl/server"
import { getPromotionsData } from "../../data"

export const HomePromotions = async () => {
  const promotions = await getPromotionsData()
  const t = await getTranslations()

  if (promotions.docs.length === 0) {
    return null
  }

  return (
    <section className="section">
      <h1>{t("promotions")}</h1>
      <div className="scrollable">
        {promotions.docs.map((promotion) => (
          <div key={promotion.id}>{promotion.title}</div>
        ))}
      </div>
    </section>
  )
}
