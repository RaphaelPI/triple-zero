import { uuid } from "@/lib/uuid"
import { Field } from "payload"
import { ProductOptionDeltaValue } from "./product-option-delta-value"

export const ProductOptionValue: Field = {
  name: "value",
  type: "group",
  label: "Valeurs",
  interfaceName: "ProductOptionValue",
  fields: [
    {
      label: "Titre",
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "delta",
      type: "array",
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: {
            path: "/app/(payload)/_ui/list-row-label#ListRowLabel",
            clientProps: {
              placeholder: "Impact",
              path: ["delta", "type"],
            },
          },
        },
      },
      fields: [ProductOptionDeltaValue],
    },
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
      required: true,
      admin: {
        readOnly: true,
      },
    },
  ],
}
