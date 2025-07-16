"use client"

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SelectGroup, SelectLabel } from "@radix-ui/react-select"
import { XCircleIcon } from "lucide-react"
import { useLocale } from "next-intl"
import { Fragment } from "react"
import { Control } from "react-hook-form"
import countriesEN from "../../../../../../data/countries-en"
import countriesFR from "../../../../../../data/countries-fr"

interface Props {
  control: Control<any>
  name: string
  label: string
  description?: string
  placeholder?: string
  required?: boolean
  onChange?: (value: string) => void
}

export const CountrySelectField = ({
  control,
  name,
  label,
  description,
  placeholder,
  required,
  onChange,
}: Props) => {
  const locale = useLocale()
  const countries = locale === "fr" ? countriesFR : countriesEN

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative">
          <FormLabel>
            {label}
            {required && " *"}
          </FormLabel>
          <FormControl>
            <Select
              {...field}
              onValueChange={(value) => {
                field.onChange(value)
                onChange?.(value)
              }}
            >
              {field.value && (
                <button
                  className="absolute top-[42px] right-[11px] -translate-y-1/2"
                  onClick={() => {
                    field.onChange("")
                    onChange?.("")
                  }}
                  aria-label="Effacer le pays"
                >
                  <XCircleIcon className="" />
                </button>
              )}
              <SelectTrigger className="bg-grey-light border-blue-grey w-full flex-shrink-0 cursor-default rounded-lg border">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {Object.entries(countries).map(([continent, countries], index) => (
                  <Fragment key={`${continent}-${index}`}>
                    <SelectSeparator />
                    <SelectGroup>
                      <SelectLabel className="pl-2 text-gray-400">{continent}</SelectLabel>
                      <>
                        {Object.entries(countries).map(([code, country]) => {
                          const key = `${index}-${code}`
                          return (
                            <SelectItem key={key} value={code}>
                              {country}
                            </SelectItem>
                          )
                        })}
                      </>
                    </SelectGroup>
                  </Fragment>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
