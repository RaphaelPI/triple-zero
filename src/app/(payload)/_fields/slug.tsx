import { slugify } from "@/lib/slugify"
import { Field } from "payload"

export const Slug: Field = {
  name: "slug",
  type: "text",
  index: true,
  hooks: {
    beforeValidate: [
      ({ data, value }) => {
        if (!value) {
          return slugify(data?.title)
        }

        return value
      },
    ],
  },
  admin: {
    readOnly: true,
    position: "sidebar",
  },
}
