import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical"
import { RichText as RichTexterConverter } from "@payloadcms/richtext-lexical/react"
import { jsxConverter } from "./converters"

type Props = {
  data: SerializedEditorState
} & React.HTMLAttributes<HTMLDivElement>

export const RichText = ({ className, ...rest }: Props) => {
  return (
    <div className="rich-text-content">
      <RichTexterConverter {...rest} className={className} converters={jsxConverter} />
    </div>
  )
}
