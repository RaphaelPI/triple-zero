import { PHONE } from "@/constants"
import { useTranslations } from "next-intl"

export const PhoneCreditCard = () => {
  const t = useTranslations("payment.phone")
  return (
    <>
      <p>{t("description", { phone: PHONE })}</p>
      <p className="whitespace-pre-line">
        {t.rich("openingHours", {
          strong: (chunks) => <span className="font-semibold">{chunks}</span>,
        })}
      </p>
    </>
  )
}
