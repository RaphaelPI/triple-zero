"use client"

import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl"
import { NuqsAdapter } from "nuqs/adapters/next/app"

import { Locale } from "@/i18n/config"
import { CheckoutProvider } from "@/providers/checkout/checkout"
import { CountryProvider } from "@/providers/country"

interface Props {
  children: React.ReactNode
  messages?: AbstractIntlMessages
  locale: Locale
}

export const Providers = ({ children, messages, locale }: Props) => (
  <NuqsAdapter>
    <NextIntlClientProvider messages={messages} locale={locale} timeZone="UTC">
      <CheckoutProvider>
        <CountryProvider>{children}</CountryProvider>
      </CheckoutProvider>
    </NextIntlClientProvider>
  </NuqsAdapter>
)
