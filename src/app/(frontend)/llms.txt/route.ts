import { getTranslations } from "next-intl/server"

import { env } from "@/env"
import { DEFAULT_LOCALE, LOCALES } from "@/i18n/config"
import { getClient } from "@/lib/payload"
import { indexingEnabled } from "@/lib/sitemap"
import { Category } from "@/payload-types"

export const revalidate = 86400

// llms.txt spec: https://llmstxt.org
function getLink(title: string, path: string, description?: string | null) {
  const url = `${env.NEXT_PUBLIC_URL}/${DEFAULT_LOCALE}${path}`
  const desc = description?.replace(/\s+/g, " ").trim()
  return `- [${title}](${url})${desc ? `: ${desc}` : ""}`
}

export async function GET() {
  if (!indexingEnabled()) {
    return new Response("Not found", { status: 404 })
  }

  const [t, payload] = await Promise.all([
    getTranslations({ locale: DEFAULT_LOCALE }),
    getClient(),
  ])

  const [categories, products, pages] = await Promise.all([
    payload.find({
      collection: "category",
      select: { title: true, slug: true, description: true },
      locale: DEFAULT_LOCALE,
      limit: 999,
    }),
    payload.find({
      collection: "product",
      depth: 1,
      select: { title: true, slug: true, description: true, category: true },
      locale: DEFAULT_LOCALE,
      limit: 999,
    }),
    payload.find({
      collection: "pages",
      where: { isPublished: { equals: true } },
      select: { title: true, slug: true, meta: true },
      locale: DEFAULT_LOCALE,
      limit: 999,
    }),
  ])

  const categorySections = categories.docs.map((category) => {
    const categoryProducts = products.docs.filter(
      (product) => (product.category as Category)?.slug === category.slug,
    )

    return [
      `## ${category.title}`,
      "",
      category.description?.trim(),
      "",
      getLink(category.title, `/c/${category.slug}`),
      ...categoryProducts.map((product) =>
        getLink(product.title, `/c/${category.slug}/${product.slug}`, product.description),
      ),
    ]
      .filter((line) => line !== undefined)
      .join("\n")
  })

  const otherLocales = LOCALES.filter((locale) => locale !== DEFAULT_LOCALE)

  const txt = [
    `# ${t("title")}`,
    "",
    `> ${t("seo_title")}. ${t("seo_description")}`,
    "",
    `${t("description")}. Le site est en français. Autres langues disponibles (${otherLocales.join(", ")}) : remplacer /${DEFAULT_LOCALE}/ par /<langue>/ dans les URLs.`,
    "",
    ...categorySections.flatMap((section) => [section, ""]),
    "## Informations",
    "",
    getLink(t("home"), ""),
    getLink("Promotions", "/promotions"),
    getLink("Questions fréquentes", "/questions-frequentes"),
    ...pages.docs.map((page) => getLink(page.title, `/p/${page.slug}`, page.meta?.description)),
    "",
    "## Optional",
    "",
    `- [Sitemap](${env.NEXT_PUBLIC_URL}/sitemap.xml)`,
    "",
  ].join("\n")

  return new Response(txt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  })
}
