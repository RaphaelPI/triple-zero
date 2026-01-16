import createNextIntlPlugin from "next-intl/plugin"

import { withPayload } from "@payloadcms/next/withPayload"

const withNextIntl = createNextIntlPlugin()

const categoryRedirects = [
  ["2", "doudounes"],
  ["10", "doudounes"],
  ["1", "sacs-de-couchage"],
  ["13", "sacs-de-couchage"],
  ["3", "combinaisons-pantalons"],
  ["4", "mouffles-chaussons"],
  ["5", "couettes"],
  ["6", "edredons"],
  ["7", "oreillers-coussins"],
  ["8", "literie-enfants"],
  ["16", "accessoires"],
]

const productRedirects = [
  ["1", "sacs-de-couchage/grand-barbat"],
  ["2", "sacs-de-couchage/grand-barbat"],
  ["3", "sacs-de-couchage/grand-barbat"],
  ["4", "sacs-de-couchage/grand-barbat"],
  ["5", "sacs-de-couchage/grand-barbat"],
  ["128", "sacs-de-couchage/grand-barbat"],

  ["7", "sacs-de-couchage/petit-astazou"],
  ["8", "sacs-de-couchage/petit-astazou"],
  ["9", "sacs-de-couchage/petit-astazou"],
  ["92", "sacs-de-couchage/petit-astazou"],
  ["11", "sacs-de-couchage/petit-astazou"],
  ["91", "sacs-de-couchage/petit-astazou"],

  ["13", "sacs-de-couchage/ansabere"],
  ["14", "sacs-de-couchage/ansabere"],
  ["15", "sacs-de-couchage/ansabere"],

  ["137", "sacs-de-couchage/orhy"],
  ["138", "sacs-de-couchage/orhy"],
  ["139", "sacs-de-couchage/orhy"],
  ["140", "sacs-de-couchage/orhy"],

  ["16", "doudounes/ukerdi"],
  ["17", "doudounes/ukerdi"],
  ["18", "doudounes/ukerdi"],

  ["19", "doudounes/ibon-de-lhurs"],
  ["20", "doudounes/ibon-de-lhurs"],
  ["93", "doudounes/ibon-de-lhurs"],

  ["200", "doudounes/ibon"],

  ["29", "doudounes/capuche-ibon"],

  ["144", "doudounes/antza"],
  ["145", "doudounes/antza"],
  ["148", "doudounes/antza"],
  ["149", "doudounes/antza"],
  ["175", "doudounes/antza"],
  ["176", "doudounes/antza"],
  ["177", "doudounes/antza"],
  ["178", "doudounes/antza"],
  ["152", "doudounes/antza"],
  ["180", "doudounes/antza"],
  ["153", "doudounes/antza"],
  ["181", "doudounes/antza"],
  ["182", "doudounes/antza"],
  ["183", "doudounes/antza"],
  ["156", "doudounes/antza"],
  ["157", "doudounes/antza"],

  ["143", "doudounes/ama"],

  ["30", "couettes/couette-nordique"],
  ["31", "couettes/couette-nordique"],
  ["32", "couettes/couette-nordique"],
  ["33", "couettes/couette-nordique"],

  ["34", "couettes/couette-pyreneenne"],
  ["35", "couettes/couette-pyreneenne"],
  ["36", "couettes/couette-pyreneenne"],
  ["37", "couettes/couette-pyreneenne"],

  ["38", "couettes/couette-legere"],
  ["39", "couettes/couette-legere"],
  ["40", "couettes/couette-legere"],
  ["41", "couettes/couette-legere"],

  ["56", "edredons/edredon-pique"],
  ["116", "edredons/edredon-pique"],
  ["117", "edredons/edredon-pique"],

  ["48", "edredons/edredon-gonflant"],
  ["49", "edredons/edredon-gonflant"],

  ["102", "oreillers-coussins/oreiller-super-doux"],
  ["103", "oreillers-coussins/oreiller-super-doux"],
  ["104", "oreillers-coussins/oreiller-super-doux"],
  ["105", "oreillers-coussins/oreiller-super-doux"],
  ["107", "oreillers-coussins/oreiller-super-doux"],
  ["68", "oreillers-coussins/oreiller-super-doux"],
  ["69", "oreillers-coussins/oreiller-super-doux"],
  ["70", "oreillers-coussins/oreiller-super-doux"],

  ["71", "oreillers-coussins/traversin-super-doux"],
  ["72", "oreillers-coussins/traversin-super-doux"],
  ["73", "oreillers-coussins/traversin-super-doux"],
  ["101", "oreillers-coussins/traversin-super-doux"],

  ["108", "oreillers-coussins/oreiller-morphee-duvet"],
  ["109", "oreillers-coussins/oreiller-morphee-duvet"],
  ["110", "oreillers-coussins/oreiller-morphee-duvet"],
  ["111", "oreillers-coussins/oreiller-morphee-duvet"],
  ["113", "oreillers-coussins/oreiller-morphee-duvet"],
  ["76", "oreillers-coussins/oreiller-morphee-duvet"],
  ["77", "oreillers-coussins/oreiller-morphee-duvet"],
  ["78", "oreillers-coussins/oreiller-morphee-duvet"],

  ["79", "oreillers-coussins/traversin-morphee"],
  ["80", "oreillers-coussins/traversin-morphee"],
  ["81", "oreillers-coussins/traversin-morphee"],
  ["114", "oreillers-coussins/traversin-morphee"],

  ["82", "oreillers-coussins/coussin"],
  ["83", "oreillers-coussins/coussin"],
  ["74", "oreillers-coussins/coussin"],
  ["75", "oreillers-coussins/coussin"],
]

const nextConfig = {
  experimental: {
    staticGenerationRetryCount: 1,
    staticGenerationMaxConcurrency: 2,
    staticGenerationMinPagesPerWorker: 25,
    staleTimes: {
      dynamic: 30,
      static: 10,
    },
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
    minimumCacheTTL: 31536000, // 1 year
  },
  redirects: async () => {
    return [
      ...categoryRedirects.map(([value, destination]) => ({
        source: "/duvets_couettes.php",
        has: [
          {
            type: "query",
            key: "c",
            value: value,
          },
        ],
        destination: `/fr/c/${destination}`,
        permanent: true,
      })),
      ...productRedirects.map(([value, destination]) => ({
        source: "/ficheprod.php",
        has: [
          {
            type: "query",
            key: "p",
            value: value,
          },
        ],
        destination: `/fr/c/${destination}`,
        permanent: true,
      })),
      {
        source: "/faq.php",
        destination: "/fr/questions-frequentes",
        permanent: true,
      },
      {
        source: "/duvets_couettes.php",
        destination: "/fr/sacs-de-couchage",
        permanent: true,
      },
    ]
  },
}

export default withPayload(withNextIntl(nextConfig), { devBundleServerPackages: false })
