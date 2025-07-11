import { Locale } from "@/i18n/config"
import { getOgImage } from "@/lib/seo"
import { Metadata } from "next"

import { Breadcrumbs } from "@/components/breadcrumbs"
import { Category } from "@/payload-types"
import { notFound } from "next/navigation"
import { cache } from "react"
import { getMetadata } from "../../metadata"
import { ProductDynamicContent } from "./_components/product-dynamic-content"
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
  const [productData] = await Promise.all([
    getProductData(productSlug, locale),
    // getCategoryData(categorySlug, locale),
  ])

  if (!productData.docs[0]) {
    notFound()
  }

  console.log(productData.docs[0].category)
  // console.log(categoryData.docs[0])

  const pCat = productData.docs[0].category as Category
  if (pCat.slug !== categorySlug) {
    notFound()
  }

  return { product: productData.docs[0], category: pCat }
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
  const { product, category } = await getData(props)

  return (
    <main className="bg-flake bg-flake-bl pb-section bg-no-repeat">
      <div className="w-section px-section py-section">
        <Breadcrumbs
          items={[
            { label: category.title, href: `/${category.slug}` },
            { label: product.title, href: `/${category.slug}/${product.slug}` },
          ]}
        />
        <h1 className="mb-4">{product.title}</h1>
      </div>
      <div className="w-section grid gap-8 lg:grid-cols-2">
        <section className="px-section order-1 lg:pr-0">
          <p>{product.description}</p>
        </section>
        <ProductDynamicContent product={product} />
        {/* <div className="lg:mb-panel lg:w-5/12 xl:w-6/12">
          <section className="px-section pt-section lg:pr-0">
            <h2 className="mb-1">
              <Link href={`/${category.slug}`} className="link flex items-center">
                <Mountain className="mr-1 h-4 w-4" /> {translate(lang, product.category?.title)}
              </Link>
            </h2>
            <h1 className="mb-4">{product.title}</h1>
            <p>{translate(lang, product.desc)}</p>
          </section>
          <ProductImagesDynamic noImgText={dictionary.noImg} />
        </div>
        <section className="pt-section pl-section pr-section lg:w-7/12 lg:pl-0 xl:w-6/12">
          <ProductOptionsDynamic
            options={product.options}
            advanced={product.advanced}
            lang={lang}
            dictionary={dictionary}
            sizeGuide={product.sizeGuide}
          >
            <div className="option">
              <label className="option-label">{dictionary.color}</label>
              <ColorPickerDynamic colors={product.colors} name="color" />
            </div>
          </ProductOptionsDynamic>
        </section>
        <ProductTechnicalValuesDynamic dictionary={dictionary} /> */}
      </div>
    </main>
  )
}
