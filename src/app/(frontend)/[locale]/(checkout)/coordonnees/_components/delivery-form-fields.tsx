"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { LucidePlus } from "lucide-react"
import { useTranslations } from "next-intl"
import dynamic from "next/dynamic"
import { Suspense, useState } from "react"
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

export const DeliveryFormFields = ({ form }: Props) => {
  const [address2, setAddress2] = useState(false)
  const [open, setOpen] = useState(false)
  const t = useTranslations("delivery")

  const handleCheckChange = () => {
    setOpen((prev) => {
      if (!prev) {
        form.setValue("d_firstName", "")
        form.setValue("d_lastName", "")
        form.setValue("d_address", "")
        form.setValue("d_address2", "")
        form.setValue("d_zip", "")
        form.setValue("d_city", "")
        form.setValue("d_country", "")
      }

      return !prev
    })
  }

  return (
    <>
      <div className="mt-8 flex items-start gap-3">
        <Checkbox id="toggle" defaultChecked onCheckedChange={handleCheckChange} />
        <Label htmlFor="toggle">{t("useDeliveryAddress")}</Label>
      </div>
      {open && (
        <>
          <div className="text-xl">{t("deliveryAddress")}</div>
          <div className="grid gap-4 md:grid-cols-2">
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
          </div>

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
          <div className="grid gap-4 md:grid-cols-2">
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
          </div>
          <Suspense fallback={<Skeleton className="h-14 w-full" />}>
            <CountrySelectField
              control={form.control}
              name="d_country"
              label={t("country")}
              placeholder={t("country")}
              required
            />
          </Suspense>
        </>
      )}
    </>
  )
}
