"use client"

import { useCheckout } from "@/providers/checkout/checkout"
import { useEffect } from "react"

export const CartCleaner = () => {
  const { clearCart } = useCheckout()

  useEffect(() => {
    clearCart()
  }, [])

  return null
}
