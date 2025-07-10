import { Locale } from "@/i18n/config"
import { notFound } from "next/navigation"
import { cache } from "react"
import { getCategoryData } from "./data"

export const revalidate = 60

interface Props {
  params: Promise<{
    locale: Locale
    categorySlug: string
  }>
}

const getData = cache(async ({ params }: Props) => {
  const { locale, categorySlug } = await params
  const [categoryData] = await Promise.all([getCategoryData(categorySlug, locale)])

  if (!categoryData.docs[0]) {
    notFound()
  }

  return { category: categoryData.docs[0] }
})

export default async (props: Props) => {
  const { locale, categorySlug } = await props.params
  const { category } = await getData(props)

  return (
    <main className={`bg-flake bg-flake-tr bg-no-repeat`}>
      <div className="section flex xl:gap-x-20">
        {/* <div className="relative hidden xl:block">
          <div className="sticky top-32 w-56">
            {categoryList.map((list) => {
              return (
                <div key={list._id} className="panel mb-8">
                  <div className="bg-dark rounded-t-2xl px-6 py-3 text-lg font-bold text-white italic">
                    {list.title}
                  </div>
                  <ol className="px-2 py-4">
                    {list?.list?.map((cat) => (
                      <li key={category.slug}>
                        <Link
                          href={`/${category.slug}`}
                          className={`inline-block rounded-[100%] px-6 py-3 ${categorySlug === category.slug "bg-green" : "link"}`}
                        >
                          {category.title}
                        </Link>
                      </li>
                    ))}
                  </ol>
                </div>
              )
            })}
          </div>
        </div> */}
        <div className="w-full">
          <h1 className="mb-4">{category.title}</h1>
          <p>{category.description}</p>
          {/* <ul className="mt-8">
            {products.map((product) => (
              <li key={product._id}>
                <Link
                  href={`/${lang}/${category.slug}/${product.slug?.current}`}
                  className="panel buttonClick flex flex-wrap gap-8 md:h-64"
                >
                  <div className="w-full md:h-full md:w-5/12">
                    {product.images && (
                      <Image
                        image={product.images[0]}
                        alt={product.title}
                        className="mx-auto h-60 w-auto rounded-2xl object-cover object-right md:h-full md:rounded-r-none"
                      />
                    )}
                  </div>
                  <div className="w-full flex-1 px-8 pb-8 md:pt-8">
                    <h2 className="mb-4 text-xl font-bold">{product.title}</h2>
                    <p className="mb-8 line-clamp-3">{product.desc)}</p>
                    <div className="text-lg font-semibold">
                      {dictionary.priceFrom}
                      {formatAmount(750)}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul> */}
        </div>
      </div>
    </main>
  )
}
