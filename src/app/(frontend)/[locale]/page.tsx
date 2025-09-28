import { MainMessage } from "@/components/main-message"
import { Locale } from "@/i18n/config"
import { setRequestLocale } from "next-intl/server"
import { HomeCategories } from "./_components/home/home-categories"
import { HomeProductVariants } from "./_components/home/home-product-variants"
import { HomePromotions } from "./_components/home/home-promotions"
import { getMetadata } from "./metadata"

export const dynamic = "force-dynamic"

interface Props {
  params: Promise<{
    locale: Locale
  }>
}

export const generateMetadata = async ({ params }: Props) => {
  const { locale } = await params
  return getMetadata({
    locale,
    pathname: "/",
  })
}

export default async ({ params }: Props) => {
  // Enable static rendering
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main className="bg-flake bg-flake-bl md:bg-flake-tr bg-no-repeat md:space-y-4">
      <HomePromotions />
      <MainMessage />
      <HomeProductVariants />
      <HomeCategories />
    </main>
  )
}
