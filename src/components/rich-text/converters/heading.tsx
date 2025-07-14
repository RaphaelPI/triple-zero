import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
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

    return (
      <div
        className={cn("group flex items-center gap-2 text-xl", {
          "text-3xl font-semibold": node.tag === "h1",
          "text-2xl font-semibold": node.tag === "h2",
        })}
      >
        {text}
        <Link
          prefetch={false}
          href={`#${id}`}
          className="text-blue inline-block opacity-0 group-hover:opacity-100"
        >
          #
        </Link>
      </div>
    )
  },
}
