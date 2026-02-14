"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge, JobTypeBadge } from "@/components/admin/status-badge"
import { Briefcase, Calendar, FileText, Loader2, ArrowRight, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Application {
  id: string
  resume: string
  coverLetter: string | null
  status: string
  createdAt: string
  job: {
    title: string
    slug: string
    location: string
    type: string
  }
}

export default function DashboardPage() {
  const { data: session } = useSession()
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/applications")
      .then((res) => res.json())
      .then((data) => setApplications(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Welcome back, {session?.user?.name || "there"}! Track your job applications.
            </p>
          </div>
          <Link href="/dashboard/profile">
            <Button variant="outline" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Edit Profile
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Applied", value: applications.length },
            { label: "Under Review", value: applications.filter((a) => a.status === "UNDER_REVIEW").length },
            { label: "Shortlisted", value: applications.filter((a) => a.status === "SHORTLISTED").length },
            { label: "Selected", value: applications.filter((a) => a.status === "SELECTED").length },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Applications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              My Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            ) : applications.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600">No applications yet</h3>
                <p className="text-gray-400 mt-1 mb-4">
                  Start your journey by browsing our open positions.
                </p>
                <Button asChild>
                  <Link href="/careers">Browse Jobs</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-gray-900">{app.job.title}</h3>
                        <StatusBadge status={app.status} />
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span>{app.job.location}</span>
                        <JobTypeBadge type={app.job.type} />
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Applied {new Date(app.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Link
                      href={`/careers/${app.job.slug}`}
                      className="text-blue-600 text-sm mt-2 sm:mt-0 flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      View Job <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
