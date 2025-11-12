import { deployHook } from "@/lib/cache"
import { CollectionConfig } from "payload"
import { Slug } from "../_fields/slug"
import { getProduct } from "../_ui/action"

export const Promotion: CollectionConfig = {
  slug: "promotion",
  labels: {
    singular: "Promotion",
    plural: "Promotions",
  },
  admin: {
    useAsTitle: "title",
    group: "1 - Produits",
    defaultColumns: ["title", "active", "reference", "value", "description"],
  },
  hooks: {
    beforeChange: [
      async ({ data }) => {
        if (!data.options || data.options.length === 0) {
          if (!data.reference || data.reference.relationTo !== "product") {
            return data
          }

          const product = await getProduct(data.reference.value)
          data.options = product.options
            ?.filter((option) => option.option.values?.some(({ value }) => value.defaultValue))
            .map((option) => {
              return [
                option.option,
                option.option.values?.find(({ value }) => value.defaultValue)?.value,
              ]
            })
        }

        return data
      },
    ],
    afterChange: [
      async ({ doc }) => {
        await deployHook()

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
    {
      name: "description",
      label: "Description",
      type: "textarea",
      localized: true,
    },
    Slug,
    {
      label: "Image",
      name: "image",
      type: "upload",
      relationTo: "media",
      admin: {
        description:
          "L'image n'est pas obligatoire, si il n'y en a pas on affichera la premiere image du produit lié à la promo",
      },
    },
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
      name: "color",
      type: "relationship",
      relationTo: "color",
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
