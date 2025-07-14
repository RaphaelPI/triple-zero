import { CollectionConfig } from "payload"
import { Slug } from "../_fields/slug"

export const Promotion: CollectionConfig = {
  slug: "promotion",
  labels: {
    singular: "Promotion",
    plural: "Promotions",
  },
  admin: {
    useAsTitle: "title",
    group: "Produits",
  },
  fields: [
    {
      name: "title",
      label: "Titre",
      type: "text",
      required: true,
    },
    Slug,
    {
      name: "value",
      label: "Remise",
      type: "number",
      required: true,
    },
    {
      name: "active",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description: "Si la case est cochée, la promotion sera visible",
        position: "sidebar",
      },
    },
    {
      name: "reference",
      type: "relationship",
      relationTo: ["product", "category"],
      required: true,
    },
    {
      name: "options",
      type: "json",
      defaultValue: [],
      admin: {
        components: {
          Field: {
            path: "/app/(payload)/_ui/product-options-input#ProductOptionsInput",
          },
        },
      },
    },
  ],
}
