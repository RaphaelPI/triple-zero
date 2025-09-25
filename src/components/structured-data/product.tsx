import { Locale } from "@/i18n/config"
import { getTechnicalValues } from "@/lib/technical-values"
import { getUrl } from "@/lib/url"
import type {
  Category,
  Media,
  ProductOption,
  ProductOptionValue,
  Product as TZProduct,
} from "@/payload-types"
import { useTranslations } from "next-intl"
import type { Product, ProductGroup } from "schema-dts"
import { JsonLd } from "./json-ld"

interface ProductGroupProps {
  product: TZProduct
  locale: Locale
  sizeOption: ProductOption
  sizeOptionValue: ProductOptionValue
  weightOption: ProductOption
  images: string[]
  url: string
  material: string
}

const getProductGroupData = ({
  product,
  locale,
  sizeOptionValue,
  weightOption,
  images,
  url,
  sizeOption,
  material,
}: ProductGroupProps) => {
  const getProductData = (weightOptionValue: ProductOptionValue): Product => {
    const weightImage = (sizeOptionValue.image as Media)?.url
    const variantImage = weightImage ? getUrl(String(weightImage)) : images

    return {
      "@type": "Product",
      name: `${product.title} ${weightOptionValue.title} ${sizeOptionValue.title}`,
      sku: `${product.id}-${weightOptionValue.value}-${sizeOptionValue.value}`,
      size: sizeOptionValue.title,
      ...(variantImage && { image: variantImage }),
      weight: {
        "@type": "QuantitativeValue",
        value: String(weightOptionValue.title),
        unitCode: "g",
      },
      category: {
        "@type": "Thing",
        name: (product.category as Category).title,
        url: getUrl(`/${(product.category as Category).slug}`, locale),
      },
      offers: {
        "@type": "Offer",
        url,
        priceCurrency: "EUR",
        price: getTechnicalValues([
          [weightOption as ProductOption, weightOptionValue],
          [sizeOption as ProductOption, sizeOptionValue],
        ]).price,
        itemCondition: "https://schema.org/NewCondition",
        availability: "https://schema.org/InStock",
        shippingDetails: {
          "@type": "OfferShippingDetails",
          shippingOrigin: {
            "@type": "DefinedRegion",
            addressCountry: "FR",
            addressRegion: "Occitanie",
          },
        },
      },
    }
  }

  const data: ProductGroup = {
    "@type": "ProductGroup",
    name: product.title,
    description: product.description,
    url,
    ...(images.length > 0 && { image: images }),
    brand: {
      "@type": "Brand",
      name: "Triple Zéro",
    },
    material,
    productGroupID: product.id,
    variesBy: ["https://schema.org/size", "https://schema.org/weight"],
    hasVariant: weightOption?.values?.map((weightValue) => getProductData(weightValue.value)) ?? [],
  }

  return data
}

interface Props {
  product: TZProduct
  locale: Locale
}

export const ProductJsonLd = ({ product, locale }: Props) => {
  const images = product.images
    .map((image) => (image.image as Media)?.url)
    .filter((img) => img)
    .map((img) => getUrl(String(img)))

  const url = getUrl(`/${(product.category as Category).slug}/${product.slug}`, locale)
  const t = useTranslations()
  const material = t("product.material")

  const sizeOption = product.options?.find((option) => option.option.size)?.option
  const sizeOptionValue = product.options?.find((option) => option.option.size)?.option.values?.[0]
  const weightOption = product.options?.find((option) => option.option.weight)?.option

  if (sizeOption && sizeOptionValue && weightOption) {
    return (
      <JsonLd
        data={getProductGroupData({
          product,
          locale,
          sizeOption: sizeOption as ProductOption,
          sizeOptionValue: sizeOptionValue.value,
          weightOption,
          images,
          url,
          material,
        })}
      />
    )
  }

  const data: Product = {
    "@type": "Product",
    name: product.title,
    description: product.description,
    url,
    ...(images.length > 0 && { image: images }),
    brand: {
      "@type": "Brand",
      name: "Triple Zéro",
    },
    material,
    sku: product.id,
  }

  if (sizeOption && sizeOptionValue) {
    data.offers = {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: getTechnicalValues([[sizeOption as ProductOption, sizeOptionValue.value]]).price,
    }
  }

  return <JsonLd data={data} />
}
