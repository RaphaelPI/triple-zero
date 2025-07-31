"use client"

import { useCookieState } from "@/hooks/use-cookie-state"
import { useServerActionQuery } from "@/hooks/use-server-action-query"
import { Link } from "@/i18n/navigation"
import { isTTCCountry } from "@/lib/price"
import { formatAmountForStripe } from "@/lib/text"
import { uuid } from "@/lib/uuid"
import { Color, ColorWithImage, ProductOption, ProductOptionValue } from "@/payload-types"
import { getDelay, getShippingFees, saveOrder } from "@/providers/checkout/actions"
import { useTranslations } from "next-intl"
import { createContext, useContext, useEffect, useState } from "react"
import { toast } from "sonner"
import z from "zod"
import { useServerAction } from "zsa-react"

export const DISCOUNTS = [
  [2000, 5],
  [3000, 10],
  [4000, 15],
]

export interface Cart {
  date: string
  lines: CartLine[]
}

export interface CartLine {
  product: string
  promotion?: string
  title: string
  image: string
  colors: string[][] // [titre, valeur]
  options: string[][] // [titre, valeur]
  quantity: number
  price: number
  url: string
  categorySlug: string
  category: string
  discount?: number
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
  product: string
  title: string
  image: string
  color?: ColorWithImage
  options: [ProductOption, ProductOptionValue][]
  price: number
  promotion?: string
  discount?: number
  categorySlug?: string
  categoryTitle?: string
}

interface ICheckoutContext {
  cart: Cart
  loading: boolean
  loadingShippingFees: boolean
  addItem: (args: AddCartItemArgs) => void
  updateLineQuantity: (index: number, quantity: number) => void
  total: number
  deliveryFee: number | undefined
  deliveryData: z.infer<typeof formSchema>
  setDeliveryData: (data: z.infer<typeof formSchema>) => void
  setShippingFeesCountry: (country: string) => void
  shippingFeesCountry: string
  deliveryDone: boolean
  nextDiscount: number[] | undefined
  currentDiscount: number[] | undefined
  totalToPay: number
  isPendingDelay: boolean
  delayDate?: string
  storeOrder: (paymentType: string, comment?: string) => Promise<void>
}

const CheckoutContext = createContext<ICheckoutContext>({} as ICheckoutContext)
export const CheckoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true)
  const [shippingFeesCountry, setShippingFeesCountry] = useState("")
  const [cart, setCart] = useCookieState<Cart>(
    "cart",
    DEFAULT_CART,
    new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day
  )
  const [deliveryData, setDeliveryData] = useCookieState<z.infer<typeof formSchema>>(
    "deliveryData",
    DEFAULT_DELIVERY_DATA,
  )
  const [deliveryDone, setDeliveryDone] = useState(false)
  const t = useTranslations()

  const { isPending: isPendingDelay, data: delayDate } = useServerActionQuery(getDelay)
  const { execute: executeSaveOrder } = useServerAction(saveOrder)

  // Get cart total
  const total = cart.lines.reduce((t, line) => {
    const unitPrice = line.discount ? line.price * (1 - line.discount / 100) : line.price
    return t + (formatAmountForStripe(unitPrice, "EUR", shippingFeesCountry) / 100) * line.quantity
  }, 0)

  const { data, isPending } = useServerActionQuery(getShippingFees, {
    country: shippingFeesCountry,
    total,
  })

  const deliveryFee = data
  const nextDiscount = DISCOUNTS.find(([amount]) => total < amount)
  const currentDiscount = [...DISCOUNTS].reverse().find(([amount]) => total >= amount)
  const totalWithDiscount =
    formatAmountForStripe(total * (1 - (currentDiscount?.[1] ?? 0) / 100), "EUR") / 100
  const totalToPay = totalWithDiscount + (deliveryFee ?? 0)

  useEffect(() => {
    setLoading(false)
  }, [])

  useEffect(() => {
    if (deliveryData.country) {
      setShippingFeesCountry(deliveryData.country)
    }
  }, [deliveryData])

  const addItem = ({
    product,
    title,
    image,
    color,
    options,
    price,
    promotion,
    discount,
    categorySlug,
    categoryTitle,
  }: AddCartItemArgs) => {
    const newCart = { ...cart }
    const lineOptions = options.map(([option, value]) => [option.title, value.title])
    const lineColors = color ? [[(color.color as Color).name, (color.color as Color).color]] : []

    // Do we already have the same product ?
    const existingLine = cart?.lines.findIndex(
      (line) =>
        (line.promotion === promotion || line.product === product) &&
        JSON.stringify([line.colors, line.options]) === JSON.stringify([lineColors, lineOptions]),
    )

    // We can't add the same promotion twice
    if (existingLine !== -1 && promotion) {
      toast.error(t("error.samePromotion"))
      return
    }

    if (existingLine !== -1) {
      newCart.lines[existingLine].quantity++
    } else {
      newCart.lines.push({
        product,
        promotion,
        image,
        title,
        options: lineOptions,
        colors: lineColors,
        quantity: 1,
        url: window.location.href,
        price,
        discount,
        categorySlug: categorySlug ?? "",
        category: categoryTitle ?? "",
      })
    }

    setCart(newCart)
    toast.success(
      <div>
        <div>{t("cart.added", { product: title })}</div>
        <Link href={"/panier"}>
          {t.rich("cart.see", {
            strong: (chunks) => <span className="link font-bold">{chunks}</span>,
          })}
        </Link>
      </div>,
    )
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

  const storeOrder = async (paymentType: string, comment?: string) => {
    const data = {
      amount: totalToPay,
      date: new Date().toISOString(),
      delay: delayDate ?? "",
      status: "pending" as "pending" | "paid" | "shipped",
      shippingFee: deliveryFee ?? 0,
      customer: `${deliveryData.firstName} ${deliveryData.lastName}`,
      email: deliveryData.email,
      detail: {
        total,
        totalWithDiscount,
        ttc: isTTCCountry(deliveryData.d_country || deliveryData.country),
        discount: currentDiscount?.[1],
        lines: cart.lines.map((line) => {
          const unitPrice = line.discount ? line.price * (1 - line.discount / 100) : line.price
          return {
            ...line,
            unitPrice: formatAmountForStripe(unitPrice, "EUR", shippingFeesCountry) / 100,
          }
        }),
        deliveryData,
      },
      comment,
      payment: paymentType as "phone" | "transfer" | "card",
      uid: uuid().toUpperCase(),
      workTime: 99,
    }

    const [id] = await executeSaveOrder(data)

    localStorage.setItem("current-order", JSON.stringify(data))
    localStorage.setItem("current-order-id", id)
  }

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
        setDeliveryData: (data: z.infer<typeof formSchema>) => {
          setDeliveryDone(true)
          setDeliveryData(data)
        },
        setShippingFeesCountry,
        shippingFeesCountry,
        loadingShippingFees: isPending,
        deliveryDone,
        nextDiscount,
        currentDiscount,
        totalToPay,
        isPendingDelay,
        delayDate,
        storeOrder,
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
