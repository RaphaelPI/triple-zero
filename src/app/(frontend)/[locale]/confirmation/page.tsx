import { setDefaultOptions } from "date-fns"
import { enGB, fr } from "date-fns/locale"
import { getLocale, getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { ContactSection } from "../_components/contact-section"
import { AlreadyHandled } from "./_components/already-handled"
import { ConfirmationSuccess } from "./_components/confirmation-success"
import { createOrderFromPreOrder, getOrder } from "./data"

export const dynamic = "force-dynamic"

interface Props {
  searchParams: Promise<{ id: string; type: "order" | "pre-order" }>
}

export const generateMetadata = async () => {
  const t = await getTranslations()

  return {
    title: t("payment.confirmation.title"),
  }
}

export default async ({ searchParams }: Props) => {
  const { id, type } = await searchParams
  const locale = await getLocale()

  // Set the locale for date-fns
  setDefaultOptions({ locale: locale === "fr" ? fr : enGB })

  if (!id && !["order", "pre-order"].includes(type)) {
    notFound()
  }

  let content = null
  if (id && type === "pre-order") {
    try {
      const order = await createOrderFromPreOrder(id)
      content = <ConfirmationSuccess delay={order.delay} />
    } catch (error) {
      content = <AlreadyHandled />
    }
  } else if (id && type === "order") {
    const order = await getOrder(id)
    content = <ConfirmationSuccess delay={order.delay} />
  }

  return (
    <>
      {content}
      <ContactSection />
    </>
  )
}
