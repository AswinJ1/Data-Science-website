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
      const headingMatch = line.match(/^(#{1,6})\s+(.+)/)
      if (headingMatch) {
        const level = headingMatch[1].length
        if (level <= 3) {
          const text = headingMatch[2]
          items.push({ id: slugify(text), text, level })
        }
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

    const headings = contentRef.current?.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]")
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

  const renderInlineFormatting = (text: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = []
    let remaining = text
    let key = 0

    while (remaining.length > 0) {
      // Image ![alt](url)
      const imgMatch = remaining.match(/^!\[([^\]]*)\]\(([^)]+)\)/)
      if (imgMatch) {
        parts.push(
          <img key={key++} src={imgMatch[2]} alt={imgMatch[1]} className="inline max-h-96 rounded" />
        )
        remaining = remaining.slice(imgMatch[0].length)
        continue
      }

      // Inline code
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

      // Strikethrough ~~text~~
      const strikeMatch = remaining.match(/^~~(.+?)~~/)
      if (strikeMatch) {
        parts.push(<del key={key++} className="text-gray-500">{strikeMatch[1]}</del>)
        remaining = remaining.slice(strikeMatch[0].length)
        continue
      }

      // Bold + italic ***text***
      const boldItalicMatch = remaining.match(/^\*\*\*(.+?)\*\*\*/)
      if (boldItalicMatch) {
        parts.push(
          <strong key={key++} className="font-semibold text-gray-900"><em>{boldItalicMatch[1]}</em></strong>
        )
        remaining = remaining.slice(boldItalicMatch[0].length)
        continue
      }

      // Bold **text**
      const boldMatch = remaining.match(/^\*\*(.+?)\*\*/)
      if (boldMatch) {
        parts.push(<strong key={key++} className="font-semibold text-gray-900">{boldMatch[1]}</strong>)
        remaining = remaining.slice(boldMatch[0].length)
        continue
      }

      // Italic *text* (but not **)
      const italicMatch = remaining.match(/^\*([^*]+?)\*/)
      if (italicMatch) {
        parts.push(<em key={key++}>{italicMatch[1]}</em>)
        remaining = remaining.slice(italicMatch[0].length)
        continue
      }

      // Italic _text_ (underscore variant)
      const italicUnderMatch = remaining.match(/^_([^_]+?)_/)
      if (italicUnderMatch) {
        parts.push(<em key={key++}>{italicUnderMatch[1]}</em>)
        remaining = remaining.slice(italicUnderMatch[0].length)
        continue
      }

      // Link [text](url)
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

      // Plain text (up to next special char)
      const nextSpecial = remaining.search(/[`*\[~!_]/)
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
      const trimmedLine = line.trim()

      // ── Fenced code blocks (``` or ~~~) ──
      if (trimmedLine.startsWith("```") || trimmedLine.startsWith("~~~")) {
        const fence = trimmedLine.startsWith("```") ? "```" : "~~~"
        const lang = trimmedLine.slice(fence.length).trim()
        const codeLines: string[] = []
        i++
        while (i < lines.length && !lines[i].trim().startsWith(fence)) {
          codeLines.push(lines[i])
          i++
        }
        i++ // skip closing fence
        elements.push(
          <div key={`code-${i}`} className="my-6 rounded-lg overflow-hidden border border-gray-200">
            {lang && (
              <div className="bg-gray-800 px-4 py-2 text-xs text-gray-400 font-mono uppercase tracking-wider">
                {lang}
              </div>
            )}
            <pre className={`bg-gray-900 text-gray-100 p-4 overflow-x-auto text-sm font-mono leading-relaxed ${!lang ? "rounded-lg" : ""}`}>
              <code>{codeLines.join("\n")}</code>
            </pre>
          </div>
        )
        continue
      }

      // ── Horizontal rule (---, ***, ___) ──
      if (/^(\s*[-*_]\s*){3,}$/.test(trimmedLine) && trimmedLine.length >= 3) {
        elements.push(<hr key={i} className="my-8 border-gray-200" />)
        i++
        continue
      }

      // ── Markdown table detection ──
      if (line.includes("|") && i + 1 < lines.length && /^\|?[\s-:|]+\|/.test(lines[i + 1])) {
        const tableLines: string[] = []
        let j = i
        while (j < lines.length && lines[j].includes("|")) {
          tableLines.push(lines[j])
          j++
        }

        if (tableLines.length >= 2) {
          const parseCells = (row: string) => {
            const trimmed = row.trim()
            const stripped = trimmed.startsWith("|") ? trimmed.slice(1) : trimmed
            const final = stripped.endsWith("|") ? stripped.slice(0, -1) : stripped
            return final.split("|").map((c) => c.trim())
          }

          const headerCells = parseCells(tableLines[0])
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
                        style={{ textAlign: (alignments[ci] || "left") as React.CSSProperties["textAlign"] }}
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
                          style={{ textAlign: (alignments[ci] || "left") as React.CSSProperties["textAlign"] }}
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

      // ── Blockquote (>) ──
      if (trimmedLine.startsWith(">")) {
        const quoteLines: string[] = []
        while (i < lines.length && lines[i].trim().startsWith(">")) {
          quoteLines.push(lines[i].trim().replace(/^>\s?/, ""))
          i++
        }
        elements.push(
          <blockquote key={`quote-${i}`} className="my-6 border-l-4 border-blue-500 pl-4 py-2 bg-blue-50/50 rounded-r-lg">
            {quoteLines.map((ql, qi) =>
              ql.trim() === "" ? (
                <br key={qi} />
              ) : (
                <p key={qi} className="text-gray-700 italic my-1">
                  {renderInlineFormatting(ql)}
                </p>
              )
            )}
          </blockquote>
        )
        continue
      }

      // ── Standalone image ![alt](url) ──
      const imgLineMatch = trimmedLine.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
      if (imgLineMatch) {
        elements.push(
          <figure key={i} className="my-6">
            <img src={imgLineMatch[2]} alt={imgLineMatch[1]} className="rounded-lg max-w-full h-auto" />
            {imgLineMatch[1] && (
              <figcaption className="text-center text-sm text-gray-500 mt-2">{imgLineMatch[1]}</figcaption>
            )}
          </figure>
        )
        i++
        continue
      }

      // ── Headings (check from h6 down to h1 to avoid prefix conflicts) ──
      if (trimmedLine.startsWith("#")) {
        let level = 0
        while (level < trimmedLine.length && trimmedLine[level] === "#") level++
        if (level >= 1 && level <= 6 && trimmedLine[level] === " ") {
          const heading = trimmedLine.slice(level + 1)
          const id = slugify(heading)
          const content = renderInlineFormatting(heading)
          const headingClasses: Record<number, string> = {
            1: "text-3xl font-bold mt-10 mb-5 text-gray-900 scroll-mt-24",
            2: "text-2xl font-bold mt-10 mb-4 text-gray-900 scroll-mt-24",
            3: "text-xl font-semibold mt-8 mb-3 text-gray-800 scroll-mt-24",
            4: "text-lg font-semibold mt-8 mb-3 text-gray-800 scroll-mt-24",
            5: "text-base font-semibold mt-6 mb-2 text-gray-800 scroll-mt-24",
            6: "text-sm font-semibold mt-6 mb-2 text-gray-700 scroll-mt-24 uppercase tracking-wider",
          }
          const cls = headingClasses[level]
          if (level === 1) elements.push(<h1 key={i} id={id} className={cls}>{content}</h1>)
          else if (level === 2) elements.push(<h2 key={i} id={id} className={cls}>{content}</h2>)
          else if (level === 3) elements.push(<h3 key={i} id={id} className={cls}>{content}</h3>)
          else if (level === 4) elements.push(<h4 key={i} id={id} className={cls}>{content}</h4>)
          else if (level === 5) elements.push(<h5 key={i} id={id} className={cls}>{content}</h5>)
          else elements.push(<h6 key={i} id={id} className={cls}>{content}</h6>)
          i++
          continue
        }
      }

      // ── Task list items (- [ ] or - [x]) ──
      const taskMatch = trimmedLine.match(/^[-*]\s+\[([ xX])\]\s(.+)/)
      if (taskMatch) {
        const checked = taskMatch[1] !== " "
        elements.push(
          <div key={i} className="flex items-start gap-2 ml-4 my-1">
            <input type="checkbox" checked={checked} readOnly className="mt-1 h-4 w-4 rounded border-gray-300 accent-blue-600" />
            <span className={`text-gray-600 ${checked ? "line-through text-gray-400" : ""}`}>
              {renderInlineFormatting(taskMatch[2])}
            </span>
          </div>
        )
        i++
        continue
      }

      // ── Ordered list items (1. 2. 3.) — group consecutive ──
      if (/^\d+\.\s+/.test(trimmedLine)) {
        const items: string[] = []
        while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
          items.push(lines[i].trim().replace(/^\d+\.\s+/, ""))
          i++
        }
        elements.push(
          <ol key={`ol-${i}`} className="ml-6 my-3 space-y-1 list-decimal">
            {items.map((item, idx) => (
              <li key={idx} className="text-gray-600 pl-1">
                {renderInlineFormatting(item)}
              </li>
            ))}
          </ol>
        )
        continue
      }

      // ── Unordered list items (- or * ) — group consecutive ──
      if (/^[-*]\s+/.test(trimmedLine) && !trimmedLine.startsWith("**")) {
        const items: string[] = []
        while (i < lines.length && /^[-*]\s+/.test(lines[i].trim()) && !lines[i].trim().startsWith("**")) {
          items.push(lines[i].trim().replace(/^[-*]\s+/, ""))
          i++
        }
        elements.push(
          <ul key={`ul-${i}`} className="ml-6 my-3 space-y-1 list-disc">
            {items.map((item, idx) => (
              <li key={idx} className="text-gray-600">
                {renderInlineFormatting(item)}
              </li>
            ))}
          </ul>
        )
        continue
      }

      // ── Bold-only paragraph ──
      if (trimmedLine.startsWith("**") && trimmedLine.endsWith("**") && !trimmedLine.slice(2, -2).includes("**")) {
        elements.push(
          <p key={i} className="font-semibold text-gray-900 my-3">
            {trimmedLine.replace(/^\*\*|\*\*$/g, "")}
          </p>
        )
        i++
        continue
      }

      // ── Empty line ──
      if (trimmedLine === "") {
        elements.push(<br key={i} />)
        i++
        continue
      }

      // ── Regular paragraph ──
      elements.push(
        <p key={i} className="text-gray-600 leading-relaxed mb-3 text-[16px]">
          {renderInlineFormatting(line)}
        </p>
      )
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
