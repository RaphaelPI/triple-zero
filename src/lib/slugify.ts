import s from "slugify"

export const slugify = (text: string) => s(text, { lower: true })
