"use client"

import { useEffect, useMemo, useState } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge, JobTypeBadge } from "@/components/admin/status-badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Briefcase, Calendar, FileText, Loader2, ArrowRight, Settings, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Application {
  id: string
  resume: string
  coverLetter: string | null
  status: string
  statusDescription: string | null
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
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    fetch("/api/applications")
      .then((res) => res.json())
      .then((data) => setApplications(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    if (statusFilter === "all") return applications
    return applications.filter((a) => a.status === statusFilter)
  }, [applications, statusFilter])

  const statusDescColor: Record<string, string> = {
    SHORTLISTED: "border-blue-200 bg-blue-50 text-blue-700",
    SELECTED: "border-green-200 bg-green-50 text-green-700",
    REJECTED: "border-red-200 bg-red-50 text-red-700",
  }

  return (
    <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">My Applications</h1>
            <p className="text-muted-foreground mt-1">
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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: "Total Applied", value: applications.length, key: "all" },
            { label: "Under Review", value: applications.filter((a) => a.status === "UNDER_REVIEW").length, key: "UNDER_REVIEW" },
            { label: "Shortlisted", value: applications.filter((a) => a.status === "SHORTLISTED").length, key: "SHORTLISTED" },
            { label: "Selected", value: applications.filter((a) => a.status === "SELECTED").length, key: "SELECTED" },
            { label: "Rejected", value: applications.filter((a) => a.status === "REJECTED").length, key: "REJECTED" },
          ].map((stat) => (
            <Card
              key={stat.label}
              className={`cursor-pointer transition-all ${statusFilter === stat.key ? "ring-2 ring-blue-500" : "hover:shadow-md"}`}
              onClick={() => setStatusFilter(stat.key)}
            >
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Applied Jobs */}
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Applied Jobs
            </CardTitle>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="APPLIED">Applied</SelectItem>
                <SelectItem value="UNDER_REVIEW">Under Review</SelectItem>
                <SelectItem value="SHORTLISTED">Shortlisted</SelectItem>
                <SelectItem value="SELECTED">Selected</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600">
                  {statusFilter !== "all" ? "No applications with this status" : "No applications yet"}
                </h3>
                <p className="text-gray-400 mt-1 mb-4">
                  {statusFilter !== "all"
                    ? "Try clearing the filter to see all applications."
                    : "Start your journey by browsing our open positions."}
                </p>
                {statusFilter !== "all" ? (
                  <Button variant="outline" onClick={() => setStatusFilter("all")}>Show All</Button>
                ) : (
                  <Button asChild>
                    <Link href="/careers">Browse Jobs</Link>
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((app) => (
                  <div
                    key={app.id}
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
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
                    {app.statusDescription && (
                      <div className={`mt-3 p-3 rounded-md border text-sm flex items-start gap-2 ${statusDescColor[app.status] || "border-gray-200 bg-gray-50 text-gray-700"}`}>
                        <MessageSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-xs uppercase mb-0.5">Message from HR</p>
                          <p>{app.statusDescription}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
    </div>
  )
}
