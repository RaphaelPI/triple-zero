import { Amount } from "@/components/amount"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Image } from "@/components/image"
import { Button } from "@/components/ui/button"
import { Locale } from "@/i18n/config"
import { Link } from "@/i18n/navigation"
import { getStartingPrice } from "@/lib/technical-values"
import { cn } from "@/lib/utils"
import { Category, Media } from "@/payload-types"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { cache } from "react"
import { getNavData } from "../data"
import { getMetadata } from "../metadata"
import { getCategoryData, getProductsData } from "./data"

export const dynamic = "force-static"

interface Props {
  params: Promise<{
    locale: Locale
    categorySlug: string
  }>
}

const getData = cache(async ({ params }: Props) => {
  const { locale, categorySlug } = await params
  const [categoryData, productsData, nav] = await Promise.all([
    getCategoryData(categorySlug, locale),
    getProductsData(categorySlug, locale),
    getNavData(locale),
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

  return (
    <main className={`bg-flake bg-flake-tr bg-no-repeat`}>
      <div className="section flex xl:gap-x-20">
        <div className="relative hidden xl:block">
          <div className="sticky top-32 w-56">
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
        <div className="w-full">
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
                {products.map((product) => (
                  <li key={product.id}>
                    <Link
                      prefetch={false}
                      href={`/${category.slug}/${product.slug}`}
                      className="panel flex flex-wrap gap-8 md:h-64"
                    >
                      <div className="w-full md:h-full md:w-5/12">
                        {product.images && (
                          <Image
                            media={product.images[0].image as Media}
                            alt={product.title}
                            className="mx-auto h-60 w-auto rounded-2xl object-cover object-right md:h-full md:rounded-r-none"
                          />
                        )}
                      </div>
                      <div className="w-full flex-1 space-y-4 px-8 pb-8 md:pt-8">
                        <h2 className="text-xl font-bold">{product.title}</h2>
                        <p className="line-clamp-2">{product.description}</p>
                        <div className="text-lg font-semibold">
                          {t("priceFrom")}
                          <Amount
                            amount={getStartingPrice(product.options, product.advanced)}
                            taxIncluded
                          />
                        </div>
                        <Button aria-label={t("product.see")}>{t("product.see")}</Button>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
