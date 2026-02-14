"use client"

import { useEffect, useState, useCallback } from "react"
import { StatsCard } from "@/components/admin/stats-card"
import { StatusBadge } from "@/components/admin/status-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Briefcase, Users, FileText, Loader2,
  TrendingUp, BarChart3, PieChart, CalendarDays, Filter,
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

interface TimePoint { period: string; label: string; count: number }

interface Analytics {
  overview: {
    totalUsers: number
    totalJobs: number
    activeJobs: number
    totalApplications: number
    filteredApplications: number
    totalBlogs: number
    publishedBlogs: number
    totalCategories: number
  }
  charts: {
    applicationsByStatus: { name: string; value: number }[]
    applicationsByTime: TimePoint[]
    blogsByTime: TimePoint[]
    usersByTime: TimePoint[]
    jobsByType: { name: string; value: number }[]
    blogsByCategory: { name: string; value: number }[]
  }
  recentApplications: any[]
  recentBlogs: any[]
  topJobs: { id: string; title: string; type: string; isActive: boolean; applications: number }[]
  meta: { period: string; dateFrom: string | null; dateTo: string; groupByDay: boolean }
}

const PERIODS = [
  { value: "7d", label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" },
  { value: "3m", label: "Last 3 Months" },
  { value: "6m", label: "Last 6 Months" },
  { value: "1y", label: "Last Year" },
  { value: "all", label: "All Time" },
  { value: "custom", label: "Custom Range" },
]

const STATUS_COLORS: Record<string, string> = {
  "APPLIED": "#3B82F6",
  "UNDER REVIEW": "#F59E0B",
  "SHORTLISTED": "#8B5CF6",
  "SELECTED": "#10B981",
  "REJECTED": "#EF4444",
}

const CHART_COLORS = [
  "#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6",
  "#EC4899", "#14B8A6", "#F97316",
]

export default function AdminDashboard() {
  const [data, setData] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState("6m")
  const [customFrom, setCustomFrom] = useState("")
  const [customTo, setCustomTo] = useState("")

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      let url = `/api/admin/analytics?period=${period}`
      if (period === "custom" && customFrom && customTo) {
        url = `/api/admin/analytics?from=${customFrom}&to=${customTo}`
      }
      const res = await fetch(url)
      const json = await res.json()
      setData(json)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [period, customFrom, customTo])

  useEffect(() => {
    if (period !== "custom") fetchData()
  }, [period])

  const handleCustomApply = () => {
    if (customFrom && customTo) fetchData()
  }

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!data) return null

  const { overview, charts, recentApplications, recentBlogs, topJobs } = data
  const labels = charts.applicationsByTime.map((m) => m.label)

  // --- Multi-line chart: Applications, Users, Blogs over time ---
  const multiLineData = {
    labels,
    datasets: [
      {
        label: "Applications",
        data: charts.applicationsByTime.map((m) => m.count),
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.08)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#3B82F6",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: "New Users",
        data: charts.usersByTime.map((m) => m.count),
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.08)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#10B981",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: "Blog Posts",
        data: charts.blogsByTime.map((m) => m.count),
        borderColor: "#F59E0B",
        backgroundColor: "rgba(245, 158, 11, 0.08)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#F59E0B",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  }

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index" as const, intersect: false },
    plugins: {
      legend: {
        position: "top" as const,
        align: "end" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          font: { size: 12 },
          color: "#6B7280",
        },
      },
      tooltip: {
        backgroundColor: "#1F2937",
        titleFont: { size: 13 },
        bodyFont: { size: 12 },
        padding: 12,
        cornerRadius: 0,
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#9CA3AF", font: { size: 11 }, maxRotation: 45 },
      },
      y: {
        beginAtZero: true,
        ticks: { color: "#9CA3AF", font: { size: 12 }, stepSize: 1 },
        grid: { color: "rgba(229, 231, 235, 0.5)" },
      },
    },
  }

  // Doughnut: Application status
  const statusDoughnutData = {
    labels: charts.applicationsByStatus.map((s) => s.name),
    datasets: [{
      data: charts.applicationsByStatus.map((s) => s.value),
      backgroundColor: charts.applicationsByStatus.map((s) => STATUS_COLORS[s.name] || "#6B7280"),
      borderWidth: 0,
      hoverOffset: 6,
    }],
  }

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: { padding: 16, usePointStyle: true, pointStyle: "circle", font: { size: 12 }, color: "#6B7280" },
      },
      tooltip: { backgroundColor: "#1F2937", padding: 10, cornerRadius: 0 },
    },
  }

  // Bar: Jobs by type
  const jobTypeBarData = {
    labels: charts.jobsByType.map((j) => j.name),
    datasets: [{
      label: "Jobs",
      data: charts.jobsByType.map((j) => j.value),
      backgroundColor: CHART_COLORS.slice(0, charts.jobsByType.length),
      borderRadius: 0,
      barThickness: 40,
    }],
  }

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: "#1F2937", padding: 10, cornerRadius: 0 },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#9CA3AF", font: { size: 12 } } },
      y: { beginAtZero: true, ticks: { color: "#9CA3AF", font: { size: 12 }, stepSize: 1 }, grid: { color: "rgba(229, 231, 235, 0.5)" } },
    },
  }

  // Doughnut: Blogs by category
  const blogCategoryData = {
    labels: charts.blogsByCategory.map((b) => b.name),
    datasets: [{
      label: "Posts",
      data: charts.blogsByCategory.map((b) => b.value),
      backgroundColor: CHART_COLORS.slice(0, charts.blogsByCategory.length),
      borderRadius: 0,
      barThickness: 22,
    }],
  }

  const blogCategoryBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y" as const,
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: "#1F2937", padding: 10, cornerRadius: 0 },
    },
    scales: {
      x: { beginAtZero: true, ticks: { color: "#9CA3AF", font: { size: 12 }, stepSize: 1 }, grid: { color: "rgba(229, 231, 235, 0.5)" } },
      y: { grid: { display: false }, ticks: { color: "#4B5563", font: { size: 12 } } },
    },
  }

  // Horizontal Bar: Top jobs
  const topJobsBarData = {
    labels: topJobs.map((j) => j.title.length > 25 ? j.title.slice(0, 25) + "…" : j.title),
    datasets: [{
      label: "Applications",
      data: topJobs.map((j) => j.applications),
      backgroundColor: "rgba(59, 130, 246, 0.8)",
      borderRadius: 0,
      barThickness: 24,
    }],
  }

  const horizontalBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y" as const,
    plugins: { legend: { display: false }, tooltip: { backgroundColor: "#1F2937", padding: 10, cornerRadius: 0 } },
    scales: {
      x: { beginAtZero: true, ticks: { color: "#9CA3AF", font: { size: 12 }, stepSize: 1 }, grid: { color: "rgba(229, 231, 235, 0.5)" } },
      y: { grid: { display: false }, ticks: { color: "#4B5563", font: { size: 12 } } },
    },
  }

  return (
    <div className="space-y-6">
      {/* Header + Date Filter */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-sm text-gray-500 mt-1">
            Full system analytics
            {data.meta.dateFrom && (
              <span>
                {" "}· {new Date(data.meta.dateFrom).toLocaleDateString()} – {new Date(data.meta.dateTo).toLocaleDateString()}
              </span>
            )}
          </p>
        </div>

        <div className="flex flex-wrap items-end gap-3">
          <div className="w-44">
            <Label className="text-xs text-gray-500 mb-1 block">
              <CalendarDays className="h-3 w-3 inline mr-1" />
              Time Period
            </Label>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PERIODS.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {period === "custom" && (
            <>
              <div>
                <Label className="text-xs text-gray-500 mb-1 block">From</Label>
                <Input
                  type="date"
                  value={customFrom}
                  onChange={(e) => setCustomFrom(e.target.value)}
                  className="h-9 w-36"
                />
              </div>
              <div>
                <Label className="text-xs text-gray-500 mb-1 block">To</Label>
                <Input
                  type="date"
                  value={customTo}
                  onChange={(e) => setCustomTo(e.target.value)}
                  className="h-9 w-36"
                />
              </div>
              <Button
                size="sm"
                onClick={handleCustomApply}
                disabled={!customFrom || !customTo}
                className="h-9 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Filter className="h-3.5 w-3.5 mr-1" />
                Apply
              </Button>
            </>
          )}

          {loading && <Loader2 className="h-4 w-4 animate-spin text-blue-600 ml-2" />}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Users" value={overview.totalUsers} icon={Users} description="Registered applicants" />
        <StatsCard title="Total Jobs" value={overview.totalJobs} icon={Briefcase} description={`${overview.activeJobs} active`} />
        <StatsCard
          title="Applications"
          value={overview.filteredApplications}
          icon={TrendingUp}
          description={overview.filteredApplications !== overview.totalApplications ? `${overview.totalApplications} total` : undefined}
        />
        <StatsCard title="Blog Posts" value={overview.totalBlogs} icon={FileText} description={`${overview.publishedBlogs} published`} />
      </div>

      {/* Row 1: Multi-line trend + Status breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              Activity Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[320px]">
              <Line data={multiLineData} options={lineOptions} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <PieChart className="h-4 w-4 text-blue-600" />
              Application Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[320px] flex items-center justify-center">
              {charts.applicationsByStatus.length > 0 ? (
                <Pie data={statusDoughnutData} options={pieOptions} />
              ) : (
                <p className="text-gray-400 text-sm">No applications yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 2: Jobs by Type + Blogs by Category */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-blue-600" />
              Jobs by Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              {charts.jobsByType.length > 0 ? (
                <Bar data={jobTypeBarData} options={barOptions} />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-400 text-sm">No jobs yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-blue-600" />
              Blogs by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              {charts.blogsByCategory.length > 0 ? (
                <Bar data={blogCategoryData} options={blogCategoryBarOptions} />
              ) : (
                <p className="text-gray-400 text-sm">No blogs yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 3: Top Jobs */}
      {/* {topJobs.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-blue-600" />
              Top Jobs by Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <Bar data={topJobsBarData} options={horizontalBarOptions} />
            </div>
          </CardContent>
        </Card>
      )} */}

      {/* Row 4: Recent Applications + Recent Blogs */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Recent Applications</CardTitle>
          </CardHeader>
          <CardContent>
            {recentApplications.length === 0 ? (
              <p className="text-gray-400 text-center py-8 text-sm">No applications in this period</p>
            ) : (
              <div className="space-y-3">
                {recentApplications.map((app: any) => (
                  <div key={app.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 text-sm truncate">{app.user?.name || app.user?.email}</p>
                      <p className="text-xs text-gray-500 truncate">{app.job?.title}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <StatusBadge status={app.status} />
                      <span className="text-xs text-gray-400 whitespace-nowrap">{new Date(app.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Recent Blog Posts</CardTitle>
          </CardHeader>
          <CardContent>
            {recentBlogs.length === 0 ? (
              <p className="text-gray-400 text-center py-8 text-sm">No blogs in this period</p>
            ) : (
              <div className="space-y-3">
                {recentBlogs.map((blog: any) => (
                  <div key={blog.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 text-sm truncate">{blog.title}</p>
                      <p className="text-xs text-gray-500">{blog.category?.name} · {blog.author?.name || "Unknown"}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${blog.status === "PUBLISHED" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {blog.status}
                      </span>
                      <span className="text-xs text-gray-400 whitespace-nowrap">{new Date(blog.publishedAt || blog.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div> */}
    </div>
  )
}
