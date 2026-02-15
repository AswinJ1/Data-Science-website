"use client"

import { useEffect, useState, useMemo, useRef, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Loader2 } from "lucide-react"

interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage: string | null
  metaTitle: string | null
  metaDescription: string | null
  publishedAt: string | null
  category: { name: string; slug: string }
  author: { name: string | null; image: string | null }
}

interface TocItem {
  id: string
  text: string
  level: number
}

export default function BlogDetailPage() {
  const { slug } = useParams()
  const router = useRouter()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeId, setActiveId] = useState<string>("")
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchBlog()
  }, [slug])

  const fetchBlog = async () => {
    try {
      const res = await fetch(`/api/blogs/${slug}`)
      if (!res.ok) throw new Error("Not found")
      const data = await res.json()
      setBlog(data)
    } catch {
      router.push("/blog")
    } finally {
      setLoading(false)
    }
  }

  // Extract table of contents from content
  const tocItems = useMemo<TocItem[]>(() => {
    if (!blog) return []
    const items: TocItem[] = []
    blog.content.split("\n").forEach((line) => {
      if (line.startsWith("## ")) {
        const text = line.replace("## ", "")
        items.push({ id: slugify(text), text, level: 2 })
      } else if (line.startsWith("### ")) {
        const text = line.replace("### ", "")
        items.push({ id: slugify(text), text, level: 3 })
      }
    })
    return items
  }, [blog])

  // Observe headings for active state
  useEffect(() => {
    if (!tocItems.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first visible heading
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    )

    const headings = contentRef.current?.querySelectorAll("h2[id], h3[id]")
    headings?.forEach((h) => observer.observe(h))

    return () => observer.disconnect()
  }, [tocItems])

  const scrollToHeading = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 90
      window.scrollTo({ top: y, behavior: "smooth" })
      setActiveId(id)
    }
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!blog) return null

  const getInitials = (name: string | null) => {
    if (!name) return "A"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const renderInlineFormatting = (text: string) => {
    // Handle bold, italic, inline code, and links
    const parts: React.ReactNode[] = []
    let remaining = text
    let key = 0

    while (remaining.length > 0) {
      // inline code
      const codeMatch = remaining.match(/^`([^`]+)`/)
      if (codeMatch) {
        parts.push(
          <code key={key++} className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">
            {codeMatch[1]}
          </code>
        )
        remaining = remaining.slice(codeMatch[0].length)
        continue
      }

      // bold
      const boldMatch = remaining.match(/^\*\*(.+?)\*\*/)
      if (boldMatch) {
        parts.push(<strong key={key++} className="font-semibold text-gray-900">{boldMatch[1]}</strong>)
        remaining = remaining.slice(boldMatch[0].length)
        continue
      }

      // italic
      const italicMatch = remaining.match(/^\*(.+?)\*/)
      if (italicMatch) {
        parts.push(<em key={key++}>{italicMatch[1]}</em>)
        remaining = remaining.slice(italicMatch[0].length)
        continue
      }

      // link [text](url)
      const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/)
      if (linkMatch) {
        parts.push(
          <a key={key++} href={linkMatch[2]} className="text-blue-600 underline hover:text-blue-800" target="_blank" rel="noopener noreferrer">
            {linkMatch[1]}
          </a>
        )
        remaining = remaining.slice(linkMatch[0].length)
        continue
      }

      // plain text (up to next special char)
      const nextSpecial = remaining.search(/[`*\[]/)
      if (nextSpecial === -1) {
        parts.push(remaining)
        break
      } else if (nextSpecial === 0) {
        parts.push(remaining[0])
        remaining = remaining.slice(1)
      } else {
        parts.push(remaining.slice(0, nextSpecial))
        remaining = remaining.slice(nextSpecial)
      }
    }

    return parts
  }

  const renderContent = (text: string) => {
    const lines = text.split("\n")
    const elements: React.ReactNode[] = []
    let i = 0

    while (i < lines.length) {
      const line = lines[i]

      // Markdown table detection: line contains | and next line is separator
      if (line.includes("|") && i + 1 < lines.length && /^\|?[\s-:|]+\|/.test(lines[i + 1])) {
        const tableLines: string[] = []
        let j = i
        while (j < lines.length && lines[j].includes("|")) {
          tableLines.push(lines[j])
          j++
        }

        if (tableLines.length >= 2) {
          const parseRow = (row: string) =>
            row.split("|").map((c) => c.trim()).filter((c, idx, arr) => !(idx === 0 && c === "") && !(idx === arr.length - 1 && c === ""))

          // Fix: re-parse to handle leading/trailing pipes properly
          const parseCells = (row: string) => {
            const trimmed = row.trim()
            const stripped = trimmed.startsWith("|") ? trimmed.slice(1) : trimmed
            const final = stripped.endsWith("|") ? stripped.slice(0, -1) : stripped
            return final.split("|").map((c) => c.trim())
          }

          const headerCells = parseCells(tableLines[0])
          // Parse alignment from separator row
          const separatorCells = parseCells(tableLines[1])
          const alignments = separatorCells.map((sep) => {
            if (sep.startsWith(":") && sep.endsWith(":")) return "center"
            if (sep.endsWith(":")) return "right"
            return "left"
          })

          const bodyRows = tableLines.slice(2).map(parseCells)

          elements.push(
            <div key={i} className="overflow-x-auto my-6">
              <table className="w-full border-collapse border border-gray-200 text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    {headerCells.map((cell, ci) => (
                      <th
                        key={ci}
                        className="border border-gray-200 px-4 py-3 font-semibold text-gray-900 text-left"
                        style={{ textAlign: alignments[ci] || "left" }}
                      >
                        {renderInlineFormatting(cell)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bodyRows.map((row, ri) => (
                    <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      {row.map((cell, ci) => (
                        <td
                          key={ci}
                          className="border border-gray-200 px-4 py-2.5 text-gray-600"
                          style={{ textAlign: alignments[ci] || "left" }}
                        >
                          {renderInlineFormatting(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
          i = j
          continue
        }
      }

      if (line.startsWith("## ")) {
        const heading = line.replace("## ", "")
        const id = slugify(heading)
        elements.push(
          <h2 key={i} id={id} className="text-2xl font-bold mt-10 mb-4 text-gray-900 scroll-mt-24">
            {heading}
          </h2>
        )
      } else if (line.startsWith("### ")) {
        const heading = line.replace("### ", "")
        const id = slugify(heading)
        elements.push(
          <h3 key={i} id={id} className="text-xl font-semibold mt-8 mb-3 text-gray-800 scroll-mt-24">
            {heading}
          </h3>
        )
      } else if (line.startsWith("- ")) {
        elements.push(
          <li key={i} className="ml-6 text-gray-600 mb-1 list-disc">
            {renderInlineFormatting(line.replace("- ", ""))}
          </li>
        )
      } else if (line.startsWith("**") && line.endsWith("**")) {
        elements.push(
          <p key={i} className="font-semibold text-gray-900 my-3">
            {line.replace(/\*\*/g, "")}
          </p>
        )
      } else if (line.trim() === "") {
        elements.push(<br key={i} />)
      } else {
        elements.push(
          <p key={i} className="text-gray-600 leading-relaxed mb-3 text-[16px]">
            {renderInlineFormatting(line)}
          </p>
        )
      }
      i++
    }

    return elements
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        <div className="flex gap-10">
          {/* Main Article */}
          <article className="flex-1 min-w-0 max-w-3xl">
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 mb-8 group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              Back to Blog
            </Link>

            {/* Category badges */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <Badge
                variant="outline"
                className="rounded-full px-4 py-1 text-sm font-medium border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                {blog.category.name}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-[42px] md:leading-[1.2] font-bold text-gray-900 mb-8">
              {blog.title}
            </h1>

            {/* Author section */}
            <div className="flex items-center gap-3 mb-10">
              <Avatar className="h-11 w-11 border border-gray-200">
                <AvatarImage
                  src={blog.author.image || undefined}
                  alt={blog.author.name || "Author"}
                />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-sm font-semibold">
                  {getInitials(blog.author.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-gray-900 text-[15px] leading-tight">
                  {blog.author.name || "Syancy Team"}
                </p>
                {blog.publishedAt && (
                  <p className="text-sm text-gray-500 mt-0.5">
                    {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                )}
              </div>
            </div>

            {/* Excerpt */}
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
              {blog.excerpt}
            </p>

            {/* Featured Image */}
            {blog.featuredImage && (
              <div className="rounded-xl overflow-hidden mb-10 border border-gray-100">
                <img
                  src={blog.featuredImage}
                  alt={blog.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div ref={contentRef} className="prose md:prose-lg max-w-none">
              {renderContent(blog.content)}
            </div>

            {/* Bottom author card */}
            <div className="mt-14 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14 border-2 border-gray-100">
                  <AvatarImage
                    src={blog.author.image || undefined}
                    alt={blog.author.name || "Author"}
                  />
                  <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                    {getInitials(blog.author.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">
                    Written by
                  </p>
                  <p className="font-semibold text-gray-900 text-lg">
                    {blog.author.name || "Syancy Team"}
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar — Table of Contents (desktop only) */}
          {tocItems.length > 0 && (
            <aside className="hidden lg:block w-64 xl:w-72 flex-shrink-0">
              <nav className="sticky top-24">
                <div className="border-l-2 border-gray-200 pl-0">
                  <ul className="space-y-0">
                    {tocItems.map((item) => (
                      <li key={item.id}>
                        <button
                          onClick={() => scrollToHeading(item.id)}
                          className={`block w-full text-left text-sm leading-snug py-2 transition-colors border-l-2 -ml-[2px] ${
                            item.level === 3 ? "pl-6" : "pl-4"
                          } ${
                            activeId === item.id
                              ? "border-blue-600 text-blue-600 font-medium"
                              : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-400"
                          }`}
                        >
                          {item.text}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
            </aside>
          )}
        </div>
      </div>
    </main>
  )
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}
