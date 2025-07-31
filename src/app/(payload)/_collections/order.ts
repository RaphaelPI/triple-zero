import { uuid } from "@/lib/uuid"
import { CollectionConfig } from "payload"

export const Order: CollectionConfig = {
  slug: "order",
  labels: {
    singular: "Commande",
    plural: "Commandes",
  },
  admin: {
    group: "Produits",
    defaultColumns: ["uid", "date", "amount", "customer", "email", "status", "payment"],
  },
  fields: [
    {
      name: "uid",
      label: "Numéro de commande",
      type: "text",
      defaultValue: () => uuid().toUpperCase(),
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: "customer",
      label: "Client",
      type: "text",
      required: true,
      admin: {
        position: "sidebar",
      },
      access: {
        update: ({ data }) => !Boolean(data?.id),
      },
    },
    {
      name: "email",
      label: "Email client",
      type: "text",
      required: true,
      admin: {
        position: "sidebar",
      },
      access: {
        update: ({ data }) => !Boolean(data?.id),
      },
    },
    {
      name: "date",
      label: "Date de la commande",
      type: "date",
      required: true,
      admin: {
        position: "sidebar",
        date: {
          displayFormat: "Pp",
        },
      },
      access: {
        update: ({ data }) => !Boolean(data?.id),
      },
    },
    {
      name: "delay",
      label: "Délai de livraison",
      type: "date",
      required: true,
      admin: {
        description:
          "Correspond à la date de départ de livraison de chez Triple Zéro au moment de la commande.",
        date: {
          pickerAppearance: "dayOnly",
          displayFormat: "PPPP (dd/MM/yyyy)",
        },
        position: "sidebar",
      },
      access: {
        update: ({ data }) => !Boolean(data?.id),
      },
    },
    {
      name: "payment",
      type: "select",
      options: [
        {
          label: "Virement bancaire",
          value: "transfer",
        },
        {
          label: "Carte de crédit",
          value: "card",
        },
        {
          label: "Chèque",
          value: "check",
        },
      ],
      admin: {
        position: "sidebar",
      },
      access: {
        update: ({ data }) => !Boolean(data?.id),
      },
    },
    {
      name: "amount",
      label: "Montant total",
      type: "number",
      required: true,
      admin: {
        position: "sidebar",
      },
      access: {
        update: ({ data }) => !Boolean(data?.id),
      },
    },
    {
      name: "shippingFee",
      label: "Frais de port",
      type: "number",
      required: true,
      admin: {
        position: "sidebar",
      },
      access: {
        update: ({ data }) => !Boolean(data?.id),
      },
    },
    {
      name: "workTime",
      label: "Temps de travail",
      type: "number",
      required: true,
      admin: {
        description: "Temps de travail en minutes",
        position: "sidebar",
      },
      access: {
        update: ({ data }) => !Boolean(data?.id),
      },
    },
    {
      name: "status",
      type: "select",
      options: [
        {
          label: "En attente de paiement",
          value: "pending",
        },
        {
          label: "Payée",
          value: "paid",
        },
        {
          label: "Expédiée",
          value: "shipped",
        },
      ],
    },
    {
      name: "shippingInfo",
      type: "textarea",
      label: "Informations colis",
    },
    {
      name: "comment",
      type: "textarea",
      label: "Commentaire du client",
      admin: {
        readOnly: true,
      },
    },
    {
      name: "detail",
      type: "json",
      label: "Détails de la commande",
      jsonSchema: {
        uri: "https://json-schema.org/draft/2020-12/schema",
        fileMatch: ["*.json"],
        schema: {
          type: "object",
        },
      },
      admin: {
        components: {
          Field: {
            path: "/app/(payload)/_ui/order-detail#OrderDetail",
          },
        },
      },
    },
  ],
}
