import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const isDev = () => env.NODE_ENV === "development"

const booleanTransformer = (str: string | undefined) => {
  return str != null && str !== "" && str !== "false" && str !== "0"
}

export const env = createEnv({
  client: {
    NEXT_PUBLIC_URL: z.url(),
    NEXT_PUBLIC_GOOGLE_ANALYTICS: z.string().optional(),
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: z.string(),
  },
  server: {
    SERVER_INDEXING_ENABLED: z.string().optional().transform(booleanTransformer),
    SERVER_DATABASE_URI: z.string(),
    SERVER_PAYLOAD_SECRET: z.string(),
    SERVER_S3_BUCKET: z.string(),
    SERVER_S3_ACCESS_KEY_ID: z.string(),
    SERVER_S3_SECRET_ACCESS_KEY: z.string(),
    SERVER_S3_REGION: z.string(),
    SERVER_STRIPE_SECRET_KEY: z.string(),
    SERVER_MAILJET_API_KEY: z.string(),
    SERVER_MAILJET_API_SECRET: z.string(),
  },
  shared: {
    NODE_ENV: z.string().default("development"),
  },
  experimental__runtimeEnv: {
    // client
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
  },
})
