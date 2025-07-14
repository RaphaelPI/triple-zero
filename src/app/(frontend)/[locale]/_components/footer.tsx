import { ADDRESS, ADDRESS_COUNTRY, ADDRESS_TOWN, ADDRESS_ZIP, EMAIL, PHONE } from "@/constants"
import { Locale } from "@/i18n/config"
import { getLocale, getTranslations } from "next-intl/server"
import Link from "next/link"
import LogoMin from "src/assets/logo-min.svg"
import { getNavData } from "../data"

export const Footer = async () => {
  const locale = await getLocale()
  const t = await getTranslations()
  const nav = await getNavData(locale as Locale)

  return (
    <footer className="bg-dark">
      <div className="section space-y-8 pb-32 text-center">
        <div>
          <div className="text-h1 font-bold text-white">Triple Zéro</div>
          <div className="text-white">{t("description")}</div>
        </div>
        <div>
          <LogoMin className="mx-auto block h-40 w-40" />
          <h2 className="text-blue-grey text-xl italic">{t("slogan")}</h2>
        </div>
        <div className="max-xs:flex-col flex justify-center gap-10 border-t border-b border-solid border-[#333333] py-8 text-white md:gap-20">
          {nav.items.map((item) => (
            <ol key={item.id} className="max-xs:text-center text-left">
              {item.category.map((category) => {
                if (typeof category === "string") {
                  return null
                }

                return (
                  <li key={category.id}>
                    <Link prefetch={false} href={`/${category.slug}`} className="link">
                      {category.title}
                    </Link>
                  </li>
                )
              })}
            </ol>
          ))}
        </div>
        <div>
          <div className="text-lg font-bold text-white">{t("contact")}</div>
          <Link
            prefetch={false}
            href={`tel:${PHONE.replaceAll(" ", "")}`}
            className="block p-2 text-white md:p-0"
          >
            {PHONE}
          </Link>
          <Link prefetch={false} href={`mailto:${EMAIL}`} className="p-2 text-white md:p-0">
            {EMAIL}
          </Link>
          <div className="text-white">
            {ADDRESS} {ADDRESS_ZIP} {ADDRESS_TOWN} {ADDRESS_COUNTRY}
          </div>
        </div>
      </div>
    </footer>
  )
}
