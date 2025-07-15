import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Locale } from "@/i18n/config"
import { Link } from "@/i18n/navigation"
import { Category } from "@/payload-types"
import { getLocale, getTranslations } from "next-intl/server"
import Bed from "src/assets/bed.svg"
import Mountain from "src/assets/mountain.svg"
import { getNavData } from "../data"
import { MainNavMobile } from "./main-nav-mobile"

export const MainNav = async () => {
  const locale = await getLocale()
  const nav = await getNavData(locale as Locale)
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
                          prefetch={false}
                          key={category.id}
                          className="link block text-nowrap"
                          href={`/${category.slug}`}
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
          {/* <NavigationMenuItem>
            <Link prefetch={false} href="/savoir-faire" className="px-4">
              {t("menu.knowledge")}
            </Link>
          </NavigationMenuItem> */}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex gap-6 md:hidden">
        <MainNavMobile nav={nav} />
      </div>
    </>
  )
}
