import { GraphQLClient } from "graphql-request"

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET",
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID",
)

export const readToken = assertValue(
  process.env.NEXT_PUBLIC_SANITY_READ_TOKEN,
  "Missing environment variable: NEXT_PUBLIC_SANITY_READ_TOKEN",
)

// see https://www.sanity.io/docs/api-versioning for how versioning works
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-06-21"

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}

const endpoint = `https://${projectId}.api.sanity.io/v1/graphql/${dataset}/default`
const headers = {
  authorization: `Bearer ${readToken}`,
}

export const client = new GraphQLClient(endpoint, { headers })
