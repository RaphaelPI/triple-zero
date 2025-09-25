import type { Field } from "payload"

export const ColorWithImage: Field = {
  name: "color",
  label: "Couleur",
  type: "group",
  interfaceName: "ColorWithImage",
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
}
