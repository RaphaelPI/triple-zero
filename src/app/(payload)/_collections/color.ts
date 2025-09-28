import { CollectionConfig } from "payload"
import { color } from "../_fields/color"

export const Color: CollectionConfig = {
  slug: "color",
  labels: {
    singular: "Couleur",
    plural: "Couleurs",
  },
  admin: {
    useAsTitle: "name",
    group: "3 - Information produit",
  },
  fields: [
    {
      name: "name",
      label: "Nom",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "active",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description: "Si la case est cochée, la couleur sera visible",
        position: "sidebar",
      },
    },
    color({
      name: "color",
      label: "Couleur",
      defaultValue: "#FFFFFF",
      required: true,
    }),
  ],
}
