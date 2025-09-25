import { slugify } from "@/lib/slugify"
import { Field } from "payload"

export const Slug: Field = {
  name: "slug",
  type: "text",
  index: true,
  required: true,
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
  access: {
    read: () => true,
    create: () => true,
    update: ({ req: { user } }) => user?.email === "pi.raph@gmail.com",
  },
  admin: {
    position: "sidebar",
    description: "Cela correspond à l'identifiant dans l'url de la page",
  },
}
