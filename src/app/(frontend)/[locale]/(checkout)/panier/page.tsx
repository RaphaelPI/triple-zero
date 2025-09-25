import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { getMetadata } from "../../metadata"
import Cart from "./_components/cart"

export const dynamic = "force-static"

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations()
  return getMetadata({
    title: t("cart.title"),
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
        <h1>{t("cart.title")}</h1>
        <p className="whitespace-pre-line">{t("cart.description")}</p>
      </section>
      <Cart />
    </main>
  )
}
