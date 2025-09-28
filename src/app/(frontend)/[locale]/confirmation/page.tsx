import { formatDate, setDefaultOptions } from "date-fns"
import { enGB, fr } from "date-fns/locale"
import { getLocale, getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { CartCleaner } from "./_components/cart-cleaner"
import { getOrder, updateOrder } from "./data"

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
  const t = await getTranslations()
  const locale = await getLocale()

  // Set the locale for date-fns
  setDefaultOptions({ locale: locale === "fr" ? fr : enGB })

  if (!orderId) {
    notFound()
  }

  if (payment === "1") {
    await updateOrder(orderId)
  }

  const order = await getOrder(orderId)
  return (
    <div className="section space-y-8 py-32">
      <div className="text-h1 font-semibold">{t("payment.confirmation.title")}</div>
      <div className="space-y-4">
        <div className="text-lg whitespace-pre-line">{t("payment.confirmation.description")}</div>
        {order?.delay && (
          <div className="border-blue rounded-lg border bg-white p-2 text-sm leading-tight italic">
            {t.rich("checkout.confirmation-delay", {
              date: () => formatDate(String(order?.delay), "dd/MM/yyyy"),
              strong: () => <strong>{formatDate(String(order?.delay), "PPPP")}</strong>,
            })}
          </div>
        )}
      </div>
      <CartCleaner />
    </div>
  )
}
