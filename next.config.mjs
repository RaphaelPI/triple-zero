import createNextIntlPlugin from "next-intl/plugin"

import { withPayload } from "@payloadcms/next/withPayload"

const withNextIntl = createNextIntlPlugin()

const nextConfig = {
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
