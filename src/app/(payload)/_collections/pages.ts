import { revalidatePath, revalidateTag } from "next/cache"
import type { CollectionConfig } from "payload"
import { ImgBlock } from "../_blocks/img"
import { TextBlock } from "../_blocks/text"
import { TextImgBlock } from "../_blocks/textImg"
import { TitleBlock } from "../_blocks/title"
import { Slug } from "../_fields/slug"

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
    group: "2 - Contenu",
  },
  hooks: {
    afterChange: [
      ({ doc, previousDoc, req: { payload, context } }) => {
        if (!context.disableRevalidate) {
          if (doc._status === "published") {
            const path = `/posts/${doc.slug}`

            payload.logger.info(`Revalidating post at path: ${path}`)

            revalidatePath(path)
            revalidateTag("posts-sitemap")
          }

          // If the post was previously published, we need to revalidate the old path
          if (previousDoc._status === "published" && doc._status !== "published") {
            const oldPath = `/posts/${previousDoc.slug}`

            payload.logger.info(`Revalidating old post at path: ${oldPath}`)

            revalidatePath(oldPath)
            revalidateTag("posts-sitemap")
          }
        }
        return doc
      },
    ],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "blocks",
      type: "blocks",
      admin: {
        initCollapsed: true,
      },
      required: true,
      blocks: [TextBlock, TextImgBlock, ImgBlock, TitleBlock],
    },
    Slug,
    {
      name: "isPublished",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "meta",
      type: "group",
      label: "Référencement",
      fields: [
        {
          name: "description",
          type: "textarea",
          label: "Meta Description",
          localized: true,
          maxLength: 160,
          admin: {
            description: "Entre 130 et 160 caractères pour décrire le contenu de la page",
          },
        },
      ],
    },
  ],
}
