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
      localized: true,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      localized: true,
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
      admin: {
        description:
          "Choisissez un produit ou une catégorie. \nProduit: validez les options du produit enquestion. Catégorie: la promotion s'applique sur tous les produits de cette catégorie",
      },
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
