"use client"

import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { getStripe } from "@/lib/stripe.cient"
import { cn } from "@/lib/utils"
import { useCheckout } from "@/providers/checkout/checkout"
import { CheckoutProvider } from "@stripe/react-stripe-js"
import { StripeCheckoutOptions } from "@stripe/stripe-js"
import { Loader2 } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { useState } from "react"
import { useServerAction } from "zsa-react"
import { CheckoutSkeleton } from "../../_components/checkout-skeleton"
import { createCheckoutSession } from "../actions"

const stripe = getStripe()

interface Props {
  children: React.ReactNode
}

export const StripeProvider = ({ children }: Props) => {
  const [pending, setPending] = useState(true)
  const { cart, deliveryData, deliveryFee, loading, loadingShippingFees, currentDiscount } =
    useCheckout()
  const locale = useLocale()
  const t = useTranslations()
  const { execute } = useServerAction(createCheckoutSession)

  if (loading || loadingShippingFees) {
    return (
      <div className="section">
        <Loader2 className="mx-auto size-12 animate-spin" />
      </div>
    )
  }

  const fetchClientSecret = async () => {
    setPending(true)

    const [stripeResponse] = await execute({
      cart,
      deliveryData,
      locale,
      deliveryFee,
      currentDiscount,
    })
    setTimeout(() => {
      setPending(false)
    }, 500)
    return stripeResponse.clientSecret
  }

  if (cart.lines.length === 0) {
    return (
      <section className="w-section px-section">
        <div className="panel px-panel py-panel">{t("cart.empty")}...</div>
      </section>
    )
  }

  if (!deliveryData.country) {
    return (
      <section className="w-section px-section">
        <div className="panel px-panel py-panel space-y-2">
          <div>{t("payment.error.deliveryRequired")}</div>
          <Link href="/coordonnees">
            <Button>{t("checkout.step2")}</Button>
          </Link>
        </div>
      </section>
    )
  }

  const options: StripeCheckoutOptions = { fetchClientSecret }
  return (
    <>
      {pending && <CheckoutSkeleton />}
      <div
        className={cn("hidden", {
          block: !pending,
        })}
      >
        <CheckoutProvider stripe={stripe} options={options}>
          {children}
        </CheckoutProvider>
      </div>
    </>
  )
}
