import { EMAIL, PHONE } from "@/constants"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import Link from "next/link"
import { getMetadata } from "../metadata"
import Cart from "./_components/cart"

interface Props {
  params: Promise<{
    locale: string
  }>
}

export const generateMetadata = async (): Promise<Metadata> => {
  return getMetadata({
    title: "Panier",
    robots: {
      index: false,
      follow: false,
    },
  })
}

const CartPage = async ({ params }: Props) => {
  const t = await getTranslations()

  return (
    <main>
      <section className="section">
        <h1>{t("cart.title")}</h1>
        <p className="pt-2">{t("cart.hint")}</p>
      </section>
      <Cart />
      <section className="section">
        <div className="bg-dark px-section py-section rounded-2xl text-center text-white">
          <p className="mb-2 text-lg">
            {t("question")}
            <br />
            {t("contactUs")} <span className="text-green text-xs font-bold">↴</span>
          </p>
          <Link href={`tel:${PHONE.replaceAll(" ", "")}`} className="p-2 text-white md:p-0">
            {PHONE}
          </Link>{" "}
          |{" "}
          <Link href={`mailto:${EMAIL}`} className="p-2 text-white md:p-0">
            {EMAIL}
          </Link>
        </div>
      </section>
    </main>
  )
}

export default CartPage
