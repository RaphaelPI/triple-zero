import { DefaultNodeTypes } from "@payloadcms/richtext-lexical"
import { JSXConvertersFunction, LinkJSXConverter } from "@payloadcms/richtext-lexical/react"
import { headingConverter } from "./heading"
import { internalDocToHref } from "./internal-link"

// Only default node types will be used, plus internal links and custom checklist rendering.
// Custom blocks are removed as per "only text" instruction.
export const jsxConverter: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) => {
  return {
    ...defaultConverters,
    ...LinkJSXConverter({ internalDocToHref }),
    ...headingConverter,
    // Custom blocks (contentWithMedia, tableOfContents) and their types are removed.
    // headingConverter was already omitted.
  }
}
