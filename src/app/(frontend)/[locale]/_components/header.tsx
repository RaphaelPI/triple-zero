import { Fragment } from "react"
import LogoMin from "src/assets/logo-min.svg"
import Logo from "src/assets/logo.svg"

import { LOCALES } from "@/i18n/config"
import { Link } from "@/i18n/navigation"
import { getTranslations } from "next-intl/server"
import NextLink from "next/link"
import { MainNav } from "./main-nav"

const Header = async () => {
  const t = await getTranslations()

  return (
    <>
      <div className="bg-dark overflow-hidden" id="top-nav">
        <div className="w-section px-section flex h-8 items-center justify-end gap-x-8 text-sm font-light text-white uppercase">
          <Link href="/faq" className="hover:underline">
            FAQ
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
          <div>
            {LOCALES.map((l) => (
              <Fragment key={l}>
                <NextLink
                  href={`/${l}`}
                  className="after:mx-1 after:inline-block after:h-4 after:w-[1px] after:translate-y-[2px] after:bg-white last:after:hidden hover:underline"
                >
                  {l}
                </NextLink>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="sticky top-0 z-[1] bg-white shadow-lg shadow-[#00000011]">
        <nav className="w-section px-section flex h-20 items-center justify-between">
          <div className="flex items-center gap-x-8">
            <Link href="/" aria-label={t("menu.home")} className="">
              <Logo className="hidden lg:block" height={64} />
              <LogoMin className="h-14 w-auto lg:hidden" />
            </Link>
            <MainNav />
          </div>
          <div>CART</div>
          {/* <ol className="flex h-full items-center gap-x-4 lg:gap-x-8">
            <li className="leading-[3rem]"></li>
            <BigMenu label={t("menu.products")} categoryList={categoryList} />
            <li className="link leading-[3rem]">
              <Link href="/savoir-faire">{t("menu.knowledge")}</Link>
            </li>
          </ol> */}
          {/* <CartButton lang={lang} /> */}
        </nav>
      </div>
    </>
  )
}

export default Header
