"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { useLocale, useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useCheckout } from "@/providers/checkout/checkout"
import { useCheckout as useStripeCheckout } from "@stripe/react-stripe-js"
import { BanknoteArrowUpIcon, CreditCardIcon, MailIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { en, fr } from "zod/v4/locales"
import { CheckoutSummary } from "../../_components/checkout-summary"
import { BankTransfer } from "./bank-transfer"
import { Check } from "./check"
import { CreditCard } from "./credit-card"

type PaymentType = "card" | "check" | "transfer"

export const PaymentForm = () => {
  const [paymentType, setPaymentType] = useState<PaymentType>("card")
  const { cart, loadingShippingFees, storeOrder } = useCheckout()
  const t = useTranslations()

  const checkout = useStripeCheckout()
  const form = useForm()

  // Default locale
  const locale = useLocale()
  z.config(locale === "fr" ? fr() : en())

  useEffect(() => {
    if (paymentType) {
      return
    }

    function beforeUnload(e: BeforeUnloadEvent) {
      e.preventDefault()
    }

    window.addEventListener("beforeunload", beforeUnload)

    return () => {
      window.removeEventListener("beforeunload", beforeUnload)
    }
  }, [paymentType])

  if (cart.lines.length === 0) {
    return (
      <section className="w-section px-section">
        <div className="panel px-panel py-panel">{t("cart.empty")}...</div>
      </section>
    )
  }

  const onSubmit = async (values: any) => {
    await storeOrder(paymentType, values.comment)

    if (paymentType === "card") {
      const result = await checkout.confirm()

      if (result.type === "error") {
        // Show error to your customer (for example, payment details incomplete)
        console.log(result.error.message)
      }
      return
    }

    alert(paymentType)

    // Your customer will be redirected to your `return_url`. For some payment
    // methods like iDEAL, your customer will be redirected to an intermediate
    // site first to authorize the payment, then redirected to the `return_url`.
  }

  const payments = [
    {
      title: t("payment.card.title"),
      icon: <CreditCardIcon className="size-6" />,
      value: "card",
      content: <CreditCard />,
    },
    {
      title: t("payment.transfer.title"),
      icon: <BanknoteArrowUpIcon className="size-6" />,
      value: "transfer",
      content: <BankTransfer />,
    },
    {
      title: t("payment.check.title"),
      icon: <MailIcon className="size-6" />,
      value: "phone",
      content: <Check />,
    },
  ]

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <section className="w-section px-section flex gap-8 max-lg:flex-col">
          <div className="panel px-panel py-panel flex-1 space-y-8">
            <Accordion
              type="single"
              className="w-full"
              value={paymentType}
              onValueChange={(type) => setPaymentType(type as PaymentType)}
            >
              {payments.map((payment) => {
                return (
                  <AccordionItem key={payment.value} value={payment.value}>
                    <AccordionTrigger
                      className="group text-xl font-semibold hover:no-underline"
                      withIcon={false}
                    >
                      <div className="flex items-center justify-start gap-4">
                        <div
                          className={cn(
                            "ring-blue-logo size-6 rounded-full border-4 border-white opacity-60 ring-1 transition-colors group-hover:bg-black",
                            {
                              "bg-black opacity-100 group-hover:bg-black":
                                paymentType === payment.value,
                            },
                          )}
                        />
                        {payment.icon}
                        {payment.title}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>{payment.content}</AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
            <div className="border-t border-gray-100 pt-8">
              <FormField
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("payment.comment")}</FormLabel>
                    <FormControl>
                      <Textarea className="bg-grey-light" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <CheckoutSummary>
            <Button
              type="submit"
              className="w-full"
              aria-label={t("payment.validate")}
              loading={form.formState.isSubmitting}
              disabled={form.formState.isSubmitting || loadingShippingFees}
            >
              {paymentType === "card" ? t("payment.validate") : t("payment.finish")}
            </Button>
          </CheckoutSummary>
        </section>
      </form>
    </Form>
  )
}
