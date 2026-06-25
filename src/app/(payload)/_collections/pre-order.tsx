import { CollectionConfig } from "payload"

export const PreOrder: CollectionConfig = {
  slug: "pre-order",
  labels: {
    singular: "Pré-commande",
    plural: "Pré-commandes",
  },
  admin: {
    group: "1 - Produits",
    defaultColumns: ["uid", "date", "amount", "customer", "email", "status"],
    pagination: {
      defaultLimit: 50,
      limits: [20, 50, 100],
    },
  },
  fields: [
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
      name: "locale",
      label: "Langue",
      type: "select",
      options: [
        {
          label: "Français",
          value: "fr",
        },
        {
          label: "Anglais",
          value: "en",
        },
      ],
      defaultValue: "fr",
      admin: {
        description: "La langue dans laquelle la commande a été faite",
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
          label: "Traitée",
          value: "processed",
        },
        {
          label: "En attente de traitement",
          value: "pending",
        },
      ],
      admin: {
        components: {
          Field: {
            path: "/app/(payload)/_ui/pre-order-status#PreOrderStatus",
          },
        },
      },
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
