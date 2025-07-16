import { ADDRESS, ADDRESS_COUNTRY, ADDRESS_TOWN, ADDRESS_ZIP, EMAIL, PHONE } from "@/constants"
import { Locale } from "@/i18n/config"
import { getLocale, getTranslations } from "next-intl/server"
import Link from "next/link"
import LogoMin from "src/assets/logo-min.svg"
import Mountain from "src/assets/moutain.svg"
import { getNavData } from "../data"

export const Footer = async () => {
  const locale = await getLocale()
  const t = await getTranslations()
  const nav = await getNavData(locale as Locale)

  return (
    <footer className="bg-dark relative overflow-hidden">
      <Mountain className="absolute -right-[500px] -bottom-[300px] z-0 w-[1600px]" />
      <div className="section relative space-y-4 pb-32 text-center">
        <div>
          <div className="text-h1 font-bold text-white">Triple Zéro</div>
          <div className="text-white">{t("description")}</div>
        </div>
        <div>
          <LogoMin className="mx-auto block h-40 w-40" />
          <h2 className="text-blue-grey text-xl italic">{t("slogan")}</h2>
        </div>
        <Separator />
        <div className="max-xs:flex-col flex justify-center gap-10 text-white md:gap-20">
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
        <Separator />
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
        <Separator />
        <div>
          <Link href="/p/conditions-generales-de-vente" className="link text-white">
            {t("cgu")}
          </Link>
        </div>
      </div>
    </footer>
  )
}

const Separator = () => <div className="mx-auto h-[1px] w-full bg-[#232323] md:w-1/2" />
