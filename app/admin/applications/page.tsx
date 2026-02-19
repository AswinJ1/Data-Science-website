"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Download, Search, FileText, Sheet, ChevronDown, ChevronUp, Trash2, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { toast } from "sonner"
import * as XLSX from "xlsx"

type Application = {
  id: string
  fullName: string
  email: string
  phone: string
  education: string
  institution: string
  experience: string | null
  linkedin: string | null
  coverLetter: string | null
  resumeUrl: string
  resume: string
  status: string
  statusDescription: string | null
  createdAt: string
  user: { id: string; name: string; email: string }
  job: { id: string; title: string; slug: string }
}

type Job = {
  id: string
  title: string
}

const STATUS_LABELS: Record<string, string> = {
  APPLIED: "Applied",
  UNDER_REVIEW: "Under Review",
  SHORTLISTED: "Shortlisted",
  SELECTED: "Selected",
  REJECTED: "Rejected",
}

const DESCRIPTION_REQUIRED_STATUSES = ["SHORTLISTED", "REJECTED", "SELECTED"]

const STATUS_DESCRIPTION_PLACEHOLDERS: Record<string, string> = {
  SHORTLISTED: "Enter shortlisting message (e.g., next steps, interview details)...",
  REJECTED: "Enter reason for rejection (required)...",
  SELECTED: "Enter further details (e.g., joining instructions, next steps)...",
}

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("ALL")
  const [jobFilter, setJobFilter] = useState("ALL")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const PAGE_SIZE = 10

  // Status change dialog state
  const [statusDialogOpen, setStatusDialogOpen] = useState(false)
  const [statusChangeTarget, setStatusChangeTarget] = useState<{
    id: string
    newStatus: string
    currentStatus: string
  } | null>(null)
  const [statusDescription, setStatusDescription] = useState("")

  useEffect(() => {
    fetchApplications()
    fetchJobs()
  }, [])

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [search, statusFilter, jobFilter, dateFrom, dateTo])

  const fetchApplications = async () => {
    try {
      const res = await fetch("/api/admin/applications")
      const data = await res.json()
      setApplications(data)
    } catch {
      toast.error("Failed to fetch applications")
    } finally {
      setLoading(false)
    }
  }

  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/admin/jobs")
      const data = await res.json()
      setJobs(data.map((j: any) => ({ id: j.id, title: j.title })))
    } catch {
      // Silently fail — jobs filter just won't populate
    }
  }

  const initiateStatusChange = (id: string, newStatus: string, currentStatus: string) => {
    if (DESCRIPTION_REQUIRED_STATUSES.includes(newStatus)) {
      // Show dialog for description
      setStatusChangeTarget({ id, newStatus, currentStatus })
      setStatusDescription("")
      setStatusDialogOpen(true)
    } else {
      // Directly update status (no description needed for APPLIED, UNDER_REVIEW)
      updateStatus(id, newStatus, undefined)
    }
  }

  const confirmStatusChange = () => {
    if (!statusChangeTarget) return
    if (DESCRIPTION_REQUIRED_STATUSES.includes(statusChangeTarget.newStatus) && !statusDescription.trim()) {
      toast.error("Description is required for this status")
      return
    }
    updateStatus(statusChangeTarget.id, statusChangeTarget.newStatus, statusDescription.trim())
    setStatusDialogOpen(false)
    setStatusChangeTarget(null)
    setStatusDescription("")
  }

  const updateStatus = async (id: string, status: string, description?: string) => {
    setUpdatingId(id)
    try {
      const body: any = { status }
      if (description) body.statusDescription = description

      const res = await fetch(`/api/admin/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (res.ok) {
        setApplications((prev) =>
          prev.map((a) =>
            a.id === id
              ? { ...a, status, statusDescription: description || a.statusDescription }
              : a
          )
        )
        toast.success("Status updated")
      } else {
        const data = await res.json()
        toast.error(data.error || "Failed to update status")
      }
    } catch {
      toast.error("Failed to update status")
    } finally {
      setUpdatingId(null)
    }
  }

  const deleteApplication = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: "DELETE",
      })
      if (res.ok) {
        setApplications((prev) => prev.filter((a) => a.id !== id))
        toast.success("Application deleted")
      } else {
        toast.error("Failed to delete application")
      }
    } catch {
      toast.error("Failed to delete application")
    }
  }

  const filtered = applications.filter((app) => {
    const matchSearch =
      !search ||
      (app.fullName || app.user.name).toLowerCase().includes(search.toLowerCase()) ||
      (app.email || app.user.email).toLowerCase().includes(search.toLowerCase()) ||
      app.job.title.toLowerCase().includes(search.toLowerCase()) ||
      (app.institution || "").toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "ALL" || app.status === statusFilter
    const matchJob = jobFilter === "ALL" || app.job.id === jobFilter
    const appDate = new Date(app.createdAt)
    const matchDateFrom = !dateFrom || appDate >= new Date(dateFrom)
    const matchDateTo = !dateTo || appDate <= new Date(dateTo + "T23:59:59.999Z")
    return matchSearch && matchStatus && matchJob && matchDateFrom && matchDateTo
  })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const exportToExcel = () => {
    const rows = filtered.map((app) => ({
      "Full Name": app.fullName || app.user.name,
      "Email": app.email || app.user.email,
      "Phone": app.phone || "",
      "Job Title": app.job.title,
      "Education": app.education || "",
      "Institution": app.institution || "",
      "Experience": app.experience || "",
      "LinkedIn": app.linkedin || "",
      "Cover Letter": app.coverLetter || "",
      "Status": (app.status || "").replace("_", " "),
      "Status Description": app.statusDescription || "",
      "Applied On": new Date(app.createdAt).toLocaleDateString(),
      "Resume URL": app.resume || "",
    }))
    const ws = XLSX.utils.json_to_sheet(rows)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Applications")
    XLSX.writeFile(wb, `applications-${new Date().toISOString().slice(0, 10)}.xlsx`)
  }

  if (loading) {
    return (
      <Card>
        <CardHeader><Skeleton className="h-8 w-48" /></CardHeader>
        <CardContent className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Applications</h1>
        <Button variant="outline" size="sm" onClick={exportToExcel} disabled={filtered.length === 0}>
          <Sheet className="h-4 w-4 mr-1.5" />
          Export Excel
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4">
            {/* Row 1: Search + Status + Job filters */}
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                <Input
                  placeholder="Search by name, email, or job..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Statuses</SelectItem>
                  <SelectItem value="APPLIED">Applied</SelectItem>
                  <SelectItem value="UNDER_REVIEW">Under Review</SelectItem>
                  <SelectItem value="SHORTLISTED">Shortlisted</SelectItem>
                  <SelectItem value="SELECTED">Selected</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={jobFilter} onValueChange={setJobFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="All Jobs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Jobs</SelectItem>
                  {jobs.map((job) => (
                    <SelectItem key={job.id} value={job.id}>
                      {job.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Row 2: Date filters */}
            <div className="flex flex-col sm:flex-row gap-3 items-end">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <Label className="text-xs text-gray-500 whitespace-nowrap">From:</Label>
                <Input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-[160px] h-9"
                />
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-xs text-gray-500 whitespace-nowrap">To:</Label>
                <Input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-[160px] h-9"
                />
              </div>
              {(dateFrom || dateTo) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => { setDateFrom(""); setDateTo(""); }}
                  className="text-xs"
                >
                  Clear dates
                </Button>
              )}
              <div className="ml-auto text-sm text-gray-500">
                {filtered.length} of {applications.length} applications
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No applications found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Job</TableHead>
                    <TableHead>Education</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Applied</TableHead>
                    <TableHead>Resume</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginated.map((app) => (
                    <React.Fragment key={app.id}>
                    <TableRow className="h-10">
                      <TableCell className="py-1.5">
                        <div>
                          <p className="text-sm font-medium leading-tight">{app.fullName || app.user.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{app.email || app.user.email}</p>
                          {app.phone && <p className="text-xs text-gray-400 dark:text-gray-500">{app.phone}</p>}
                        </div>
                      </TableCell>
                      <TableCell className="py-1.5 text-sm font-medium">{app.job.title}</TableCell>
                      <TableCell className="py-1.5">
                        <div>
                          <p className="text-xs">{app.education}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{app.institution}</p>
                        </div>
                      </TableCell>
                      <TableCell className="py-1.5">
                        <div>
                          <span className="text-xs font-medium">
                            {STATUS_LABELS[app.status] || app.status.replace("_", " ")}
                          </span>
                          {app.statusDescription && (
                            <p className="text-xs text-gray-400 dark:text-gray-500 max-w-[160px] truncate" title={app.statusDescription}>
                              {app.statusDescription}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="py-1.5 text-xs text-gray-500 dark:text-gray-400">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="py-1.5">
                        <Button variant="ghost" size="sm" asChild>
                          <a href={app.resume} target="_blank" rel="noopener noreferrer">
                            <Download className="h-4 w-4" />
                          </a>
                        </Button>
                      </TableCell>
                      <TableCell className="py-1.5">
                        {app.coverLetter ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setExpandedId(expandedId === app.id ? null : app.id)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <FileText className="h-4 w-4 mr-1" />
                            {expandedId === app.id ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                          </Button>
                        ) : (
                          <span className="text-xs text-gray-400 dark:text-gray-500">—</span>
                        )}
                      </TableCell>
                      <TableCell className="py-1.5">
                        <Select
                          value={app.status}
                          onValueChange={(v) => initiateStatusChange(app.id, v, app.status)}
                          disabled={updatingId === app.id}
                        >
                          <SelectTrigger className="h-7 w-[130px] text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="APPLIED">Applied</SelectItem>
                            <SelectItem value="UNDER_REVIEW">Under Review</SelectItem>
                            <SelectItem value="SHORTLISTED">Shortlisted</SelectItem>
                            <SelectItem value="SELECTED">Selected</SelectItem>
                            <SelectItem value="REJECTED">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="py-1.5">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Application?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete the application from{" "}
                                <strong>{app.fullName || app.user.name}</strong> for{" "}
                                <strong>{app.job.title}</strong>. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-600 hover:bg-red-700"
                                onClick={() => deleteApplication(app.id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                    {expandedId === app.id && app.coverLetter && (
                      <TableRow>
                        <TableCell colSpan={9} className="bg-gray-50 dark:bg-gray-800">
                          <div className="p-4">
                            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Cover Letter</p>
                            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                              {app.coverLetter}
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length}
              </p>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled={currentPage <= 1} onClick={() => setCurrentPage((p) => p - 1)}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                  let page = i + 1
                  if (totalPages > 7) {
                    const start = Math.max(1, currentPage - 3)
                    page = start + i
                    if (page > totalPages) return null
                  }
                  return (
                    <Button
                      key={page}
                      variant={page === currentPage ? "default" : "outline"}
                      size="sm"
                      className={`h-8 w-8 p-0 ${
                        page === currentPage ? "bg-blue-600 hover:bg-blue-700" : ""
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  )
                })}
                <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled={currentPage >= totalPages} onClick={() => setCurrentPage((p) => p + 1)}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Status Description Dialog */}
      <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {statusChangeTarget?.newStatus === "REJECTED"
                ? "Rejection Reason"
                : statusChangeTarget?.newStatus === "SHORTLISTED"
                ? "Shortlisting Message"
                : "Selection Details"}
            </DialogTitle>
            <DialogDescription>
              {statusChangeTarget?.newStatus === "REJECTED"
                ? "Please provide a reason for rejecting this application. This message will be visible to the applicant."
                : statusChangeTarget?.newStatus === "SHORTLISTED"
                ? "Provide details about the shortlisting (e.g., next steps, interview schedule). This message will be visible to the applicant."
                : "Provide further details for the selected candidate (e.g., joining instructions, onboarding info). This message will be visible to the applicant."}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              value={statusDescription}
              onChange={(e) => setStatusDescription(e.target.value)}
              placeholder={
                STATUS_DESCRIPTION_PLACEHOLDERS[statusChangeTarget?.newStatus || ""] || "Enter description..."
              }
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-red-500 mt-1">* This field is required</p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setStatusDialogOpen(false)
                setStatusChangeTarget(null)
                setStatusDescription("")
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmStatusChange}
              disabled={!statusDescription.trim()}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
