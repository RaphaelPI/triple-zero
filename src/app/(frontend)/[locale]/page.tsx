import { Image } from "@/components/image"
import { Button } from "@/components/ui/button"
import { getClient } from "@/lib/payload"
import { HomeCategories } from "./_components/home/home-categories"
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

export default async () => {
  const payload = await getClient()
  const medias = await payload.find({
    collection: "media",
    limit: 1,
  })

  return (
    <div className="space-y-10">
      <HomePromotions />
      <Button variant="destructive">Click me</Button>
      <Button variant="default">Click me</Button>
      <Button variant="ghost">Click me</Button>
      <Button variant="link">Click me</Button>
      <Button variant="outline">Click me</Button>
      <Button variant="secondary">Click me</Button>

      {medias.docs[0]?.url && <Image media={medias.docs[0]} className="h-auto" />}
      <HomeCategories />
    </div>
  )
}
