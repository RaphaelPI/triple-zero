"use client"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import { zodResolver } from "@hookform/resolvers/zod"
import { LucidePlus } from "lucide-react"
import { useTranslations } from "next-intl"
import dynamic from "next/dynamic"
import { useState } from "react"
import { useForm } from "react-hook-form"
import z from "zod"
import { DeliveryForm } from "./delivery-form"
import { InputField } from "./input-field"

const CountrySelectField = dynamic(
  () => import("./country-select-field").then((mod) => mod.CountrySelectField),
  {
    ssr: false,
  },
)

z.setErrorMap((error, ctx) => {
  if (ctx.defaultError) {
    return { message: "Champ obligatoire" }
  }
  return { message: error.message ?? "Champ obligatoire" }
})

const formSchema = z.object({
  lastName: z.string(),
  firstName: z.string(),
  company: z.string().optional(),
  address: z.string(),
  address2: z.string().optional(),
  zip: z.string(),
  city: z.string(),
  country: z.string(),
  email: z.string().email(),
  phone: z.string().min(10).max(20),
  d_lastName: z.string().optional(),
  d_firstName: z.string().optional(),
  d_address: z.string().optional(),
  d_address2: z.string().optional(),
  d_zip: z.string().optional(),
  d_city: z.string().optional(),
  d_country: z.string().optional(),
})

export const BillingForm = () => {
  const [address2, setAddress2] = useState(false)
  const t = useTranslations("delivery")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="text-xl">Adresse de facturation</div>
          <div className="xs:grid-cols-3 s:gap-4 grid gap-2">
            <InputField
              control={form.control}
              name="lastName"
              label={t("lastName")}
              placeholder={t("lastName")}
              required
            />
            <InputField
              control={form.control}
              name="firstName"
              label={t("firstName")}
              placeholder={t("firstName")}
              required
            />
            <InputField
              control={form.control}
              name="company"
              label={t("company")}
              placeholder={t("company")}
            />
          </div>
          <div className="xs:grid-cols-2 xs:gap-4 grid gap-2 pb-10">
            <InputField
              control={form.control}
              name="email"
              label={t("email")}
              placeholder={t("email")}
              required
            />
            <InputField
              control={form.control}
              name="phone"
              label={t("phone")}
              placeholder={t("phone")}
              required
            />
          </div>
          <div className="space-y-1">
            <InputField
              control={form.control}
              name="address"
              label={t("address")}
              placeholder={t("address")}
              required
            />
            {address2 ? (
              <InputField
                control={form.control}
                name="address2"
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
              control={form.control}
              name="zip"
              label={t("zip")}
              placeholder={t("zip")}
              required
            />
            <InputField
              control={form.control}
              name="city"
              label={t("city")}
              placeholder={t("city")}
              required
            />
            <CountrySelectField
              control={form.control}
              name="country"
              label={t("country")}
              placeholder={t("country")}
              required
            />
          </div>
          <DeliveryForm control={form.control} />
          <div className="pt-10">
            <Button type="submit" className="w-full">
              {t("validate")}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
