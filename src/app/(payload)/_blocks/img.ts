import type { Block } from "payload"

export const ImgBlock: Block = {
  slug: "img-block",
  labels: {
    singular: "Bloc Image",
    plural: "Blocs Image",
  },

  fields: [
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Image",
    },
    {
      name: "size",
      label: "Taille de l'image",
      type: "select",
      options: ["small", "medium", "large"],
      defaultValue: "medium",
      admin: {
        position: "sidebar",
      },
    },
  ],
}
