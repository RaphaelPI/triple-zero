import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import { Media, ProductOption, ProductOptionValue } from "@/payload-types"
import { PromotionDiscount } from "../discount"
import { Image } from "../image"

interface Props {
  title: string
  description: string
  image: Media
  options: [ProductOption, ProductOptionValue][]
  discount: number
  slug: string
  shortDescription?: boolean
}

export const PromotionCard = ({
  title,
  description,
  image,
  options,
  discount,
  slug,
  shortDescription = false,
}: Props) => {
  return (
    <Link
      href={`/promotions/${slug}`}
      className="hover:ring-blue panel relative block snap-start hover:ring-8 max-md:min-w-sm md:h-full"
    >
      <PromotionDiscount>{discount}%</PromotionDiscount>
      <div className="flex h-44 w-full items-center justify-center lg:h-52">
        <Image
          priority
          media={image}
          alt={title}
          className="h-auto max-h-full w-auto max-w-full"
          sizes="350px"
        />
      </div>
      <div className="px-panel py-panel space-y-1 lg:space-y-2">
        <div className="text-lg font-semibold">{title}</div>
        <div
          className={cn("line-clamp-4 min-h-12 text-sm", {
            "line-clamp-2": shortDescription,
          })}
        >
          {description}
        </div>
        <div>
          <ul className="flex flex-wrap gap-1">
            {options.map(([option, optionValue]) => (
              <li key={option.title} className="bg-blue-grey rounded px-2 py-1 text-xs">
                {option.title} : {optionValue.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  )
}
