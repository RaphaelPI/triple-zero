import { Link } from "@/i18n/navigation"
import Marquee from "react-fast-marquee"
import { getHomeCategoriesData } from "../../data"

export const HomeCategories = async () => {
  const categories = await getHomeCategoriesData()

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
