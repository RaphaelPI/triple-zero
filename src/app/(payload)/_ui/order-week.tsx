"use client"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getNextWeeks } from "@/lib/planning"
import { Order } from "@/payload-types"
import { useField } from "@payloadcms/ui"
import { SelectField } from "payload"
import { useState } from "react"

interface Props {
  path: string
  field: SelectField
}

export const OrderWeek = ({ path, field, ...props }: Props) => {
  const { value, setValue } = useField<Order["week"]>({ path })
  const [newWeek, setNewWeek] = useState<Order["week"]>()

  const handleValidate = () => {
    setValue(newWeek)
  }

  return (
    <div className="mb-5">
      <div>Semaine de production</div>
      <div className="bg-grey-light space-y-4 p-4">
        <div className="rounded-lg bg-white p-2">
          Cette commande est prévue pour la semaine du{" "}
          <span className="font-semibold">{value || "Aucune semaine sélectionnée"}</span>
        </div>
        <div className="flex items-center gap-2">
          Changer la semaine de production au
          <Select value={newWeek} onValueChange={setNewWeek}>
            <SelectTrigger className="border-primary border">
              <SelectValue placeholder="Sélectionner une semaine" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {getNextWeeks().map((week) => (
                <SelectItem key={week} value={week}>
                  {week}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="button" onClick={handleValidate}>
            Valider
          </Button>
        </div>
      </div>
    </div>
  )
}
