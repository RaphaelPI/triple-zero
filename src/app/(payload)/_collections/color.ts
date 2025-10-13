import { env } from "@/env"
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
  hooks: {
    afterChange: [
      async ({ doc }) => {
        await fetch(`${env.NEXT_PUBLIC_URL}/api/cache/products`, {
          method: "POST",
        })

        return doc
      },
    ],
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
