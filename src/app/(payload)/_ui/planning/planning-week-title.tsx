"use client"

import { formatMinutesToHours } from "@/lib/planning"
import { cn } from "@/lib/utils"
import { useField } from "@payloadcms/ui"

interface Props {
  week: string
  path: string
  totalOrders: number
  worktime: number
}

export const PlanningWeekTitle = ({ week, path, totalOrders, worktime }: Props) => {
  const { value } = useField<any>({ path })
  const { value: defaultWorktime } = useField<number>({ path: "defaultWorktime" })
  const weekWorktime = value[week] ?? defaultWorktime

  const available = weekWorktime * 60 - worktime > 0

  return (
    <div className="p-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 text-left text-lg">
            Semaine du <span className="font-semibold">{week}</span>
          </div>
          <div className="rounded bg-white px-2 py-1 dark:bg-black">
            <span className="font-semibold">{weekWorktime}h</span> au total
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded bg-white px-2 py-1 dark:bg-black">
            <span className="font-semibold">{totalOrders}</span> commande(s)
          </div>
          <div
            className={cn("rounded bg-white px-2 py-1 dark:bg-black", {
              "bg-red-300 dark:bg-red-300": !available,
            })}
          >
            {available ? (
              <>
                <span className="font-semibold">
                  {formatMinutesToHours(weekWorktime * 60 - worktime)}{" "}
                </span>
                disponible(s)
              </>
            ) : (
              <>
                Dépasse de{" "}
                <span className="font-semibold">
                  {formatMinutesToHours(weekWorktime * 60 - worktime)}{" "}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
