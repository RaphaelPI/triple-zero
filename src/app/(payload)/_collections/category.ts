import { CollectionConfig } from "payload"
import { Slug } from "../_fields/slug"

export const Category: CollectionConfig = {
  slug: "category",
  labels: {
    singular: "Catégorie",
    plural: "Catégories",
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
    Slug,
    {
      name: "description",
      label: "Description",
      type: "textarea",
      required: true,
      localized: true,
    },
    {
      label: "Active ?",
      name: "active",
      type: "checkbox",
      defaultValue: true,
    },
  ],
}
