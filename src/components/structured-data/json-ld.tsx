import type { Thing } from "schema-dts"

export function JsonLd({ data }: { data: Thing }) {
  // https://nextjs.org/docs/app/building-your-application/optimizing/metadata#json-ld
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          ...(data as object),
        }),
      }}
      // key? https://github.com/garmeeh/next-seo/blob/master/src/jsonld/jsonld.tsx#L32
    />
  )
}
