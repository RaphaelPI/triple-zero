import { revalidateLocalePath } from "@/lib/cache"
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
    group: "1 - Produits",
  },
  hooks: {
    afterChange: [
      async ({ doc }) => {
        await revalidateLocalePath({ path: `/${doc.slug}` })

        // TODO revalidate product page for similar product order ?
        return doc
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        await Promise.all([
          revalidateLocalePath({ path: `/` }),
          revalidateLocalePath({ path: `/${doc.slug}` }),
        ])
        return doc
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
    {
      name: "order",
      label: "Ordre des produits",
      type: "relationship",
      relationTo: "product",
      hasMany: true,
      filterOptions: ({ data }) => {
        return {
          "category.slug": { equals: data.slug },
        }
      },
    },
  ],
}
