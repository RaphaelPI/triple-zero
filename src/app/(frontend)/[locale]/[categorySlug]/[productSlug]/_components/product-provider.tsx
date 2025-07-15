import { getTechnicalValues, TechnicalValue } from "@/lib/technical-values"
import { Color, Media, Product, ProductOption, ProductOptionValue } from "@/payload-types"
import { useQueryStates, UseQueryStatesKeysMap } from "nuqs"
import { createContext, useContext, useState } from "react"
import { getOptionSlug, getOptionsQueryNames, getProductDefaultImages } from "../utils"

interface IProductContext {
  technicalValues?: Record<TechnicalValue, number>
  image?: string
  activeOptions: [ProductOption, ProductOptionValue][]
  activeColors: Product["colors"]
  images: Media[]
  currentImage: Media
  product: Product
  setImage: (id: string) => void
  resetCurrentImage: () => void
}

// type ImageSlider = { image: Media; key: string }

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
  const images = getProductDefaultImages(params, product, activeOptions, product.colors || [])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [lastIndex, setLastIndex] = useState(0)

  ///////////////////////////////////////////////////////////////////////////////
  // Functions
  ///////////////////////////////////////////////////////////////////////////////
  const resetCurrentImage = () => {
    setCurrentIndex(lastIndex)
  }

  const setImage = (id: string) => {
    const newIndex = images.findIndex(({ id: imageId }) => imageId === id)
    if (newIndex !== -1) {
      setLastIndex(newIndex)
    }

    setCurrentIndex(newIndex)
  }

  return (
    <ProductContext.Provider
      value={{
        technicalValues: getTechnicalValues(activeOptions),
        activeOptions,
        activeColors,
        images,
        currentImage: Object.values(images)[currentIndex],
        product,
        setImage,
        resetCurrentImage,
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
