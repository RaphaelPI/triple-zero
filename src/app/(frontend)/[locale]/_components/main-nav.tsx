import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Locale } from "@/i18n/config"
import { Link } from "@/i18n/navigation"
import { getClient } from "@/lib/payload"
import { Category } from "@/payload-types"
import { getLocale, getTranslations } from "next-intl/server"
import Bed from "src/assets/bed.svg"
import Close from "src/assets/close.svg"
import Mountain from "src/assets/mountain.svg"

export const MainNav = async () => {
  const locale = await getLocale()
  const nav = await (await getClient()).findGlobal({ slug: "nav", locale: locale as Locale })
  const t = await getTranslations()

  return (
    <>
      <NavigationMenu
        delayDuration={0}
        skipDelayDuration={0}
        viewport={false}
        className="max-md:hidden"
      >
        <NavigationMenuList>
          {nav.items.map((item, index) => (
            <NavigationMenuItem key={item.id}>
              <NavigationMenuTrigger className="cursor-pointer">{item.title}</NavigationMenuTrigger>
              <NavigationMenuContent className="bg-white px-12 py-10 shadow-lg shadow-[#00000011]">
                <div className="grid w-96 grid-cols-2 gap-10">
                  <div className="space-y-4">
                    {item.category.map((category: Category | string) => {
                      if (typeof category === "string") {
                        return null
                      }

                      return (
                        <Link
                          key={category.id}
                          className="block text-nowrap hover:underline"
                          href={`/c/${category.slug}`}
                        >
                          {category.title}
                        </Link>
                      )
                    })}
                  </div>
                  <div className="">
                    {index === 0 && <Mountain className="fill-blue-grey block h-full w-40" />}
                    {index === 1 && <Bed className="fill-blue-grey block h-full w-40" />}
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
          <NavigationMenuItem>
            <Link href="/savoir-faire" className="px-4">
              {t("menu.knowledge")}
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex gap-6 md:hidden">
        {nav.items.map((item) => (
          <Drawer key={item.id} direction="left">
            <DrawerTrigger className="cursor-pointer">{item.title}</DrawerTrigger>
            <DrawerContent className="bg-white">
              <DrawerHeader>
                <DrawerClose className="flex justify-end">
                  <Close className="size-8" />
                </DrawerClose>
              </DrawerHeader>
              <div className="space-y-8 px-8 text-2xl">
                <DrawerTitle>
                  <div className="text-h1">{item.title}</div>
                </DrawerTitle>
                {item.category.map((category: Category | string) => {
                  if (typeof category === "string") {
                    return null
                  }

                  return (
                    <Link
                      key={category.id}
                      className="block text-nowrap hover:underline"
                      href={`/c/${category.slug}`}
                    >
                      {category.title}
                    </Link>
                  )
                })}
              </div>
            </DrawerContent>
          </Drawer>
        ))}
      </div>
    </>
  )
}
