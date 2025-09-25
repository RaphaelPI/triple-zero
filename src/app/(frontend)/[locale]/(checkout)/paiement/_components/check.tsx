import { useTranslations } from "next-intl"

export const Check = () => {
  const t = useTranslations("payment.check")

  return (
    <div className="space-y-2">
      <p>
        {t.rich("description", {
          strong: (chunks) => <span className="font-semibold">{chunks}</span>,
        })}
      </p>
      <div className="whitespace-pre-line">
        {t.rich("description2", {
          strong: (chunks) => <span className="font-semibold">{chunks}</span>,
          em: (chunks) => (
            <div className="bg-grey-light border-blue-grey my-2 w-fit items-center gap-2 rounded-lg border px-2 py-1">
              {chunks}
            </div>
          ),
        })}
      </div>
    </div>
  )
}
