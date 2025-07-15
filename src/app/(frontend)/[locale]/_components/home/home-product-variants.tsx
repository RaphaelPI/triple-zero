import { Amount } from "@/components/amount"
import { Image } from "@/components/image"
import { Button } from "@/components/ui/button"
import { Locale } from "@/i18n/config"
import { Link } from "@/i18n/navigation"
import { getTechnicalValues } from "@/lib/technical-values"
import { Category, Media, Product, ProductOption, ProductOptionValue } from "@/payload-types"
import { getLocale, getTranslations } from "next-intl/server"
import { getOptionSlug } from "../../[categorySlug]/[productSlug]/utils"
import { getProductVariantsData } from "../../data"

export const HomeProductVariants = async () => {
  const locale = await getLocale()
  const variants = await getProductVariantsData(locale as Locale)
  const t = await getTranslations()

  if (variants.docs.length === 0) {
    return null
  }

  return (
    <section className="section space-y-8">
      <h1>{t("variants")}</h1>
      <div className="space-y-4">
        {variants.docs.map((variant) => {
          const product = variant.reference.value as Product
          const category = product.category as Category
          const options = variant.options as [ProductOption, ProductOptionValue][]
          const image = product.images?.[0]?.image as Media

          const priceOptions = [...options]
          product.options?.forEach(({ option }) => {
            const optionValue = option.values?.find(({ value }) => value.defaultValue)?.value

            if (
              optionValue &&
              !options.find(([opt]) => getOptionSlug(option) === getOptionSlug(opt))
            ) {
              priceOptions.push([option, optionValue])
            }
          })

          const searchParams = new URLSearchParams()
          options.forEach(([option, optionValue]) => {
            searchParams.set(getOptionSlug(option), optionValue.value)
          })

          return (
            <div
              className="panel ring-blue relative flex flex-wrap gap-8 hover:ring-8"
              key={variant.id}
            >
              <div className="w-full md:h-full md:w-5/12">
                {image && (
                  <Image
                    media={image}
                    alt={product.title}
                    className="mx-auto h-60 w-auto rounded-2xl object-cover object-right md:h-full md:rounded-r-none"
                  />
                )}
              </div>
              <div className="w-full flex-1 space-y-4 px-8 pb-8 md:pt-8">
                <div>
                  <Link
                    className="bg-green link inline-block rounded-lg px-3 py-1"
                    href={`/${category.slug}`}
                  >
                    {category.title}
                  </Link>
                  <h2 className="text-xl font-bold">{variant.title}</h2>
                  <div className="text-lg">{product.title}</div>
                </div>
                <div className="whitespace-pre-line">{variant.description}</div>
                <div>
                  <ul className="flex flex-wrap gap-1">
                    {options.map(([option, optionValue]) => (
                      <li key={option.title} className="bg-blue-grey rounded p-1 text-xs">
                        {option.title} : {optionValue.title}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-lg font-semibold">
                  {t("priceFrom")}
                  <Amount amount={getTechnicalValues(priceOptions).price} taxIncluded />
                </div>
                <Link href={`/${category.slug}/${product.slug}?${searchParams.toString()}`}>
                  <Button aria-label={t("product.see")}>{t("product.see")}</Button>
                </Link>
              </div>
            </div>
          )

          // return (
          //   <div key={variant.id} className="relative">
          //     <Link
          //       className="bg-green link absolute top-3 left-3 z-1 rounded-lg px-3 py-1"
          //       href={`/${(product.category as Category).slug}`}
          //     >
          //       {(product.category as Category).title}
          //     </Link>

          //     <ProductCard
          //       href={`/incontournables/${variant.slug}`}
          //       title={variant.title}
          //       description={variant.description}
          //       image={product.images?.[0]?.image as Media}
          //     />
          //   </div>
          // )
        })}
      </div>
    </section>
  )
}
