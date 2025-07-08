import { getClient } from "@/lib/payload"
import { NextResponse } from "next/server"
import { client } from "../sanity"

export async function GET(request: Request) {
  const payload = await getClient()

  const actions: any[] = [
    payload.create({
      collection: "users",
      data: {
        email: "pi.raph@gmail.com",
        password: "000000",
      },
    }),
  ]

  const [infos, categories] = await Promise.all([
    client.request<{
      allBlocInfo: { title: { _key: string; value: string }[] }[]
    }>(/* GraphQL */ `
      query {
        allBlocInfo {
          title {
            _key
            value
          }
        }
      }
    `),
    client.request<{
      allTzCategory: {
        title: { _key: string; value: string }[]
        desc: { _key: string; value: string }[]
        active: boolean
        slug: { current: string }
      }[]
    }>(/* GraphQL */ `
      query {
        allTzCategory {
          title {
            _key
            value
          }
          desc {
            _key
            value
          }
          active
          slug {
            current
          }
        }
      }
    `),
  ])

  actions.push(
    infos.allBlocInfo.flatMap(async (info) => {
      const bloc = await payload.create({
        collection: "blocInfo",
        data: {
          title: info.title[0].value,
        },
        locale: info.title[0]._key as "en" | "fr",
      })

      await payload.update({
        id: bloc.id,
        collection: "blocInfo",
        data: {
          title: info.title[1].value,
        },
        locale: info.title[1]._key as "en" | "fr",
      })

      return bloc
    }),
  )

  actions.push(
    categories.allTzCategory.flatMap(async (c) => {
      const category = await payload.create({
        collection: "category",
        data: {
          title: c.title[0].value,
          description: c.desc?.[0]?.value ?? "en",
          slug: c.slug.current,
          active: c.active,
        },
        locale: c.title[0]._key as "en" | "fr",
      })

      await payload.update({
        id: category.id,
        collection: "category",
        data: {
          title: c.title[1].value,
          description: c.desc?.[1]?.value ?? "en",
        },
        locale: c.title[1]._key as "en" | "fr",
      })
    }),
  )

  await Promise.all(actions)

  return NextResponse.json({ data: infos })
}
