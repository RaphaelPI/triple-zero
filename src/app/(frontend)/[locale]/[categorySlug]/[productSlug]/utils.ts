import { slugify } from "@/lib/slugify"
import {
  Color,
  ColorWithImage,
  Media,
  Product,
  ProductOption,
  ProductOptionValue,
  Promotion,
} from "@/payload-types"
import { parseAsString, UseQueryStatesKeysMap } from "nuqs"

/**
 * Returns all options query names
 * @param options
 * @returns
 */
export const getOptionsQueryNames = (options: ProductOption[], colors: ColorWithImage[]) => {
  const names: UseQueryStatesKeysMap = {}
  options?.forEach(
    (option) =>
      (names[getOptionSlug(option)] = parseAsString.withDefault(
        option?.values?.find(({ value }) => value.defaultValue)?.value.value || "",
      )),
  )

  names.color = parseAsString.withDefault(
    (colors?.find((color) => color.default)?.color as Color)?.color || "",
  )

  return names
}

export const getProductDefaultImages = (
  product: Product,
  colors: Product["colors"],
  promotion?: Promotion,
): Media[] => {
  // Image list
  const images: Media[] = []

  // If promotion, return only promo related images (color, options and promo.image)
  if (promotion) {
    if (promotion.image) {
      images.push(promotion.image as Media)
    }

    if (promotion.color) {
      const color = colors?.find(
        ({ color }) => (color.color as Color).color === (promotion.color as Color).color,
      )
      if (color?.color.image) {
        images.push(color.color.image as Media)
      }
    }

    if (promotion.options) {
      const options = promotion.options as [ProductOption, ProductOptionValue][]
      options.forEach(([_, value]) => {
        if (value.image) {
          images.push(value.image as Media)
        }
      })
    }

    if (images.length > 0) {
      return images
    }
  }

  // Get default Images from product
  if (product.images) {
    images.push(...product.images.map(({ image }) => image as Media))
  }

  // Get default Images from options
  if (product.options) {
    images.push(
      ...(product.options
        ?.map(({ option }) => option.values?.map(({ value }) => value.image as Media) ?? [])
        .flat()
        .filter((image) => image) ?? []),
    )
  }

  // Get default images from colors
  if (product.colors) {
    images.push(
      ...(product.colors?.map(({ color }) => color.image as Media).filter((image) => image) ?? []),
    )
  }

  // remove dupplicate images
  return images.filter((image, index, self) => index === self.findIndex((t) => t.id === image.id))
}

export const getOptionSlug = (option: ProductOption) => {
  return slugify(option.title)
}
