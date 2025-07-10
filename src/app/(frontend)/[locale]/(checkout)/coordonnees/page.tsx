import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { getMetadata } from "../../metadata"
import { BillingForm } from "./_components/billing-form"

export const generateMetadata = async (): Promise<Metadata> => {
  return getMetadata({
    title: "Panier",
    robots: {
      index: false,
      follow: false,
    },
  })
}

export default async () => {
  const t = await getTranslations()

  return (
    <main className="space-y-4 lg:space-y-8">
      <section className="w-section px-section space-y-2">
        <h1>{t("delivery.title")}</h1>
        <p className="whitespace-pre-line">{t("delivery.description")}</p>
      </section>
      <section className="w-section px-section">
        <div className="panel px-panel py-panel space-y-4">
          <BillingForm />
        </div>
      </section>
    </main>
  )
}
