import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { getMetadata } from "../../metadata"
import { CheckoutForm } from "./_components/checkout-form"

export const dynamic = "force-dynamic"

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations()
  return getMetadata({
    title: t("delivery.title"),
    robots: {
      index: false,
      follow: false,
    },
  })
}

export default async () => {
  const t = await getTranslations()

  return (
    <main>
      <section className="section space-y-2">
        <div className="h1">{t("delivery.title")}</div>
        <p className="whitespace-pre-line">{t("delivery.description")}</p>
      </section>
      <CheckoutForm />
    </main>
  )
}
