import { CollectionConfig } from "payload"
import { Table } from "../_fields/table"

export const SizeGuide: CollectionConfig = {
  slug: "sizeGuide",
  labels: {
    singular: "Guide des tailles",
    plural: "Guides des tailles",
  },
  admin: {
    useAsTitle: "title",
    group: "3 - Information produit",
  },
  fields: [
    {
      name: "title",
      label: "Titre",
      type: "text",
      required: true,
    },
    {
      name: "rows",
      label: "Nombre de lignes",
      type: "number",
      required: true,
    },
    {
      name: "cols",
      label: "Nombre de colonnes",
      type: "number",
      required: true,
    },
    Table,
  ],
}
