import type { Brand, Organization, PerformingGroup } from "schema-dts"
import { JsonLd } from "./json-ld"

interface Props {
  type: "Brand" | "PerformingGroup" | "Organization"
  name: string
  description?: string
  url: string
  logo?: string
  image?: string
  sameAs?: string[]
  address?: {
    streetAddress?: string
    addressLocality?: string
    postalCode?: string
    addressCountry?: string
  }
}

export function OrganizationJsonLd({
  type,
  name,
  description,
  url,
  logo,
  image,
  sameAs,
  address,
}: Props) {
  const data: Organization | Brand | PerformingGroup = {
    "@type": type,
    name,
    description,
    url,
    logo,
    image,
    sameAs,
    address: address && {
      "@type": "PostalAddress",
      ...address,
    },
  }

  return <JsonLd data={data} />
}
