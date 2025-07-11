"use client"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import { zodResolver } from "@hookform/resolvers/zod"
import { LucidePlus } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import dynamic from "next/dynamic"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
// import * as z from "zod";

import { en, fr } from "zod/v4/locales"
import { DeliveryForm } from "./delivery-form"
import { InputField } from "./input-field"

const CountrySelectField = dynamic(
  () => import("./country-select-field").then((mod) => mod.CountrySelectField),
  {
    ssr: false,
  },
)

// z.setErrorMap((error, ctx) => {
//   if (ctx.defaultError) {
//     return { message: "Champ obligatoire" }
//   }
//   return { message: error.message ?? "Champ obligatoire" }
// })
const RequiredStringSchema = z.string().trim().min(1, { message: "Champ obligatoire" })
const formSchema = z.object({
  firstName: RequiredStringSchema,
  lastName: RequiredStringSchema,
  company: z.string().optional(),
  address: RequiredStringSchema,
  address2: z.string().optional(),
  zip: RequiredStringSchema,
  city: RequiredStringSchema,
  country: RequiredStringSchema,
  email: z.email(),
  phone: z
    .string()
    .regex(
      /^(?:(?:\+|00)[1-9]{2}|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
      "Le numéro de téléphone doit contenir 10 chiffres",
    ),
  d_firstName: z
    .string()
    .optional()
    .check((...data) => {
      console.log(...data)
    }),
  d_lastName: z.string().optional(),
  d_address: z.string().optional(),
  d_address2: z.string().optional(),
  d_zip: z.string().optional(),
  d_city: z.string().optional(),
  d_country: z.string().optional(),
})
// .check((ctx) => {
//   console.log(ctx)
//   const allEmpty = deliveryFields.every((field) => !ctx.value[field as keyof typeof ctx.value])
//   const allFilled = deliveryFields.every((field) => ctx.value[field as keyof typeof ctx.value])

//   if (!allEmpty && !allFilled) {
//     ctx.issues.push({
//       code: "custom",
//       message:
//         "Si vous choisissez de remplir l'adresse de livraison, vous devez saisir tous les champs obligatoires.",
//       input: ctx.value,
//     })
//   }

//   // console.log(data, allEmpty, allFilled)
//   // return allEmpty || allFilled
// })

export const BillingForm = () => {
  const [address2, setAddress2] = useState(false)
  const t = useTranslations()
  const locale = useLocale()
  z.config(locale === "fr" ? fr() : en())

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lastName: "",
      firstName: "",
      company: "",
      email: "",
      phone: "",
      address: "",
      address2: "",
      zip: "",
      city: "",
      country: "",
      d_lastName: "",
      d_firstName: "",
      d_address: "",
      d_address2: "",
      d_zip: "",
      d_city: "",
      d_country: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const deliveryFields: (keyof z.infer<typeof formSchema>)[] = [
      "d_lastName",
      "d_firstName",
      "d_address",
      "d_zip",
      "d_city",
      "d_country",
    ]
    const allEmpty = deliveryFields.every((field) => !values[field as keyof typeof values])
    const allFilled = deliveryFields.every((field) => values[field as keyof typeof values])

    if (!allEmpty && !allFilled) {
      deliveryFields.forEach((field) => {
        const fieldValue = values[field as keyof typeof values]
        console.log(field, fieldValue)
        if (!fieldValue) {
          form.setError(field, {
            message: t("error.deliveryRequired"),
          })
        }
      })
      // logger.error(
      //   "Si vous choisissez de remplir l'adresse de livraison, vous devez saisir tous les champs obligatoires.",
      // )

      form.setError("root", {
        message: t("error.deliveryRequiredAll"),
      })

      return
    }

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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

          <DeliveryForm control={form.control} />
          <div className="space-y-4 pt-10">
            {form.formState.errors.root && (
              <div className="text-destructive">{form.formState.errors.root.message}</div>
            )}
            <Button type="submit" className="w-full">
              {t("delivery.validate")}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
