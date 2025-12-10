import { routing } from "@/i18n/routing"
import { hasLocale, useLocale, useTranslations } from "next-intl"
import { getMessages, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { barlow } from "./fonts"

import { MainMessageModal } from "@/components/main-message/modal"
import { OrganizationJsonLd } from "@/components/structured-data/organization"
import { Toaster } from "@/components/ui/sonner"
import { ADDRESS, ADDRESS_COUNTRY, ADDRESS_TOWN, ADDRESS_ZIP } from "@/constants"
import { getUrl } from "@/lib/url"
import { setDefaultOptions } from "date-fns"
import { enGB, fr } from "date-fns/locale"
import { Footer } from "./_components/footer"
import Header from "./_components/header"
import { TopLoader } from "./_components/top-loader"
import { Analytics } from "./_components/vendors/analytics"
import { Providers } from "./providers"

const StructuredJSON = () => {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <OrganizationJsonLd
      type="Organization"
      name="Triple Zéro"
      description={t("description")}
      url={getUrl("/", locale)}
      logo={getUrl("/logo.webp")}
      address={{
        streetAddress: ADDRESS,
        addressLocality: ADDRESS_TOWN,
        postalCode: ADDRESS_ZIP,
        addressCountry: ADDRESS_COUNTRY,
      }}
    />
  )
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  // Get messages
  const messages = await getMessages()

  // Set the locale for date-fns
  setDefaultOptions({ locale: locale === "fr" ? fr : enGB })

  return (
    <html lang={locale}>
      <body className={`${barlow.className}`}>
        <TopLoader />
        <Analytics />
        <Providers locale={locale} messages={messages}>
          <StructuredJSON />
          <Header />
          {children}
          <Footer />
          <MainMessageModal />
          <Toaster position="bottom-center" richColors />
        </Providers>
      </body>
    </html>
  )
}
