import { GlobalConfig } from "payload"

export const Nav: GlobalConfig = {
  slug: "nav",
  label: "Menu",
  admin: {
    group: "Contenu",
  },
  fields: [
    {
      name: "items",
      type: "array",
      required: true,
      maxRows: 4,
      admin: {
        components: {
          RowLabel: {
            path: "/app/(payload)/_ui/list-row-label#ListRowLabel",
            clientProps: {
              placeholder: "Item",
              labelPath: ["title"],
            },
          },
        },
      },
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
