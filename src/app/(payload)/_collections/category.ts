import { slugify } from "@/lib/slugify"
import { CollectionConfig } from "payload"

export const Category: CollectionConfig = {
  slug: "category",
  labels: {
    singular: "Catégorie",
    plural: "Catégories",
  },
  admin: {
    useAsTitle: "title",
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data?.slug) {
          return { ...data, slug: slugify(data?.title) }
        }

        return data
      },
    ],
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
      name: "slug",
      type: "text",
      admin: {
        readOnly: true,
      },
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      required: true,
      localized: true,
    },
  ],
}
