import { env } from "@/env"
import { getLastMod, indexingEnabled } from "@/lib/sitemap"

import { generateSitemaps as getCategoriesSitemaps } from "../api/sitemaps/categories/sitemap"
import { generateSitemaps as getPagesSitemaps } from "../api/sitemaps/pages/sitemap"
import { generateSitemaps as getProductsSitemaps } from "../api/sitemaps/products/sitemap"

export const revalidate = 86400

function getLoc(path: string, id: number) {
  return `${env.NEXT_PUBLIC_URL}/api/sitemaps/${path}/sitemap/${id}.xml`
}
function getSitemap(path: string, id = 0) {
  return /* XML */ `<sitemap><loc>${getLoc(path, id)}</loc><lastmod>${getLastMod()}</lastmod></sitemap>`
}
function getSitemaps(ids: { id: number }[], path: string) {
  return ids.map(({ id }) => getSitemap(path, id)).join("")
}

export async function GET() {
  if (!indexingEnabled()) {
    return new Response("Not found", { status: 404 })
  }

  const xml = /* XML */ `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${getSitemaps(await getProductsSitemaps(), "products")}      
      ${getSitemaps(await getCategoriesSitemaps(), "categories")}      
      ${getSitemaps(await getPagesSitemaps(), "pages")}      
    </sitemapindex>
  `

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}
