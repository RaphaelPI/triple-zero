"use client"

import { Image } from "@/components/image"
import { cn } from "@/lib/utils"
import { useProduct } from "./product-provider"
import { ChevronLeft, ChevronRight } from "lucide-react"

export const ProductImages = () => {
  const { images, setImage, currentImage } = useProduct()

  const handleHover = (key: string) => () => {
    setImage(key)
  }

  return (
    <div className="space-y-4">
      <div className="panel h-96 w-full overflow-hidden rounded-2xl border-4 border-solid border-white max-lg:hidden">
        <Image media={currentImage} priority className="size-full object-contain" />
      </div>
      <div className="relative">
        <ChevronLeft className="absolute left-4 top-1/2 -translate-y-1/2 size-8 text-gray-500 z-10 lg:hidden" />
        <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 size-8 text-gray-500 z-10 lg:hidden" />
      <ol className="max-lg:scrollable lg:flex lg:flex-wrap lg:gap-4">
        {images.map((image, index) => {
          return (
            <li
            key={`${index}-${image.id}`}
            className={cn(
              "h-60 w-auto cursor-pointer rounded-xl border-2 border-white bg-white lg:size-16",
              "max-lg:shrink-0 max-lg:snap-start max-lg:snap-always",
              {
                "lg:ring-primary lg:ring-[3px]": currentImage.id === image.id,
              },
            )}
            onMouseEnter={handleHover(image.id)}
            >
              <Image
                media={image}
                className={`h-full w-full rounded-xl object-cover`}
                width={70}
                height={70}
                sizes="(max-width: 1024px) 400px, 70px"
                />
            </li>
          )
        })}
      </ol>
        </div>
    </div>
  )
}
