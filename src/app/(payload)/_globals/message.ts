import { deployHook } from "@/lib/cache"
import { GlobalConfig } from "payload"

export const Message: GlobalConfig = {
  slug: "message",
  label: "Le mot de Louis Fernand",
  admin: {
    group: "2 - Contenu",
  },
  hooks: {
    afterChange: [
      async ({ doc }) => {
        await deployHook()

        return doc
      },
    ],
  },
  fields: [
    {
      name: "message",
      type: "richText",
      localized: true,
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
