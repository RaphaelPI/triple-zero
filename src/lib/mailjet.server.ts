import "server-only"

import { env } from "@/env"
import Mailjet, { LibraryResponse, SendEmailV3_1 } from "node-mailjet"
import { logger } from "./logger"

export const mailjet = Mailjet.apiConnect(
  env.SERVER_MAILJET_API_KEY,
  env.SERVER_MAILJET_API_SECRET,
  {
    config: {},
    options: {},
  },
)

interface SendEmailProps {
  to: {
    Email: string
    Name: string
  }[]
  from?: {
    Email: string
    Name: string
  }
  subject: string
  templateId: number
  variables?: Record<string, any>
}

export const sendEmail = async ({
  to,
  from = { Email: "triplezero@triplezero.fr", Name: "Triple Zero" },
  subject,
  templateId,
  variables,
}: SendEmailProps) => {
  try {
    const data: SendEmailV3_1.Body = {
      Messages: [
        {
          From: from,
          To: to,
          Subject: subject,
          TemplateID: templateId,
          TemplateLanguage: true,
          Variables: variables,
        },
      ],
    }
    const result: LibraryResponse<SendEmailV3_1.Response> = await mailjet
      .post("send", { version: "v3.1" })
      .request(data)

    return true
  } catch (err: any) {
    logger.error("err.statusCode", err.statusCode, err)
    return false
  }
}
