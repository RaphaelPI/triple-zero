import { MainMessage } from "@/components/main-message"
import { Locale, LOCALES } from "@/i18n/config"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { HomeCategories } from "./_components/home/home-categories"
import { HomeHero } from "./_components/home/home-hero"
import { HomeProductVariants } from "./_components/home/home-product-variants"
import { HomePromotions } from "./_components/home/home-promotions"
import { getMetadata } from "./metadata"

interface Props {
  params: Promise<{
    locale: Locale
  }>
}

export const generateMetadata = async ({ params }: Props) => {
  const { locale } = await params
  const t = await getTranslations()
  return getMetadata({
    title: t("seo_title"),
    description: t("seo_description"),
    locale,
    pathname: "/",
  })
}

export default async ({ params }: Props) => {
  // Enable static rendering
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main className="bg-flake bg-flake-bl md:bg-flake-tr space-y-4 bg-no-repeat">
      <HomeHero />
      <HomePromotions />
      <MainMessage />
      <HomeProductVariants />
      <HomeCategories />
    </main>
  )
}

export const generateStaticParams = async () => LOCALES.map((locale) => ({ locale }))
