import { revalidateLocalePath } from "@/lib/cache"
import { GlobalConfig } from "payload"

export const Faq: GlobalConfig = {
  slug: "faq",
  label: "FAQ",
  admin: {
    group: "2 - Contenu",
  },
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        await revalidateLocalePath({ path: `/questions-frequentes`, type: "page", req })

        return doc
      },
    ],
  },
  fields: [
    {
      name: "categories",
      label: "Categories",
      type: "array",
      required: true,
      admin: {
        components: {
          RowLabel: {
            path: "/app/(payload)/_ui/list-row-label#ListRowLabel",
            clientProps: {
              placeholder: "Titre",
              labelPath: ["title"],
            },
          },
        },
      },
      fields: [
        {
          name: "title",
          label: "Titre",
          type: "text",
          required: true,
          localized: true,
        },
        {
          name: "items",
          type: "array",
          required: true,
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: {
                path: "/app/(payload)/_ui/list-row-label#ListRowLabel",
                clientProps: {
                  placeholder: "question",
                  labelPath: ["question"],
                },
              },
            },
          },
          fields: [
            {
              name: "question",
              label: "Question",
              type: "text",
              required: true,
              localized: true,
            },
            {
              name: "answer",
              label: "Réponse",
              type: "richText",
              required: true,
              localized: true,
            },
          ],
        },
      ],
    },
  ],
}
