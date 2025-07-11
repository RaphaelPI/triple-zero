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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useLocale } from "next-intl"
import { Control } from "react-hook-form"
import countriesEN from "../countries-en"
import countriesFR from "../countries-fr"

interface Props {
  control: Control<any>
  name: string
  label: string
  description?: string
  placeholder?: string
  required?: boolean
}

export const CountrySelectField = ({
  control,
  name,
  label,
  description,
  placeholder,
  required,
}: Props) => {
  const locale = useLocale()
  const countries = locale === "fr" ? countriesFR : countriesEN

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {required && " *"}
          </FormLabel>
          <FormControl>
            <Select {...field} onValueChange={(value) => field.onChange(value)}>
              <SelectTrigger className="bg-grey-light border-dark w-full flex-shrink-0 cursor-default rounded-lg border">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
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
