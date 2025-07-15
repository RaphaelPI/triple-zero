import { MainMessage } from "@/components/main-message"
import { HomeCategories } from "./_components/home/home-categories"
import { HomeProductVariants } from "./_components/home/home-product-variants"
import { HomePromotions } from "./_components/home/home-promotions"
import { getMetadata } from "./metadata"

export const dynamic = "force-static"

interface Props {
  params: Promise<{
    locale: string
  }>
}

export const generateMetadata = async ({ params }: Props) => {
  const { locale } = await params
  return getMetadata({
    locale,
    pathname: "/",
  })
}

export default () => {
  return (
    <main className="bg-flake bg-flake-tr space-y-8 bg-no-repeat">
      <HomePromotions />
      <MainMessage />
      <HomeProductVariants />
      <HomeCategories />
    </main>
  )
}
