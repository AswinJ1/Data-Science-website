"use client"

import { useState } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { HRSidebar } from "@/components/hr/hr-sidebar"
import { HRHeader } from "@/components/hr/hr-header"

export default function HRLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="theme-hr">
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
        <HRSidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <HRHeader onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
          <main className="flex-1 p-4 md:p-6 overflow-auto text-gray-900 dark:text-gray-100">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}
