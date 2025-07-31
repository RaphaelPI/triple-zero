"use server"

import { getClient } from "@/lib/payload"

import { rawProcedure } from "@/lib/safe-action"
import z from "zod"

export const updateOrder = rawProcedure
  .createServerAction()
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .handler(async ({ input }) => {
    const payload = await getClient()
    const order = await payload.update({
      collection: "order",
      id: input.id,
      data: {
        status: "paid",
      },
    })
  })
