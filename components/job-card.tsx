import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, ArrowRight, Users } from "lucide-react"
import { JobTypeBadge } from "@/components/admin/status-badge"

interface JobCardProps {
  title: string
  slug: string
  location: string
  type: string
  experience: string
  skills: string[]
  salary?: string | null
  salaryMin?: number | null
  salaryMax?: number | null
  salaryCurrency?: string
  openings?: number
  createdAt: string
}

function formatSalary(min?: number | null, max?: number | null, currency?: string) {
  const fmt = (n: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: currency || "INR", maximumFractionDigits: 0 }).format(n)
  if (min && max) return `${fmt(min)} – ${fmt(max)}`
  if (min) return `From ${fmt(min)}`
  if (max) return `Up to ${fmt(max)}`
  return null
}

export function JobCard({
  title,
  slug,
  location,
  type,
  experience,
  skills,
  salary,
  salaryMin,
  salaryMax,
  salaryCurrency,
  openings,
  createdAt,
}: JobCardProps) {
  const salaryDisplay = formatSalary(salaryMin, salaryMax, salaryCurrency) || salary

  return (
    <Link href={`/careers/${slug}`}>
      <Card className="h-full hover:shadow-lg transition-shadow group">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-base sm:text-lg text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                {title}
              </h3>
              {salaryDisplay && (
                <p className="text-xs sm:text-sm text-green-600 font-medium mt-1">{salaryDisplay}</p>
              )}
            </div>
            <div className="flex-shrink-0 flex flex-col items-end gap-1">
              <JobTypeBadge type={type} />
              {openings && openings >= 1 && (
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-blue-200 text-blue-600">
                  <Users className="h-3 w-3 mr-0.5" />{openings} openings
                </Badge>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
              <span className="truncate">{location}</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
              <span className="truncate">{experience}</span>
            </span>
          </div>

          <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-4">
            {skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-[10px] sm:text-xs px-1.5 sm:px-2.5">
                {skill}
              </Badge>
            ))}
            {skills.length > 3 && (
              <Badge variant="secondary" className="text-[10px] sm:text-xs px-1.5 sm:px-2.5">
                +{skills.length - 3} more
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-400">
            <span>
              Posted{" "}
              {new Date(createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1 text-blue-600 font-medium group-hover:gap-2 transition-all">
              View Details <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
