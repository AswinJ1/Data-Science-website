import { Badge } from "@/components/ui/badge"

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; className: string }> = {
  APPLIED: { label: "Applied", variant: "default", className: "bg-blue-100 text-blue-800 hover:bg-blue-100" },
  UNDER_REVIEW: { label: "Under Review", variant: "default", className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" },
  SHORTLISTED: { label: "Shortlisted", variant: "default", className: "bg-green-100 text-green-800 hover:bg-green-100" },
  REJECTED: { label: "Rejected", variant: "destructive", className: "bg-red-100 text-red-800 hover:bg-red-100" },
  SELECTED: { label: "Selected", variant: "default", className: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100" },
}

export function StatusBadge({ status }: { status: string }) {
  const config = statusConfig[status] || { label: status, variant: "secondary" as const, className: "" }

  return (
    <Badge variant={config.variant} className={config.className}>
      {config.label}
    </Badge>
  )
}

const jobTypeConfig: Record<string, string> = {
  FULL_TIME: "Full Time",
  PART_TIME: "Part Time",
  CONTRACT: "Contract",
  INTERNSHIP: "Internship",
}

export function JobTypeBadge({ type }: { type: string }) {
  return (
    <Badge variant="outline" className="text-blue-700 border-blue-300">
      {jobTypeConfig[type] || type}
    </Badge>
  )
}

export function BlogStatusBadge({ status }: { status: string }) {
  return (
    <Badge
      variant={status === "PUBLISHED" ? "default" : "secondary"}
      className={status === "PUBLISHED" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
    >
      {status === "PUBLISHED" ? "Published" : "Draft"}
    </Badge>
  )
}
