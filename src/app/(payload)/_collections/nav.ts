import { GlobalConfig } from "payload"

export const Nav: GlobalConfig = {
  slug: "nav",
  label: "Menu",
  fields: [
    {
      name: "items",
      type: "array",
      required: true,
      maxRows: 4,
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          localized: true,
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "category",
          type: "relationship",
          relationTo: "category",
          required: true,
          hasMany: true,
        },
      ],
    },
  ],
}
