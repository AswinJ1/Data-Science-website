"use client"

import React, { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import {
  Menu, ChevronDown, ChevronRight, LogOut, LayoutDashboard, Settings,
  Database, Cog, BarChart3, Brain, Search, TrendingUp,
  Heart, DollarSign, ShoppingCart, Factory, Zap, ArrowRight,
  Code2, Cloud, LineChart, ServerCog, Sigma, FlaskConical,
  Lightbulb, Globe,
} from "lucide-react"
import {
  SiPython, SiR,
  SiApachespark,
  SiTensorflow, SiPytorch, SiLangchain, SiHuggingface,
  SiMongodb, SiPostgresql, SiRedis,
  SiAnthropic, SiMeta,
} from "@icons-pack/react-simple-icons"
import { Java, AmazonWebServicesDark, MicrosoftAzure } from "@ridemountainpig/svgl-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"

/* ── Service sub-pages ────────────────────────────────────── */
const serviceItems = [
  {
    icon: Database,
    label: "Data Engineering",
    href: "/services/data-engineering",
    description: "Build robust data pipelines and infrastructure at scale.",
  },
  {
    icon: Cog,
    label: "Data Crunching",
    href: "/services/data-crunching",
    description: "Transform raw data into clean, structured datasets.",
  },
  {
    icon: BarChart3,
    label: "Data Analysis",
    href: "/services/data-analysis",
    description: "Extract insights through statistical analysis & visualization.",
  },
  {
    icon: Brain,
    label: "Data Science",
    href: "/services/data-science",
    description: "Leverage ML and AI to predict trends and automate decisions.",
  },
  {
    icon: Search,
    label: "Data Mining",
    href: "/services/data-mining",
    description: "Discover hidden patterns in large datasets.",
  },
  {
    icon: ServerCog,
    label: "Data Migration",
    href: "/services/data-migration",
    description: "Seamlessly migrate data across platforms with zero downtime.",
  },
  {
    icon: Cloud,
    label: "Data Modernization",
    href: "/services/data-modernization",
    description: "Modernize legacy systems into cloud-native architectures.",
  },
  {
    icon: Sigma,
    label: "AI & Machine Learning",
    href: "/services/ai-machine-learning",
    description: "Custom ML models and intelligent automation solutions.",
  },
  {
    icon: Globe,
    label: "Geospatial Data Services",
    href: "/services/geospatial-data-services",
    description: "Location intelligence, GIS analysis & spatial data solutions.",
  },
  {
    icon: LineChart,
    label: "Data Analytics & BI",
    href: "/services/data-analytics-bi",
    description: "Actionable dashboards and strategic business intelligence.",
  },
]

/* ── Solution categories (fetched dynamically) ────────────── */
const solutionIconMap: Record<string, React.ElementType> = {
  Heart,
  DollarSign,
  ShoppingCart,
  Factory,
  Zap,
  Lightbulb,
  Globe,
  Database,
  Brain,
  BarChart3,
  Search,
  TrendingUp,
}

type NavItem = { icon: React.ElementType; label: string; href: string; description: string }

// Default fallback items shown while API loads or if it fails
const defaultSolutionItems: NavItem[] = [
  { icon: Heart, label: "Healthcare", href: "/solutions/healthcare", description: "AI-powered diagnostics & patient analytics." },
  { icon: DollarSign, label: "Finance", href: "/solutions/finance", description: "Risk modeling & fraud detection." },
  { icon: ShoppingCart, label: "Retail & E-Commerce", href: "/solutions/retail-e-commerce", description: "Customer segmentation & demand forecasting." },
  { icon: Factory, label: "Manufacturing", href: "/solutions/manufacturing", description: "Predictive maintenance & supply chain optimization." },
  { icon: Zap, label: "Energy", href: "/solutions/energy", description: "Smart grid analytics & consumption forecasting." },
]

/* ── Technologies (categorized) ───────────────────────────── */
const techCategories = [
  {
    heading: "Languages",
    items: [
      { icon: SiPython, image: "/techstack/python.svg", label: "Python", href: "/technologies/python" },
      { icon: SiR, image: "/techstack/R.svg", label: "R", href: "/technologies/r" },
      { icon: Java, image: "/techstack/java.svg", label: "Java", href: "/technologies/java" },
    ],
  },
  {
    heading: "Cloud & Visualization",
    items: [
      { icon: AmazonWebServicesDark, image: "/techstack/aws.svg", label: "AWS", href: "/technologies/aws" },
      { icon: MicrosoftAzure, image: "/techstack/Microsoft-Azure.svg", label: "Azure", href: "/technologies/azure" },
      { icon: LineChart, image: "/techstack/power-bi-icon.svg", label: "Power BI", href: "/technologies/power-bi" },
      { icon: LineChart, image: "/techstack/tableau.svg", label: "Tableau", href: "/technologies/tableau" },
      { icon: SiApachespark, image: null as string | null, label: "Apache Spark", href: "/technologies/spark" },
    ],
  },
  {
    heading: "AI / ML Frameworks",
    items: [
      { icon: SiTensorflow, image: null as string | null, label: "TensorFlow", href: "/technologies/tensorflow" },
      { icon: SiPytorch, image: null as string | null, label: "PyTorch", href: "/technologies/pytorch" },
      { icon: FlaskConical, image: null as string | null, label: "Apache MXNet", href: "/technologies/mxnet" },
      { icon: SiLangchain, image: null as string | null, label: "LangChain", href: "/technologies/langchain" },
      { icon: SiHuggingface, image: null as string | null, label: "Hugging Face", href: "/technologies/hugging-face" },
    ],
  },
  {
    heading: "Databases",
    items: [
      { icon: SiMongodb, image: null as string | null, label: "MongoDB", href: "/technologies/mongodb" },
      { icon: SiPostgresql, image: null as string | null, label: "PostgreSQL", href: "/technologies/postgresql" },
      { icon: SiRedis, image: null as string | null, label: "Redis", href: "/technologies/redis" },
    ],
  },
  {
    heading: "Generative AI",
    items: [
      { icon: Sigma, image: "/techstack/gemini.svg", label: "Google Gemini", href: "/technologies/gemini" },
      { icon: SiAnthropic, image: null as string | null, label: "Claude", href: "/technologies/claude" },
      { icon: SiMeta, image: null as string | null, label: "Meta LLaMA", href: "/technologies/meta-llama" },
    ],
  },
  {
    heading: "Data & AI Tools",
    items: [
      { icon: Search, image: "/techstack/pinecone.svg", label: "Pinecone", href: "/technologies/pinecone" },
      { icon: Cog, image: "/techstack/octoml.svg", label: "OctoML", href: "/technologies/octoml" },
      { icon: BarChart3, image: "/techstack/Helicone.svg", label: "Helicone", href: "/technologies/helicone" },
    ],
  },
]

/* Flattened for mobile */
const technologyItems = techCategories.flatMap((cat) =>
  cat.items.map((item) => ({ ...item, description: cat.heading }))
)

/* ── Nested Flyout Sub-menu (Apexon Category Style) ─────────────── */
function NestedFlyoutTechDropdown({
  categories,
  onClose,
}: {
  categories: typeof techCategories
  onClose: () => void
}) {
  const [activeCat, setActiveCat] = useState<string>(categories[0].heading)

  return (
    <div
      className="absolute top-full left-0 pt-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
      onMouseLeave={onClose}
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100/90 flex p-1.5 gap-1.5 min-w-[480px]">
        {/* Level 1: Category Menu Headers */}
        <div className="w-52 flex flex-col gap-0.5 border-r border-gray-100 pr-1.5">
          {categories.map((cat) => (
            <button
              key={cat.heading}
              onMouseEnter={() => setActiveCat(cat.heading)}
              onClick={() => setActiveCat(cat.heading)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                activeCat === cat.heading
                  ? "bg-blue-50 text-blue-700 font-bold"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span>{cat.heading}</span>
              <ChevronRight className={`h-3.5 w-3.5 transition-transform ${activeCat === cat.heading ? "text-blue-600 translate-x-0.5" : "text-gray-300"}`} />
            </button>
          ))}
        </div>

        {/* Level 2: Sub-menu Options for Active Category */}
        <div className="flex-1 p-2 flex flex-col justify-between min-h-[280px]">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest px-2 pb-1 border-b border-gray-100 mb-2">
              {activeCat}
            </p>
            {categories
              .find((c) => c.heading === activeCat)
              ?.items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-blue-50/80 text-gray-800 hover:text-blue-700 text-xs font-semibold transition-all group"
                >
                  {item.image ? (
                    <img src={item.image} alt={item.label} className="h-4 w-4 object-contain shrink-0" />
                  ) : (
                    <item.icon className="h-4 w-4 text-gray-400 group-hover:text-blue-600 shrink-0" />
                  )}
                  <span>{item.label}</span>
                </Link>
              ))}
          </div>

          <div className="pt-2 mt-3 border-t border-gray-100">
            <Link
              href="/technologies"
              onClick={onClose}
              className="flex items-center justify-between text-xs font-semibold text-blue-600 hover:text-blue-800 px-2 py-1"
            >
              <span>View all technologies</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Tech Nav Dropdown ─────────────────────────── */
function TechNavDropdown({ isActive }: { isActive: boolean }) {
  const [open, setOpen] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined)

  const handleEnter = () => {
    clearTimeout(timeout.current)
    setOpen(true)
  }
  const handleLeave = () => {
    timeout.current = setTimeout(() => setOpen(false), 300)
  }

  useEffect(() => () => clearTimeout(timeout.current), [])

  return (
    <div className="relative py-2" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <Link
        href="/technologies"
        className={`inline-flex items-center gap-1 text-sm font-medium transition-colors py-1 ${
          isActive ? "text-blue-600" : "text-gray-700 hover:text-gray-900"
        }`}
      >
        Technologies
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180 text-blue-600" : ""}`} />
      </Link>

      {open && (
        <NestedFlyoutTechDropdown
          categories={techCategories}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  )
}

/* ── Company & Resources Sub-menus ────────────────────────── */
const companyItems: NavItem[] = [
  { icon: Globe, label: "About Syancy", href: "/about", description: "Our story, mission, and research methodology." },
  { icon: Brain, label: "Executive Team", href: "/about#team", description: "Meet the leadership behind Syancy Innovations." },
  { icon: TrendingUp, label: "Careers", href: "/careers", description: "Join our team of data scientists & engineers." },
  { icon: Lightbulb, label: "Contact Us", href: "/contact", description: "Connect with our strategic advisors." },
]

const resourceItems: NavItem[] = [
  { icon: BarChart3, label: "Blog & Insights", href: "/blog", description: "Latest industry research, AI, and data analytics." },
  { icon: Search, label: "Case Studies", href: "/blog", description: "Real-world client success stories & benchmark results." },
  { icon: Zap, label: "FAQ & Support", href: "/faq", description: "Frequently asked questions and support center." },
]

const plainNavItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

/* ── Vertical Dropdown Panel (Apexon Single Column Style) ────── */
function VerticalDropdownPanel({
  items,
  viewAllHref,
  viewAllLabel,
  onClose,
}: {
  items: { icon: React.ElementType; label: string; href: string; description?: string }[]
  viewAllHref?: string
  viewAllLabel?: string
  onClose: () => void
}) {
  return (
    <div
      className="absolute top-full left-0 pt-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
      onMouseLeave={onClose}
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100/90 w-64 p-1.5 divide-y divide-gray-100/70">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={onClose}
            className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-blue-50/80 text-gray-700 hover:text-blue-600 transition-all group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <item.icon className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors shrink-0" />
              <span className="text-xs font-semibold tracking-tight text-gray-800 group-hover:text-blue-700 truncate">
                {item.label}
              </span>
            </div>
            <ChevronRight className="h-3.5 w-3.5 text-gray-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
          </Link>
        ))}

        {viewAllHref && viewAllLabel && (
          <div className="pt-1 mt-1 border-t border-gray-100">
            <Link
              href={viewAllHref}
              onClick={onClose}
              className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors rounded-lg hover:bg-blue-50"
            >
              <span>{viewAllLabel}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Desktop Nav Trigger (No Flickering Buffer) ─────────────── */
function NavDropdown({
  label,
  href,
  items,
  viewAllLabel,
  isActive,
}: {
  label: string
  href: string
  items: { icon: React.ElementType; label: string; href: string; description?: string }[]
  viewAllLabel?: string
  isActive: boolean
}) {
  const [open, setOpen] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined)

  const handleEnter = () => {
    clearTimeout(timeout.current)
    setOpen(true)
  }
  const handleLeave = () => {
    timeout.current = setTimeout(() => setOpen(false), 300)
  }

  useEffect(() => () => clearTimeout(timeout.current), [])

  return (
    <div className="relative py-2" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <Link
        href={href}
        className={`inline-flex items-center gap-1 text-sm font-medium transition-colors py-1 ${
          isActive ? "text-blue-600" : "text-gray-700 hover:text-gray-900"
        }`}
      >
        {label}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180 text-blue-600" : ""}`} />
      </Link>

      {open && (
        <VerticalDropdownPanel
          items={items}
          viewAllHref={href}
          viewAllLabel={viewAllLabel}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  )
}

/* ── Mobile collapsible section ───────────────────────────── */
function MobileCollapsible({
  label,
  href,
  items,
  isActive,
  onNavigate,
}: {
  label: string
  href: string
  items: { icon: React.ElementType; image?: string | null; label: string; href: string; description: string }[]
  isActive: boolean
  onNavigate: () => void
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div>
      <div className="flex items-center">
        <Link
          href={href}
          onClick={onNavigate}
          className={`flex-1 text-base font-medium px-3 py-2 rounded-md transition-colors ${
            isActive ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          {label}
        </Link>
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-2 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-50"
        >
          <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>
      </div>
      {expanded && (
        <div className="ml-4 mt-1 flex flex-col gap-0.5 border-l-2 border-blue-100 pl-3">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={onNavigate}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              {item.image ? (
                <img src={item.image} alt={item.label} className="h-5 w-5 flex-shrink-0 object-contain" />
              ) : (
                <item.icon className="h-4 w-4 flex-shrink-0" />
              )}
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Main Navigation ──────────────────────────────────────── */
export default function Navigation() {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [solutionItems, setSolutionItems] = useState<NavItem[]>(defaultSolutionItems)

  useEffect(() => {
    fetch("/api/solutions")
      .then((res) => res.json())
      .then((data: { title: string; slug: string; industry: string; description: string; icon: string | null }[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setSolutionItems(
            data.map((s) => ({
              icon: solutionIconMap[s.icon || ""] || Lightbulb,
              label: s.title.replace(/ Data Solutions?$/i, ""),
              href: `/solutions/${s.slug}`,
              description: s.description.length > 60 ? s.description.slice(0, 57) + "…" : s.description,
            }))
          )
        }
      })
      .catch(() => {})
  }, [])

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <nav role="navigation" className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between px-4 py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" aria-label="Syancy Innovations" className="inline-flex items-center shrink-0">
              <img src="/wordmark.svg" alt="Syancy Innovations" className="h-8 w-auto max-w-[130px] object-contain" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="flex items-center gap-8">
            <div className="hidden lg:flex items-center gap-6">
              {/* Home */}
              <Link
                href="/"
                className={`text-sm font-medium transition-colors ${
                  isActive("/") ? "text-blue-600" : "text-gray-700 hover:text-gray-900"
                }`}
              >
                Home
              </Link>

              {/* Services mega-menu */}
              <NavDropdown
                label="Services"
                href="/services"
                items={serviceItems}
                viewAllLabel="View all services"
                isActive={isActive("/services")}
              />

              {/* Solutions mega-menu */}
              <NavDropdown
                label="Solutions"
                href="/solutions"
                items={solutionItems}
                viewAllLabel="View all solutions"
                isActive={isActive("/solutions")}
              />

              {/* Technologies mega-menu */}
              <TechNavDropdown isActive={isActive("/technologies")} />

              {/* Company mega-menu */}
              <NavDropdown
                label="Company"
                href="/about"
                items={companyItems}
                viewAllLabel="Learn about Syancy"
                isActive={isActive("/about") || isActive("/careers")}
              />

              {/* Resources mega-menu */}
              <NavDropdown
                label="Resources"
                href="/blog"
                items={resourceItems}
                viewAllLabel="Explore all resources"
                isActive={isActive("/blog") || isActive("/faq")}
              />

              {/* Contact */}
              <Link
                href="/contact"
                className={`text-sm font-medium transition-colors ${
                  isActive("/contact") ? "text-blue-600" : "text-gray-700 hover:text-gray-900"
                }`}
              >
                Contact
              </Link>
            </div>

            {/* Auth Buttons (Desktop) */}
            <div className="hidden lg:flex items-center gap-3">
              {status === "loading" ? (
                <div className="w-20 h-9 bg-gray-100 animate-pulse rounded" />
              ) : session?.user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 text-sm font-medium border-none shadow-none"
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={session.user.image || undefined} alt={session.user.name || "User"} />
                        <AvatarFallback className="text-[10px] bg-blue-100 text-blue-600 font-semibold">
                          {session.user.name
                            ? session.user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
                            : "U"}
                        </AvatarFallback>
                      </Avatar>
                      {session.user.name || "Account"}
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {session.user.role === "ADMIN" ? (
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="flex items-center gap-2">
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    ) : session.user.role === "HR" ? (
                      <DropdownMenuItem asChild>
                        <Link href="/hr" className="flex items-center gap-2">
                          <LayoutDashboard className="h-4 w-4" />
                          HR Dashboard
                        </Link>
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="flex items-center gap-2">
                          <LayoutDashboard className="h-4 w-4" />
                          My Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                      <Link href={session.user.role === "ADMIN" ? "/admin/profile" : session.user.role === "HR" ? "/hr/profile" : "/dashboard/profile"} className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        Edit Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="flex items-center gap-2 text-red-600 cursor-pointer"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/register"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu */}
            <div className="lg:hidden">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                  <div className="flex flex-col gap-6 mt-6">
                    <div className="flex flex-col gap-1">
                      {/* Home & About */}
                      {plainNavItems.slice(0, 2).map((item) => (
                        <SheetClose asChild key={item.href}>
                          <Link
                            href={item.href}
                            className={`text-base font-medium px-3 py-2 rounded-md transition-colors ${
                              isActive(item.href)
                                ? "text-blue-600 bg-blue-50"
                                : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                            }`}
                          >
                            {item.label}
                          </Link>
                        </SheetClose>
                      ))}

                      {/* Services collapsible */}
                      <MobileCollapsible
                        label="Services"
                        href="/services"
                        items={serviceItems}
                        isActive={isActive("/services")}
                        onNavigate={() => setMobileOpen(false)}
                      />

                      {/* Solutions collapsible */}
                      <MobileCollapsible
                        label="Solutions"
                        href="/solutions"
                        items={solutionItems}
                        isActive={isActive("/solutions")}
                        onNavigate={() => setMobileOpen(false)}
                      />

                      {/* Technologies collapsible */}
                      <MobileCollapsible
                        label="Technologies"
                        href="/technologies"
                        items={technologyItems}
                        isActive={isActive("/technologies")}
                        onNavigate={() => setMobileOpen(false)}
                      />

                      {/* Remaining plain items */}
                      {plainNavItems.slice(2).map((item) => (
                        <SheetClose asChild key={item.href}>
                          <Link
                            href={item.href}
                            className={`text-base font-medium px-3 py-2 rounded-md transition-colors ${
                              isActive(item.href)
                                ? "text-blue-600 bg-blue-50"
                                : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                            }`}
                          >
                            {item.label}
                          </Link>
                        </SheetClose>
                      ))}
                    </div>

                    <div className="border-t pt-4 flex flex-col gap-3">
                      {session?.user ? (
                        <>
                          <div className="flex items-center gap-3 px-3 pb-2">
                            <Avatar className="h-9 w-9">
                              <AvatarImage src={session.user.image || undefined} alt={session.user.name || "User"} />
                              <AvatarFallback className="text-xs bg-blue-100 text-blue-600 font-semibold">
                                {session.user.name
                                  ? session.user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
                                  : "U"}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{session.user.name || "User"}</p>
                              <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                            </div>
                          </div>
                          {session.user.role === "ADMIN" ? (
                            <SheetClose asChild>
                              <Link
                                href="/admin"
                                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                              >
                                Admin Dashboard
                              </Link>
                            </SheetClose>
                          ) : session.user.role === "HR" ? (
                            <SheetClose asChild>
                              <Link
                                href="/hr"
                                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                              >
                                <LayoutDashboard className="h-4 w-4" />
                                HR Dashboard
                              </Link>
                            </SheetClose>
                          ) : (
                            <SheetClose asChild>
                              <Link
                                href="/dashboard"
                                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                              >
                                <LayoutDashboard className="h-4 w-4" />
                                My Dashboard
                              </Link>
                            </SheetClose>
                          )}
                          <SheetClose asChild>
                            <Link
                              href={session.user.role === "ADMIN" ? "/admin/profile" : session.user.role === "HR" ? "/hr/profile" : "/dashboard/profile"}
                              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                            >
                              <Settings className="h-4 w-4" />
                              Edit Profile
                            </Link>
                          </SheetClose>
                          <button
                            onClick={() => {
                              signOut({ callbackUrl: "/" })
                              setMobileOpen(false)
                            }}
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md"
                          >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                          </button>
                        </>
                      ) : (
                        <>
                          <SheetClose asChild>
                            <Link
                              href="/auth/login"
                              className="block text-center px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                            >
                              Sign In
                            </Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <Link
                              href="/auth/register"
                              className="block text-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
                            >
                              Get Started
                            </Link>
                          </SheetClose>
                        </>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}