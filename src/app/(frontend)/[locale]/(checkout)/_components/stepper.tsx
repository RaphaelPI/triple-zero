"use client"

import { Link, usePathname } from "@/i18n/navigation"
import { cn } from "@/lib/utils"

interface Props {
  steps: { label: string; href: string }[]
}

export const Stepper = ({ steps }: Props) => {
  const pathname = usePathname()
  const currentStep = steps.findIndex((step) => pathname.includes(step.href))

  return (
    <div className="section flex items-center justify-center gap-6 pb-0">
      {steps.map(({ href, label }, index) => (
        <Link prefetch={false} href={href} key={href} className="flex items-center gap-1">
          <div
            className={cn(
              "bg-primary border-primary xs:size-8 flex size-10 items-center justify-center rounded-full border border-solid text-white",
              {
                "bg-green text-primary": currentStep === index,
              },
            )}
          >
            {index + 1}
          </div>
          <div className="max-xs:hidden">{label}</div>
        </Link>
      ))}
    </div>
  )
}
