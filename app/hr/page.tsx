"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/admin/status-badge"
import { Button } from "@/components/ui/button"
import { Users, Briefcase, Clock, CheckCircle, XCircle, Loader2, ArrowRight } from "lucide-react"

interface Stats {
  totalApplications: number
  applied: number
  underReview: number
  shortlisted: number
  selected: number
  rejected: number
  activeJobs: number
}

interface RecentApp {
  id: string
  fullName: string
  email: string
  status: string
  createdAt: string
  job: { title: string }
}

export default function HRDashboardPage() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<Stats | null>(null)
  const [recent, setRecent] = useState<RecentApp[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/applications").then((r) => r.json()),
      fetch("/api/admin/jobs").then((r) => r.json()),
    ])
      .then(([apps, jobs]) => {
        const appsList = Array.isArray(apps) ? apps : []
        const jobsList = Array.isArray(jobs) ? jobs : []
        setStats({
          totalApplications: appsList.length,
          applied: appsList.filter((a: any) => a.status === "APPLIED").length,
          underReview: appsList.filter((a: any) => a.status === "UNDER_REVIEW").length,
          shortlisted: appsList.filter((a: any) => a.status === "SHORTLISTED").length,
          selected: appsList.filter((a: any) => a.status === "SELECTED").length,
          rejected: appsList.filter((a: any) => a.status === "REJECTED").length,
          activeJobs: jobsList.filter((j: any) => j.isActive).length,
        })
        setRecent(
          appsList
            .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 5)
        )
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Welcome, {session?.user?.name || "HR"}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage applications and review candidates
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
        {[
          { label: "Total", value: stats?.totalApplications || 0, icon: Users, color: "text-blue-600" },
          { label: "Applied", value: stats?.applied || 0, icon: Clock, color: "text-gray-600" },
          { label: "Under Review", value: stats?.underReview || 0, icon: Clock, color: "text-yellow-600" },
          { label: "Shortlisted", value: stats?.shortlisted || 0, icon: CheckCircle, color: "text-blue-600" },
          { label: "Selected", value: stats?.selected || 0, icon: CheckCircle, color: "text-green-600" },
          { label: "Rejected", value: stats?.rejected || 0, icon: XCircle, color: "text-red-600" },
          { label: "Active Jobs", value: stats?.activeJobs || 0, icon: Briefcase, color: "text-purple-600" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-3 text-center">
              <s.icon className={`h-4 w-4 mx-auto mb-1 ${s.color}`} />
              <p className="text-xl font-bold text-gray-900 dark:text-white">{s.value}</p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Applications */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Recent Applications</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/hr/applications" className="text-blue-600 flex items-center gap-1">
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {recent.length === 0 ? (
            <p className="text-center py-8 text-gray-500">No applications yet</p>
          ) : (
            <div className="space-y-3">
              {recent.map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div>
                    <p className="font-medium text-sm text-gray-900 dark:text-white">{app.fullName}</p>
                    <p className="text-xs text-gray-500">{app.job.title} &middot; {app.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={app.status} />
                    <span className="text-[10px] text-gray-400">
                      {new Date(app.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
