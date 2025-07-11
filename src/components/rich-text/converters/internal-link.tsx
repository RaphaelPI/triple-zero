import { SerializedLinkNode } from "@payloadcms/richtext-lexical"

interface Props {
  linkNode: SerializedLinkNode
}

export const internalDocToHref = ({ linkNode }: Props) => {
  const { value, relationTo } = linkNode.fields.doc!
  const slug = (value as any).slug as string

  if (relationTo === "category") {
    return `/${slug}`
  } else {
    return `/`
  }
}
