import { revalidateLocalePath } from "@/lib/cache"
import { Product as ProductType } from "@/payload-types"
import { CollectionAfterChangeHook, CollectionConfig } from "payload"
import { ColorWithImage } from "../_fields/color-with-image"
import { ProductOption } from "../_fields/product-option"
import { Slug } from "../_fields/slug"

const revalidateProduct: CollectionAfterChangeHook<ProductType> = async ({ doc, req }) => {
  let categorySlug = ""
  if (typeof doc.category === "string") {
    const category = await req.payload.findByID({
      collection: "category",
      id: doc.category,
    })
    categorySlug = category.slug
  } else {
    categorySlug = doc.category.slug
  }

  await req.payload.db.commitTransaction(req.transactionID as string)

  revalidateLocalePath({ path: `/${categorySlug}/${doc.slug}` })
  revalidateLocalePath({ path: `/${categorySlug}` })

  return doc
}

export const Product: CollectionConfig = {
  slug: "product",
  labels: {
    singular: "Produit",
    plural: "Produits",
  },
  admin: {
    useAsTitle: "title",
    group: "1 - Produits",
  },
  hooks: {
    afterChange: [revalidateProduct],
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
              localized: true,
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
              name: "technicalValues",
              type: "group",
              label: "Informations techniques",
              fields: [
                {
                  name: "price",
                  type: "checkbox",
                  label: "Prix",
                  defaultValue: true,
                },
                {
                  name: "volume",
                  type: "checkbox",
                  label: "Volume",
                  defaultValue: true,
                },
                {
                  name: "weight",
                  type: "checkbox",
                  label: "Poids",
                  defaultValue: true,
                },
                {
                  name: "temperature",
                  type: "checkbox",
                  label: "Température",
                  defaultValue: true,
                },
              ],
              admin: {
                description:
                  "Si vous cochez cette case, ce produit aura les informations techniques de Poids, Volume et Température sur sa fiche. Ne pas cocher pour les produits literie.",
              },
            },
            {
              name: "volumeThreshold",
              type: "checkbox",
              label: "Activer les paliers de volume ? (6L, 7.5L, 9L, 10.5L, 12L, 13.5L)",
              defaultValue: true,
              admin: {
                description:
                  "Si vous cochez cette case, le volume du produits sera affiché en fonction des paliers de volume (6L, 7.5L, 9L, 10.5L, 12L, 13.5L)",
              },
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
            {
              name: "weightModificator",
              label: "Modificateur de poids en %",
              type: "json",
              jsonSchema: {
                uri: "https://json-schema.org/draft/2020-12/schema",
                fileMatch: ["*.json"],
                schema: {
                  type: "object",
                },
              },
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
              name: "blocInfos",
              type: "array",
              admin: {
                initCollapsed: true,
                components: {
                  RowLabel: {
                    path: "/app/(payload)/_ui/list-row-label#ListRowLabel",
                    clientProps: {
                      placeholder: "Bloc d'information",
                      labelPath: ["title"],
                    },
                  },
                },
              },
              fields: [
                {
                  name: "title",
                  type: "text",
                  localized: true,
                  required: true,
                  admin: {
                    description:
                      "Remplace le titre par défaut du bloc d'information pour ce produit.",
                  },
                },
                {
                  name: "infos",
                  type: "array",
                  required: true,
                  admin: {
                    initCollapsed: true,
                    components: {
                      RowLabel: {
                        path: "/app/(payload)/_ui/list-row-label#ListRowLabel",
                        clientProps: {
                          placeholder: "Bloc d'information",
                          labelPath: ["title"],
                        },
                      },
                    },
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
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
