import { Image } from "@/components/image"
import { Button } from "@/components/ui/button"
import { getClient } from "@/lib/payload"
import { CategoriesMarquee } from "./_components/categories-marquee"
import { getMetadata } from "./metadata"

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
      <Button variant="destructive">Click me</Button>
      <Button variant="default">Click me</Button>
      <Button variant="ghost">Click me</Button>
      <Button variant="link">Click me</Button>
      <Button variant="outline">Click me</Button>
      <Button variant="secondary">Click me</Button>

      {medias.docs[0]?.url && <Image media={medias.docs[0]} className="h-auto" />}
      <CategoriesMarquee />
    </div>
  )
}
