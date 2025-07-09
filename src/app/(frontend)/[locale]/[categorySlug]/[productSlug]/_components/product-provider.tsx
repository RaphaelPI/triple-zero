import { Color, Media, Product, ProductOption, ProductOptionValue } from "@/payload-types"
import { useQueryStates, UseQueryStatesKeysMap } from "nuqs"
import { createContext, useContext, useState } from "react"
import {
  getOptionSlug,
  getOptionsQueryNames,
  getProductDefaultImages,
  getTechnicalValues,
  TechnicalValue,
} from "../utils"

interface IProductContext {
  technicalValues?: Record<TechnicalValue, number>
  image?: string
  activeOptions: [ProductOption, ProductOptionValue][]
  activeColors: Product["colors"]
  images: Record<string, Media>
  currentImage: ImageSlider
  product: Product
  setImage: ({ image, key }: { image?: Media; key?: string }) => void
  addImage: (image: Media, key: string) => void
  resetCurrentImage: () => void
}

type ImageSlider = { image: Media; key: string }

const ProductContext = createContext<IProductContext>({} as IProductContext)

interface Props {
  children: React.ReactNode
  product: Product
}

export const ProductProvider = ({ children, product }: Props) => {
  ///////////////////////////////////////////////////////////////////////////////
  // States & default values
  ///////////////////////////////////////////////////////////////////////////////
  // OPTIONS
  // Merge all options
  const options = [...(product.options || []), ...(product.advanced || [])]

  // Get all params name from product options
  const names: UseQueryStatesKeysMap = getOptionsQueryNames(
    options.map(({ option }) => option),
    product.colors?.map(({ color }) => color) || [],
  )

  // initialize query states from params
  const [params] = useQueryStates(names)

  console.log("params", params)

  // All active options
  const activeOptions = options
    .map(({ option }) => [
      option,
      option?.values?.find((value) => params[getOptionSlug(option)] === value?.value.value)?.value,
    ])
    .filter(([, value]) => value) as [ProductOption, ProductOptionValue][]

  // Get active colors
  const activeColors = (product.colors || []).filter(
    (colorWithImage) => (colorWithImage.color as Color).color === params["color"],
  )

  // IMAGES
  // Default images
  const defaultImages = getProductDefaultImages(
    params,
    product,
    activeOptions,
    product.colors || [],
  )

  console.log("defaultImages", defaultImages)

  // Default index
  const defaultIndex = 0
  const [images, setImages] = useState<Record<string, Media>>(defaultImages)
  const [currentImage, setCurrentImage] = useState<ImageSlider>({
    image: defaultImages[defaultIndex],
    key: String(defaultIndex),
  })
  const [lastIndex, setLastIndex] = useState(String(defaultIndex))

  ///////////////////////////////////////////////////////////////////////////////
  // Functions
  ///////////////////////////////////////////////////////////////////////////////
  const resetCurrentImage = () => {
    setCurrentImage({ image: images[`${lastIndex}`], key: lastIndex })
  }

  const addImage = (image: Media) => {
    setImages((prev) => ({ ...prev, [image.id]: image }))
  }

  const setImage = ({ image, key }: { image?: Media; key?: string }) => {
    if (!image && !key) {
      return
    }

    if (key && Object.keys(images).includes(key)) {
      setLastIndex(key)
    }

    let newKey = key
    let newImage = image
    if (!image && key) {
      newImage = images[key]
    }

    if (!key && image) {
      newKey = String(image.id)
    }

    setCurrentImage({
      key: String(newKey),
      image: newImage as Media,
    })
  }

  return (
    <ProductContext.Provider
      value={{
        technicalValues: getTechnicalValues(activeOptions),
        activeOptions,
        activeColors,
        images,
        currentImage,
        product,
        setImage,
        resetCurrentImage,
        addImage,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProduct = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider")
  }
  return context
}
