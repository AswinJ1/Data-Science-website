"use client"

import Image from "next/image"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { useTheme } from "next-themes"
import { Sun, Moon, LogOut, User, PanelLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NotificationBell } from "@/components/admin/notification-bell"

interface AdminHeaderProps {
  onToggleSidebar: () => void
}

export function AdminHeader({ onToggleSidebar }: AdminHeaderProps) {
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()

  const initials = session?.user?.name
    ? session.user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "A"

  return (
    <header className="sticky top-0 z-40 h-14 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex items-center justify-between px-4 md:px-6 gap-2">
      {/* Left side: Logo + sidebar toggle */}
      <div className="flex items-center gap-3">
        <Link href="/admin" className="flex items-center gap-2 shrink-0">
          <Image
            src="/syancy1.png"
            alt="Syancy"
            width={120}
            height={40}
            className="h-9 w-auto object-contain"
          />
          {/* <span className="text-lg font-bold text-gray-900 dark:text-white hidden sm:inline">
            Syancy
          </span> */}
        </Link>

        {/* Sidebar toggle */}
        <div className="hidden md:block border-l border-gray-200 dark:border-gray-700 pl-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="h-8 w-8 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <PanelLeft className="h-4 w-4" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-2">
      {/* Theme toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="h-9 w-9 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      >
        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        <span className="sr-only">Toggle theme</span>
      </Button>

      {/* Notifications */}
      <NotificationBell />

      {/* Avatar dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-9 gap-2 px-2">
            <Avatar className="h-7 w-7">
              <AvatarImage src={session?.user?.image || undefined} />
              <AvatarFallback className="text-xs bg-blue-100 text-blue-600 font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-300">
              {session?.user?.name || "Admin"}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 dark:bg-gray-900 dark:border-gray-700">
          <div className="px-3 py-2">
            <p className="text-sm font-medium dark:text-white">{session?.user?.name || "Admin"}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{session?.user?.email}</p>
          </div>
          <DropdownMenuSeparator className="dark:bg-gray-700" />
          <DropdownMenuItem asChild>
            <a href="/dashboard/profile" className="flex items-center gap-2 cursor-pointer dark:text-gray-300 dark:hover:text-white">
              <User className="h-4 w-4" />
              Profile
            </a>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="dark:bg-gray-700" />
          <DropdownMenuItem
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-2 text-red-600 cursor-pointer dark:text-red-400"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      </div>
    </header>
  )
}
