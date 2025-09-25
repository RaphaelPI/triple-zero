import { Field } from "payload"

export const Table: Field = {
  name: "table",
  type: "json",
  label: "2 - Contenu",
  jsonSchema: {
    uri: "https://json-schema.org/draft/2020-12/schema",
    fileMatch: ["*.json"],
    schema: {
      type: "array",
      items: {
        type: "array",
        items: {
          type: "string",
        },
      },
    },
  },
  admin: {
    components: {
      Field: {
        path: "/app/(payload)/_ui/table-input#TableInput",
      },
    },
  },
}
