import { s3Storage } from "@payloadcms/storage-s3"

import { postgresAdapter } from "@payloadcms/db-postgres"
import { payloadCloudPlugin } from "@payloadcms/payload-cloud"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import path from "path"
import { buildConfig } from "payload"
import sharp from "sharp"
import { fileURLToPath } from "url"

import { Media } from "./collections/Media"
import { Users } from "./collections/Users"

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
  collections: [Users, Media],
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
