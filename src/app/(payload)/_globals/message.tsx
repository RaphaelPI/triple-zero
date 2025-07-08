import { GlobalConfig } from "payload"

export const Message: GlobalConfig = {
  slug: "message",
  label: "Le mot de Luis Fernand",
  admin: {
    group: "Contenu",
  },
  fields: [
    {
      name: "message",
      type: "richText",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "active",
      type: "checkbox",
      defaultValue: true,
    },
  ],
}
