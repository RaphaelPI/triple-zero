import { Locale } from "@/i18n/config"
import { getOgImage } from "@/lib/seo"
import { Metadata } from "next"

import { Breadcrumbs } from "@/components/breadcrumbs"
import { ProductJsonLd } from "@/components/structured-data/product"
import { Category, Color, Product, SizeGuide } from "@/payload-types"
import { notFound } from "next/navigation"
import { cache } from "react"
import { getMetadata } from "../../metadata"

import { PromotionDiscount } from "@/components/discount"
import { ProductAddToCart } from "../../c/[categorySlug]/[productSlug]/_components/product-add-to-cart"
import { ProductColors } from "../../c/[categorySlug]/[productSlug]/_components/product-colors"
import { ProductImages } from "../../c/[categorySlug]/[productSlug]/_components/product-images"
import { ProductInformations } from "../../c/[categorySlug]/[productSlug]/_components/product-informations"
import { ProductOptions } from "../../c/[categorySlug]/[productSlug]/_components/product-options"
import { ProductPrice } from "../../c/[categorySlug]/[productSlug]/_components/product-price"
import { ProductProvider } from "../../c/[categorySlug]/[productSlug]/_components/product-provider"
import { ProductTechnicalValues } from "../../c/[categorySlug]/[productSlug]/_components/product-technical-values"
import { getPromotionData } from "./data"

export const dynamic = "force-static"

interface Props {
  params: Promise<{
    locale: Locale
    promotionSlug: string
  }>
}

const getData = cache(async ({ params }: Props) => {
  const { locale, promotionSlug } = await params
  const promotionData = await getPromotionData(promotionSlug, locale)

  if (!promotionData.docs[0]) {
    notFound()
  }

  const product = promotionData.docs[0].reference.value as Product
  const pCat = product.category as Category

  return { product: product, category: pCat, promotion: promotionData.docs[0] }
})

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { locale } = await props.params
  const { product, category } = await getData(props)

  return getMetadata({
    locale,
    pathname: `/c/${category.slug}/${product.slug}`,
    title: product.title,
    description: product.description,
    images: product.images?.map(({ image }) => getOgImage(image)),
  })
}

export default async (props: Props) => {
  const { locale } = await props.params
  const { product, category, promotion } = await getData(props)

  return (
    <main className="bg-flake bg-flake-bl pb-section space-y-8 bg-no-repeat">
      <ProductJsonLd product={product} locale={locale} />
      <div className="w-section px-section pt-section">
        <Breadcrumbs
          items={[
            { label: category.title, href: `/c/${category.slug}` },
            { label: product.title, href: `/c/${category.slug}/${product.slug}` },
          ]}
        />
        <h1 className="mb-4">{promotion.title}</h1>
      </div>
      <div className="w-section grid gap-8 lg:grid-cols-2">
        <section className="px-section order-1 lg:pr-0">
          {promotion.description && <div>{promotion.description}</div>}
          <div>{product.description}</div>
        </section>
        <ProductProvider product={product} promotion={promotion}>
          <div className="px-section sticky top-0 order-3 lg:order-2 lg:row-span-3 lg:pl-0">
            <div className="panel">
              <ProductOptions
                options={product.options?.map(({ option }) => option)}
                advanced={product.advanced?.map(({ option }) => option)}
                sizeGuide={product.sizeGuide as SizeGuide}
                readOnly
              >
                {product.colors && (
                  <div className="w-full items-center gap-1 space-y-2 py-3 md:gap-2 xl:flex">
                    <label className="block self-baseline leading-4 lg:w-32">Couleur</label>
                    <div className="flex flex-1 flex-wrap gap-2">
                      <ProductColors
                        colors={[
                          {
                            color: promotion.color as Color,
                          },
                        ]}
                        name="color"
                        readOnly
                      />
                    </div>
                  </div>
                )}
              </ProductOptions>
              <div className="px-panel py-panel space-y-4">
                <ProductPrice />
                <ProductAddToCart />
              </div>
            </div>
          </div>
          <div className="lg:pl-section relative order-2 lg:sticky lg:top-24 lg:order-3">
            <PromotionDiscount>{promotion.value}%</PromotionDiscount>
            <ProductImages />
          </div>
          <ProductTechnicalValues />
        </ProductProvider>
      </div>
      {product.blocInfos && product.blocInfos.length > 0 && (
        <section className="section space-y-4 lg:space-y-8">
          <ProductInformations blocs={product.blocInfos} />
        </section>
      )}
    </main>
  )
}
