import { postgresAdapter } from "@payloadcms/db-postgres"
import { payloadCloudPlugin } from "@payloadcms/payload-cloud"
import { FixedToolbarFeature, lexicalEditor, LinkFeature } from "@payloadcms/richtext-lexical"
import { s3Storage } from "@payloadcms/storage-s3"
import { en } from "@payloadcms/translations/languages/en"
import { fr } from "@payloadcms/translations/languages/fr"
import path from "path"
import { buildConfig } from "payload"
import sharp from "sharp"
import { fileURLToPath } from "url"

import * as collections from "./app/(payload)/_collections"
import * as globals from "./app/(payload)/_globals"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: collections.Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: "/app/(payload)/_ui/admin/logo#Logo",
        Icon: "/app/(payload)/_ui/admin/icon#Icon",
      },
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
  collections: Object.values(collections),
  globals: Object.values(globals),
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      FixedToolbarFeature(),
      LinkFeature({
        // Example showing how to customize the built-in fields
        // of the Link feature
        fields: ({ defaultFields }) => [
          ...defaultFields,
          {
            name: "rel",
            label: "Rel Attribute",
            type: "select",
            hasMany: true,
            options: ["noopener", "noreferrer", "nofollow"],
            admin: {
              description:
                "The rel attribute defines the relationship between a linked resource and the current document. This is a custom link field.",
            },
          },
        ],
      }),
    ],
  }),
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
