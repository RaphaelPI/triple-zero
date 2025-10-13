import { isDev } from "@/env"

const LEVELS: Record<"log" | "error" | "warn" | "info", string> = {
  error: "🔴",
  log: "🔵",
  info: "🔵",
  warn: "🟡",
}

const log =
  (level: keyof typeof LEVELS) =>
  (message?: any, ...optionalParams: any[]) => {
    if (!isDev() && level === "info") {
      return
    }
    // eslint-disable-next-line no-console
    console[level](LEVELS[level], " ❄️ ", message, ...optionalParams)
  }

export const logger = {
  log: log("log"),
  warn: log("warn"),
  error: log("error"),
  info: log("info"),
}
