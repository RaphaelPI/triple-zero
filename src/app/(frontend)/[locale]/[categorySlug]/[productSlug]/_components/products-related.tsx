import { Amount } from "@/components/amount"
import { Image } from "@/components/image"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { getStartingPrice } from "@/lib/technical-values"
import { Media, Product } from "@/payload-types"
import { getTranslations } from "next-intl/server"

interface Props {
  products: Product[]
  categorySlug: string
}

export const ProductsRelated = async ({ products, categorySlug }: Props) => {
  const t = await getTranslations()

  return (
    <>
      <div className="text-h1 font-bold italic">{t("product.related")}</div>
      <ul className="space-y-4">
        {products.map((product) => {
          const image = product.images[0].image as Media
          const price = getStartingPrice([
            ...(product.options?.map((option) => option.option) ?? []),
            ...(product.advanced?.map((advanced) => advanced.option) ?? []),
          ])

          return (
            <li key={product.id}>
              <Link
                prefetch={false}
                href={`/${categorySlug}/${product.slug}`}
                className="panel ring-blue relative flex flex-wrap gap-8 hover:ring-8 md:h-64"
              >
                <div className="flex w-full items-center justify-center md:h-full md:w-5/12">
                  {image && (
                    <Image
                      media={image}
                      alt={product.title}
                      className="mx-auto h-auto max-h-full w-auto max-w-full rounded-2xl md:rounded-r-none"
                    />
                  )}
                </div>
                <div className="w-full flex-1 space-y-4 px-8 pb-8 md:pt-8">
                  <h2 className="text-xl font-bold">{product.title}</h2>
                  <div className="line-clamp-2">{product.description}</div>
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
    </>
  )
}
