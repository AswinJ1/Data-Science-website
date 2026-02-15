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

/* ── Technologies ─────────────────────────────────────────── */
const technologyItems = [
  { icon: Code2, label: "Python", href: "/technologies/python", description: "Data science, ML & AI with Python ecosystem." },
  { icon: Cloud, label: "AWS", href: "/technologies/aws", description: "Cloud-native data solutions on Amazon Web Services." },
  { icon: Cloud, label: "Azure", href: "/technologies/azure", description: "Enterprise analytics & AI on Microsoft Azure." },
  { icon: LineChart, label: "Power BI", href: "/technologies/power-bi", description: "Interactive dashboards & business reporting." },
  { icon: LineChart, label: "Tableau", href: "/technologies/tableau", description: "Advanced data visualization & storytelling." },
  { icon: Sigma, label: "R", href: "/technologies/r", description: "Statistical computing & data analysis." },
  { icon: ServerCog, label: "Spark", href: "/technologies/spark", description: "Big data processing & distributed computing." },
  { icon: FlaskConical, label: "TensorFlow", href: "/technologies/tensorflow", description: "Deep learning & neural network frameworks." },
]

/* ── Plain nav items (no dropdown) ────────────────────────── */
const plainNavItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

/* ── Mega-menu panel (desktop) ────────────────────────────── */
function MegaMenuPanel({
  items,
  viewAllHref,
  viewAllLabel,
  onClose,
}: {
  items: { icon: React.ElementType; label: string; href: string; description: string }[]
  viewAllHref: string
  viewAllLabel: string
  onClose: () => void
}) {
  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50"
      onMouseLeave={onClose}
    >
      <div className="bg-white rounded-xl shadow-xl border border-gray-100 w-[600px] p-5 animate-in fade-in slide-in-from-top-2 duration-200">
        <div className="grid grid-cols-2 gap-1">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="flex items-start gap-3 rounded-lg p-3 hover:bg-blue-50 transition-colors group"
            >
              <item.icon className="h-4 w-4 flex-shrink-0 mt-0.5 text-gray-400 group-hover:text-blue-600 transition-colors" />
              <div>
                <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                  {item.label}
                </p>
                <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="border-t mt-3 pt-3">
          <Link
            href={viewAllHref}
            onClick={onClose}
            className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors px-3"
          >
            {viewAllLabel}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

/* ── Desktop nav trigger with hover mega-menu ─────────────── */
function NavDropdown({
  label,
  href,
  items,
  viewAllLabel,
  isActive,
}: {
  label: string
  href: string
  items: { icon: React.ElementType; label: string; href: string; description: string }[]
  viewAllLabel: string
  isActive: boolean
}) {
  const [open, setOpen] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined)

  const handleEnter = () => {
    clearTimeout(timeout.current)
    setOpen(true)
  }
  const handleLeave = () => {
    timeout.current = setTimeout(() => setOpen(false), 150)
  }

  useEffect(() => () => clearTimeout(timeout.current), [])

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <Link
        href={href}
        className={`inline-flex items-center gap-1 text-sm font-medium transition-colors ${
          isActive ? "text-blue-600" : "text-gray-700 hover:text-gray-900"
        }`}
      >
        {label}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </Link>

      {open && (
        <MegaMenuPanel
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
  items: { icon: React.ElementType; label: string; href: string; description: string }[]
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
              <item.icon className="h-4 w-4 flex-shrink-0" />
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

  // Fetch solutions from the API so admin-created solutions appear dynamically
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
      .catch(() => {
        // Keep default items on error
      })
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
            <Link href="/" aria-label="Syancy Innovations logo" className="inline-flex items-center gap-3">
              <img src="/logo.svg" alt="Syancy Innovations" className="h-8 w-5 object-contain" />
              <span className="text-xl font-semibold text-gray-900 leading-none">Syancy</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="flex items-center gap-8">
            <div className="hidden lg:flex items-center gap-6">
              {/* Home & About (before dropdowns) */}
              {plainNavItems.slice(0, 2).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive(item.href) ? "text-blue-600" : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

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
              <NavDropdown
                label="Technologies"
                href="/technologies"
                items={technologyItems}
                viewAllLabel="View all technologies"
                isActive={isActive("/technologies")}
              />

              {/* Remaining plain items */}
              {plainNavItems.slice(2).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive(item.href) ? "text-blue-600" : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
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
                    ) : (
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="flex items-center gap-2">
                          <LayoutDashboard className="h-4 w-4" />
                          My Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/profile" className="flex items-center gap-2">
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
                              href="/dashboard/profile"
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