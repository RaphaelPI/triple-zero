import { CollectionConfig } from "payload"
import { ColorWithImage } from "../_fields/color-with-image"
import { ProductOption } from "../_fields/product-option"
import { Slug } from "../_fields/slug"

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
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Informations produit",
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
            Slug,
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
              required: true,
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
            {
              name: "colors",
              type: "array",
              fields: [ColorWithImage],
              admin: {
                initCollapsed: true,
                components: {
                  RowLabel: {
                    path: "/app/(payload)/_ui/list-row-label#ListRowLabel",
                    clientProps: {
                      placeholder: "Couleur",
                    },
                  },
                },
              },
            },
            {
              name: "colorsSecondary",
              type: "array",
              fields: [ColorWithImage],
              admin: {
                initCollapsed: true,
              },
            },
          ],
        },
        {
          label: "Options",
          fields: [
            {
              name: "options",
              type: "array",
              fields: [ProductOption],
              admin: {
                initCollapsed: true,
                components: {
                  RowLabel: {
                    path: "/app/(payload)/_ui/list-row-label#ListRowLabel",
                    clientProps: {
                      placeholder: "Option",
                      labelPath: ["option", "title"],
                    },
                  },
                },
              },
            },
          ],
        },
        {
          label: "Options Avancées",
          fields: [
            {
              name: "advanced",
              type: "array",
              fields: [ProductOption],
              admin: {
                initCollapsed: true,
                components: {
                  RowLabel: {
                    path: "/app/(payload)/_ui/list-row-label#ListRowLabel",
                    clientProps: {
                      placeholder: "Option",
                      labelPath: ["option", "title"],
                    },
                  },
                },
              },
            },
          ],
        },
        {
          label: "Fiche technique",
          fields: [
            {
              name: "technicalInfos",
              label: "Informations techniques",
              type: "array",
              admin: {
                initCollapsed: true,
              },
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
                },
              ],
            },
            {
              name: "materials",
              label: "Matériaux",
              type: "array",
              admin: {
                initCollapsed: true,
              },
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
                },
              ],
            },
            {
              name: "care",
              label: "Entretien",
              type: "array",
              admin: {
                initCollapsed: true,
              },
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
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
