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
  return (
    <>
      {!env.SERVER_INDEXING_ENABLED && (
        <div className="bg-green-700 p-2 text-center text-white">
          Ceci est un environnement de test
        </div>
      )}
      {children}
    </>
  )
}

export default RootLayout
