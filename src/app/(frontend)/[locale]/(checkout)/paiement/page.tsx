import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { getMetadata } from "../../metadata"
import { PaymentForm } from "./_components/payment-form"
import { StripeProvider } from "./_components/stripe-provider"

export const dynamic = "force-static"

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations()
  return getMetadata({
    title: t("payment.title"),
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
        <h1>{t("payment.title")}</h1>
        <p className="whitespace-pre-line">{t("payment.description")}</p>
      </section>
      <StripeProvider>
        <PaymentForm />
      </StripeProvider>
    </main>
  )
}
