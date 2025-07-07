import { postgresAdapter } from "@payloadcms/db-postgres"
import { payloadCloudPlugin } from "@payloadcms/payload-cloud"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import { s3Storage } from "@payloadcms/storage-s3"
import { en } from "@payloadcms/translations/languages/en"
import { fr } from "@payloadcms/translations/languages/fr"
import path from "path"
import { buildConfig } from "payload"
import sharp from "sharp"
import { fileURLToPath } from "url"

import { Category, Media, Nav, Users } from "./app/(payload)/_collections"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  localization: {
    locales: [
      {
        label: "English",
        code: "en",
      },
      {
        label: "Français",
        code: "fr",
      },
    ], // required
    defaultLocale: "fr", // required
  },
  i18n: {
    fallbackLanguage: "fr",
    supportedLanguages: { en, fr },
  },
  collections: [Users, Media, Category],
  globals: [Nav],
  editor: lexicalEditor(),
  secret: process.env.SERVER_PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.SERVER_DATABASE_URI || "",
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.SERVER_S3_BUCKET!,
      config: {
        credentials: {
          accessKeyId: process.env.SERVER_S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.SERVER_S3_SECRET_ACCESS_KEY!,
        },
        region: process.env.SERVER_S3_REGION!,
      },
    }),
  ],
})
