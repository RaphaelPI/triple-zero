"use client"

import { LucidePlus } from "lucide-react"
import { useTranslations } from "next-intl"
import dynamic from "next/dynamic"
import { useState } from "react"
import { UseFormReturn } from "react-hook-form"

import { InputField } from "./input-field"

const CountrySelectField = dynamic(
  () => import("./country-select-field").then((mod) => mod.CountrySelectField),
  {
    ssr: false,
  },
)

interface Props {
  form: UseFormReturn<any>
}

export const BillingFormFields = ({ form }: Props) => {
  const [address2, setAddress2] = useState(false)
  const t = useTranslations()

  return (
    <>
      <div className="text-xl">Adresse de facturation</div>
      <InputField
        control={form.control}
        name="firstName"
        label={t("delivery.firstName")}
        placeholder={t("delivery.firstName")}
        required
      />
      <InputField
        control={form.control}
        name="lastName"
        label={t("delivery.lastName")}
        placeholder={t("delivery.lastName")}
        required
      />
      <InputField
        control={form.control}
        name="company"
        label={t("delivery.company")}
        placeholder={t("delivery.company")}
      />

      <InputField
        control={form.control}
        name="email"
        label={t("delivery.email")}
        placeholder={t("delivery.email")}
        required
      />
      <InputField
        control={form.control}
        name="phone"
        label={t("delivery.phone")}
        placeholder={t("delivery.phone")}
        required
      />

      <InputField
        control={form.control}
        name="address"
        label={t("delivery.address")}
        placeholder={t("delivery.address")}
        required
      />
      {address2 ? (
        <InputField
          control={form.control}
          name="address2"
          label={t("delivery.address2")}
          placeholder={t("delivery.address2")}
        />
      ) : (
        <div className="link flex items-center gap-1 text-xs" onClick={() => setAddress2(true)}>
          <LucidePlus className="size-3" />
          {t("delivery.addAddress2")}
        </div>
      )}

      <InputField
        control={form.control}
        name="zip"
        label={t("delivery.zip")}
        placeholder={t("delivery.zip")}
        required
      />
      <InputField
        control={form.control}
        name="city"
        label={t("delivery.city")}
        placeholder={t("delivery.city")}
        required
      />
      <CountrySelectField
        control={form.control}
        name="country"
        label={t("delivery.country")}
        placeholder={t("delivery.country")}
        required
      />
    </>
  )
}
