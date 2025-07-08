"use client"

import { useRowLabel } from "@payloadcms/ui"

interface Props {
  placeholder: string
  objectKey?: string
}

export const ListRowLabel = ({ placeholder, objectKey = "title" }: Props) => {
  const { data, rowNumber } = useRowLabel<Record<string, string | undefined>>()

  const customLabel = data[objectKey] ?? `${placeholder} ${String(rowNumber).padStart(2, "0")} `

  return customLabel
}
