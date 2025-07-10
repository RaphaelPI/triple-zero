"use client"

import { cn } from "@/lib/utils"
import { LucidePlus } from "lucide-react"
import { useTranslations } from "next-intl"
import dynamic from "next/dynamic"
import { useState } from "react"
import { Control } from "react-hook-form"
import Triangle from "src/assets/triangle.svg"
import { InputField } from "./input-field"

const CountrySelectField = dynamic(
  () => import("./country-select-field").then((mod) => mod.CountrySelectField),
  {
    ssr: false,
  },
)

interface Props {
  control: Control<any>
}

export const DeliveryForm = ({ control }: Props) => {
  const [address2, setAddress2] = useState(false)
  const [open, setOpen] = useState(false)
  const t = useTranslations("delivery")

  return (
    <>
      <div className="mt-10 text-xl" onClick={() => setOpen((prev) => !prev)}>
        Adresse de livraison (ne remplir que si différente de l’adresse de facturation){" "}
        <Triangle
          className={cn(`ml-2 inline w-3 transition-transform`, {
            "rotate-90": open,
          })}
        />
      </div>
      {open && (
        <>
          <div className="xs:grid-cols-2 s:gap-4 grid gap-2">
            <InputField
              control={control}
              name="d_lastName"
              label={t("lastName")}
              placeholder={t("lastName")}
              required
            />
            <InputField
              control={control}
              name="d_firstName"
              label={t("firstName")}
              placeholder={t("firstName")}
              required
            />
          </div>
          <div className="space-y-1">
            <InputField
              control={control}
              name="d_address"
              label={t("address")}
              placeholder={t("address")}
              required
            />
            {address2 ? (
              <InputField
                control={control}
                name="d_address2"
                label={t("address2")}
                placeholder={t("address2")}
              />
            ) : (
              <div
                className="link flex items-center gap-1 text-xs"
                onClick={() => setAddress2(true)}
              >
                <LucidePlus className="size-3" />
                Ajouter un complément d’adresse
              </div>
            )}
          </div>
          <div className="xs:grid-cols-3 xs:gap-4 grid gap-2">
            <InputField
              control={control}
              name="d_zip"
              label={t("zip")}
              placeholder={t("zip")}
              required
            />
            <InputField
              control={control}
              name="d_city"
              label={t("city")}
              placeholder={t("city")}
              required
            />
            <CountrySelectField
              control={control}
              name="d_country"
              label={t("country")}
              placeholder={t("country")}
              required
            />
          </div>
        </>
      )}
    </>
  )
}
