import { Locale } from "@/i18n/config"
import { Link } from "@/i18n/navigation"
import { getLocale } from "next-intl/server"
import Marquee from "react-fast-marquee"
import { getCategoriesData } from "../../data"

export const HomeCategories = async () => {
  const locale = await getLocale()
  const categories = await getCategoriesData(locale as Locale)
  return (
    <div className="bg-green py-5">
      <Marquee>
        {categories.docs.flatMap(({ id, title, slug }) => (
          <div key={id} className="text-4xl leading-snug font-bold italic">
            <Link href={`/${slug}`} className="link">
              {title}
            </Link>
            <span className="mx-4 not-italic">❆</span>
          </div>
        ))}
      </Marquee>
    </div>
  )
}
