import { stripe } from "@/lib/stripe.server"
import { getTranslations } from "next-intl/server"
import { OrderDetail } from "./_components/order"

interface Props {
  params: Promise<{
    sessionId: string
  }>
}

export const generateMetadata = async () => {
  const t = await getTranslations()

  return {
    title: t("payment.confirmation.title"),
  }
}

export default async ({ params }: Props) => {
  const { sessionId } = await params
  const t = await getTranslations()
  const session = await stripe.checkout.sessions.retrieve(sessionId)
  console.log(session)

  return (
    <div className="section space-y-8 pb-16">
      <div className="text-h1 font-semibold">{t("payment.confirmation.title")}</div>
      <OrderDetail />
    </div>
  )
}
