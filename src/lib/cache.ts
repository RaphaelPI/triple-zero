import { LOCALES } from "@/i18n/config"
import { revalidatePath } from "next/cache"

export const localeRevalidatePath = (path: string) => {
  LOCALES.forEach((locale) => {
    revalidatePath(`/${locale}${path}`, "page")
  })
}
