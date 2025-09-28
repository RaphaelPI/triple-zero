import { Locale } from "@/i18n/config"
import { Metadata } from "next"

import { Breadcrumbs } from "@/components/breadcrumbs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { RichText } from "@payloadcms/richtext-lexical/react"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { getMetadata } from "../metadata"
import { getFaqData } from "./data"

export const dynamic = "force-dynamic"

interface Props {
  params: Promise<{
    locale: Locale
    categorySlug: string
    productSlug: string
  }>
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { locale } = await props.params
  const t = await getTranslations()

  return getMetadata({
    locale,
    pathname: "/questions-frequentes",
    title: t("faq.title"),
    description: t("faq.description"),
  })
}

export default async (props: Props) => {
  const { locale } = await props.params

  // Enable static rendering
  setRequestLocale(locale)

  const faq = await getFaqData()
  const t = await getTranslations()

  return (
    <main className="bg-flake bg-flake-bl pb-section space-y-8 bg-no-repeat">
      <div className="w-section px-section pt-section">
        <Breadcrumbs items={[{ label: t("faq.title") }]} />
        <h1>{t("faq.title")}</h1>
      </div>
      <section className="w-section px-section">
        <div>{t("faq.description")}</div>
      </section>
      {faq.categories.map(({ id, title, items }) => {
        return (
          <section className="w-section px-section" key={id}>
            <div className="panel px-panel py-panel space-y-4">
              <div className="text-xl font-bold">{title}</div>
              <Accordion type="single" collapsible>
                {items.map((item) => {
                  return (
                    <AccordionItem key={item.id} value={String(item.id)}>
                      <AccordionTrigger className="font-semibold">{item.question}</AccordionTrigger>
                      <AccordionContent>
                        <RichText data={item.answer} />
                      </AccordionContent>
                    </AccordionItem>
                  )
                })}
              </Accordion>
            </div>
          </section>
        )
      })}
    </main>
  )
}
