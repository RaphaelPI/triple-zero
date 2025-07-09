"use client"

import { Product, SizeGuide } from "@/payload-types"
import { ProductImages } from "./product-images"
import { ProductOptions } from "./product-options"
import { ProductProvider } from "./product-provider"

interface Props {
  product: Product
}

export const ProductDynamicContent = ({ product }: Props) => {
  return (
    <ProductProvider product={product}>
      <div className="px-section sticky top-0 order-3 lg:order-2 lg:row-span-3 lg:pl-0">
        <div className="panel">
          <ProductOptions
            options={product.options?.map(({ option }) => option)}
            advanced={product.advanced?.map(({ option }) => option)}
            sizeGuide={product.sizeGuide as SizeGuide}
          />
        </div>
      </div>
      <div className="lg:pl-section order-2 lg:order-3">
        <ProductImages />
      </div>
    </ProductProvider>
  )
}
