import { slugify } from "@/lib/slugify"
import { CollectionConfig } from "payload"
import { colorWithImage } from "../_fields/color-with-image"
import { options } from "../_fields/product-option"

export const Product: CollectionConfig = {
  slug: "product",
  labels: {
    singular: "Produit",
    plural: "Produits",
  },
  admin: {
    useAsTitle: "title",
    group: "Produits",
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
      type: "tabs",
      tabs: [
        {
          label: "Informations produits",
          fields: [
            {
              name: "category",
              type: "relationship",
              relationTo: "category",
              required: true,
            },
            {
              name: "title",
              label: "Titre",
              type: "text",
              required: true,
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
            {
              name: "images",
              label: "Images par défaut",
              type: "array",
              fields: [
                {
                  name: "image",
                  type: "upload",
                  relationTo: "media",
                },
              ],
            },
            {
              name: "sizeGuide",
              label: "Guide des tailles",
              type: "relationship",
              relationTo: "sizeGuide",
            },
          ],
        },
        {
          label: "Couleurs",
          fields: [
            colorWithImage("colors", "Couleurs"),
            colorWithImage("colorsSecondary", "Couleurs secondaires (bas)"),
          ],
        },
        {
          label: "Options",
          fields: [options("options", "Options")],
        },
        {
          label: "Options Avancées",
          fields: [options("advanced", "Options avancées")],
        },
        {
          label: "Informations produit",
          fields: [
            {
              name: "technicalInfos",
              label: "Informations techniques",
              type: "array",
              fields: [
                {
                  name: "title",
                  type: "text",
                  localized: true,
                  admin: {
                    description:
                      "Remplace le titre par défaut du bloc d'information pour ce produit.",
                  },
                },
                {
                  name: "info",
                  type: "relationship",
                  relationTo: "blocInfo",
                  hasMany: true,
                },
              ],
            },
            {
              name: "materials",
              label: "Matériaux",
              type: "array",
              fields: [
                {
                  name: "title",
                  type: "text",
                  localized: true,
                  admin: {
                    description:
                      "Remplace le titre par défaut du bloc d'information pour ce produit.",
                  },
                },
                {
                  name: "info",
                  type: "relationship",
                  relationTo: "blocInfo",
                  hasMany: true,
                },
              ],
            },
            {
              name: "care",
              label: "Entretien",
              type: "array",
              fields: [
                {
                  name: "title",
                  type: "text",
                  localized: true,
                  admin: {
                    description:
                      "Remplace le titre par défaut du bloc d'information pour ce produit.",
                  },
                },
                {
                  name: "info",
                  type: "relationship",
                  relationTo: "blocInfo",
                  hasMany: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
