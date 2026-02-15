"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { solutionSchema, type SolutionInput } from "@/lib/validations/solution"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Loader2, Heart, DollarSign, ShoppingCart, Factory, Zap, Lightbulb } from "lucide-react"

const illustrationOptions = [
  { value: "Heart", label: "Healthcare", icon: Heart },
  { value: "DollarSign", label: "Finance", icon: DollarSign },
  { value: "ShoppingCart", label: "Retail & E-Commerce", icon: ShoppingCart },
  { value: "Factory", label: "Manufacturing", icon: Factory },
  { value: "Zap", label: "Energy", icon: Zap },
  { value: "Lightbulb", label: "Generic / Other", icon: Lightbulb },
]
import Link from "next/link"
import { toast } from "sonner"

export default function EditSolutionPage() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState("")
  const [featuresInput, setFeaturesInput] = useState("")

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<SolutionInput>({
    resolver: zodResolver(solutionSchema),
    defaultValues: { isActive: true, features: [] },
  })

  const features = watch("features") || []
  const isActive = watch("isActive")

  useEffect(() => {
    const fetchSolution = async () => {
      try {
        const res = await fetch(`/api/admin/solutions/${params.id}`)
        if (!res.ok) throw new Error()
        const sol = await res.json()
        reset({
          title: sol.title,
          description: sol.description,
          industry: sol.industry,
          icon: sol.icon || "",
          features: sol.features || [],
          isActive: sol.isActive,
        })
      } catch {
        setError("Failed to load solution")
      } finally {
        setFetching(false)
      }
    }
    fetchSolution()
  }, [params.id, reset])

  const addFeature = () => {
    if (featuresInput.trim()) {
      setValue("features", [...features, featuresInput.trim()])
      setFeaturesInput("")
    }
  }

  const removeFeature = (index: number) => {
    setValue("features", features.filter((_, i) => i !== index))
  }

  const onSubmit = async (data: SolutionInput) => {
    setLoading(true)
    setError("")

    try {
      const res = await fetch(`/api/admin/solutions/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const json = await res.json()
        setError(json.error || "Failed to update solution")
        return
      }

      router.push("/admin/solutions")
      toast.success("Solution updated successfully")
    } catch {
      setError("Something went wrong")
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <Card>
        <CardHeader><Skeleton className="h-8 w-48" /></CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <div>
      <Link href="/admin/solutions" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 mb-4">
        <ArrowLeft className="h-4 w-4" /> Back to Solutions
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Edit Solution</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">{error}</div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title *</Label>
                <Input {...register("title")} />
                {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Illustration Style</Label>
                <Select
                  value={watch("icon") || ""}
                  onValueChange={(val) => setValue("icon", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an illustration" />
                  </SelectTrigger>
                  <SelectContent>
                    {illustrationOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        <span className="flex items-center gap-2">
                          <opt.icon className="h-4 w-4 text-blue-600" />
                          {opt.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">Determines the illustration shown on the solutions page</p>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Industry *</Label>
                <Input {...register("industry")} />
                {errors.industry && <p className="text-sm text-red-500">{errors.industry.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Active</Label>
                <div className="flex items-center gap-2 pt-2">
                  <Switch checked={isActive} onCheckedChange={(v) => setValue("isActive", v)} />
                  <span className="text-sm text-gray-500 dark:text-gray-400">{isActive ? "Visible" : "Hidden"}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Features</Label>
              <div className="flex gap-2">
                <Input
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  placeholder="Add a feature"
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addFeature() } }}
                />
                <Button type="button" variant="outline" onClick={addFeature}>Add</Button>
              </div>
              <ul className="space-y-1 mt-2">
                {features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded text-sm">
                    <span className="flex-1">{f}</span>
                    <button type="button" onClick={() => removeFeature(i)} className="text-red-500 hover:text-red-700">×</button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <Label>Full Description * (Markdown)</Label>
              <Textarea {...register("description")} rows={12} />
              {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update Solution
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
