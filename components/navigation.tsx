"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { Menu, X, ChevronDown, LogOut, LayoutDashboard, Shield, Settings } from "lucide-react"
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

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

export default function Navigation() {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)

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
            <Link href="/" aria-label="Syancy Innovations logo" className="block">
              <Image src="/syancy1.png" alt="Syancy Innovations" width={96} height={48} />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="flex items-center gap-8">
            <div className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-gray-900"
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
                          {/* <Shield className="h-4 w-4" /> */}
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
                    <div className="flex flex-col gap-3">
                      {navItems.map((item) => (
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
                                {/* <Shield className="h-4 w-4" /> */}
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