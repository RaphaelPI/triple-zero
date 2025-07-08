import { Field } from "payload"

// interface DeltaDefinition {
//   type: keyof typeof DELTA_VALUES_DEFINITION
//   unit: "€" | "%"
//   value: number
// }

const DELTA_VALUES_DEFINITION = {
  price: {
    value: "price",
    label: "Prix",
    unit: "€",
  },
  weight: {
    value: "weight",
    label: "Poids",
    unit: "g",
  },
  temperature: {
    value: "temperature",
    label: "Température",
    unit: "°C",
  },
  volume: {
    value: "volume",
    label: "Volume",
    unit: "L",
  },
  time: {
    value: "time",
    label: "Temps de travail",
    unit: "min",
  },
}

// const getUnit = ({ type, unit }: DeltaDefinition) => {
//   if (unit === "%") {
//     return "% (total)"
//   }

//   return DELTA_VALUES_DEFINITION[type].unit
// }

export const optionDeltaValue = (): Field => ({
  name: "delta",
  type: "array",
  label: "Impact produit",
  admin: {
    initCollapsed: true,
    components: {
      RowLabel: {
        path: "/app/(payload)/_ui/list-row-label#ListRowLabel",
        clientProps: {
          placeholder: "Impact",
          objectKey: "type",
        },
      },
    },
  },
  fields: [
    {
      label: "Type",
      name: "type",
      type: "select",
      required: true,
      options: Object.values(DELTA_VALUES_DEFINITION).map(({ label, unit, value }) => ({
        label: `${label} (${unit})`,
        value,
      })),
    },
    {
      label: "Valeur",
      name: "value",
      type: "number",
      required: true,
    },
    {
      label: "Unité",
      name: "unit",
      type: "select",
      required: true,
      options: [
        { label: "Valeur fixe", value: "€" },
        { label: "% (sur le total)", value: "%" },
      ],
    },
  ],
})
