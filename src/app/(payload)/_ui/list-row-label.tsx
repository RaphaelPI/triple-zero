"use client"

import { useRowLabel } from "@payloadcms/ui"

interface Props {
  placeholder: string
  path?: string[]
}

export const ListRowLabel = ({ placeholder, path }: Props) => {
  const { data, rowNumber } = useRowLabel<Record<string, string | undefined>>()

  const customLabel =
    path?.reduce((acc: any, key) => acc[key], data) ??
    `${placeholder} ${String(rowNumber).padStart(2, "0")} `

  return customLabel
}
