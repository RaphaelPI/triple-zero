"use client"

import { Popover } from "@/components/popover"
import { cn } from "@/lib/utils"
import { Color, ColorWithImage, Media } from "@/payload-types"
import { useQueryState } from "nuqs"
import { useProduct } from "./product-provider"

interface Props {
  colors: ColorWithImage[]
  name: string
  readOnly?: boolean
}

export const ProductColors = ({ colors, name, readOnly = false }: Props) => {
  const { setImage, activeColor } = useProduct()
  const [_, setValue] = useQueryState(name)
  const value = (activeColor?.color as Color)?.color

  const handleClick = (color?: ColorWithImage) => () => {
    if (!color || readOnly) {
      return
    }

    if (color.image) {
      setImage((color.image as Media).id)
    }

    const c = color.color as Color

    setValue(String(c.color))
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
          <div className="option-value-container" key={c.id}>
            <Popover content={c.name}>
              <div
                style={{ backgroundColor: hex }}
                className={cn("h-8 w-8 rounded-full border-2 border-white p-0", {
                  "ring-primary ring-[3px]": active,
                  "cursor-pointer": !readOnly,
                  "hover:opacity-80": !readOnly || (Boolean(color.image) && active),
                  "border-blue-grey": hex.toLowerCase() === "#ffffff" && !active,
                })}
                onClick={handleClick(color)}
              />
            </Popover>
          </div>
        )

        return optionRender
      })}
    </>
  )
}
