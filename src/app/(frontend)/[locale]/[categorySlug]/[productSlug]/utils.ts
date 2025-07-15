import { slugify } from "@/lib/slugify"
import {
  Color,
  ColorWithImage,
  Media,
  Product,
  ProductOption,
  ProductOptionValue,
} from "@/payload-types"
import { parseAsString, UseQueryStatesKeysMap, Values } from "nuqs"

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
  params: Values<UseQueryStatesKeysMap<any>>,
  product: Product,
  activeOptions: [ProductOption, ProductOptionValue][],
  colors: Product["colors"],
): Media[] => {
  // Get default Images
  // from product
  const defaultProductImages = (product.images || []).map(({ image }) => image as Media)

  // from options
  // const activeOptionsImages = activeOptions
  //   .filter(([_, optionValue]) => optionValue.image)
  //   .map(([option, optionValue]) => [getOptionSlug(option), optionValue.image as Media])

  const optionImages =
    product.options
      ?.map(({ option }) => option.values?.map(({ value }) => value.image as Media) ?? [])
      .flat()
      .filter((image) => image) ?? []

  // from colors
  // const colorOptionImage = colors?.find(({ color }) => params.color === color.color)?.color.image
  // const colorOptionImages = colorOptionImage ? [["color", colorOptionImage]] : []
  const colorOptionImages =
    colors?.map(({ color }) => color.image as Media).filter((image) => image) ?? []

  // merge all images
  // return Object.fromEntries([...defaultProductImages, ...colorOptionImages, ...activeOptionsImages])
  return Object.values(
    [...defaultProductImages, ...colorOptionImages, ...optionImages].reduce(
      (prev, current) => ({ ...prev, [current.id]: current }),
      {},
    ),
  )
}

export const getOptionSlug = (option: ProductOption) => {
  return slugify(option.title)
}
