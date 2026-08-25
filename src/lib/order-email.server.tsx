import { OrderView } from "@/components/order-view"
import {
  TEMPLATE_EMAIL_ORDER_CONFIRMATION_CUSTOMER_EN,
  TEMPLATE_EMAIL_ORDER_CONFIRMATION_CUSTOMER_FR,
} from "@/constants"
import { env } from "@/env"
import { sendEmail, SendEmailProps } from "@/lib/mailjet.server"
import { Order } from "@/payload-types"
import { format } from "date-fns"
import { getTranslations } from "next-intl/server"

export const sendOrderConfirmationEmail = async (order: Order) => {
  if (!order.payment) return

  const locale = (order.locale as "fr" | "en") ?? "fr"
  const { renderToString } = await import("react-dom/server")

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const detail = order.detail as any

  const content = renderToString(
    <OrderView
      deliveryData={detail?.deliveryData}
      lines={detail?.lines ?? []}
      detail={detail}
      comment={order.comment ?? undefined}
      shippingFee={order.shippingFee}
      amount={order.amount}
      uid={order.uid}
      date={order.date}
      delay={order.delay ?? undefined}
      payment={order.payment}
    />,
  )

  const t = await getTranslations({ locale })
  const templateId =
    locale === "fr"
      ? TEMPLATE_EMAIL_ORDER_CONFIRMATION_CUSTOMER_FR
      : TEMPLATE_EMAIL_ORDER_CONFIRMATION_CUSTOMER_EN

  const payment = renderToString(
    t.rich(`email.orderConfirmation.${order.payment}`, {
      strong: (chunks) => <strong>{chunks}</strong>,
      br: () => (
        <>
          <br />
          <br />
        </>
      ),
    }),
  )

  const options: SendEmailProps = {
    to: [{ Email: order.email, Name: order.customer }],
    subject: t("email.orderConfirmation.subject"),
    templateId,
    variables: {
      order: content,
      payment,
      delay: order.delay ? format(order.delay, "dd/MM/yyyy") : "",
    },
  }

  if (env.NODE_ENV === "production") {
    options.bcc = [{ Email: env.NEXT_PUBLIC_EMAIL, Name: "Triple Zero" }]
  }

  await sendEmail(options)
}
