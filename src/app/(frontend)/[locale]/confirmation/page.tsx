import { setDefaultOptions } from "date-fns"
import { enGB, fr } from "date-fns/locale"
import { getLocale, getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { ConfirmationPending } from "./_components/confirmation-pending"
import { ConfirmationSuccess } from "./_components/confirmation-success"
import { getOrder } from "./data"

export const dynamic = "force-dynamic"

interface Props {
  searchParams: Promise<{ payment: string; orderId: string }>
}

export const generateMetadata = async () => {
  const t = await getTranslations()

  return {
    title: t("payment.confirmation.title"),
  }
}

export default async ({ searchParams }: Props) => {
  const { payment, orderId } = await searchParams
  const locale = await getLocale()

  // Set the locale for date-fns
  setDefaultOptions({ locale: locale === "fr" ? fr : enGB })

  if (!orderId && payment !== "1") {
    notFound()
  }

  if (orderId) {
    const order = await getOrder(orderId)
    return <ConfirmationSuccess delay={order.delay} />
  }

  return <ConfirmationPending />
}
