import { Field } from "payload"
import { ProductOptionValue } from "./product-option-value"

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
    },
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
              path: ["value", "title"],
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
  ],
}
