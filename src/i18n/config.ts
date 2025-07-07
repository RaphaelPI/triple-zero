export const DEFAULT_LOCALE = "fr"
export const LOCALES = [DEFAULT_LOCALE, "en"] as const

export type DefaultLocale = typeof DEFAULT_LOCALE
export type Locale = (typeof LOCALES)[number]

export type LocalizedRecord<T = string> = Record<DefaultLocale, T> & Partial<Record<Locale, T>>

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}
