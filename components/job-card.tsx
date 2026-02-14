import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, ArrowRight } from "lucide-react"
import { JobTypeBadge } from "@/components/admin/status-badge"

interface JobCardProps {
  title: string
  slug: string
  location: string
  type: string
  experience: string
  skills: string[]
  salary?: string | null
  createdAt: string
}

export function JobCard({
  title,
  slug,
  location,
  type,
  experience,
  skills,
  salary,
  createdAt,
}: JobCardProps) {
  return (
    <Link href={`/careers/${slug}`}>
      <Card className="h-full hover:shadow-lg transition-shadow group">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-base sm:text-lg text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                {title}
              </h3>
              {salary && (
                <p className="text-xs sm:text-sm text-green-600 font-medium mt-1">{salary}</p>
              )}
            </div>
            <div className="flex-shrink-0">
              <JobTypeBadge type={type} />
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
