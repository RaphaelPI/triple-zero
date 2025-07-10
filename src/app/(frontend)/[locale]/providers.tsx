"use client"

import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl"
import { NuqsAdapter } from "nuqs/adapters/next/app"

import { Locale } from "@/i18n/config"
import { CheckoutProvider } from "@/providers/checkout"

interface Props {
  children: React.ReactNode
  messages?: AbstractIntlMessages
  locale: Locale
}

export const Providers = ({ children, messages, locale }: Props) => (
  <NuqsAdapter>
    <NextIntlClientProvider messages={messages} locale={locale} timeZone="UTC">
      <CheckoutProvider>{children}</CheckoutProvider>
    </NextIntlClientProvider>
  </NuqsAdapter>
)
