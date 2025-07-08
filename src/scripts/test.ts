import { client } from "@/app/(frontend)/api/sanity"
import { getClient } from "@/lib/payload"
import { uuid } from "@/lib/uuid"

const run = async () => {
  const payload = await getClient()
  const actions = []

  const [products] = await Promise.all([
    client.request<{
      allProduct: {
        title: string
        slug: { current: string }
        category: { title: { _key: string; value: string }[]; slug: { current: string } }
        options: {
          title: { _key: string; value: string }[]
          desc: { _key: string; value: string }[]
          type: string
          values: {
            _key: string
            title: { _key: string; value: string }[]
            delta: {
              type: string
              value: string
              unit: string
            }[]
            defaultValue: string
            value: string
          }[]
        }[]
        advanced: {
          title: { _key: string; value: string }[]
          desc: { _key: string; value: string }[]
          type: string
          values: {
            _key: string
            title: { _key: string; value: string }[]
            delta: {
              type: string
              value: string
              unit: string
            }[]
            defaultValue: boolean | null
            value: string
          }[]
        }[]
        desc: { _key: string; value: string }[]
      }[]
    }>(/* GraphQL */ `
      query {
        allProduct(where: { _: { is_draft: false } }) {
          _id
          title
          slug {
            current
          }
          category {
            title {
              _key
              value
            }
            slug {
              current
            }
          }
          options {
            title {
              _key
              value
            }
            desc {
              _key
              value
            }
            type
            values {
              _key
              title {
                _key
                value
              }
              delta {
                type
                value
                unit
              }
              defaultValue
              value
            }
          }
          advanced {
            title {
              _key
              value
            }
            desc {
              _key
              value
            }
            type
            values {
              _key
              title {
                _key
                value
              }
              delta {
                type
                value
                unit
              }
              defaultValue
              value
            }
          }
          desc {
            _key
            value
          }
        }
      }
    `),
  ])

  actions.push(
    products.allProduct.flatMap(async (product) => {
      console.log("gonna create product", product.title)
      const p = await payload.create({
        collection: "product",
        data: {
          title: product.title,
          slug: product.slug.current,
          category: 1,
          description: product.desc?.[0]?.value ?? "fr",
        },
        locale: "fr",
      })

      await payload.update({
        id: p.id,
        collection: "product",
        data: {
          options:
            product.options?.map((opt) => ({
              title: opt.title[0].value,
              description: opt.desc?.[0]?.value ?? "fr",
              values: opt.values.map((val) => ({
                title: val.title[0].value,
                delta:
                  val.delta?.map((d) => ({
                    type: d.type as "time" | "price" | "weight" | "temperature" | "volume",
                    value: Number(d.value),
                    unit: d.unit as "€" | "%",
                  })) ?? [],
                defaultValue: Boolean(val.defaultValue),
                value: uuid(),
              })),
            })) ?? [],
          advanced:
            product.advanced?.map((opt) => ({
              title: opt.title[0].value,
              description: opt.desc?.[0]?.value ?? "fr",
              values: opt.values.map((val) => ({
                title: val.title[0].value,
                delta:
                  val.delta?.map((d) => ({
                    type: d.type as "time" | "price" | "weight" | "temperature" | "volume",
                    value: Number(d.value),
                    unit: d.unit as "€" | "%",
                  })) ?? [],
                defaultValue: Boolean(val.defaultValue),
                value: uuid(),
              })),
            })) ?? [],
        },
        locale: "fr",
      })

      return p
    }),
  )

  await Promise.all(actions)
}

run()
