import { Button } from "@/components/ui/button"
import { DEFAULT_LOCALE } from "@/i18n/config"
import { Link } from "@/i18n/navigation"
import { Metadata } from "next"
import { useTranslations } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import Logo from "src/assets/logo.svg"
import { getMetadata } from "./metadata"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations()
  return getMetadata({
    title: t("notFound.title"),
    robots: {
      index: false,
      follow: false,
    },
  })
}

export default function NotFound() {
  setRequestLocale(DEFAULT_LOCALE)
  const t = useTranslations()

  return (
    <div className="section space-y-10 py-20 text-center lg:py-40">
      <Logo className="mx-auto h-28 w-10/12 max-w-xs" />
      <div>
        <div className="text-h1 font-semibold">{t("notFound.title")}</div>
        <div className="text-lg">{t("notFound.description")}</div>
      </div>
      <Link prefetch={false} href="/">
        <Button aria-label={t("menu.home")}>{t("menu.home")}</Button>
      </Link>
    </div>
  )
}
