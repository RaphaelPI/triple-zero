import { GlobalConfig } from "payload"

export const Message: GlobalConfig = {
  slug: "message",
  label: "Le mot de Luis Fernand",
  admin: {
    group: "2 - Contenu",
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
      admin: {
        description: "Si la case est cochée, le message sera affiché",
        position: "sidebar",
      },
    },
    {
      name: "modal",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description:
          "Si la case est cochée, le message s'affichera sur la première page affichée du site dans une modale",
        position: "sidebar",
      },
    },
  ],
}
