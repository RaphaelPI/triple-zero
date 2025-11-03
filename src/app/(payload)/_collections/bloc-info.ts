import { revalidateGlobalPath } from "@/lib/cache"
import { CollectionConfig } from "payload"

export const BlocInfo: CollectionConfig = {
  slug: "blocInfo",
  labels: {
    singular: "Information technique",
    plural: "Informations technique",
  },
  admin: {
    useAsTitle: "title",
    group: "3 - Information produit",
  },
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        // await req.payload.db.commitTransaction(req.transactionID as string)
        await revalidateGlobalPath({
          path: `/(frontend)/[locale]/[categorySlug]/[productSlug]`,
          type: "page",
          req,
        })

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
      name: "content",
      label: "2 - Contenu",
      type: "richText",
      localized: true,
    },
  ],
}
