import COUNTRIES_FR from "@/data/countries-fr"
import { CollectionConfig } from "payload"

export const Taxes: CollectionConfig = {
  slug: "taxes",
  labels: {
    singular: "Taxes",
    plural: "Taxes",
  },
  admin: {
    group: "Contenu",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "value",
      type: "number",
      required: true,
      admin: {
        description:
          "La valeur, en pourcentage, des taxes appliquées sur les produits pour liste de pays sélectionnées.",
      },
    },
    {
      name: "countries",
      type: "select",
      options: Object.entries(COUNTRIES_FR).flatMap(([_, countries]) =>
        Object.entries(countries).map(([code, country]) => ({
          label: country,
          value: code,
        })),
      ),
      hasMany: true,
      defaultValue: "FR",
      required: true,
    },
  ],
}
