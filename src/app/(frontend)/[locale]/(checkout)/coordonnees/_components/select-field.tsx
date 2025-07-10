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
import { Control } from "react-hook-form"

interface Props {
  control: Control<any>
  name: string
  label: string
  description?: string
  placeholder?: string
  options: { value: any; label: string }[]
}

export const SelectField = ({ control, name, label, description, placeholder, options }: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select {...field}>
              <SelectTrigger className="bg-grey-light border-dark w-full flex-shrink-0 cursor-default rounded-lg border">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {options.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    {label}
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
