"use client"

import { getShippingFees } from "@/app/(frontend)/[locale]/(checkout)/actions"
import { useServerActionQuery } from "@/hooks/useServerActionQuery"
import { useSessionStorageState } from "@/hooks/useStorageState"
import { useRouter } from "@/i18n/navigation"
import { Category, Media, Product, ProductOption, ProductOptionValue } from "@/payload-types"
import { createContext, useContext, useEffect, useState } from "react"
import z from "zod"

export interface Cart {
  date: string
  lines: CartLine[]
}

export interface CartLine {
  product: string
  title: string
  image: string
  colors: string[]
  options: string[][] // [titre, valeur]
  quantity: number
  price: number
  url: string
  categorySlug: string
  category: string
}

const RequiredStringSchema = z.string().trim().min(1, { message: "Champ obligatoire" })
export const formSchema = z.object({
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
  d_firstName: z.string().optional(),
  d_lastName: z.string().optional(),
  d_address: z.string().optional(),
  d_address2: z.string().optional(),
  d_zip: z.string().optional(),
  d_city: z.string().optional(),
  d_country: z.string().optional(),
})

const DEFAULT_CART: Cart = {
  date: new Date().toISOString(),
  lines: [],
}

const DEFAULT_DELIVERY_DATA: z.infer<typeof formSchema> = {
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
}

interface AddCartItemArgs {
  product: Product
  colors: Product["colors"]
  options: [ProductOption, ProductOptionValue][]
  price: number
}

interface ICheckoutContext {
  cart: Cart
  loading: boolean
  loadingShippingFees: boolean
  addItem: (args: AddCartItemArgs) => void
  updateLineQuantity: (index: number, quantity: number) => void
  total: number
  deliveryFee: number
  deliveryData: z.infer<typeof formSchema>
  setDeliveryData: (data: z.infer<typeof formSchema>) => void
  setShippingFeesCountry: (country: string) => void
  shippingFeesCountry: string
}

const CheckoutContext = createContext<ICheckoutContext>({} as ICheckoutContext)
export const CheckoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true)
  const [shippingFeesCountry, setShippingFeesCountry] = useState("")
  const [cart, setCart] = useSessionStorageState<Cart>("cart", DEFAULT_CART)
  const [deliveryData, setDeliveryData] = useSessionStorageState<z.infer<typeof formSchema>>(
    "deliveryData",
    DEFAULT_DELIVERY_DATA,
  )
  const router = useRouter()

  const { data, isPending } = useServerActionQuery(getShippingFees, {
    country: shippingFeesCountry,
  })

  useEffect(() => {
    setLoading(false)
  }, [])

  const addItem = ({ product, colors, options, price }: AddCartItemArgs) => {
    const newCart = { ...cart }
    const lineOptions = options.map(([option, value]) => [option.title, value.title])
    const lineColors = colors?.map((color) => String(color.color)) ?? []

    // Do we already have the same product ?
    const existingLine = cart?.lines.findIndex(
      (line) =>
        line.product === product.id &&
        JSON.stringify([line.colors, line.options]) === JSON.stringify([lineColors, lineOptions]),
    )

    if (existingLine !== -1) {
      newCart.lines[existingLine].quantity++
    } else {
      newCart.lines.push({
        product: product.id,
        image: (product.images?.[0]?.image as Media)?.url ?? "",
        title: product.title,
        options: lineOptions,
        colors: lineColors,
        quantity: 1,
        url: window.location.href,
        price,
        categorySlug: (product.category as Category).slug ?? "",
        category: (product.category as Category).title ?? "",
      })
    }

    setCart(newCart)
    router.push("/panier")
  }

  const updateLineQuantity = (index: number, quantity: number) => {
    const newCart = { ...cart }

    if (quantity === 0) {
      newCart.lines.splice(index, 1)
      setCart(newCart)
      return
    }

    newCart.lines[index].quantity = quantity
    setCart(newCart)
  }

  const total = cart.lines.reduce((total, line) => total + line.price * line.quantity, 0)
  const deliveryFee = data ?? undefined

  return (
    <CheckoutContext.Provider
      value={{
        cart,
        loading,
        addItem,
        updateLineQuantity,
        total,
        deliveryFee,
        deliveryData,
        setDeliveryData,
        setShippingFeesCountry,
        shippingFeesCountry,
        loadingShippingFees: isPending,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  )
}

export const useCheckout = () => {
  const context = useContext(CheckoutContext)
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider")
  }
  return context
}
