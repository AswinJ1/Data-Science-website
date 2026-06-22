"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { solutionSchema, type SolutionInput } from "@/lib/validations/solution"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Loader2, Image as ImageIcon, X } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function NewSolutionPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [featuresInput, setFeaturesInput] = useState("")
  const [isUploading, setIsUploading] = useState(false)

  const handleCustomUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
      try {
        attempts++;
        if (attempts > 1) {
          toast.info(`Retrying upload... (Attempt ${attempts}/${maxAttempts})`);
        } else {
          toast.info("Uploading image...");
        }

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload/solution-image", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `Upload failed (${res.status})`);
        }

        const data = await res.json();
        if (data.url) {
          setValue("image", data.url);
          toast.success("Image uploaded successfully");
          setIsUploading(false);
          return;
        } else {
          throw new Error("No URL returned from server");
        }
      } catch (err: any) {
        if (attempts >= maxAttempts) {
          toast.error(`Upload failed after ${maxAttempts} attempts: ${err.message || "Network error"}`);
        } else {
          console.log(`Upload attempt ${attempts} failed, retrying...`);
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
    }
    setIsUploading(false);
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SolutionInput>({
    resolver: zodResolver(solutionSchema),
    defaultValues: { isActive: true, features: [] },
  })

  const features = watch("features") || []
  const isActive = watch("isActive")

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
      const res = await fetch("/api/admin/solutions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const json = await res.json()
        setError(json.error || "Failed to create solution")
        return
      }

      router.push("/admin/solutions")
      toast.success("Solution created successfully")
    } catch {
      setError("Something went wrong")
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Link href="/admin/solutions" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 mb-4">
        <ArrowLeft className="h-4 w-4" /> Back to Solutions
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>New Solution</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">{error}</div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title *</Label>
                <Input {...register("title")} placeholder="Predictive Analytics" />
                {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Banner Image</Label>
                <div className="flex flex-col gap-2">
                  {watch("image") ? (
                    <div className="relative w-full h-32 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
                      <img src={watch("image") as string} alt="Banner" className="w-full h-full object-cover" />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6"
                        onClick={() => setValue("image", "")}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="relative border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors overflow-hidden">
                      <div className="flex flex-col items-center gap-2 text-center pointer-events-none">
                        <ImageIcon className="h-8 w-8 text-gray-400" />
                        <p className="text-sm font-medium text-gray-700">Click to upload image</p>
                        <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF</p>
                      </div>
                      <Input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleCustomUpload}
                        disabled={isUploading}
                      />
                      {isUploading && (
                        <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-md z-10">
                          <div className="flex flex-col items-center gap-2">
                            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                            <span className="text-xs font-medium text-blue-600">Uploading...</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500">Upload the image to be used as the banner on the details page</p>
                {errors.image && <p className="text-sm text-red-500">{errors.image.message}</p>}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Industry *</Label>
                <Input {...register("industry")} placeholder="e.g. Healthcare, Finance, Retail" />
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
              <Label>Full Description * (Markdown supported)</Label>
              <Textarea {...register("description")} placeholder="Detailed description..." rows={12} />
              {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Solution
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
