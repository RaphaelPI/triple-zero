import type { BreadcrumbList } from "schema-dts"
import { JsonLd } from "./json-ld"

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const data: BreadcrumbList = {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return <JsonLd data={data} />
}
