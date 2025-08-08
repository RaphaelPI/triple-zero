import { GlobalConfig } from "payload"

export const Planning: GlobalConfig = {
  slug: "planning",
  label: "Planning",
  admin: {
    group: "2 - Contenu",
  },
  fields: [
    {
      name: "defaultWorktime",
      label: "Temps de travail par semaine par défaut",
      type: "number",
      required: true,
      admin: {
        position: "sidebar",
        description: "Correspond au nombre d'heures travaillées par défaut par semaine",
      },
    },
    // {
    //   name: "planning",
    //   type: "json",
    //   admin: {
    //     components: {
    //       Field: {
    //       },
    //     },
    //   },
    // },
    {
      name: "weeks",
      type: "json",
      defaultValue: {},
      admin: {
        components: {
          Field: {
            path: "/app/(payload)/_ui/planning/planning-weeks#PlanningWeeks",
            // path: "/app/(payload)/_ui/planning/planning-weeks-setup#PlanningWeeksSetup",
          },
        },
      },
    },
  ],
}
