import { Color, ColorWithImage, Media } from "@/payload-types"
import { useQueryState } from "nuqs"
import { useProduct } from "./product-provider"

interface Props {
  colors: ColorWithImage[]
  name: string
}

export const ProductColors = ({ colors, name }: Props) => {
  const { setImage, resetCurrentImage } = useProduct()
  const [value, setValue] = useQueryState(name)

  const handleClick = (color?: ColorWithImage) => () => {
    if (!color) {
      return
    }

    const c = color.color as Color

    setValue(String(c.color))
  }

  const handleHover = (image?: Media) => () => {
    if (!image) {
      return
    }

    setImage((image as Media).id)
  }

  const handleOut = (image?: Media) => () => {
    if (!image) {
      return
    }

    resetCurrentImage()
  }

  if (!colors) {
    return null
  }

  return (
    <>
      {colors.map((color) => {
        if (!color) {
          return null
        }

        const c = color.color as Color
        const hex = String(c.color)
        const active = Boolean(value ? value === hex : color?.default)
        const optionRender = (
          <div
            className="option-value-container"
            onMouseEnter={handleHover(color.image as Media)}
            onMouseLeave={handleOut(color.image as Media)}
            key={c.id}
          >
            <div
              style={{ backgroundColor: hex }}
              className={`h-8 w-8 cursor-pointer rounded-full border-2 border-white p-0 ${
                active ? "ring-primary ring-[3px]" : ""
              }`}
              onClick={handleClick(color)}
            />
          </div>
        )

        return optionRender
      })}
    </>
  )
}
