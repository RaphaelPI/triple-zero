import { getTranslations } from "next-intl/server"
import LogoMin from "src/assets/logo-min.svg"

export const HomeHero = async () => {
  const t = await getTranslations()

  return (
    <div className="section mb-12 space-y-4">
      <div className="text-h1 text-center font-bold text-black">{t("slogan")}</div>
      <LogoMin className="animate-in fade-in mx-auto size-80 duration-1000" />
      <div className="text-center text-black">{t("description")}</div>
    </div>
  )
}
