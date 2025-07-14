import COUNTRIES_FR from "@/data/countries-fr"
import { CollectionConfig } from "payload"

export const ShippingFees: CollectionConfig = {
  slug: "shipping-fees",
  labels: {
    singular: "Frais de port",
    plural: "Frais de port",
  },
  admin: {
    group: "Contenu",
  },
  fields: [
    {
      name: "title",
      label: "Titre",
      type: "text",
      required: true,
    },
    {
      name: "value",
      label: "Valeur",
      type: "number",
      required: true,
      admin: {
        description: "La valeur, en euros, des frais de ports pour la liste de pays sélectionnées.",
      },
    },
    {
      name: "countries",
      label: "Liste de pays",
      type: "select",
      options: Object.entries(COUNTRIES_FR).flatMap(([_, countries]) =>
        Object.entries(countries).map(([code, country]) => ({
          label: country,
          value: code,
        })),
      ),
      hasMany: true,
      required: true,
    },
  ],
}
