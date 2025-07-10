"use client"

import { useSessionStorageState } from "@/hooks/useStorageState"
import { useRouter } from "@/i18n/navigation"
import { Category, Media, Product, ProductOption, ProductOptionValue } from "@/payload-types"
import { createContext, useContext, useEffect, useState } from "react"

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

const DEFAULT_CART: Cart = {
  date: new Date().toISOString(),
  lines: [],
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
  addItem: (args: AddCartItemArgs) => void
  updateLineQuantity: (index: number, quantity: number) => void
}

const CheckoutContext = createContext<ICheckoutContext>({} as ICheckoutContext)
export const CheckoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useSessionStorageState<Cart>("cart", DEFAULT_CART)
  const router = useRouter()

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

  return (
    <CheckoutContext.Provider value={{ cart, loading, addItem, updateLineQuantity }}>
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
