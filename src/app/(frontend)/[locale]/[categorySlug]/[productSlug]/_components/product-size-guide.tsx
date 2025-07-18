import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SizeGuide } from "@/payload-types"
import { useTranslations } from "next-intl"
import Info from "src/assets/info.svg"

interface Props {
  sizeGuide: SizeGuide
}
export const ProductSizeGuide = ({ sizeGuide }: Props) => {
  const t = useTranslations()

  return (
    <Dialog>
      <DialogTrigger className="flex cursor-pointer items-center text-xs">
        <Info className="mr-1 h-3 w-3" /> {t("sizeGuide")}
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>{t("sizeGuide")}</DialogTitle>
          <table>
            <tbody>
              {sizeGuide.table?.map((row, index) => (
                <tr key={index} className={`${index === 0 ? "border-dark border-b" : ""}`}>
                  {row.map((cell) => (
                    <td key={cell} className="px-4 py-2">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
