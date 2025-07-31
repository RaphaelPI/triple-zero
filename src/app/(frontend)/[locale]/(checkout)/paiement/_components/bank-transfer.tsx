import { CopyIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

const DATA = [
  {
    label: "IBAN",
    value: "FR76 1005 7194 6700 0682 0890 143",
  },
  {
    label: "SWIFT/BIC",
    value: "CMCIFRPP",
  },
]

export const BankTransfer = () => {
  const t = useTranslations("payment.transfer")

  const handleCopy = (value: string) => () => {
    navigator.clipboard.writeText(value)
    toast.success("Copié dans le presse-papiers")
  }

  return (
    <div className="space-y-2">
      <p>{t("description")}</p>
      {DATA.map((item) => (
        <div key={item.label}>
          {item.label}
          <span
            className="bg-grey-light border-blue-grey group ml-4 inline-flex cursor-pointer items-center gap-2 rounded-lg border px-2 py-1"
            onClick={handleCopy(item.value)}
          >
            {item.value}
            <CopyIcon className="text-blue-grey inline size-4 group-hover:text-black" />
          </span>
        </div>
      ))}
      <p>{t("description2")}</p>
    </div>
  )
}

//       <div>
//         IBAN
//         <span
//           className="bg-grey-light border-blue-grey group ml-4 inline-flex cursor-pointer items-center gap-2 rounded-lg border px-2 py-1"
//           onClick={handleCopy(IBAN)}
//         >
//           {IBAN}
//           <CopyIcon className="text-blue-grey inline size-4 group-hover:text-black" />
//         </span>
//       </div>
//       <div>
//         SWIFT/BIC
//         <span
//           className="bg-grey-light border-blue-grey group ml-4 inline-flex cursor-pointer items-center gap-2 rounded-lg border px-2 py-1"
//           onClick={handleCopy(SWIFT)}
//         >
//           {SWIFT}
//         </span>
//       </div>
//       <p>La préparation de votre commande commencera dès réception de votre paiement.</p>
//     </>
//   )
// }
