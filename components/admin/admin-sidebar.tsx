"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Briefcase,
  Users,
  FileText,
  FolderOpen,
  Lightbulb,
  ChevronLeft,
  Menu,
  Mail,
  HelpCircle,
  ShieldCheck,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface SidebarItem {
  label: string
  href: string
  icon: any
}

const sidebarItems: SidebarItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Jobs", href: "/admin/jobs", icon: Briefcase },
  { label: "Applications", href: "/admin/applications", icon: Users },
  { label: "Blog Posts", href: "/admin/blog", icon: FileText },
  { label: "Categories", href: "/admin/categories", icon: FolderOpen },
  { label: "Solutions", href: "/admin/solutions", icon: Lightbulb },
  { label: "Contacts", href: "/admin/contacts", icon: Mail },
  { label: "FAQ Questions", href: "/admin/faq-questions", icon: HelpCircle },
]

function SidebarNav({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin"
    return pathname.startsWith(href)
  }

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className={cn("border-b border-gray-200 dark:border-gray-700", collapsed ? "p-3" : "p-4")}>
          {!collapsed && (
            <>
              <Link
                href="/"
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" />
                Back to Site
              </Link>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mt-3">
                Admin Panel
              </h2>
            </>
          )}
          {collapsed && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/"
                  className="flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Back to Site</TooltipContent>
            </Tooltip>
          )}
        </div>

        {/* Nav items */}
        <nav className={cn("flex-1 space-y-1", collapsed ? "p-2" : "p-3")}>
          {sidebarItems.map((item) => {
            const linkContent = (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center rounded-md text-sm font-medium transition-colors",
                  collapsed ? "justify-center px-2 py-2.5" : "gap-3 px-3 py-2",
                  isActive(item.href)
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                )}
              >
                <item.icon className={cn("shrink-0", collapsed ? "h-5 w-5" : "h-4 w-4")} />
                {!collapsed && item.label}
              </Link>
            )

            if (collapsed) {
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                  <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>
              )
            }

            return linkContent
          })}
        </nav>
      </div>
    </TooltipProvider>
  )
}

interface AdminSidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function AdminSidebar({ collapsed, onToggle }: AdminSidebarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col min-h-screen border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <SidebarNav collapsed={collapsed} />
      </aside>

      {/* Mobile sidebar trigger */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 bg-white dark:bg-gray-800 shadow-md"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open admin menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 dark:bg-gray-900">
            <SidebarNav collapsed={false} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
