import { Field } from "payload"
import { optionValues } from "./product-option-value"

export const options = (name: string, label: string): Field => ({
  name,
  type: "array",
  label,
  admin: {
    initCollapsed: true,
    components: {
      RowLabel: {
        path: "/app/(payload)/_ui/list-row-label#ListRowLabel",
        clientProps: {
          placeholder: "Option",
        },
      },
    },
  },
  fields: [
    {
      name: "title",
      label: "Titre",
      type: "text",
      required: true,
      localized: true,
    },
    optionValues(),
    {
      name: "description",
      label: "Description",
      type: "textarea",
      admin: {
        description: "Facultatif. Ce texte s'affichera en tooltip au survol de l'option.",
      },
      localized: true,
    },
  ],
})
