import type { Field } from "payload"

export const colorWithImage = (name: string, label: string): Field => ({
  name,
  label,
  type: "array",
  fields: [
    {
      name: "default",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "color",
      type: "relationship",
      relationTo: "color",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
  ],
})
