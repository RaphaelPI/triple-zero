import { Amount } from "@/components/amount"
import { Image } from "@/components/image"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { getTechnicalValues } from "@/lib/technical-values"
import { Category, Media, Product, ProductOption, ProductOptionValue } from "@/payload-types"
import { getTranslations } from "next-intl/server"
import { getHomeProductVariantsData } from "../../data"

export const HomeProductVariants = async () => {
  const variants = await getHomeProductVariantsData()
  const t = await getTranslations()

  if (variants.docs.length === 0) {
    return null
  }

  return (
    <section className="section space-y-4 lg:space-y-8">
      <div className="h1">{t("variants")}</div>
      <div className="space-y-4">
        {variants.docs.map((variant) => {
          const product = variant.reference.value as Product
          const category = product.category as Category
          const options = variant.options as [ProductOption, ProductOptionValue][]
          const image = product.images?.[0]?.image as Media

          const priceOptions = [...options]
          product.options?.forEach(({ option }) => {
            const optionValue = option.values?.find(({ value }) => value.defaultValue)?.value

            if (optionValue && !options.find(([opt]) => option.slug === opt.slug)) {
              priceOptions.push([option, optionValue])
            }
          })

          const searchParams = new URLSearchParams()
          options.forEach(([option, optionValue]) => {
            searchParams.set(option.slug, optionValue.value)
          })
          const url = `/${category.slug}/${product.slug}?${searchParams.toString()}`

          return (
            <Link
              href={url}
              prefetch={false}
              className="panel ring-blue px-panel py-panel relative block hover:ring-8 lg:flex lg:gap-8"
              key={variant.id}
            >
              <div className="shrink-0 lg:w-5/12">
                {image && (
                  <Image
                    media={image}
                    alt={product.title}
                    width={500}
                    height={250}
                    sizes="500px"
                    className="mx-auto h-auto max-h-full w-md rounded-2xl md:rounded-r-none"
                  />
                )}
              </div>
              <div className="space-y-4">
                <div>
                  <div className="bg-green inline-block rounded-lg px-3 py-1">{category.title}</div>
                  <h2 className="text-xl font-bold">{variant.title}</h2>
                  <div className="text-lg">{product.title}</div>
                </div>
                <div className="whitespace-pre-line">{variant.description}</div>
                <div>
                  <ul className="flex flex-wrap gap-1">
                    {options.map(([option, optionValue]) => {
                      const refTitle = product.options?.find(
                        (pOption) => pOption.option.slug === option.slug,
                      )?.option.title
                      const refValueTitle = product.options
                        ?.find((pOption) => pOption.option.slug === option.slug)
                        ?.option.values?.find(({ value }) => value.value === optionValue.value)
                        ?.value.title
                      return (
                        <li key={option.title} className="bg-blue-grey rounded p-1 text-xs">
                          {refTitle} : {refValueTitle}
                        </li>
                      )
                    })}
                  </ul>
                </div>
                <div className="text-lg font-semibold">
                  {t("priceFrom")}
                  <Amount amount={getTechnicalValues(priceOptions).price} />
                </div>

                <Button aria-label={t("product.see")}>{t("product.see")}</Button>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
