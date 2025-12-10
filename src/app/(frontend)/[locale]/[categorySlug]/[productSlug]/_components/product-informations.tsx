import { RichText } from "@/components/rich-text"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Link } from "@/i18n/navigation"
import { Product } from "@/payload-types"

interface Props {
  blocs: NonNullable<Product["blocInfos"]>
}

export const ProductInformations = ({ blocs }: Props) => {
  if (!blocs || blocs.length === 0) {
    return null
  }

  return (
    <Tabs defaultValue={blocs[0].id!} className="w-full gap-0">
      <TabsList className="w-full rounded-2xl rounded-b-none bg-black p-2">
        {blocs.map((bloc) => (
          <TabsTrigger
            key={bloc.id}
            value={bloc.id!}
            className="xs:text-lg rounded-xl py-2 text-ellipsis text-white data-[state=active]:bg-white data-[state=active]:text-black md:py-4 md:text-xl"
          >
            {bloc.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {blocs.map((bloc) => (
        <TabsContent key={bloc.id} value={bloc.id!}>
          <div className="panel rounded-t-none">
            {bloc.infos?.map(({ id, info, title: blocTitle }) => {
              if (!info || typeof info === "string") {
                return null
              }

              return (
                <div
                  key={id}
                  className="px-panel border-blue-grey relative border-b py-4 last:border-none"
                >
                  <div id={id ?? ""} className="invisible absolute -top-16" />
                  <div className="group flex items-center gap-2 text-lg font-semibold">
                    {blocTitle || info.title}
                    <Link
                      prefetch={false}
                      href={`#${id}`}
                      className="text-blue inline-block opacity-0 group-hover:opacity-100"
                    >
                      #
                    </Link>
                  </div>
                  <div className="text-sm">
                    <div className="pt-2">{info.content && <RichText data={info.content} />}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
