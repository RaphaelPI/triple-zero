"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { getNextWeeks, NB_WEEKS_PLANNING } from "@/lib/planning"
import { TextInput, useField } from "@payloadcms/ui"

interface Props {
  path: string
}

export const PlanningWeeksSetup = ({ path }: Props) => {
  const { value, setValue } = useField<any>({ path })
  const { value: defaultWorktime } = useField<number>({ path: "defaultWorktime" })

  const handleChange = (week: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      delete value[week]
      setValue({ ...value })
      return
    }

    setValue({ ...value, [week]: Number(e.target.value) })
  }

  return (
    <div className="mb-5">
      <Accordion type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            Configuration des {NB_WEEKS_PLANNING} prochaines semaines
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-8">
              <div className="flex gap-4">
                <div className="w-40 text-right font-semibold">Semaine se finissant le</div>
                <div className="font-semibold">Temps dispo (h)</div>
              </div>
              {getNextWeeks().map((week) => {
                // const currentWeekValue = value[week] ? value[week] : defaultWorktime

                return (
                  <div key={week} className="flex gap-4">
                    <div className="flex w-40 items-center justify-end text-lg">{week}</div>
                    <div>
                      <TextInput
                        path={`${path}.${week}`}
                        value={value[week]?.toString() ?? ""}
                        placeholder={defaultWorktime?.toString() ?? "90"}
                        onChange={handleChange(week)}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
