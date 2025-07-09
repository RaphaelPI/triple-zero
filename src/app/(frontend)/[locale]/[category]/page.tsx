import Link from "next/link"
import Image from "src/components/Image"
import Message from "src/components/Message"
import { getCategoryData } from "src/graphql/category"
import { getCategoryListData } from "src/graphql/categoryList"
import { getProductsData } from "src/graphql/products"
import { getDictionary } from "src/helpers/dictionary"
import { formatAmount } from "src/helpers/text"
import { translate } from "src/helpers/translate"
import { i18n, Locale } from "src/i18n-config"

export const revalidate = 60 * 60

// Generate root urls statically
export const generateStaticParams = async () => {
  const categoryList = await getCategoryListData()

  const paths = i18n.locales.map((locale) =>
    categoryList.map((list) =>
      list.list?.map((category) => ({
        category: category?.slug?.current,
        lang: locale,
      })),
    ),
  )

  return paths.flat().flat()
}

interface CategoryPageProps {
  params: {
    lang: Locale
    category: string
  }
}

const CategoryPage = async ({ params: { category, lang } }: CategoryPageProps) => {
  const [categoryList, cat, products, dictionary] = await Promise.all([
    getCategoryListData(),
    getCategoryData(category),
    getProductsData(category),
    getDictionary(lang),
  ])

  return (
    <main className={`bg-flake bg-no-repeat bg-flake-tr`}>
      <div className="section flex xl:gap-x-20">
        <div className="hidden xl:block relative">
          <div className="w-56 sticky top-32">
            {categoryList.map((list) => {
              return (
                <div key={list._id} className="panel mb-8">
                  <div className="bg-dark text-white rounded-t-2xl font-bold text-lg px-6 py-3 italic">
                    {translate(lang, list.title)}
                  </div>
                  <ol className="px-2 py-4">
                    {list?.list?.map((cat) => (
                      <li key={cat?.slug?.current}>
                        <Link
                          href={`/${lang}/${cat?.slug?.current}`}
                          className={`inline-block px-6 py-3 rounded-[100%] ${category === cat?.slug?.current ? "bg-green" : "link"}`}
                        >
                          {translate(lang, cat?.title)}
                        </Link>
                      </li>
                    ))}
                  </ol>
                </div>
              )
            })}
          </div>
        </div>
        <div className="w-full">
          <h1 className="mb-4">{translate(lang, cat?.title)}</h1>
          <p>{translate(lang, cat?.desc)}</p>
          <ul className="mt-8">
            {products.map((product) => (
              <li key={product._id}>
                <Link
                  href={`/${lang}/${category}/${product.slug?.current}`}
                  className="panel flex flex-wrap gap-8 md:h-64 buttonClick"
                >
                  <div className="w-full md:w-5/12 md:h-full">
                    {product.images && (
                      <Image
                        image={product.images[0]}
                        alt={product.title}
                        className="rounded-2xl md:rounded-r-none w-auto h-60 md:h-full object-cover mx-auto object-right"
                      />
                    )}
                  </div>
                  <div className="w-full flex-1 px-8 pb-8 md:pt-8">
                    <h2 className="mb-4 text-xl font-bold">{product.title}</h2>
                    <p className="mb-8 line-clamp-3">{translate(lang, product.desc)}</p>
                    <div className="text-lg font-semibold">
                      {dictionary.priceFrom}
                      {formatAmount(750)}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Message lang={lang} />
    </main>
  )
}

export default CategoryPage
