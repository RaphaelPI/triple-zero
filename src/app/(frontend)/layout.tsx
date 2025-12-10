import { env } from "@/env"
import "@/styles/global.css"
import { Metadata } from "next"

interface RootLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  robots: {
    index: env.SERVER_INDEXING_ENABLED,
    follow: env.SERVER_INDEXING_ENABLED,
  },
  metadataBase: new URL(env.NEXT_PUBLIC_URL),
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return <>{children}</>
}

export default RootLayout
