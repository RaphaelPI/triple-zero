"use client"

import { env } from "@/env"
import { usePathname } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import { useLocale } from "next-intl"
import { Fragment } from "react"
import { BreadcrumbJsonLd } from "./structured-data/breadcrumb"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb"

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface Props {
  items: BreadcrumbItem[]
  className?: string
}

export const Breadcrumbs = ({ items, className }: Props) => {
  const path = usePathname()
  const locale = useLocale()

  const breadcrumbItems: BreadcrumbItem[] = [
    {
      label: "Accueil",
      href: "/",
    },
    ...items,
  ]

  return (
    <Breadcrumb className={cn(className, "md:pt-4")}>
      <BreadcrumbJsonLd
        items={breadcrumbItems.map((item) => ({
          name: item.label,
          url: new URL(`/${locale}/${item.href ?? path}`, env.NEXT_PUBLIC_URL).toString(),
        }))}
      />
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <Fragment key={index}>
            <BreadcrumbItem>
              {item.href && index < breadcrumbItems.length - 1 ? (
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
