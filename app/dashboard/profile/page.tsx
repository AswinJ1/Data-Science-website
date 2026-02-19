"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Camera, Loader2, Save, User, Mail, Calendar, ArrowLeft, Check, X, Upload, Video, CircleDot } from "lucide-react"
import Link from "next/link"

interface UserProfile {
  id: string
  name: string | null
  email: string
  image: string | null
  role: string
  createdAt: string
}

export default function ProfilePage() {
  const { data: session, update: updateSession } = useSession()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  // Form state
  const [name, setName] = useState("")
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [newImageUrl, setNewImageUrl] = useState<string | null | undefined>(undefined)

  // Camera state
  const [showCamera, setShowCamera] = useState(false)
  const [cameraReady, setCameraReady] = useState(false)
  const [cameraError, setCameraError] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile")
      if (!res.ok) throw new Error("Failed to fetch profile")
      const data = await res.json()
      setProfile(data)
      setName(data.name || "")
      setPreviewImage(data.image)
    } catch {
      setError("Failed to load profile")
    } finally {
      setLoading(false)
    }
  }

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate on client side
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
    if (!allowedTypes.includes(file.type)) {
      setError("Only JPEG, PNG, WebP, and GIF images are allowed")
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("Image size must be less than 2MB")
      return
    }

    // Show preview immediately
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewImage(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Upload the image
    setUploading(true)
    setError("")
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await fetch("/api/upload/avatar", {
        method: "POST",
        body: formData,
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Upload failed")
      }
      const data = await res.json()
      setNewImageUrl(data.url)
      setSuccess("Image uploaded! Click Save to apply changes.")
    } catch (err: any) {
      setError(err.message || "Failed to upload image")
      // Revert preview
      setPreviewImage(profile?.image || null)
      setNewImageUrl(undefined)
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveImage = () => {
    setPreviewImage(null)
    setNewImageUrl(null) // null means explicitly remove
    setSuccess("Image will be removed. Click Save to apply changes.")
  }

  // --- Camera functions ---
  const startCamera = useCallback(async () => {
    setCameraError("")
    setCameraReady(false)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play()
          setCameraReady(true)
        }
      }
    } catch (err: any) {
      console.error("Camera error:", err)
      if (err.name === "NotAllowedError") {
        setCameraError("Camera access denied. Please allow camera permission in your browser.")
      } else if (err.name === "NotFoundError") {
        setCameraError("No camera found on this device.")
      } else {
        setCameraError("Could not access camera. Please try again.")
      }
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    setCameraReady(false)
  }, [])

  const handleOpenCamera = () => {
    setShowCamera(true)
  }

  // Start camera when dialog opens, stop when it closes
  useEffect(() => {
    if (showCamera) {
      startCamera()
    } else {
      stopCamera()
    }
    return () => stopCamera()
  }, [showCamera, startCamera, stopCamera])

  const capturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Mirror the image (selfie-style)
    ctx.translate(canvas.width, 0)
    ctx.scale(-1, 1)
    ctx.drawImage(video, 0, 0)

    // Stop camera
    stopCamera()
    setShowCamera(false)

    // Convert canvas to blob
    canvas.toBlob(async (blob) => {
      if (!blob) return

      // Show preview
      const url = URL.createObjectURL(blob)
      setPreviewImage(url)

      // Upload the captured photo
      setUploading(true)
      setError("")
      try {
        const file = new File([blob], `camera-${Date.now()}.jpg`, { type: "image/jpeg" })
        const formData = new FormData()
        formData.append("file", file)
        const res = await fetch("/api/upload/avatar", {
          method: "POST",
          body: formData,
        })
        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || "Upload failed")
        }
        const data = await res.json()
        setNewImageUrl(data.url)
        setSuccess("Photo captured! Click Save to apply changes.")
      } catch (err: any) {
        setError(err.message || "Failed to upload photo")
        setPreviewImage(profile?.image || null)
        setNewImageUrl(undefined)
      } finally {
        setUploading(false)
      }
    }, "image/jpeg", 0.9)
  }

  const handleSave = async () => {
    setSaving(true)
    setError("")
    setSuccess("")

    try {
      const updateData: { name?: string; image?: string | null } = {}

      // Check if name changed
      if (name.trim() !== (profile?.name || "")) {
        updateData.name = name.trim()
      }

      // Check if image changed
      if (newImageUrl !== undefined) {
        updateData.image = newImageUrl
      }

      if (Object.keys(updateData).length === 0) {
        setSuccess("No changes to save")
        setSaving(false)
        return
      }

      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to update profile")
      }

      const updatedUser = await res.json()
      setProfile({ ...profile!, ...updatedUser })
      setNewImageUrl(undefined)

      // Update the NextAuth session so the navbar reflects changes
      await updateSession({
        name: updatedUser.name,
        image: updatedUser.image,
      })

      setSuccess("Profile updated successfully!")
    } catch (err: any) {
      setError(err.message || "Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  const getInitials = (name: string | null) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const hasChanges = () => {
    const nameChanged = name.trim() !== (profile?.name || "")
    const imageChanged = newImageUrl !== undefined
    return nameChanged || imageChanged
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground">Failed to load profile</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href={profile?.role === "ADMIN" ? "/admin" : profile?.role === "HR" ? "/hr" : "/dashboard"}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Edit Profile
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Update your personal information and profile picture
            </p>
          </div>
        </div>

        {/* Success / Error Messages */}
        {success && (
          <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 text-sm">
            <Check className="h-4 w-4 flex-shrink-0" />
            {success}
          </div>
        )}
        {error && (
          <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 text-sm">
            <X className="h-4 w-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Profile Picture Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Profile Picture</CardTitle>
            <CardDescription>
              Upload a photo or take one with your camera. Max 2MB, JPEG/PNG/WebP/GIF.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative group">
                <Avatar className="h-28 w-28 border-4 border-white dark:border-gray-800 shadow-lg cursor-pointer" onClick={handleImageClick}>
                  <AvatarImage src={previewImage || undefined} alt={profile.name || "Profile"} />
                  <AvatarFallback className="text-2xl bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                    {getInitials(profile.name)}
                  </AvatarFallback>
                </Avatar>
                <button
                  onClick={handleOpenCamera}
                  disabled={uploading}
                  className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow-lg transition-colors disabled:opacity-50"
                  title="Take a photo with camera"
                >
                  {uploading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Camera className="h-4 w-4" />
                  )}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              <div className="flex flex-col items-center sm:items-start gap-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Upload a file or use the camera icon to take a photo
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleImageClick}
                    disabled={uploading}
                  >
                    <Upload className="h-3.5 w-3.5 mr-1.5" />
                    {uploading ? "Uploading..." : "Upload"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleOpenCamera}
                    disabled={uploading}
                  >
                    <Video className="h-3.5 w-3.5 mr-1.5" />
                    Camera
                  </Button>
                  {previewImage && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRemoveImage}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Camera Capture Dialog */}
        <Dialog open={showCamera} onOpenChange={(open) => { if (!open) { stopCamera(); setShowCamera(false) } }}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Take a Photo
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {cameraError ? (
                <div className="flex flex-col items-center gap-3 py-8">
                  <X className="h-10 w-10 text-red-400" />
                  <p className="text-sm text-red-600 text-center">{cameraError}</p>
                  <Button variant="outline" size="sm" onClick={startCamera}>
                    Retry
                  </Button>
                </div>
              ) : (
                <>
                  <div className="relative bg-black overflow-hidden aspect-[4/3]">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                      style={{ transform: "scaleX(-1)" }}
                    />
                    {!cameraReady && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                        <div className="text-center">
                          <Loader2 className="h-8 w-8 animate-spin text-white mx-auto mb-2" />
                          <p className="text-sm text-gray-300">Starting camera...</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center">
                    <button
                      onClick={capturePhoto}
                      disabled={!cameraReady}
                      className="h-16 w-16 rounded-full border-4 border-blue-600 bg-white hover:bg-blue-50 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Capture photo"
                    >
                      <CircleDot className="h-8 w-8 text-blue-600" />
                    </button>
                  </div>
                </>
              )}
            </div>
            <canvas ref={canvasRef} className="hidden" />
          </DialogContent>
        </Dialog>

        {/* Personal Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Personal Information</CardTitle>
            <CardDescription>
              Update your display name. Your email cannot be changed.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-400" />
                Display Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                maxLength={100}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                Email Address
              </Label>
              <Input
                id="email"
                value={profile.email}
                disabled
                className="bg-gray-50 dark:bg-gray-800 cursor-not-allowed"
              />
              <p className="text-xs text-gray-400">
                Email address cannot be changed
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Account Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                {/* <Shield className="h-4 w-4" /> */}
                Account Role
              </div>
              <span className="text-sm font-medium capitalize">
                {profile.role.toLowerCase()}
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="h-4 w-4" />
                Member Since
              </div>
              <span className="text-sm font-medium">
                {new Date(profile.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <Link href={profile?.role === "ADMIN" ? "/admin" : profile?.role === "HR" ? "/hr" : "/dashboard"}>
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {profile?.role === "ADMIN" ? "Back to Admin" : profile?.role === "HR" ? "Back to HR" : "Back to Dashboard"}
            </Button>
          </Link>
          <Button
            onClick={handleSave}
            disabled={saving || !hasChanges()}
            className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
    </div>
  )
}
