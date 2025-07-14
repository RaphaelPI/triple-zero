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
      type: "richText",
      localized: true,
    },
  ],
}
