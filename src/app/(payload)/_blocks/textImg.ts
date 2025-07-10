import type { Block } from "payload"

export const TextImgBlock: Block = {
  slug: "text-img-block",
  labels: {
    singular: "Bloc Image + Titre + Texte",
    plural: "Blocs Image + Titre + Texte",
  },

  fields: [
    {
      name: "title",
      type: "text",
      label: "Titre",
      localized: true,
    },
    {
      name: "content",
      type: "richText",
      required: true,
      label: "Texte",
      localized: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Image",
    },
    {
      name: "panel",
      label: "Encadrement du texte",
      type: "checkbox",
      defaultValue: true,
      admin: {
        position: "sidebar",
        description: "Si coché, le bloc sera affiché dans un encadré blanc",
      },
    },
    {
      name: "align",
      label: "Alignement de l'image",
      type: "select",
      options: ["left", "right"],
      defaultValue: "left",
      admin: {
        position: "sidebar",
      },
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
