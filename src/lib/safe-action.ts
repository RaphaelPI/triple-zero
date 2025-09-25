import { createServerActionProcedure, ZSAError } from "zsa"
import { logger } from "./logger"

export const rawProcedure = createServerActionProcedure()
  .onError((error) => {
    const zsaError = error as ZSAError
    logger.error("rawProcedure", zsaError.code, JSON.stringify(zsaError, null, 2))
  })
  .handler(() => ({}))
