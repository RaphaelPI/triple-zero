"use client"

import Euro from "src/assets/euro.svg"
import Info from "src/assets/info.svg"
import Temperature from "src/assets/temperature.svg"
import Volume from "src/assets/volume.svg"
import Weight from "src/assets/weight.svg"

import { Popover } from "@/components/popover"
import { Button } from "@/components/ui/button"
import { useCheckout } from "@/providers/checkout"
import { useTranslations } from "next-intl"
import { useProduct } from "./product-provider"

export const ProductTechnicalValues = () => {
  const { addItem } = useCheckout()
  const { technicalValues, activeOptions, product, activeColors } = useProduct()
  const t = useTranslations()

  return (
    <>
      <div className="bg-grey-light fixed right-0 bottom-0 left-0 border-t border-t-gray-200">
        <div className="w-section flex items-center justify-center gap-[2vw] p-2 sm:justify-around sm:gap-0">
          <div className="hidden items-center justify-start gap-1 lg:flex lg:gap-2">
            <IconContainer>
              <Euro className="max-h-[60%] max-w-[60%]" />
            </IconContainer>
            <div>
              <div className="text-sm leading-3">{t("price")}</div>
              <div className="font-semibold md:text-lg">{technicalValues?.price}€</div>
            </div>
          </div>
          <Popover content={t("technicalValues.weight")} variant="dark">
            <div className="flex items-center gap-1 lg:gap-2">
              <IconContainer>
                <Weight className="h-8 max-h-[60%] w-8 max-w-[60%] md:h-auto md:w-auto" />
                <div className="text-lg md:hidden">{technicalValues?.weight}g</div>
              </IconContainer>
              <div className="hidden md:block">
                <div className="flex cursor-default items-center gap-1 text-sm">
                  <Info className="size-3 md:inline-block" />{" "}
                  <p className="line-clamp-1 inline">{t("md:weight")}</p>
                </div>
                <div className="font-semibold md:text-lg">{technicalValues?.weight}g</div>
              </div>
            </div>
          </Popover>
          <Popover content={t("technicalValues.volume")} variant="dark">
            <div className="flex items-center gap-1 lg:gap-2">
              <IconContainer>
                <Volume className="h-10 max-h-[80%] w-10 max-w-[80%] md:h-auto md:w-auto" />
                <div className="text-lg md:hidden">{technicalValues?.volume}L</div>
              </IconContainer>
              <div className="hidden md:block">
                <div className="flex cursor-default items-center gap-1 text-sm">
                  <Info className="size-3 md:inline-block" />{" "}
                  <p className="line-clamp-1 text-xs leading-3 md:hidden">{t("volume")}</p>
                  <p className="line-clamp-1 hidden md:inline">{t("md:volume")}</p>
                </div>
                <div className="font-semibold md:text-lg">
                  {technicalValues?.volume} {t("liters")}
                </div>
              </div>
            </div>
          </Popover>
          <Popover content={t("technicalValues.volume")} variant="dark">
            <div className="flex items-center gap-1 lg:gap-2">
              <IconContainer>
                <Temperature className="h-8 max-h-[60%] w-8 max-w-[60%] md:h-auto md:w-auto" />
                <div className="text-lg md:hidden">{technicalValues?.temperature} °</div>
              </IconContainer>
              <div className="hidden md:block">
                <div className="line-clamp-1 flex cursor-default items-center text-xs md:text-sm">
                  <Info className="size-3 md:inline-block" />
                  {t("temperature")}
                </div>
                <div className="font-semibold md:text-lg">{technicalValues?.temperature} °</div>
              </div>
            </div>
          </Popover>
        </div>
        <div className="lg:bg-dark/10 px-section mx-auto hidden py-1 text-center text-xs font-light text-gray-500 italic lg:block">
          {t("technicalValues.hint")}
        </div>
        <div className="py-panel px-panel flex items-center justify-center gap-2 bg-white text-center lg:hidden">
          <div className="text-4xl font-bold">{technicalValues?.price}€</div>
          <Button
            className="px-8 py-2 sm:px-12"
            onClick={() =>
              addItem({
                product,
                options: activeOptions,
                colors: activeColors,
                price: Number(technicalValues?.price),
              })
            }
          >
            {t("cart.add")}
          </Button>
        </div>
      </div>
    </>
  )
}

const IconContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-green border-dark mx-auto flex h-8 w-auto items-center justify-center gap-1 rounded-lg border px-2 font-semibold md:h-12 md:w-12 md:px-0">
      {children}
    </div>
  )
}
