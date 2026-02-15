"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import {
  Search, Mail, Trash2, ChevronDown, ChevronUp, Loader2,
} from "lucide-react"
import { toast } from "sonner"

type Contact = {
  id: string
  firstName: string
  lastName: string
  email: string
  company: string | null
  industry: string | null
  service: string | null
  timeline: string | null
  message: string | null
  status: string
  createdAt: string
}

const statusColors: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  READ: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  RESPONDED: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("ALL")
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const res = await fetch("/api/admin/contacts")
      const data = await res.json()
      setContacts(Array.isArray(data) ? data : [])
    } catch {
      toast.error("Failed to load contacts")
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id)
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (res.ok) {
        setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)))
        toast.success("Status updated")
      } else {
        toast.error("Failed to update status")
      }
    } catch {
      toast.error("Failed to update status")
    } finally {
      setUpdatingId(null)
    }
  }

  const deleteContact = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, { method: "DELETE" })
      if (res.ok) {
        setContacts((prev) => prev.filter((c) => c.id !== id))
        toast.success("Contact deleted")
      } else {
        toast.error("Failed to delete")
      }
    } catch {
      toast.error("Failed to delete")
    }
  }

  const filtered = contacts.filter((c) => {
    const matchSearch =
      `${c.firstName} ${c.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      (c.company || "").toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "ALL" || c.status === statusFilter
    return matchSearch && matchStatus
  })

  if (loading) {
    return (
      <Card>
        <CardHeader><Skeleton className="h-8 w-48" /></CardHeader>
        <CardContent className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold dark:text-white">Contact Submissions</h1>

      <Card className="dark:bg-gray-900 dark:border-gray-700">
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search by name, email, or company..."
                value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Statuses</SelectItem>
                <SelectItem value="NEW">New</SelectItem>
                <SelectItem value="READ">Read</SelectItem>
                <SelectItem value="RESPONDED">Responded</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <Mail className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No contact submissions found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((contact) => (
                    <>
                      <TableRow key={contact.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium dark:text-white">{contact.firstName} {contact.lastName}</p>
                            {contact.company && <p className="text-xs text-gray-500 dark:text-gray-400">{contact.company}</p>}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm dark:text-gray-300">{contact.email}</TableCell>
                        <TableCell className="text-sm dark:text-gray-300">{contact.service || "—"}</TableCell>
                        <TableCell className="text-sm dark:text-gray-300">{contact.industry || "—"}</TableCell>
                        <TableCell>
                          <Badge className={statusColors[contact.status] || "bg-gray-100"}>
                            {contact.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {contact.message ? (
                            <Button variant="ghost" size="sm"
                              onClick={() => setExpandedId(expandedId === contact.id ? null : contact.id)}
                              className="text-blue-600 dark:text-blue-400">
                              {expandedId === contact.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            </Button>
                          ) : (
                            <span className="text-xs text-gray-400 dark:text-gray-500">None</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Select value={contact.status}
                              onValueChange={(v) => updateStatus(contact.id, v)}
                              disabled={updatingId === contact.id}>
                              <SelectTrigger className="w-[120px] h-8 text-xs"><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="NEW">New</SelectItem>
                                <SelectItem value="READ">Read</SelectItem>
                                <SelectItem value="RESPONDED">Responded</SelectItem>
                              </SelectContent>
                            </Select>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Contact</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Delete submission from {contact.firstName} {contact.lastName}? This cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => deleteContact(contact.id)}
                                    className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                      {expandedId === contact.id && contact.message && (
                        <TableRow key={`${contact.id}-msg`}>
                          <TableCell colSpan={8} className="bg-gray-50 dark:bg-gray-800">
                            <div className="p-4">
                              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Message</p>
                              <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{contact.message}</p>
                              {contact.timeline && (
                                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Timeline: {contact.timeline}</p>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
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
