import { Amount } from "@/components/amount"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Image } from "@/components/image"
import { Button } from "@/components/ui/button"
import { Locale, LOCALES } from "@/i18n/config"
import { Link } from "@/i18n/navigation"
import { getStartingPrice } from "@/lib/technical-values"
import { cn } from "@/lib/utils"
import { Category, Media, Product } from "@/payload-types"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { cache } from "react"
import { getNavData } from "../data"
import { getMetadata } from "../metadata"
import { getAllCategoriesData, getCategoryData, getProductsData } from "./data"

export const dynamic = "force-static"

interface Props {
  params: Promise<{
    locale: Locale
    categorySlug: string
  }>
}

const getData = cache(async ({ params }: Props) => {
  const { locale, categorySlug } = await params

  // Enable static rendering
  setRequestLocale(locale)

  const [categoryData, productsData, nav] = await Promise.all([
    getCategoryData(categorySlug),
    getProductsData(categorySlug),
    getNavData(),
  ])

  if (!categoryData.docs[0]) {
    notFound()
  }

  return { category: categoryData.docs[0], products: productsData.docs, nav }
})

export const generateMetadata = async (props: Props) => {
  const { categorySlug } = await props.params
  const { category } = await getData(props)

  return getMetadata({
    title: category.title,
    description: category.description,
    pathname: `/${categorySlug}`,
  })
}

export default async (props: Props) => {
  const { categorySlug } = await props.params
  const { category, products, nav } = await getData(props)
  const t = await getTranslations()

  // Sort products by category order
  products.sort((a, b) => {
    const aOrder = category.order?.findIndex((order) => (order as Product).id === a.id)
    const bOrder = category.order?.findIndex((order) => (order as Product).id === b.id)
    return (aOrder ?? 0) - (bOrder ?? 0)
  })

  return (
    <main className="bg-flake bg-flake-bl md:bg-flake-tr bg-no-repeat">
      <div className="section flex xl:gap-x-20">
        <div className="relative hidden xl:block">
          <div className="sticky top-24 w-56">
            {nav.items.map(({ title, category }) => {
              return (
                <div key={title} className="panel mb-8">
                  <div className="bg-dark rounded-t-2xl px-6 py-3 text-lg font-bold text-white italic">
                    {title}
                  </div>
                  <ol className="px-2 py-4">
                    {category.map((cat) => {
                      const { slug, title } = cat as Category
                      return (
                        <li key={slug}>
                          <Link
                            prefetch={false}
                            href={`/${slug}`}
                            className={cn("link inline-block rounded-lg px-3 py-1", {
                              "bg-green": categorySlug === slug,
                            })}
                          >
                            {title}
                          </Link>
                        </li>
                      )
                    })}
                  </ol>
                </div>
              )
            })}
          </div>
        </div>
        <div className="w-full max-md:space-y-4">
          <Breadcrumbs
            items={[
              {
                label: category.title,
                href: `/${category.slug}`,
              },
            ]}
          />
          <div className="space-y-4">
            <h1>{category.title}</h1>
            <div className="space-y-8">
              <p>{category.description}</p>
              <ul className="space-y-8">
                {products.map((product, index) => {
                  const image = product.images[0].image as Media

                  const price = getStartingPrice([
                    ...(product.options?.map((option) => option.option) ?? []),
                    ...(product.advanced?.map((advanced) => advanced.option) ?? []),
                  ])

                  return (
                    <li key={product.id}>
                      <Link
                        prefetch={false}
                        href={`/${category.slug}/${product.slug}`}
                        className="panel ring-blue relative flex flex-wrap gap-8 hover:ring-8 md:h-64"
                      >
                        <div
                          className={cn(
                            "flex w-full items-center justify-center md:h-full md:w-5/12",
                          )}
                        >
                          {image && (
                            <Image
                              priority={index < 3}
                              media={image}
                              alt={product.title}
                              width={500}
                              className={cn("mx-auto h-auto max-h-full w-auto max-w-full")}
                            />
                          )}
                        </div>
                        <div className="w-full flex-1 space-y-4 px-8 pb-8 md:pt-8">
                          <h2 className="text-xl font-bold">{product.title}</h2>
                          <div className="line-clamp-3 md:line-clamp-2">{product.description}</div>
                          {price > 0 && (
                            <div className="text-lg font-semibold">
                              {t("priceFrom")}
                              <Amount amount={price} />
                            </div>
                          )}
                          <Button aria-label={t("product.see")}>{t("product.see")}</Button>
                        </div>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export const generateStaticParams = async () => {
  const actions = LOCALES.map(async (locale) => {
    const categories = await getAllCategoriesData(locale)
    return categories.docs.map((category) => ({
      categorySlug: category.slug,
      locale,
    }))
  })

  const params = await Promise.all(actions)
  return params.flat()
}
