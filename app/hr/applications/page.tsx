"use client"

import dynamic from "next/dynamic"

// Dynamically import the admin applications UI (same component, same APIs)
// The API routes already check requireHROrAdmin(), so this is safe
const AdminApplicationsPage = dynamic(
  () => import("@/app/admin/applications/page"),
  { ssr: false }
)

export default function HRApplicationsPage() {
  return <AdminApplicationsPage />
}
