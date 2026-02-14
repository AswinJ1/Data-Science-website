"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { BlogCard } from "@/components/blog-card"
import { SearchInput } from "@/components/search-input"
import { PaginationWrapper } from "@/components/pagination-wrapper"
import { Badge } from "@/components/ui/badge"
import { Loader2, BookOpen } from "lucide-react"

interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string
  featuredImage: string | null
  publishedAt: string | null
  category: { name: string; slug: string }
  author: { name: string | null; image: string | null }
}

interface Category {
  id: string
  name: string
  slug: string
  _count: { blogs: number }
}

function BlogContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 })

  const page = parseInt(searchParams.get("page") || "1")
  const category = searchParams.get("category") || ""
  const search = searchParams.get("search") || ""

  useEffect(() => {
    fetchData()
  }, [page, category, search])

  const fetchData = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.set("page", page.toString())
      params.set("limit", "9")
      if (category) params.set("category", category)
      if (search) params.set("search", search)

      const [blogsRes, catsRes] = await Promise.all([
        fetch(`/api/blogs?${params.toString()}`),
        fetch("/api/categories"),
      ])

      const blogsData = await blogsRes.json()
      const catsData = await catsRes.json()

      setBlogs(blogsData.blogs || [])
      setPagination(blogsData.pagination || { page: 1, totalPages: 1, total: 0 })
      setCategories(catsData || [])
    } catch (error) {
      console.error("Error fetching blogs:", error)
    } finally {
      setLoading(false)
    }
  }

  const setCategory = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (slug) {
      params.set("category", slug)
    } else {
      params.delete("category")
    }
    params.delete("page")
    router.push(`/blog?${params.toString()}`)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Blog & Insights</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Stay updated with the latest trends in data science, AI, and analytics.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-8">
          <div className="flex flex-wrap gap-2">
            <Badge
              className={`cursor-pointer ${!category ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              onClick={() => setCategory("")}
            >
              All
            </Badge>
            {categories.map((cat) => (
              <Badge
                key={cat.id}
                className={`cursor-pointer ${category === cat.slug ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                onClick={() => setCategory(cat.slug)}
              >
                {cat.name} ({cat._count.blogs})
              </Badge>
            ))}
          </div>
          <div className="w-full md:w-64">
            <SearchInput basePath="/blog" placeholder="Search articles..." />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600">No posts found</h3>
            <p className="text-gray-400 mt-1">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <BlogCard key={blog.id} {...blog} />
              ))}
            </div>
            <PaginationWrapper
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              basePath="/blog"
            />
          </>
        )}
      </section>
    </main>
  )
}

export default function BlogPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    }>
      <BlogContent />
    </Suspense>
  )
}
