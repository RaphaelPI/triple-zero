import { isDev } from "@/env"

const LEVELS: Record<"log" | "error" | "warn", string> = {
  error: "🔴",
  log: "🔵",
  warn: "🟡",
}

const log =
  (level: keyof typeof LEVELS) =>
  (message?: any, ...optionalParams: any[]) => {
    if (!isDev() && level === "log") {
      return
    }
    // eslint-disable-next-line no-console
    console[level](LEVELS[level], "❄️", message, ...optionalParams)
  }

export const logger = {
  log: log("log"),
  warn: log("warn"),
  error: log("error"),
}
