"use client"

import { Product, SizeGuide } from "@/payload-types"
import { ProductColors } from "./product-colors"
import { ProductImages } from "./product-images"
import { ProductOptions } from "./product-options"
import { ProductProvider } from "./product-provider"
import { ProductTechnicalValues } from "./product-technical-values"

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
          >
            {product.colors && (
              <div className="w-full items-center gap-1 space-y-2 py-3 md:gap-2 xl:flex">
                <label className="block self-baseline leading-4 lg:w-32">Couleur</label>
                <div className="flex flex-1 flex-wrap gap-2">
                  <ProductColors colors={product.colors.map(({ color }) => color)} name="color" />
                </div>
              </div>
            )}
          </ProductOptions>
        </div>
      </div>
      <div className="lg:pl-section order-2 lg:sticky lg:top-24 lg:order-3">
        <ProductImages />
      </div>
      <ProductTechnicalValues />
    </ProductProvider>
  )
}
