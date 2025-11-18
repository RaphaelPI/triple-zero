import { OrderView } from "@/components/order-view"
import { TEMPLATE_EMAIL_ORDER_SHIPPED_EN, TEMPLATE_EMAIL_ORDER_SHIPPED_FR } from "@/constants"
import { sendEmail } from "@/lib/mailjet.server"
import { uuid } from "@/lib/uuid"
import { CollectionConfig } from "payload"

export const Order: CollectionConfig = {
  slug: "order",
  labels: {
    singular: "Commande",
    plural: "Commandes",
  },
  admin: {
    group: "1 - Produits",
    defaultColumns: ["uid", "payment", "status", "date", "amount", "customer", "email", "status"],
    pagination: {
      defaultLimit: 50,
      limits: [20, 50, 100],
    },
  },
  hooks: {
    afterChange: [
      async ({ previousDoc, doc }) => {
        if (previousDoc?.status === doc.status) {
          return
        }

        if (doc.status === "shipped") {
          const { renderToString } = await import("react-dom/server")
          const content = renderToString(
            <OrderView
              deliveryData={doc.detail.deliveryData}
              lines={doc.detail.lines}
              detail={doc.detail}
              comment={doc.comment}
              shippingFee={doc.shippingFee}
              amount={doc.amount}
              uid={doc.uid}
              date={doc.date}
              payment={doc.payment}
            />,
          )

          await sendEmail({
            to: [
              {
                Email: doc.email,
                Name: doc.customer,
              },
            ],
            templateId:
              doc.locale === "fr"
                ? TEMPLATE_EMAIL_ORDER_SHIPPED_FR
                : TEMPLATE_EMAIL_ORDER_SHIPPED_EN,
            variables: {
              shippingInfo: doc.shippingInfo,
              order: content,
              link: `https://www.laposte.fr/outils/suivre-vos-envois${doc.parcelId ? `?code=${doc.parcelId}` : ""}`,
            },
          })
        }
      },
    ],
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
      name: "week",
      label: "Semaine de production",
      type: "text",
      required: true,
      admin: {
        components: {
          Field: {
            path: "/app/(payload)/_ui/order-week#OrderWeek",
          },
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
      name: "payment",
      label: "Méthode de paiement",
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
          label: "Annulée",
          value: "cancelled",
        },
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
      admin: {
        components: {
          Field: {
            path: "/app/(payload)/_ui/order-status#OrderStatus",
          },
        },
      },
    },
    {
      name: "shippingInfo",
      type: "textarea",
      label: "Informations colis",
      admin: {
        hidden: true,
      },
    },
    {
      name: "parcelId",
      type: "text",
      label: "Identifiant colis",
      admin: {
        hidden: true,
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
