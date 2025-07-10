import { Link } from "@/i18n/navigation"
import { SerializedHeadingNode } from "@payloadcms/richtext-lexical"
import { JSXConverters } from "@payloadcms/richtext-lexical/react"

export const headingConverter: JSXConverters<SerializedHeadingNode> = {
  heading: ({ node, nodesToJSX }) => {
    const text = nodesToJSX({ nodes: node.children })

    const id = text
      .join("")
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")

    if (node.tag === "h1") {
      return (
        <Link href={`#${id}`} className="text-h1 block">
          {text}
        </Link>
      )
    } else if (node.tag === "h2") {
      return (
        <Link href={`#${id}`} className="text-h2 block">
          {text}
        </Link>
      )
    } else {
      return (
        <Link href={`#${id}`} className="block text-xl">
          {text}
        </Link>
      )
    }
  },
}
