"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Users, Briefcase, Clock, CheckCircle, XCircle, Loader2,
  TrendingUp, BarChart3, PieChart, CalendarDays,
} from "lucide-react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import { Bar, Pie, Line } from "react-chartjs-2"

ChartJS.register(
  CategoryScale, LinearScale, BarElement, ArcElement,
  PointElement, LineElement, Title, Tooltip, Legend, Filler
)

interface Stats {
  totalApplications: number
  applied: number
  underReview: number
  shortlisted: number
  selected: number
  rejected: number
  activeJobs: number
  totalJobs: number
}

interface Application {
  id: string
  status: string
  createdAt: string
  job: { id: string; title: string }
}

interface Job {
  id: string
  title: string
  isActive: boolean
  _count?: { applications: number }
}

const PERIODS = [
  { value: "7d", label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" },
  { value: "3m", label: "Last 3 Months" },
  { value: "6m", label: "Last 6 Months" },
  { value: "all", label: "All Time" },
]

function getPeriodDate(period: string): Date | null {
  const now = new Date()
  if (period === "7d") return new Date(now.getTime() - 7 * 86400000)
  if (period === "30d") return new Date(now.getTime() - 30 * 86400000)
  if (period === "3m") return new Date(now.getTime() - 90 * 86400000)
  if (period === "6m") return new Date(now.getTime() - 180 * 86400000)
  return null
}

function buildTimeSeriesData(apps: Application[], since: Date | null, groupByDay: boolean) {
  const filtered = since ? apps.filter((a) => new Date(a.createdAt) >= since) : apps
  const counts: Record<string, number> = {}
  filtered.forEach((a) => {
    const d = new Date(a.createdAt)
    const key = groupByDay
      ? d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      : d.toLocaleDateString("en-US", { month: "short", year: "2-digit" })
    counts[key] = (counts[key] || 0) + 1
  })
  return counts
}

export default function HRDashboardPage() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<Stats | null>(null)
  const [applications, setApplications] = useState<Application[]>([])
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState("30d")

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/applications").then((r) => r.json()),
      fetch("/api/admin/jobs").then((r) => r.json()),
    ])
      .then(([apps, jobsList]) => {
        const appsList: Application[] = Array.isArray(apps) ? apps : []
        const jobsArr: Job[] = Array.isArray(jobsList) ? jobsList : []
        setApplications(appsList)
        setJobs(jobsArr)
        setStats({
          totalApplications: appsList.length,
          applied: appsList.filter((a) => a.status === "APPLIED").length,
          underReview: appsList.filter((a) => a.status === "UNDER_REVIEW").length,
          shortlisted: appsList.filter((a) => a.status === "SHORTLISTED").length,
          selected: appsList.filter((a) => a.status === "SELECTED").length,
          rejected: appsList.filter((a) => a.status === "REJECTED").length,
          activeJobs: jobsArr.filter((j) => j.isActive).length,
          totalJobs: jobsArr.length,
        })
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

  const since = getPeriodDate(period)
  const groupByDay = period === "7d" || period === "30d"
  const filteredApps = since ? applications.filter((a) => new Date(a.createdAt) >= since) : applications

  // --- Chart: Applications over time ---
  const timeData = buildTimeSeriesData(applications, since, groupByDay)
  const timeLabels = Object.keys(timeData)
  const timeCounts = Object.values(timeData)

  // --- Chart: Status distribution ---
  const statusCounts = [
    stats?.applied || 0,
    stats?.underReview || 0,
    stats?.shortlisted || 0,
    stats?.selected || 0,
    stats?.rejected || 0,
  ]
  const statusLabels = ["Applied", "Under Review", "Shortlisted", "Selected", "Rejected"]
  const statusColors = ["#6366f1", "#f59e0b", "#3b82f6", "#22c55e", "#ef4444"]

  // --- Top Jobs in period ---
  const jobAppCounts: Record<string, { title: string; count: number }> = {}
  filteredApps.forEach((a) => {
    if (!jobAppCounts[a.job.id]) jobAppCounts[a.job.id] = { title: a.job.title, count: 0 }
    jobAppCounts[a.job.id].count++
  })
  const topJobs = Object.entries(jobAppCounts)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 5)

  // --- Chart: Applications by job (bar) ---
  const jobBarLabels = topJobs.map(([, v]) => v.title.length > 20 ? v.title.slice(0, 18) + "…" : v.title)
  const jobBarCounts = topJobs.map(([, v]) => v.count)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Welcome, {session?.user?.name || "HR"}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Applications &amp; recruitment analytics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-gray-400" />
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[160px] h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PERIODS.map((p) => (
                <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {[
          { label: "Total Apps", value: stats?.totalApplications || 0, icon: Users, color: "text-blue-600" },
          { label: "Applied", value: stats?.applied || 0, icon: Clock, color: "text-gray-600" },
          { label: "Under Review", value: stats?.underReview || 0, icon: Clock, color: "text-yellow-600" },
          { label: "Shortlisted", value: stats?.shortlisted || 0, icon: CheckCircle, color: "text-blue-600" },
          { label: "Selected", value: stats?.selected || 0, icon: CheckCircle, color: "text-green-600" },
          { label: "Rejected", value: stats?.rejected || 0, icon: XCircle, color: "text-red-600" },
          { label: "Active Jobs", value: stats?.activeJobs || 0, icon: Briefcase, color: "text-purple-600" },
          { label: "Total Jobs", value: stats?.totalJobs || 0, icon: Briefcase, color: "text-indigo-600" },
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

      {/* Charts Row 1: Applications over time + Status pie */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Line chart: applications over time */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              Application Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            {timeLabels.length === 0 ? (
              <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
                No data for this period
              </div>
            ) : (
              <div className="h-52">
                <Line
                  data={{
                    labels: timeLabels,
                    datasets: [
                      {
                        label: "Applications",
                        data: timeCounts,
                        borderColor: "#3b82f6",
                        backgroundColor: "rgba(59,130,246,0.1)",
                        fill: true,
                        tension: 0.4,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                      x: { ticks: { font: { size: 10 } }, grid: { display: false } },
                      y: { ticks: { stepSize: 1, font: { size: 10 } }, grid: { color: "rgba(0,0,0,0.05)" } },
                    },
                  }}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pie chart: application status distribution */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <PieChart className="h-4 w-4 text-purple-600" />
              Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats?.totalApplications === 0 ? (
              <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
                No applications yet
              </div>
            ) : (
              <div className="h-52">
                <Pie
                  data={{
                    labels: statusLabels,
                    datasets: [
                      {
                        data: statusCounts,
                        backgroundColor: statusColors,
                        borderWidth: 2,
                        borderColor: "#fff",
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "bottom",
                        labels: { font: { size: 10 }, boxWidth: 12, padding: 8 },
                      },
                    },
                  }}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2: Top jobs bar + job activity table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Bar chart: applications per job */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-green-600" />
              Top Jobs by Applications
              <span className="text-xs font-normal text-gray-400 ml-1">
                ({PERIODS.find((p) => p.value === period)?.label})
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {topJobs.length === 0 ? (
              <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
                No applications in this period
              </div>
            ) : (
              <div className="h-52">
                <Bar
                  data={{
                    labels: jobBarLabels,
                    datasets: [
                      {
                        label: "Applications",
                        data: jobBarCounts,
                        backgroundColor: "rgba(99,102,241,0.7)",
                        borderRadius: 4,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                      x: { ticks: { font: { size: 10 } }, grid: { display: false } },
                      y: { ticks: { stepSize: 1, font: { size: 10 } }, grid: { color: "rgba(0,0,0,0.05)" } },
                    },
                  }}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Job activity summary table */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-blue-600" />
              Job Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            {jobs.length === 0 ? (
              <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
                No jobs found
              </div>
            ) : (
              <div className="space-y-2 max-h-52 overflow-y-auto">
                {jobs.slice(0, 8).map((job) => {
                  const count = filteredApps.filter((a) => a.job.id === job.id).length
                  const total = applications.filter((a) => a.job.id === job.id).length
                  return (
                    <div
                      key={job.id}
                      className="flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className={`w-2 h-2 rounded-full flex-shrink-0 ${
                            job.isActive ? "bg-green-500" : "bg-gray-300"
                          }`}
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-[180px]">
                          {job.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0 ml-2">
                        <span className="text-xs text-blue-600 font-medium">{count} new</span>
                        <span className="text-xs text-gray-400">{total} total</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Period recap */}
      <Card className="bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/20">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-6 text-sm">
            <div>
              <span className="text-gray-500 dark:text-gray-400">Applications in period:</span>{" "}
              <span className="font-semibold text-blue-700 dark:text-blue-400">{filteredApps.length}</span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Shortlisted:</span>{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {filteredApps.filter((a) => a.status === "SHORTLISTED").length}
              </span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Selected:</span>{" "}
              <span className="font-semibold text-green-600 dark:text-green-400">
                {filteredApps.filter((a) => a.status === "SELECTED").length}
              </span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Rejected:</span>{" "}
              <span className="font-semibold text-red-600 dark:text-red-400">
                {filteredApps.filter((a) => a.status === "REJECTED").length}
              </span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Active Jobs:</span>{" "}
              <span className="font-semibold text-purple-600 dark:text-purple-400">{stats?.activeJobs || 0}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
