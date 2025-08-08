"use client"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useLocale, useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { useRouter } from "@/i18n/navigation"
import { isTTCCountry } from "@/lib/price"
import { formSchema, useCheckout } from "@/providers/checkout/checkout"
import { en, fr } from "zod/v4/locales"
import { CheckoutSkeleton } from "../../_components/checkout-skeleton"
import { CheckoutSummary } from "../../_components/checkout-summary"
import { BillingFormFields } from "./billing-form-fields"
import { DeliveryFormFields } from "./delivery-form-fields"

export const CheckoutForm = () => {
  const { deliveryData, setDeliveryData, cart, loading, loadingShippingFees } = useCheckout()
  const t = useTranslations()
  const { push } = useRouter()

  // Default locale
  const locale = useLocale()
  z.config(locale === "fr" ? fr() : en())

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: deliveryData,
  })

  const validate = (values: z.infer<typeof formSchema>) => {
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
      isTTCCountry(values.country) !== isTTCCountry(values.d_country)
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

    push("/paiement")
  }

  if (loading) {
    return <CheckoutSkeleton />
  }

  if (cart.lines.length === 0) {
    return (
      <section className="w-section px-section">
        <div className="panel px-panel py-panel">{t("cart.empty")}...</div>
      </section>
    )
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onChange={() => validate(form.getValues())}
        className="space-y-2"
      >
        <section className="w-section px-section flex gap-8 max-lg:flex-col">
          <div className="panel px-panel py-panel flex-1 space-y-4">
            <BillingFormFields form={form} />
            <DeliveryFormFields form={form} />
            <div className="space-y-4 pt-4">
              {form.formState.errors.root && (
                <div className="text-destructive">{form.formState.errors.root.message}</div>
              )}
            </div>
          </div>
          <CheckoutSummary>
            <Button
              type="submit"
              className="w-full"
              aria-label={t("delivery.validate")}
              loading={form.formState.isSubmitting || form.formState.isLoading}
              disabled={form.formState.isSubmitting || loadingShippingFees}
            >
              {t("delivery.validate")}
            </Button>
          </CheckoutSummary>
        </section>
      </form>
    </Form>
  )
}
