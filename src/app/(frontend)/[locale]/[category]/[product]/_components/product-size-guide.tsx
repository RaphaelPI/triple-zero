"use client"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { SizeGuide } from "@/payload-types"
import Info from "src/assets/info.svg"

interface Props {
  sizeGuide: SizeGuide
}
export const ProductSizeGuide = ({ sizeGuide }: Props) => {
  console.log("sizeGuide", sizeGuide)

  return (
    <Tooltip>
      <TooltipTrigger>
        <div className="flex cursor-default items-center text-xs">
          <Info className="mr-1 h-3 w-3" /> {sizeGuide.title}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <div className="px-2 py-1">
          <table className="p-2">
            <tbody>
              yop
              {/* {sizeGuide.table?.rows?.map((row, index) => (
                <tr key={index} className={`${index === 0 ? "border-dark border-b" : ""}`}>
                  {row.cells?.map((cell) => (
                    <td key={cell} className="px-4 py-2">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
      </TooltipContent>
    </Tooltip>
  )
}
