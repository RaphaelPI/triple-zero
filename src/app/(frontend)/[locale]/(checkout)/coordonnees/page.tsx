import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { getMetadata } from "../../metadata"
import { CheckoutForm } from "./_components/checkout-form"

export const dynamic = "force-static"

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
      {/* <section className="w-section px-section flex gap-8 max-lg:flex-col">
        <div className="panel px-panel py-panel flex-1 space-y-4">
        </div>
        <CheckoutSummary displayButton={false} />
      </section> */}
    </main>
  )
}
