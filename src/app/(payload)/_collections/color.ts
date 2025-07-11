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
    group: "Produits",
  },
  fields: [
    {
      name: "name",
      label: "Nom",
      type: "text",
      required: true,
    },
    color({
      name: "color",
      label: "Couleur",
      defaultValue: "#FFFFFF",
    }),
  ],
}
