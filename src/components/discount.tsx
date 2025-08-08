import PromoIcon from "@/assets/promo.svg"
import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"

const discountVariants = cva("absolute top-2 right-2 flex flex-col items-center justify-center", {
  variants: {
    size: {
      default: ["size-20", "[&>[data-slot=discount]]:text-xl [&>[data-slot=discount]]:font-bold"],
      sm: ["size-14", "[&>[data-slot=discount]]:text-base"],
    },
  },
  defaultVariants: {
    size: "default",
  },
})

interface Props {
  children: React.ReactNode
  animate?: boolean
}

export const PromotionDiscount = ({
  children,
  size = "default",
  animate = true,
}: Props & VariantProps<typeof discountVariants>) => {
  return (
    <div className={cn(discountVariants({ size }))}>
      <PromoIcon
        className={cn("animation-duration-[30000ms] h-full w-full", {
          "animate-spin": animate,
        })}
      />
      <div
        data-slot="discount"
        className="absolute inset-0 flex rotate-6 items-center justify-center text-xl font-bold"
      >
        {children}
      </div>
    </div>
  )
}
