import { Field } from "payload"

export const table = (): Field => ({
  name: "table",
  type: "json",
  label: "Contenu",
  admin: {
    components: {
      Field: {
        path: "/app/(payload)/_ui/table-input#TableInput",
      },
    },
  },
})
