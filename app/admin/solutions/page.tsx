"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Plus, Pencil, Trash2, Lightbulb } from "lucide-react"
import { toast } from "sonner"

type Solution = {
  id: string
  title: string
  slug: string
  icon: string | null
  isActive: boolean
  createdAt: string
}

export default function AdminSolutionsPage() {
  const [solutions, setSolutions] = useState<Solution[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSolutions()
  }, [])

  const fetchSolutions = async () => {
    try {
      const res = await fetch("/api/solutions")
      const data = await res.json()
      setSolutions(data)
    } catch {
      toast.error("Failed to fetch solutions")
    } finally {
      setLoading(false)
    }
  }

  const deleteSolution = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/solutions/${id}`, { method: "DELETE" })
      if (res.ok) {
        setSolutions((prev) => prev.filter((s) => s.id !== id))
        toast.success("Solution deleted")
      } else {
        toast.error("Failed to delete solution")
      }
    } catch {
      toast.error("Failed to delete solution")
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader><Skeleton className="h-8 w-48" /></CardHeader>
        <CardContent className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Solutions</h1>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href="/admin/solutions/new"><Plus className="mr-2 h-4 w-4" /> New Solution</Link>
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          {solutions.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <Lightbulb className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No solutions yet</p>
              <Button asChild variant="outline" className="mt-4">
                <Link href="/admin/solutions/new">Create First Solution</Link>
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Icon</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {solutions.map((sol) => (
                    <TableRow key={sol.id}>
                      <TableCell className="font-medium">{sol.title}</TableCell>
                      <TableCell>{sol.icon || "—"}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${sol.isActive ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"}`}>
                          {sol.isActive ? "Active" : "Hidden"}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(sol.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/admin/solutions/${sol.id}/edit`}>
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Solution?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete &ldquo;{sol.title}&rdquo;.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deleteSolution(sol.id)} className="bg-red-600 hover:bg-red-700">
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
