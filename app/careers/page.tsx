"use client"

import { useEffect, useMemo, useState } from "react"
import { JobCard } from "@/components/job-card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Briefcase, Loader2, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const fadeInUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }
const staggerContainer = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }

interface Job {
  id: string
  title: string
  slug: string
  location: string
  type: string
  experience: string
  skills: string[]
  salary: string | null
  salaryMin: number | null
  salaryMax: number | null
  salaryCurrency: string
  openings: number
  createdAt: string
}

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [salaryMin, setSalaryMin] = useState("")
  const [salaryMax, setSalaryMax] = useState("")

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/jobs")
      const data = await res.json()
      setJobs(data)
    } catch (error) {
      console.error("Error fetching jobs:", error)
    } finally {
      setLoading(false)
    }
  }

  const locations = useMemo(
    () => [...new Set(jobs.map((j) => j.location))].sort(),
    [jobs]
  )

  const filtered = useMemo(() => {
    let result = jobs
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.skills.some((s) => s.toLowerCase().includes(q)) ||
          j.location.toLowerCase().includes(q)
      )
    }
    if (typeFilter !== "all") result = result.filter((j) => j.type === typeFilter)
    if (locationFilter !== "all") result = result.filter((j) => j.location === locationFilter)
    if (salaryMin) {
      const min = Number(salaryMin)
      result = result.filter((j) => j.salaryMax !== null && j.salaryMax >= min)
    }
    if (salaryMax) {
      const max = Number(salaryMax)
      result = result.filter((j) => j.salaryMin !== null && j.salaryMin <= max)
    }
    return result
  }, [jobs, search, typeFilter, locationFilter, salaryMin, salaryMax])

  const hasFilters = search || typeFilter !== "all" || locationFilter !== "all" || salaryMin || salaryMax

  const clearFilters = () => {
    setSearch("")
    setTypeFilter("all")
    setLocationFilter("all")
    setSalaryMin("")
    setSalaryMax("")
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto px-4 text-center"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Join Our Team</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Build the future of data science with us. We&apos;re looking for passionate
            individuals who want to make an impact through data.
          </p>
        </motion.div>
      </section>

      {/* Filters */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold">
                Open Positions ({filtered.length})
              </h2>
            </div>
            {hasFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-gray-500">
                <X className="h-4 w-4 mr-1" /> Clear filters
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by title, skill, location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="FULL_TIME">Full Time</SelectItem>
                <SelectItem value="PART_TIME">Part Time</SelectItem>
                <SelectItem value="CONTRACT">Contract</SelectItem>
                <SelectItem value="INTERNSHIP">Internship</SelectItem>
              </SelectContent>
            </Select>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="₹ Min"
                value={salaryMin}
                onChange={(e) => setSalaryMin(e.target.value)}
                className="w-full"
              />
              <Input
                type="number"
                placeholder="₹ Max"
                value={salaryMax}
                onChange={(e) => setSalaryMax(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600">No open positions</h3>
            <p className="text-gray-400 mt-1">
              {hasFilters ? "Try adjusting your filters." : "Check back later for new opportunities."}
            </p>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((job) => (
              <motion.div key={job.id} variants={fadeInUp}>
                <JobCard {...job} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </main>
  )
}
