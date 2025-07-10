import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control } from "react-hook-form"

interface Props {
  control: Control<any>
  name: string
  label: string
  description?: string
  placeholder?: string
  type?: "text" | "email" | "tel" | "number" | "password" | "textarea"
  required?: boolean
}

export const InputField = ({
  control,
  name,
  label,
  description,
  placeholder,
  type,
  required,
}: Props) => {
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
            <Input
              type={type}
              placeholder={placeholder}
              className="bg-grey-light border-dark w-full rounded-lg border px-2 py-1"
              {...field}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
