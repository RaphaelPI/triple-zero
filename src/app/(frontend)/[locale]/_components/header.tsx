import { Fragment } from "react"
import LogoMin from "src/assets/logo-min.svg"
import Logo from "src/assets/logo.svg"

import { LOCALES } from "@/i18n/config"
import { Link } from "@/i18n/navigation"
import { getTranslations } from "next-intl/server"
import NextLink from "next/link"
import { CartButton } from "./cart-button"
import { MainNav } from "./main-nav"

const Header = async () => {
  const t = await getTranslations()

  return (
    <>
      <div className="bg-dark overflow-hidden" id="top-nav">
        <div className="w-section px-section flex h-8 items-center justify-end gap-x-8 text-sm font-light text-white uppercase">
          <Link prefetch={false} href="/questions-frequentes" className="link">
            FAQ
          </Link>
          <div>
            {LOCALES.map((l) => (
              <Fragment key={l}>
                <NextLink
                  href={`/${l}`}
                  className="link after:mx-1 after:inline-block after:h-4 after:w-[1px] after:translate-y-[2px] after:bg-white last:after:hidden"
                >
                  {l}
                </NextLink>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="sticky top-0 z-20 bg-white shadow-lg shadow-[#00000011]">
        <nav className="w-section px-section flex h-16 items-center justify-between transition-all duration-100 lg:h-16">
          <div className="flex items-center gap-x-2 lg:gap-x-6">
            <Link prefetch={false} href="/" aria-label={t("menu.home")} className="">
              <Logo className="max-lg:hidden" height={48} />
              <LogoMin className="h-12 w-14 lg:hidden" />
            </Link>
            <MainNav />
          </div>
          <CartButton />
        </nav>
      </div>
    </>
  )
}

export default Header
