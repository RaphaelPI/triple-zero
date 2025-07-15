import { RichText } from "@/components/rich-text"
import { Link } from "@/i18n/navigation"
import { Product } from "@/payload-types"

interface ProductInfosProps {
  title: string
  data: Product["technicalInfos"] | Product["materials"] | Product["care"]
}

export const ProductInformations = ({ title, data }: ProductInfosProps) => {
  if (!data) {
    return null
  }

  return (
    <div>
      <div className="rounded-t-2xl border-8 border-b-0 border-white bg-white lg:w-1/3">
        <div className="bg-blue-grey w-full rounded-2xl px-12 py-4 text-center">{title}</div>
      </div>
      <div className="panel mb-16 rounded-tl-none max-lg:rounded-tr-none">
        {data.map(({ id, info, title: blocTitle }) => {
          if (!info || typeof info === "string") {
            return null
          }

          return (
            <div
              key={id}
              className="px-panel border-blue-grey relative border-b py-4 last:border-none"
            >
              <div id={id ?? ""} className="invisible absolute -top-16" />
              <div className="group flex items-center gap-2 text-lg font-bold">
                {blocTitle ?? info.title}
                <Link
                  prefetch={false}
                  href={`#${id}`}
                  className="text-blue inline-block opacity-0 group-hover:opacity-100"
                >
                  #
                </Link>
              </div>
              <div className={`text-sm`}>
                <div className="pt-2">{info.content && <RichText data={info.content} />}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
