import { env } from "@/env"
import { logger } from "@/lib/logger"
import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const token = request.headers.get("x-revalidate-token")

  if (token !== env.SERVER_REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const pathname = request.nextUrl.searchParams.get("pathname")
  const type = request.nextUrl.searchParams.get("type") as "layout" | "page" | null

  if (!pathname) {
    return NextResponse.json({ error: "Missing pathname query parameter" }, { status: 400 })
  }

  logger.log(`Revalidating path: ${pathname} with type: ${type}`)
  revalidatePath(pathname, type ?? undefined)

  return NextResponse.json({ revalidated: true, pathname, type })
}
