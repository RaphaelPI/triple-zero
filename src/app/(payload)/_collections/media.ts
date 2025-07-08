import type { CollectionConfig } from "payload"

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: "Média",
    plural: "Médias",
  },
  admin: {
    group: "Administration",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: true,
}
