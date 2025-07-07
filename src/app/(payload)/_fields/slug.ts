import { Field } from "payload"

const merge = (target: Field, source: any = {}) => {
  // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object)
      Object.assign(source[key], merge((target as any)[key], source[key]))
  }

  // Join `target` and modified `source`
  Object.assign(target || {}, source)
  return target
}

type Slug = (options?: { trackingField?: string }, overrides?: Partial<Field>) => Field

export const slug: Slug = ({ trackingField = "title" } = {}, overrides) =>
  merge(
    {
      name: "slug",
      unique: true,
      type: "text",
      admin: {
        position: "sidebar",
        components: {
          Field: {
            path: "/app/(payload)/_inputs/slug-input",
            exportName: "SlugInput",
            clientProps: {
              trackingField,
            },
          },
        },
      },
    },
    overrides,
  )
