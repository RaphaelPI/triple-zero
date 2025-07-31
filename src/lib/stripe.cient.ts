import { env } from "@/env"
import { Stripe, loadStripe } from "@stripe/stripe-js"

let stripePromise: Promise<Stripe | null>
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)
  }
  return stripePromise
}
