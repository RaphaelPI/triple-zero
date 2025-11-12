import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Link } from "@/i18n/navigation"
import { Category } from "@/payload-types"
import { getTranslations } from "next-intl/server"
import { getHomePromotionsData, getNavData } from "../data"
import { MainNavMobile } from "./main-nav-mobile"

export const MainNav = async () => {
  const [nav, promotions] = await Promise.all([getNavData(), getHomePromotionsData()])
  const t = await getTranslations()

  const showPromotions = promotions.docs.length > 0
  return (
    <>
      <NavigationMenu
        delayDuration={0}
        skipDelayDuration={0}
        viewport={false}
        className="max-md:hidden"
      >
        <NavigationMenuList>
          {nav.items.map((item) => (
            <NavigationMenuItem key={item.id}>
              <NavigationMenuTrigger className="cursor-pointer">{item.title}</NavigationMenuTrigger>
              <NavigationMenuContent className="bg-white p-6 shadow-lg shadow-[#00000011]">
                <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {item.category.map((category: Category | string) => {
                    if (typeof category === "string") {
                      return null
                    }

                    return (
                      <ListItem
                        key={category.id}
                        title={category.title}
                        href={`/${category.slug}`}
                        className="hover:bg-grey-light rounded-lg p-4"
                      >
                        {category.description}
                      </ListItem>
                    )
                  })}
                </ul>
                {/* <div>
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
                          <div className="text-sm opacity-80">{category.description}</div>
                        </Link>
                      )
                    })}
                  </div>
                </div> */}
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
          {showPromotions && (
            <NavigationMenuItem>
              <Link prefetch={false} href="/promotions" className="px-4">
                {t("promotions.nav")}
              </Link>
            </NavigationMenuItem>
          )}
          <NavigationMenuItem>
            <Link prefetch={false} href="/p/savoir-faire" className="px-4">
              {t("menu.knowledge")}
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex gap-6 md:hidden">
        <MainNavMobile nav={nav} showPromotions={showPromotions} />
      </div>
    </>
  )
}

const ListItem = ({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) => {
  return (
    <li {...props}>
      <Link href={href} prefetch={false} className="group/item space-y-2">
        <div className="leading-none font-semibold group-hover/item:underline">{title}</div>
        <p className="line-clamp-2 text-sm leading-4 text-gray-500">{children}</p>
      </Link>
    </li>
  )
}
