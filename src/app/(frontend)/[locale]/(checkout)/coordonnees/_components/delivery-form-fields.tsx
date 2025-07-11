"use client"

import { cn } from "@/lib/utils"
import { LucidePlus } from "lucide-react"
import { useTranslations } from "next-intl"
import dynamic from "next/dynamic"
import { useState } from "react"
import { UseFormReturn } from "react-hook-form"
import Triangle from "src/assets/triangle.svg"
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

export const DeliveryFormFields = ({ form }: Props) => {
  const [address2, setAddress2] = useState(false)
  const [open, setOpen] = useState(false)
  const t = useTranslations("delivery")

  return (
    <>
      <div
        className="mt-10 cursor-pointer text-xl leading-1"
        onClick={() => setOpen((prev) => !prev)}
      >
        Adresse de livraison
        <Triangle
          className={cn(`ml-2 inline w-3 transition-transform`, {
            "rotate-90": open,
          })}
        />
      </div>
      <div className="text-xs leading-2 italic">
        (ne remplir que si différente de l’adresse de facturation)
      </div>
      {open && (
        <>
          <InputField
            control={form.control}
            name="d_firstName"
            label={t("firstName")}
            placeholder={t("firstName")}
            required
          />
          <InputField
            control={form.control}
            name="d_lastName"
            label={t("lastName")}
            placeholder={t("lastName")}
            required
          />

          <InputField
            control={form.control}
            name="d_address"
            label={t("address")}
            placeholder={t("address")}
            required
          />
          {address2 ? (
            <InputField
              control={form.control}
              name="d_address2"
              label={t("address2")}
              placeholder={t("address2")}
            />
          ) : (
            <div className="link flex items-center gap-1 text-xs" onClick={() => setAddress2(true)}>
              <LucidePlus className="size-3" />
              Ajouter un complément d’adresse
            </div>
          )}

          <InputField
            control={form.control}
            name="d_zip"
            label={t("zip")}
            placeholder={t("zip")}
            required
          />
          <InputField
            control={form.control}
            name="d_city"
            label={t("city")}
            placeholder={t("city")}
            required
          />
          <CountrySelectField
            control={form.control}
            name="d_country"
            label={t("country")}
            placeholder={t("country")}
            required
          />
        </>
      )}
    </>
  )
}
