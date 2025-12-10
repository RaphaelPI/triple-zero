import createNextIntlPlugin from "next-intl/plugin"

import { withPayload } from "@payloadcms/next/withPayload"

const withNextIntl = createNextIntlPlugin()

const nextConfig = {
  experimental: {
    staticGenerationRetryCount: 1,
    staticGenerationMaxConcurrency: 2,
    staticGenerationMinPagesPerWorker: 25,
  },
  // Your Next.js config here
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      ".cjs": [".cts", ".cjs"],
      ".js": [".ts", ".tsx", ".js", ".jsx"],
      ".mjs": [".mts", ".mjs"],
    }

    webpackConfig.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })

    return webpackConfig
  },
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
      },
    ],
  },
}

export default withPayload(withNextIntl(nextConfig), { devBundleServerPackages: false })
