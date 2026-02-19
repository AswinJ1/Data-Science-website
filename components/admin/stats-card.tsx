import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  description?: string
}

export function StatsCard({ title, value, icon: Icon, description }: StatsCardProps) {
  return (
    <Card className="dark:bg-gray-900 dark:border-gray-700">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-xl font-bold mt-1 dark:text-white">{value}</p>
            {description && (
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{description}</p>
            )}
          </div>
            <Icon className="h-5 w-5 text-blue-600" />
          
        </div>
      </CardContent>
    </Card>
  )
}
