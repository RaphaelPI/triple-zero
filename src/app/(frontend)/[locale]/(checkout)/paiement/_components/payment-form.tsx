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
import { env } from "@/env"
import { useRouter } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import { useCheckout } from "@/providers/checkout/checkout"
import { useCheckout as useStripeCheckout } from "@stripe/react-stripe-js"
import { BanknoteArrowUpIcon, CreditCardIcon, MailIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { en, fr } from "zod/v4/locales"
import { CheckoutSummary } from "../../_components/checkout-summary"
import { BankTransfer } from "./bank-transfer"
import { Check } from "./check"
import { CreditCard } from "./credit-card"

type PaymentType = "card" | "check" | "transfer"

export const PaymentForm = () => {
  const [paymentType, setPaymentType] = useState<PaymentType>("card")
  const { cart, loadingShippingFees, storeOrder, deliveryData } = useCheckout()
  const t = useTranslations()
  const { push } = useRouter()

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
    const orderId = await storeOrder(paymentType, values.comment)
    const returnUrl = `${env.NEXT_PUBLIC_URL}/confirmation`

    if (paymentType === "card") {
      const result = await checkout.confirm({
        returnUrl: `${returnUrl}?payment=1`,
      })

      if (result.type === "error") {
        // show errormessage
        form.setError("root", { message: result.error.message })
        toast.error(result.error.message)
        return
      }
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      return
    }

    push(`${returnUrl}?orderId=${orderId}`)
  }

  const payments = [
    {
      title: t("payment.card.title"),
      icon: <CreditCardIcon className="size-6 flex-shrink-0" />,
      value: "card",
      content: <CreditCard />,
    },
    {
      title: t("payment.transfer.title"),
      icon: <BanknoteArrowUpIcon className="size-6 flex-shrink-0" />,
      value: "transfer",
      content: <BankTransfer />,
    },
    {
      title: t("payment.check.title"),
      icon: <MailIcon className="size-6 flex-shrink-0" />,
      value: "check",
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
                      className="group max-md:text-md text-xl font-semibold hover:no-underline"
                      withIcon={false}
                    >
                      <div className="flex items-center justify-start gap-4">
                        <div
                          className={cn(
                            "ring-blue-logo size-6 flex-shrink-0 rounded-full border-4 border-white opacity-60 ring-1 transition-colors group-hover:bg-black",
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
            {form.formState.errors.root && (
              <div className="text-destructive">{form.formState.errors.root.message}</div>
            )}
            <Button
              type="submit"
              className="w-full"
              aria-label={t("payment.validate")}
              loading={form.formState.isSubmitting}
              disabled={form.formState.isSubmitting || loadingShippingFees || !deliveryData.country}
            >
              {paymentType === "card" ? t("payment.validate") : t("payment.finish")}
            </Button>
          </CheckoutSummary>
        </section>
      </form>
    </Form>
  )
}
