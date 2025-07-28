"use client"

import { useRowLabel } from "@payloadcms/ui"

interface Props {
  placeholder: string
  labelPath?: string[]
}

export const ListRowLabel = ({ placeholder, labelPath }: Props) => {
  const { data, rowNumber } = useRowLabel<Record<string, string | undefined>>()

  const customLabel =
    labelPath?.reduce((acc: any, key) => acc?.[key], data) ??
    `${placeholder} ${String((rowNumber ?? 0) + 1).padStart(2, "0")} `

  return customLabel
}
