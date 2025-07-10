import type { Block } from "payload"

export const TextBlock: Block = {
  slug: "text-block",
  labels: {
    singular: "Bloc Titre + Texte",
    plural: "Blocs Titre + Texte",
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
      name: "panel",
      label: "Encadrement",
      type: "checkbox",
      defaultValue: true,
      admin: {
        position: "sidebar",
        description: "Si coché, le bloc sera affiché dans un encadré blanc",
      },
    },
  ],
}
