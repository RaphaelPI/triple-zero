import { useCookieState } from "@/hooks/use-cookie-state"
import { createContext, useContext, useEffect, useState } from "react"

interface ICountryContext {
  country: string
  loading: boolean
}

const CountryContext = createContext<ICountryContext>({} as ICountryContext)
export const CountryProvider = ({ children }: { children: React.ReactNode }) => {
  const [country, setCountry, loading] = useCookieState<string>("country", "")
  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    if (country || loading || fetching) {
      return
    }

    getCountry()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, country])

  const getCountry = async () => {
    setFetching(true)
    try {
      const response = await fetch("https://ipapi.co/json", {
        method: "GET",
      })
      const data = await response.json()

      setCountry(data.country_code)
    } catch (_) {
      setCountry("FR")
    } finally {
      setFetching(false)
    }
  }

  return (
    <CountryContext.Provider
      value={{
        country,
        loading,
      }}
    >
      {children}
    </CountryContext.Provider>
  )
}

export const useCountry = () => {
  const context = useContext(CountryContext)
  if (!context) {
    throw new Error("useCountry must be used within a CountryProvider")
  }
  return context
}
