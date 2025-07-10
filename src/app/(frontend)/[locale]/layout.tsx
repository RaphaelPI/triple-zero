import { routing } from "@/i18n/routing"
import { hasLocale } from "next-intl"
import { getMessages, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { barlow } from "./fonts"

import { setDefaultOptions } from "date-fns"
import { enGB, fr } from "date-fns/locale"
import { Footer } from "./_components/footer"
import Header from "./_components/header"
import { Providers } from "./providers"

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
        <Providers locale={locale} messages={messages}>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
