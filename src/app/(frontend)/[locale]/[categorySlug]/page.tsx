import { Breadcrumbs } from "@/components/breadcrumbs"
import { MainMessage } from "@/components/main-message"
import { ProductCard } from "@/components/product-card"
import { Locale } from "@/i18n/config"
import { Link } from "@/i18n/navigation"
import { getStartingPrice } from "@/lib/technical-values"
import { cn } from "@/lib/utils"
import { Category, Media } from "@/payload-types"
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
  // const t = await getTranslations()

  return (
    <main className="bg-flake bg-flake-tr bg-no-repeat">
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
                    <ProductCard
                      href={`/${category.slug}/${product.slug}`}
                      image={product.images[0].image as Media}
                      title={product.title}
                      description={product.description}
                      price={getStartingPrice([
                        ...(product.options?.map((option) => option.option) ?? []),
                        ...(product.advanced?.map((advanced) => advanced.option) ?? []),
                      ])}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <MainMessage />
    </main>
  )
}
