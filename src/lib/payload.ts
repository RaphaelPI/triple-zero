import config from "@/payload.config"
import { getPayload } from "payload"

export const getClient = async () => getPayload({ config: await config })
