"use server"

import { env } from "@/env"
import { rawProcedure } from "@/lib/safe-action"
import { slugify } from "@/lib/slugify"
import { stripe } from "@/lib/stripe.server"
import { formatAmountForStripe } from "@/lib/text"
import { Cart, formSchema } from "@/providers/checkout/checkout"
import Stripe from "stripe"
import z from "zod"

export const createCheckoutSession = rawProcedure
  .createServerAction()
  .input(
    z.object({
      cart: z.object({
        date: z.string(),
        lines: z.array(
          z.object({
            product: z.string(),
            promotion: z.string().optional(),
            title: z.string(),
            image: z.string(),
            colors: z.array(z.array(z.string())),
            options: z.array(z.array(z.string())),
            quantity: z.number(),
            price: z.number(),
            url: z.string(),
            categorySlug: z.string(),
            category: z.string(),
            discount: z.number().optional(),
          }),
        ),
      }),
      deliveryData: z.object({
        firstName: z.string(),
        lastName: z.string(),
        company: z.string().optional(),
        address: z.string(),
        address2: z.string().optional(),
        zip: z.string(),
        city: z.string(),
        country: z.string(),
        email: z.email(),
        phone: z.string(),
        d_firstName: z.string().optional(),
        d_lastName: z.string().optional(),
        d_address: z.string().optional(),
        d_address2: z.string().optional(),
        d_zip: z.string().optional(),
        d_city: z.string().optional(),
        d_country: z.string().optional(),
      }),
      locale: z.string(),
      deliveryFee: z.number().optional(),
      currentDiscount: z.array(z.number()).optional(),
    }),
  )
  .handler(async ({ input }) => {
    const cart = input.cart as Cart
    const deliveryData = input.deliveryData as z.infer<typeof formSchema>

    const [customerId, couponId] = await Promise.all([
      getCustomerId(deliveryData, input.locale),
      getCouponId(input.currentDiscount),
    ])

    const metadata: Record<string, string> = {}
    if (input.currentDiscount && couponId) {
      metadata["Réduction globale"] =
        `${input.currentDiscount[1]}% (+ de ${input.currentDiscount[0]}€)`
    }

    const params: Stripe.Checkout.SessionCreateParams = {
      metadata,
      payment_method_types: ["card"],
      discounts: couponId ? [{ coupon: couponId }] : [],
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: "Livraison standard",
            fixed_amount: {
              amount: formatAmountForStripe(0, "EUR"),
              // amount: formatAmountForStripe(input.deliveryFee ?? 0, "EUR"),
              currency: "EUR",
            },
            tax_behavior: "exclusive",
            type: "fixed_amount",
          },
        },
      ],
      line_items: cart.lines.map((line) => {
        const detail = [
          ...line.colors.map(([name, color]) => ["Couleur", `${name} (${color})`]),
          ...line.options,
        ]

        const metadata = detail.reduce(
          (acc, [name, value]) => ({ ...acc, [slugify(name).substring(0, 40)]: value }),
          {} as Record<string, string>,
        )

        const amount = line.discount ? line.price * (1 - line.discount / 100) : line.price
        return {
          quantity: line.quantity,
          price_data: {
            currency: "EUR",
            product_data: {
              name: line.title,
              description: detail.map(([name, value]) => `${name}: ${value}`).join(", "),
              images: [new URL(line.image, env.NEXT_PUBLIC_URL).toString()],
              metadata,
            },
            unit_amount: formatAmountForStripe(1, "EUR", deliveryData.country),
          },
        }
      }),
      customer: customerId,
      mode: "payment",
      ui_mode: "custom",
      // return_url: `${env.NEXT_PUBLIC_URL}/paiement`,
      // return_url: `${env.NEXT_PUBLIC_URL}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
    }

    const checkoutSession = await stripe.checkout.sessions.create(params)

    return {
      clientSecret: checkoutSession.client_secret,
    }
  })

const getCustomerId = async (deliveryData: z.infer<typeof formSchema>, locale: string) => {
  const customer = await stripe.customers.list({
    email: deliveryData.email,
  })

  const customerData = {
    name: `${deliveryData.firstName} ${deliveryData.lastName}`,
    description: deliveryData.company,
    preferred_locales: [locale],
    email: deliveryData.email,
    address: {
      city: deliveryData.city,
      country: deliveryData.country,
      line1: deliveryData.address,
      line2: deliveryData.address2,
      postal_code: deliveryData.zip,
    },
    phone: deliveryData.phone,
    shipping: {
      name: `${deliveryData.d_firstName ?? deliveryData.firstName} ${deliveryData.d_lastName ?? deliveryData.lastName}`,
      address: {
        city: deliveryData.d_city ?? deliveryData.city,
        country: deliveryData.d_country ?? deliveryData.country,
        line1: deliveryData.d_address ?? deliveryData.address,
        line2: deliveryData.d_address2 ?? deliveryData.address2,
        postal_code: deliveryData.d_zip ?? deliveryData.zip,
      },
    },
  }

  let customerId: string | undefined
  if (customer.data.length > 0) {
    customerId = customer.data[0].id
    await stripe.customers.update(customerId, customerData)
  } else {
    const customer = await stripe.customers.create(customerData)
    customerId = customer.id
  }

  return customerId
}

const getCouponId = async (currentDiscount: number[]) => {
  if (!currentDiscount) {
    return undefined
  }

  const coupons = await stripe.coupons.list()
  const coupon = coupons.data.find((coupon) => coupon.percent_off === currentDiscount[1])

  return coupon?.id
}
