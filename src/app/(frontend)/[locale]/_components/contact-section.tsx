import { PHONE } from "@/constants"
import { env } from "@/env"
import { Link } from "@/i18n/navigation"
import { getTranslations } from "next-intl/server"

export const ContactSection = async () => {
  const t = await getTranslations()

  return (
    <section className="section">
      <div className="px-section py-section text-dark rounded-2xl bg-white text-center">
        <p className="mb-2 text-lg">
          {t("question")}
          <br />
          {t("contactUs")} <span className="text-blue text-xs font-bold">↴</span>
        </p>
        <Link
          prefetch={false}
          href={`tel:${PHONE.replaceAll(" ", "")}`}
          className="text-dark p-2 md:p-0"
        >
          {PHONE}
        </Link>{" "}
        |{" "}
        <Link
          prefetch={false}
          href={`mailto:${env.NEXT_PUBLIC_EMAIL}`}
          className="text-dark p-2 md:p-0"
        >
          {env.NEXT_PUBLIC_EMAIL}
        </Link>
      </div>
    </section>
  )
}
