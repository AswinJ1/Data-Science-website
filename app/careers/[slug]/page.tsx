"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { JobTypeBadge } from "@/components/admin/status-badge"
import {
  MapPin, Clock, DollarSign, ArrowLeft, Loader2, CheckCircle, Upload, FileText,
} from "lucide-react"
import { UploadButton } from "@/lib/uploadthing"

interface Job {
  id: string
  title: string
  slug: string
  description: string
  location: string
  type: string
  experience: string
  skills: string[]
  salary: string | null
  createdAt: string
}

export default function JobDetailPage() {
  const { slug } = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [showApplyForm, setShowApplyForm] = useState(false)
  const [resumeUrl, setResumeUrl] = useState("")
  const [resumeUploading, setResumeUploading] = useState(false)
  const [resumeName, setResumeName] = useState("")
  const [coverLetter, setCoverLetter] = useState("")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [education, setEducation] = useState("")
  const [institution, setInstitution] = useState("")
  const [experience, setExperience] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [submitLoading, setSubmitLoading] = useState(false)
  const [applied, setApplied] = useState(false)
  const [applicationStatus, setApplicationStatus] = useState("")
  const [appliedAt, setAppliedAt] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    fetchJob()
  }, [slug])

  const fetchJob = async () => {
    try {
      const res = await fetch(`/api/jobs/${slug}`)
      if (!res.ok) throw new Error("Not found")
      const data = await res.json()
      setJob(data)
      await checkExistingApplication(data.id)
    } catch {
      router.push("/careers")
    } finally {
      setLoading(false)
    }
  }

  const checkExistingApplication = async (jobId: string) => {
    try {
      const res = await fetch(`/api/applications/check?jobId=${jobId}`)
      const data = await res.json()
      if (data.applied) {
        setApplied(true)
        setApplicationStatus(data.status)
        setAppliedAt(data.appliedAt)
      }
    } catch {
      // Silently fail
    }
  }

  const isAdmin = (session?.user as any)?.role === "ADMIN"

  const handleApply = () => {
    if (!session) {
      router.push(`/auth/login?callbackUrl=/careers/${slug}`)
      return
    }
    if (isAdmin) return
    setShowApplyForm(true)
  }

  const submitApplication = async () => {
    if (!fullName.trim()) { setError("Please enter your full name"); return }
    if (!email.trim()) { setError("Please enter your email"); return }
    if (!phone.trim()) { setError("Please enter your phone number"); return }
    if (!education) { setError("Please select your education level"); return }
    if (!institution.trim()) { setError("Please enter your institution"); return }
    if (!resumeUrl) { setError("Please upload your resume"); return }

    setSubmitLoading(true)
    setError("")

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: job!.id,
          fullName,
          email,
          phone,
          education,
          institution,
          experience: experience || undefined,
          linkedin: linkedin || undefined,
          resume: resumeUrl,
          coverLetter: coverLetter || undefined,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Failed to submit application")
        return
      }

      setApplied(true)
      setApplicationStatus("APPLIED")
      setShowApplyForm(false)
    } catch {
      setError("Something went wrong")
    } finally {
      setSubmitLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!job) return null

  const renderDescription = (text: string) => {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("## ")) {
        return <h2 key={i} className="text-xl font-bold mt-6 mb-3">{line.replace("## ", "")}</h2>
      }
      if (line.startsWith("### ")) {
        return <h3 key={i} className="text-lg font-semibold mt-4 mb-2">{line.replace("### ", "")}</h3>
      }
      if (line.startsWith("- ")) {
        return <li key={i} className="ml-4 text-gray-600">{line.replace("- ", "")}</li>
      }
      if (line.trim() === "") return <br key={i} />
      return <p key={i} className="text-gray-600">{line}</p>
    })
  }

  const statusLabel = (s: string) => {
    const map: Record<string, string> = {
      APPLIED: "Applied", UNDER_REVIEW: "Under Review",
      SHORTLISTED: "Shortlisted", SELECTED: "Selected", REJECTED: "Rejected",
    }
    return map[s] || s
  }

  const statusColor = (s: string) => {
    const map: Record<string, string> = {
      SELECTED: "text-green-700 bg-green-50 border-green-200",
      SHORTLISTED: "text-blue-700 bg-blue-50 border-blue-200",
      UNDER_REVIEW: "text-yellow-700 bg-yellow-50 border-yellow-200",
      REJECTED: "text-red-700 bg-red-50 border-red-200",
      APPLIED: "text-gray-700 bg-gray-50 border-gray-200",
    }
    return map[s] || "text-gray-700 bg-gray-50 border-gray-200"
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Link
          href="/careers"
          className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Careers
        </Link>

        {/* Job Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{job.title}</h1>
            <JobTypeBadge type={job.type} />
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" /> {job.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" /> {job.experience}
            </span>
            {job.salary && (
              <span className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" /> {job.salary}
              </span>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-4 sm:p-6 prose prose-sm max-w-none">
                {renderDescription(job.description)}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Skills Required</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {applied ? (
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-green-800 text-lg">Already Applied</h3>
                  <div className="mt-3 space-y-2">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${statusColor(applicationStatus)}`}>
                      <span>Status:</span>
                      <span className="font-semibold">{statusLabel(applicationStatus)}</span>
                    </div>
                    {appliedAt && (
                      <p className="text-xs text-green-600">
                        Applied on {new Date(appliedAt).toLocaleDateString("en-US", {
                          month: "long", day: "numeric", year: "numeric"
                        })}
                      </p>
                    )}
                  </div>
                  <p className="text-sm text-green-600 mt-3">
                    Track your application in your{" "}
                    <Link href="/dashboard" className="underline font-medium">dashboard</Link>.
                  </p>
                </CardContent>
              </Card>
            ) : isAdmin ? (
              <div className="text-center p-4 bg-gray-50 border text-sm text-gray-500">
                Admin accounts cannot apply for jobs. Sign in as an applicant to apply.
              </div>
            ) : (
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
                onClick={handleApply}
              >
                Apply Now
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Apply Form Dialog */}
      <Dialog open={showApplyForm} onOpenChange={setShowApplyForm}>
        <DialogContent className="max-w-2xl w-[95vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Apply for {job.title}</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 pt-2">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}

            {/* Personal Info */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Personal Information</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name *</Label>
                  <Input
                    placeholder="Your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email *</Label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone *</Label>
                  <Input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>LinkedIn Profile</Label>
                  <Input
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Education & Experience */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Education & Experience</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Education Level *</Label>
                  <Select value={education} onValueChange={setEducation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select education" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High School">High School</SelectItem>
                      <SelectItem value="Diploma">Diploma</SelectItem>
                      <SelectItem value="Bachelor's">Bachelor&apos;s Degree</SelectItem>
                      <SelectItem value="Master's">Master&apos;s Degree</SelectItem>
                      <SelectItem value="PhD">PhD / Doctorate</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Institution *</Label>
                  <Input
                    placeholder="University / College name"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>Years of Experience</Label>
                  <Input
                    placeholder="e.g. 3 years"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Documents */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Documents</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Resume (PDF) *</Label>
                  {resumeUrl ? (
                    <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md">
                      <FileText className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-700 flex-1">{resumeName || "Resume uploaded"}</span>
                      <button
                        type="button"
                        onClick={() => { setResumeUrl(""); setResumeName("") }}
                        className="text-sm text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-colors">
                      {resumeUploading ? (
                        <div className="flex flex-col items-center gap-2">
                          <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                          <span className="text-sm text-gray-500">Uploading...</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <Upload className="h-8 w-8 text-gray-400" />
                          <span className="text-sm text-gray-500">Upload PDF (max 4MB)</span>
                        </div>
                      )}
                      <div className="mt-2">
                        <UploadButton
                          endpoint="resumeUploader"
                          onUploadBegin={() => {
                            setResumeUploading(true)
                            setError("")
                          }}
                          onClientUploadComplete={(res) => {
                            if (res?.[0]) {
                              setResumeUrl(res[0].ufsUrl)
                              setResumeName(res[0].name)
                            }
                            setResumeUploading(false)
                          }}
                          onUploadError={(err) => {
                            setError(err.message || "Upload failed")
                            setResumeUploading(false)
                          }}
                          appearance={{
                            button: "bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-none",
                            allowedContent: "hidden",
                          }}
                          content={{
                            button: "Choose PDF",
                          }}
                        />
                      </div>
                    </label>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Cover Letter (Optional)</Label>
                  <Textarea
                    placeholder="Tell us why you're a great fit for this role..."
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
            </div>

            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 h-11"
              onClick={submitApplication}
              disabled={submitLoading}
            >
              {submitLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Application
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}
