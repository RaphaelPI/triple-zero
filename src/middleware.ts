import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"

export default createMiddleware(routing)

export const config = {
  // Match all pathnames except for:
  // - paths starting with /api, /trpc, /_next, /_vercel, /admin
  // - static files by extension (icons, images, fonts, sitemaps, robots)
  matcher: "/((?!api|trpc|_next|_vercel|admin|.*\\.[^/]+$).*)",
}
