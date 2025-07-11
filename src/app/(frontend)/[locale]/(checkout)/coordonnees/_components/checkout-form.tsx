"use client"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useLocale, useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { en, fr } from "zod/v4/locales"
import { BillingFormFields } from "./billing-form-fields"
import { DeliveryFormFields } from "./delivery-form-fields"

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

export const CheckoutForm = () => {
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
          <BillingFormFields form={form} />
          <DeliveryFormFields form={form} />
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
