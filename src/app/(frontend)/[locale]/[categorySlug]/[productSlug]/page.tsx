import { Locale } from "@/i18n/config"
import { getOgImage } from "@/lib/seo"
import { Metadata } from "next"

import { Breadcrumbs } from "@/components/breadcrumbs"
import { ProductJsonLd } from "@/components/structured-data/product"
import { Category, Product, SizeGuide } from "@/payload-types"
import { setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { cache } from "react"
import { getMetadata } from "../../metadata"
import { getProductsData } from "../data"
import { ProductAddToCart } from "./_components/product-add-to-cart"
import { ProductColors } from "./_components/product-colors"
import { ProductImages } from "./_components/product-images"
import { ProductInformations } from "./_components/product-informations"
import { ProductOptions } from "./_components/product-options"
import { ProductPrice } from "./_components/product-price"
import { ProductProvider } from "./_components/product-provider"
import { ProductTechnicalValues } from "./_components/product-technical-values"
import { ProductsRelated } from "./_components/products-related"
import { getProductData } from "./data"

export const dynamic = "force-static"

interface Props {
  params: Promise<{
    locale: Locale
    categorySlug: string
    productSlug: string
  }>
}

const getData = cache(async ({ params }: Props) => {
  const { locale, categorySlug, productSlug } = await params
  const [productData, productsData] = await Promise.all([
    getProductData(productSlug),
    getProductsData(categorySlug, productSlug),
  ])

  // Enable static rendering
  setRequestLocale(locale)

  if (!productData.docs[0]) {
    notFound()
  }

  const pCat = productData.docs[0].category as Category
  if (pCat.slug !== categorySlug) {
    notFound()
  }

  return { product: productData.docs[0], category: pCat, related: productsData.docs as Product[] }
})

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { locale } = await props.params
  const { product, category } = await getData(props)

  return getMetadata({
    locale,
    pathname: `/${category.slug}/${product.slug}`,
    title: product.title,
    description: product.description,
    images: product.images?.map(({ image }) => getOgImage(image)),
  })
}

export default async (props: Props) => {
  const { locale } = await props.params
  const { product, category, related } = await getData(props)

  return (
    <main className="bg-flake bg-flake-bl pb-section space-y-8 bg-no-repeat">
      <ProductJsonLd product={product} locale={locale} />
      <div className="w-section px-section pt-section">
        <Breadcrumbs
          items={[
            { label: category.title, href: `/${category.slug}` },
            { label: product.title, href: `/${category.slug}/${product.slug}` },
          ]}
        />
        <h1 className="mb-4">{product.title}</h1>
      </div>
      <div className="w-section grid gap-8 lg:grid-cols-12">
        <section className="px-section order-1 lg:col-span-7 lg:pr-0">
          {product.description}
        </section>
        <ProductProvider product={product}>
          <div className="px-section sticky top-0 order-3 lg:order-2 lg:col-span-5 lg:row-span-3 lg:pl-0">
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
                      <ProductColors
                        colors={product.colors.map(({ color }) => color)}
                        name="color"
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
          <div className="lg:pl-section relative order-2 lg:sticky lg:top-24 lg:order-3 lg:col-span-7">
            <ProductImages />
          </div>
          {product.technical && <ProductTechnicalValues />}
        </ProductProvider>
      </div>
      <section className="section space-y-4 lg:space-y-8">
        {product.blocInfos?.map((bloc) => (
          <ProductInformations key={bloc.id} bloc={bloc} />
        ))}
      </section>
      {related.length > 0 && (
        <section className="section space-y-4 lg:space-y-8">
          <ProductsRelated products={related} categorySlug={category.slug} />
        </section>
      )}
    </main>
  )
}
