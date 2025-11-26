import cookies from "js-cookie"
import { useEffect, useState } from "react"

export const useCookieState = <T>(
  key: string,
  initialValue: T,
  expires?: Date,
): [T, (value: T) => void, boolean] => {
  const [value, setValue] = useState<T>(initialValue)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cookieValue = cookies.get(key)
    if (cookieValue) {
      try {
        setValue(JSON.parse(cookieValue) as T)
      } catch {
        cookies.remove(key)
      }
    }

    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setNextValue = (value: T) => {
    cookies.set(key, JSON.stringify(value), { expires })
    setValue(value)
  }

  return [value, setNextValue, loading]
}
