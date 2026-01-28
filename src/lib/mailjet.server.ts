import { env } from "@/env"
import Mailjet, { SendEmailV3_1 } from "node-mailjet"
import { logger } from "./logger"

export const mailjet = Mailjet.apiConnect(
  env.SERVER_MAILJET_API_KEY,
  env.SERVER_MAILJET_API_SECRET,
  {
    config: {},
    options: {},
  },
)

export interface SendEmailProps {
  to: {
    Email: string
    Name: string
  }[]
  bcc?: {
    Email: string
    Name: string
  }[]
  from?: {
    Email: string
    Name: string
  }
  subject?: string
  templateId: number
  variables?: Record<string, any>
}

export const sendEmail = async ({
  to,
  bcc,
  from = { Email: env.NEXT_PUBLIC_EMAIL, Name: "Triple Zero" },
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
          Bcc: bcc,
          Subject: subject,
          TemplateID: templateId,
          TemplateLanguage: true,
          Variables: variables,
        },
      ],
    }

    await mailjet.post("send", { version: "v3.1" }).request(data)

    return true
  } catch (err: any) {
    logger.error("err.statusCode", err.statusCode, err)
    return false
  }
}
