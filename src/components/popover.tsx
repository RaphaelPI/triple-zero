import { cn } from "@/lib/utils"
import { TooltipContentProps } from "@radix-ui/react-tooltip"
import { cva, VariantProps } from "class-variance-authority"
import { ReactNode, TouchEvent, useState } from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"

const tooltipVariants = cva(
  "data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade relative z-50 text-sm whitespace-pre-wrap shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] select-none",
  {
    variants: {
      variant: {
        dark: "bg-dark mx-auto max-w-[90vw] rounded-md px-4 py-2 text-white",
        light: "text-dark border-dark rounded-xl border-[3px] bg-white",
      },
    },
  },
)

interface Props extends Omit<TooltipContentProps, "content"> {
  content: ReactNode
}

export const Popover = ({
  children,
  content,
  variant,
  ...props
}: Props & VariantProps<typeof tooltipVariants>) => {
  const [open, setOpen] = useState(false)

  const handleClick = (e: TouchEvent<HTMLButtonElement>) => {
    // e.preventDefault()
    setOpen((prev) => !prev)
  }

  return (
    <Tooltip open={open}>
      <TooltipTrigger
        asChild
        onTouchStart={handleClick}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="select-none"
      >
        {children}
      </TooltipTrigger>
      <TooltipContent {...props} className={cn(tooltipVariants({ variant }))}>
        {content}
      </TooltipContent>
    </Tooltip>
  )
}
