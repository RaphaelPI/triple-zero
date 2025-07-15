import cookies from "js-cookie"
import { useEffect, useState } from "react"

export const useCookieState = <T>(key: string, initialValue: T): [T, (value: T) => void] => {
  const [value, setValue] = useState<T>(initialValue)

  useEffect(() => {
    const cookieValue = cookies.get(key)
    if (cookieValue) {
      try {
        setValue(JSON.parse(cookieValue) as T)
      } catch {
        cookies.remove(key)
      }
    }
  }, [])

  const setNextValue = (value: T) => {
    cookies.set(key, JSON.stringify(value))
    setValue(value)
  }

  return [value, setNextValue]
}
