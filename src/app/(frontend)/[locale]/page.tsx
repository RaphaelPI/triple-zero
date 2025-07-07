import { Image } from "@/components/image"
import { Button } from "@/components/ui/button"
import { getClient } from "@/lib/payload"

export default async function HomePage() {
  const payload = await getClient()
  const medias = await payload.find({
    collection: "media",
    limit: 1,
  })

  const media = medias.docs[0]

  return (
    <div className="space-y-10 p-10">
      <Button variant="destructive">Click me</Button>
      <Button variant="default">Click me</Button>
      <Button variant="ghost">Click me</Button>
      <Button variant="link">Click me</Button>
      <Button variant="outline">Click me</Button>
      <Button variant="secondary">Click me</Button>

      {media.url && <Image media={media} className="h-auto" />}
    </div>
  )
}
