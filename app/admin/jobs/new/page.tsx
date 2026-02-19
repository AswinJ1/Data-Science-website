"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { jobSchema, type JobInput } from "@/lib/validations/job"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function NewJobPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [skillsInput, setSkillsInput] = useState("")
  const [mandatoryInput, setMandatoryInput] = useState("")
  const [optionalInput, setOptionalInput] = useState("")

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<JobInput>({
    resolver: zodResolver(jobSchema),
    defaultValues: { type: "FULL_TIME", isActive: true, skills: [], openings: 1, mandatoryRequirements: [], optionalRequirements: [], salaryCurrency: "INR" },
  })

  const skills = watch("skills") || []
  const mandatoryRequirements = watch("mandatoryRequirements") || []
  const optionalRequirements = watch("optionalRequirements") || []
  const isActive = watch("isActive")

  const addSkill = () => {
    if (skillsInput.trim() && !skills.includes(skillsInput.trim())) {
      setValue("skills", [...skills, skillsInput.trim()])
      setSkillsInput("")
    }
  }

  const removeSkill = (skill: string) => {
    setValue("skills", skills.filter((s) => s !== skill))
  }

  const addMandatory = () => {
    if (mandatoryInput.trim() && !mandatoryRequirements.includes(mandatoryInput.trim())) {
      setValue("mandatoryRequirements", [...mandatoryRequirements, mandatoryInput.trim()])
      setMandatoryInput("")
    }
  }

  const removeMandatory = (req: string) => {
    setValue("mandatoryRequirements", mandatoryRequirements.filter((r) => r !== req))
  }

  const addOptional = () => {
    if (optionalInput.trim() && !optionalRequirements.includes(optionalInput.trim())) {
      setValue("optionalRequirements", [...optionalRequirements, optionalInput.trim()])
      setOptionalInput("")
    }
  }

  const removeOptional = (req: string) => {
    setValue("optionalRequirements", optionalRequirements.filter((r) => r !== req))
  }

  const onSubmit = async (data: JobInput) => {
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/admin/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const json = await res.json()
        setError(json.error || "Failed to create job")
        return
      }

      router.push("/admin/jobs")
      toast.success("Job created successfully")
    } catch {
      setError("Something went wrong")
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Link href="/admin/jobs" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 mb-4">
        <ArrowLeft className="h-4 w-4" /> Back to Jobs
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Create New Job</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Job Title *</Label>
                <Input {...register("title")} placeholder="Senior Data Engineer" />
                {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Job Type *</Label>
                <Select
                  value={watch("type")}
                  onValueChange={(v) => setValue("type", v as any)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FULL_TIME">Full Time</SelectItem>
                    <SelectItem value="PART_TIME">Part Time</SelectItem>
                    <SelectItem value="CONTRACT">Contract</SelectItem>
                    <SelectItem value="INTERNSHIP">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Location *</Label>
                <Input {...register("location")} placeholder="Remote / City" />
                {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Experience *</Label>
                <Input {...register("experience")} placeholder="3+ years" />
                {errors.experience && <p className="text-sm text-red-500">{errors.experience.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Salary (Optional label)</Label>
                <Input {...register("salary")} placeholder="e.g. ₹8,00,000 - ₹12,00,000" />
              </div>

              <div className="space-y-2">
                <Label>Min Salary (₹)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                  <Input {...register("salaryMin")} type="number" placeholder="800000" className="pl-7" />
                </div>
                {errors.salaryMin && <p className="text-sm text-red-500">{errors.salaryMin.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Max Salary (₹)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                  <Input {...register("salaryMax")} type="number" placeholder="1200000" className="pl-7" />
                </div>
                {errors.salaryMax && <p className="text-sm text-red-500">{errors.salaryMax.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Number of Openings *</Label>
                <Input {...register("openings")} type="number" min={1} placeholder="1" />
                {errors.openings && <p className="text-sm text-red-500">{errors.openings.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Active</Label>
                <div className="flex items-center gap-2 pt-2">
                  <Switch
                    checked={isActive}
                    onCheckedChange={(v) => setValue("isActive", v)}
                  />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {isActive ? "Visible to applicants" : "Hidden"}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Skills *</Label>
              <div className="flex gap-2">
                <Input
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  placeholder="Add a skill"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addSkill()
                    }
                  }}
                />
                <Button type="button" variant="outline" onClick={addSkill}>
                  Add
                </Button>
              </div>
              {errors.skills && <p className="text-sm text-red-500">{errors.skills.message}</p>}
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-md"
                  >
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)} className="hover:text-red-600">
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description * (Markdown supported)</Label>
              <Textarea
                {...register("description")}
                placeholder="## About the Role&#10;&#10;Description here...&#10;&#10;## Requirements&#10;&#10;- Requirement 1"
                rows={12}
              />
              {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
            </div>

            {/* Mandatory Requirements */}
            <div className="space-y-2">
              <Label>Mandatory Requirements <span className="text-red-500">*</span></Label>
              <p className="text-xs text-gray-500">Skills/qualifications the applicant must have</p>
              <div className="flex gap-2">
                <Input
                  value={mandatoryInput}
                  onChange={(e) => setMandatoryInput(e.target.value)}
                  placeholder="Add a mandatory requirement"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addMandatory()
                    }
                  }}
                />
                <Button type="button" variant="outline" onClick={addMandatory}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {mandatoryRequirements.map((req) => (
                  <span
                    key={req}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 text-sm rounded-md border border-red-200 dark:border-red-800"
                  >
                    <span className="text-red-500 font-bold">*</span> {req}
                    <button type="button" onClick={() => removeMandatory(req)} className="hover:text-red-900 ml-1">×</button>
                  </span>
                ))}
              </div>
            </div>

            {/* Optional Requirements */}
            <div className="space-y-2">
              <Label>Optional Requirements <span className="text-gray-400">(Nice to have)</span></Label>
              <p className="text-xs text-gray-500">Skills/qualifications that are preferred but not required</p>
              <div className="flex gap-2">
                <Input
                  value={optionalInput}
                  onChange={(e) => setOptionalInput(e.target.value)}
                  placeholder="Add an optional requirement"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addOptional()
                    }
                  }}
                />
                <Button type="button" variant="outline" onClick={addOptional}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {optionalRequirements.map((req) => (
                  <span
                    key={req}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 text-sm rounded-md border border-gray-200 dark:border-gray-700"
                  >
                    {req}
                    <button type="button" onClick={() => removeOptional(req)} className="hover:text-red-600 ml-1">×</button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Job
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
