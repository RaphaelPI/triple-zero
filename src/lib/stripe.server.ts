import "server-only"

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
import { env } from "@/env"
import Stripe from "stripe"

export const stripe = new Stripe(env.SERVER_STRIPE_SECRET_KEY, {
  apiVersion: "2025-03-31.basil" as any,
})
