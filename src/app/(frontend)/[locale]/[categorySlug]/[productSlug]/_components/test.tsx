"use client"

import { revalidate } from "../actions"

export const Test = ({ slug }: { slug: string }) => {
  return <button onClick={() => revalidate(slug)}>{slug}</button>
}
