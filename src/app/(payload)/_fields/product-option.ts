import { Field } from "payload"
import { ProductOptionValue } from "./product-option-value"
import { Slug } from "./slug"

export const ProductOption: Field = {
  name: "option",
  type: "group",
  label: "Option produit",
  interfaceName: "ProductOption",
  fields: [
    {
      name: "title",
      label: "Titre",
      type: "text",
      required: true,
      localized: true,
      admin: {
        description:
          "C'est le titre de l'option qui sera affiché à l'utilisateur sur la page produit",
      },
    },
    Slug,
    {
      name: "values",
      type: "array",
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: {
            path: "/app/(payload)/_ui/list-row-label#ListRowLabel",
            clientProps: {
              placeholder: "Valeur",
              labelPath: ["value", "title"],
            },
          },
        },
      },
      fields: [ProductOptionValue],
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      admin: {
        description: "Facultatif. Ce texte s'affichera en tooltip au survol de l'option.",
      },
      localized: true,
    },
    {
      name: "size",
      label: "Taille",
      type: "checkbox",
      admin: {
        description:
          "Si cochée, cette option sera affichée en tant que taille. Pour des calculs supplémentaires sur les valeurs techniques du produit",
      },
    },
    {
      name: "weight",
      label: "Poids",
      type: "checkbox",
      admin: {
        description:
          "Si cochée, cette option sera affichée en tant que poids. Pour des calculs supplémentaires sur les valeurs techniques du produit",
      },
    },
    {
      name: "cartImage",
      label: "Image de la commande",
      type: "checkbox",
      admin: {
        description:
          "Si cochée, ca sera l'image de cette option (si elle existe) qui sera affichée dans le panier/la commande. Si non cochée, ca sera l'image de la couleur sélectionnée (si elle existe. Sinon ca sera la 1ere image par defaut du produit",
      },
    },
    {
      name: "active",
      label: "Active ?",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description: "Si la case est cochée, l'option sera visible",
        position: "sidebar",
      },
    },
  ],
}
