"use client"

import { useTranslations } from "next-intl"

export const AlreadyHandled = () => {
  const t = useTranslations()

  return (
    <div className="section space-y-8 py-32 max-md:py-8">
      <div className="text-h1 font-semibold">{t("checkout.already-handled")}</div>
      <div className="space-y-4">
        <div className="text-lg whitespace-pre-line">
          {t("checkout.already-handled-description")}
        </div>
      </div>
    </div>
  )
}
