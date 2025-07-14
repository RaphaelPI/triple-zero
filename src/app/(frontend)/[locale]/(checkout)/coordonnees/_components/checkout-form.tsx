"use client"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useLocale, useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { formSchema, useCheckout } from "@/providers/checkout"
import { en, fr } from "zod/v4/locales"
import { isTaxFreeCountry } from "../utils"
import { BillingFormFields } from "./billing-form-fields"
import { DeliveryFormFields } from "./delivery-form-fields"

export const CheckoutForm = () => {
  const { deliveryData, setDeliveryData, setShippingFeesCountry } = useCheckout()
  const t = useTranslations()

  // Default locale
  const locale = useLocale()
  z.config(locale === "fr" ? fr() : en())

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: deliveryData,
  })

  const validate = (values: z.infer<typeof formSchema>) => {
    // country
    setShippingFeesCountry(values.d_country || values.country)

    // delivery fields
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

    if (
      values.country &&
      values.d_country &&
      isTaxFreeCountry(values.country) !== isTaxFreeCountry(values.d_country)
    ) {
      form.setError("root", {
        message: t("error.deliveryCountryTaxFree"),
      })
      form.setError("country", {
        message: t("error.deliveryCountryTaxFree"),
      })
      form.setError("d_country", {
        message: t("error.deliveryCountryTaxFree"),
      })
      return
    }
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // validate values
    validate(values)

    // Store data in session storage
    setDeliveryData(values)
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onChange={() => validate(form.getValues())}
          className="space-y-2"
        >
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
