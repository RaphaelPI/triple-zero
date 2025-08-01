import { env } from "@/env"
import { CollectionConfig } from "payload"

export const BlocInfo: CollectionConfig = {
  slug: "blocInfo",
  labels: {
    singular: "Information technique",
    plural: "Informations technique",
  },
  admin: {
    useAsTitle: "title",
    group: "Information produit",
  },
  hooks: {
    afterChange: [
      async (doc) => {
        await fetch(`${env.NEXT_PUBLIC_URL}/api/cache/products`, {
          method: "POST",
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
      label: "Contenu",
      type: "richText",
      localized: true,
    },
  ],
}
