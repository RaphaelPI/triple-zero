"use client"

import { TextInput, useField } from "@payloadcms/ui"

interface Props {
  field: { label: string; required?: boolean }
  path: string
}

export const ColorPickerInput = ({ field: { label, required = false }, path }: Props) => {
  const { value, setValue } = useField<string>({ path })

  return (
    <div>
      <label>
        {label} {required && <span className="required">*</span>}
      </label>
      <div className="flex gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="h-12"
        />
        <TextInput
          label=""
          path={path}
          onChange={(e: { target: { value: string } }) => setValue(e.target.value)}
          value={value}
          className="flex-1"
        />
      </div>
    </div>
  )
}
