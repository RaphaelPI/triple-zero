"use client"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Link, usePathname } from "@/i18n/navigation"
import { Category, Nav } from "@/payload-types"
import { LucideMenu } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import Close from "src/assets/close.svg"

interface Props {
  nav: Nav
}

export const MainNavMobile = ({ nav }: Props) => {
  const [open, setOpen] = useState(false)
  const t = useTranslations()
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <Drawer direction="left" open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="cursor-pointer">
        <LucideMenu className="size-8" />
      </DrawerTrigger>
      <DrawerContent className="bg-white">
        <DrawerHeader>
          <DrawerClose className="flex justify-end">
            <Close className="size-8" />
          </DrawerClose>
        </DrawerHeader>
        <div className="overflow-y-auto">
          {nav.items.map((item) => (
            <div
              key={item.id}
              className="border-b-grey-light mb-3 space-y-4 border-b-2 px-8 pb-3 text-2xl"
            >
              <DrawerTitle>
                <div className="text-h2">{item.title}</div>
              </DrawerTitle>
              <ol className="space-y-2">
                {item.category.map((category: Category | string) => {
                  if (typeof category === "string") {
                    return null
                  }

                  return (
                    <li key={category.id}>
                      <DrawerClose>
                        <Link
                          prefetch={false}
                          className="link block text-nowrap"
                          href={`/${category.slug}`}
                        >
                          {category.title}
                        </Link>
                      </DrawerClose>
                    </li>
                  )
                })}
              </ol>
            </div>
          ))}
          <div className="space-y-4 px-8 pb-3 text-2xl">
            <ol className="space-y-2">
              <li>
                <Link prefetch={false} className="link block text-nowrap" href={`/p/savoir-faire`}>
                  {t("menu.knowledge")}
                </Link>
              </li>
            </ol>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
