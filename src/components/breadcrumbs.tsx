"use client"

import { usePathname } from "@/i18n/navigation"
import { getUrl } from "@/lib/url"
import { cn } from "@/lib/utils"
import { useLocale, useTranslations } from "next-intl"
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
  const t = useTranslations()

  const breadcrumbItems: BreadcrumbItem[] = [
    {
      label: t("home"),
      href: "/",
    },
    ...items,
  ]

  return (
    <Breadcrumb className={cn(className)}>
      <BreadcrumbJsonLd
        items={breadcrumbItems.map((item) => ({
          name: item.label,
          url: getUrl(item.href ?? path, locale).toString(),
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
