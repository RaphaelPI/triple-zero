import { uuid } from "@/lib/uuid"
import { Field } from "payload"
import { optionDeltaValue } from "./product-option-delta-value"

export const optionValues = (): Field => ({
  name: "values",
  type: "array",
  label: "Valeurs",
  admin: {
    initCollapsed: true,
    components: {
      RowLabel: {
        path: "/app/(payload)/_ui/list-row-label#ListRowLabel",
        clientProps: {
          placeholder: "Valeur",
        },
      },
    },
  },
  fields: [
    {
      label: "Titre",
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    optionDeltaValue(),
    {
      label: "Valeur par défaut ?",
      name: "defaultValue",
      type: "checkbox",
    },
    {
      label: "Image",
      admin: {
        description: "Facultatif. Image permettant d'illustrer cette option.",
      },
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      label: "Identifiant",
      name: "value",
      type: "text",
      defaultValue: () => uuid(),
      admin: {
        readOnly: true,
      },
    },
  ],
})
