import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"

interface BlogCardProps {
  title: string
  slug: string
  excerpt: string
  featuredImage?: string | null
  category: { name: string; slug: string }
  author: { name: string | null }
  publishedAt: string | null
}

export function BlogCard({
  title,
  slug,
  excerpt,
  featuredImage,
  category,
  author,
  publishedAt,
}: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`}>
      <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden group">
        <div className="aspect-video bg-gray-100 overflow-hidden">
          {featuredImage ? (
            <img
              src={featuredImage}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
              <span className="text-4xl font-bold text-blue-200">
                {title.charAt(0)}
              </span>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="text-xs">{category.name}</Badge>
            {publishedAt && (
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            )}
          </div>
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{excerpt}</p>
          {author.name && (
            <p className="text-xs text-gray-400 mt-3">By {author.name}</p>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
