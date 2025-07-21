import { GlobalConfig } from "payload"

export const Delay: GlobalConfig = {
  slug: "delay",
  label: "Délai de livraison",
  admin: {
    group: "Contenu",
  },
  fields: [
    {
      name: "date",
      type: "date",
      required: true,
      admin: {
        description: "Correspond à la date de départ de livraison de chez Triple Zéro",
        date: {
          pickerAppearance: "dayOnly",
        },
      },
    },
    {
      name: "active",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description: "Si la case est cochée, le message sera affiché",
        position: "sidebar",
      },
    },
  ],
}
