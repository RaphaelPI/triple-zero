"use client"

import { TextInput, useField } from "@payloadcms/ui"
import { useEffect } from "react"

interface Props {
  field: { label: string; required?: boolean }
  path: string
}

export const TableInput = (props: Props) => {
  const { label, required = false } = props.field
  const { path } = props

  const { value, setValue } = useField<string[][]>({ path })
  const { value: cols } = useField<number>({ path: "cols" })
  const { value: rows } = useField<number>({ path: "rows" })

  useEffect(() => {
    if (!rows || !cols) {
      return
    }

    if (!value) {
      setValue(Array.from({ length: rows }, () => Array.from({ length: cols }, () => "")))
      return
    }

    if (value.length !== rows || value[0].length !== cols) {
      const newValue = Array.from({ length: rows }, (_, rowIndex) =>
        Array.from({ length: cols }, (_, colIndex) => {
          // Preserve existing values if they exist
          if (rowIndex < value.length && colIndex < value[rowIndex]?.length) {
            return value[rowIndex][colIndex] || ""
          }
          return ""
        }),
      )
      setValue(newValue)
    }
  }, [rows, cols, value, setValue])

  const handleChange =
    (rowIndex: number, colIndex: number) => (e: { target: { value: string } }) => {
      const newValue = [...value]
      newValue[rowIndex][colIndex] = e.target.value
      setValue(newValue)
    }

  return (
    <div>
      <label>
        {label} {required && <span className="required">*</span>}
      </label>
      {rows && cols ? (
        <table className="w-full">
          <tbody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr key={`row-${rowIndex}`}>
                {Array.from({ length: cols }).map((_, colIndex) => (
                  <td key={`col-${colIndex}`}>
                    <TextInput
                      label=""
                      path={`${path}.${rowIndex}.${colIndex}`}
                      onChange={handleChange(rowIndex, colIndex)}
                      value={value?.[rowIndex]?.[colIndex] ?? ""}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-orange-300">Merci de saisir le nombre de lignes et de colonnes</div>
      )}
    </div>
  )
}
