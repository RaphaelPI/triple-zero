import { revalidateLocalePath } from "@/lib/cache"
import { CollectionConfig } from "payload"
import { Slug } from "../_fields/slug"

export const ProductVariant: CollectionConfig = {
  slug: "product-variant",
  labels: {
    singular: "Incontournable",
    plural: "Incontournables",
  },
  admin: {
    useAsTitle: "title",
    group: "1 - Produits",
  },
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        await revalidateLocalePath({ path: "/", req })

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
      name: "active",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description: "Si la case est cochée, cette variante de produit sera visible",
        position: "sidebar",
      },
    },
    {
      name: "reference",
      type: "relationship",
      relationTo: ["product"],
      required: true,
      admin: {
        description: "Choisissez un produit afin de choisir les options correspondantes",
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
