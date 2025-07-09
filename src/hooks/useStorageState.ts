import { logger } from "@/lib/logger"
import { SetStateAction, useCallback, useEffect, useState } from "react"

const useStorageState = <T>(
  storage: "sessionStorage" | "localStorage",
  key: string,
  defaultValue: T,
  getData?: () => Promise<T>,
) => {
  const [value, setValue] = useState<T>(defaultValue)

  const setValueAndSave = useCallback(
    (value: SetStateAction<T>) => {
      setValue(value)
      try {
        window[storage].setItem(key, JSON.stringify(value))
      } catch (e) {
        logger.warn(`Error saving to ${storage} for key ${key}`, e)
      }
    },
    [key, storage],
  )

  useEffect(() => {
    try {
      const dataFromStorage = window[storage].getItem(key)
      if (dataFromStorage) {
        setValue(JSON.parse(dataFromStorage))
        return
      }
    } catch (e) {
      logger.warn(`Error getting ${storage} for key ${key}`, e)
      window[storage].removeItem(key)
    }

    // if getData function is provided, use it
    if (getData) {
      getData().then(setValueAndSave)
    }
  }, [getData, key, setValueAndSave, storage])

  return [value, setValueAndSave] as const
}

export const useSessionStorageState = <T>(
  key: string,
  defaultValue: T,
  getData?: () => Promise<T>,
) => useStorageState("sessionStorage", key, defaultValue, getData)

export const useLocalStorageState = <T>(key: string, defaultValue: T, getData?: () => Promise<T>) =>
  useStorageState("localStorage", key, defaultValue, getData)
