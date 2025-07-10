import { SerializedLinkNode } from "@payloadcms/richtext-lexical"

interface Props {
  linkNode: SerializedLinkNode
}

export const internalDocToHref = ({ linkNode }: Props) => {
  const { value, relationTo } = linkNode.fields.doc!
  console.log("linkNode.fields", linkNode.fields)
  const slug = (value as any).slug as string

  if (relationTo === "category") {
    return `/${slug}`
  } else {
    return `/`
  }
}
