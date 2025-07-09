"use client"

import { useSessionStorageState } from "@/hooks/useStorageState"
import { useRouter } from "@/i18n/navigation"
import { Product, ProductOption, ProductOptionValue } from "@/payload-types"
import { createContext, useContext, useEffect, useState } from "react"

export interface Cart {
  date: string
  lines: CartLine[]
}

export interface CartLine {
  product: string
  colors: string[]
  options: string[][] // [titre, valeur]
  quantity: number
  price: number
  url: string
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

interface ICartContext {
  cart: Cart
  loading: boolean
  addItem: (args: AddCartItemArgs) => void
  updateLineQuantity: (index: number, quantity: number) => void
}

const CartContext = createContext<ICartContext>({} as ICartContext)
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
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
        options: lineOptions,
        colors: lineColors,
        quantity: 1,
        url: window.location.href,
        price,
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
    <CartContext.Provider value={{ cart, loading, addItem, updateLineQuantity }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
