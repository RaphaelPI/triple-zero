import type { Block } from "payload"

export const TitleBlock: Block = {
  slug: "title-block",
  labels: {
    singular: "Bloc titre",
    plural: "Blocs titre",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Titre",
      required: true,
      localized: true,
    },
  ],
}
