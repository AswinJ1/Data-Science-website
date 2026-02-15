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
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import {
  Search, HelpCircle, Trash2, ChevronDown, ChevronUp, MessageSquare, Send,
} from "lucide-react"
import { toast } from "sonner"

type FaqQuestion = {
  id: string
  question: string
  email: string | null
  answer: string | null
  status: string
  createdAt: string
  updatedAt: string
}

const statusColors: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  READ: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  ANSWERED: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
}

export default function AdminFaqQuestionsPage() {
  const [questions, setQuestions] = useState<FaqQuestion[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("ALL")
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  // Answer dialog state
  const [answerDialogOpen, setAnswerDialogOpen] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState<FaqQuestion | null>(null)
  const [answerText, setAnswerText] = useState("")
  const [answering, setAnswering] = useState(false)

  useEffect(() => {
    fetchQuestions()
  }, [])

  const fetchQuestions = async () => {
    try {
      const res = await fetch("/api/admin/faq-questions")
      const data = await res.json()
      setQuestions(Array.isArray(data) ? data : [])
    } catch {
      toast.error("Failed to load FAQ questions")
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id)
    try {
      const res = await fetch(`/api/admin/faq-questions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (res.ok) {
        setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, status } : q)))
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

  const submitAnswer = async () => {
    if (!selectedQuestion || !answerText.trim()) return
    setAnswering(true)
    try {
      const res = await fetch(`/api/admin/faq-questions/${selectedQuestion.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer: answerText.trim(), status: "ANSWERED" }),
      })
      if (res.ok) {
        setQuestions((prev) =>
          prev.map((q) =>
            q.id === selectedQuestion.id
              ? { ...q, answer: answerText.trim(), status: "ANSWERED" }
              : q
          )
        )
        toast.success("Answer saved")
        setAnswerDialogOpen(false)
        setSelectedQuestion(null)
        setAnswerText("")
      } else {
        toast.error("Failed to save answer")
      }
    } catch {
      toast.error("Failed to save answer")
    } finally {
      setAnswering(false)
    }
  }

  const deleteQuestion = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/faq-questions/${id}`, { method: "DELETE" })
      if (res.ok) {
        setQuestions((prev) => prev.filter((q) => q.id !== id))
        toast.success("Question deleted")
      } else {
        toast.error("Failed to delete")
      }
    } catch {
      toast.error("Failed to delete")
    }
  }

  const openAnswerDialog = (q: FaqQuestion) => {
    setSelectedQuestion(q)
    setAnswerText(q.answer || "")
    setAnswerDialogOpen(true)
  }

  const filtered = questions.filter((q) => {
    const matchSearch =
      q.question.toLowerCase().includes(search.toLowerCase()) ||
      (q.email || "").toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "ALL" || q.status === statusFilter
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold dark:text-white">FAQ Questions</h1>
        <Badge variant="outline" className="text-sm">
          {questions.filter((q) => q.status === "NEW").length} new
        </Badge>
      </div>

      <Card className="dark:bg-gray-900 dark:border-gray-700">
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by question or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Statuses</SelectItem>
                <SelectItem value="NEW">New</SelectItem>
                <SelectItem value="READ">Read</SelectItem>
                <SelectItem value="ANSWERED">Answered</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <HelpCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No FAQ questions found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Question</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Answer</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((q) => (
                    <>
                      <TableRow key={q.id}>
                        <TableCell className="max-w-xs">
                          <p className="font-medium dark:text-white line-clamp-2">{q.question}</p>
                        </TableCell>
                        <TableCell className="text-sm dark:text-gray-300">
                          {q.email || <span className="text-gray-400">—</span>}
                        </TableCell>
                        <TableCell>
                          <Badge className={statusColors[q.status] || "bg-gray-100"}>
                            {q.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                          {new Date(q.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {q.answer ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}
                              className="text-blue-600 dark:text-blue-400"
                            >
                              {expandedId === q.id ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </Button>
                          ) : (
                            <span className="text-xs text-gray-400 dark:text-gray-500">Not answered</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openAnswerDialog(q)}
                              className="text-xs"
                            >
                              <MessageSquare className="h-3.5 w-3.5 mr-1" />
                              {q.answer ? "Edit" : "Answer"}
                            </Button>
                            <Select
                              value={q.status}
                              onValueChange={(v) => updateStatus(q.id, v)}
                              disabled={updatingId === q.id}
                            >
                              <SelectTrigger className="w-[110px] h-8 text-xs"><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="NEW">New</SelectItem>
                                <SelectItem value="READ">Read</SelectItem>
                                <SelectItem value="ANSWERED">Answered</SelectItem>
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
                                  <AlertDialogTitle>Delete Question</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Delete this FAQ question? This cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => deleteQuestion(q.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                      {expandedId === q.id && q.answer && (
                        <TableRow key={`${q.id}-answer`}>
                          <TableCell colSpan={6} className="bg-gray-50 dark:bg-gray-800">
                            <div className="p-4">
                              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                                Answer
                              </p>
                              <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                {q.answer}
                              </p>
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

      {/* Answer Dialog */}
      <Dialog open={answerDialogOpen} onOpenChange={setAnswerDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedQuestion?.answer ? "Edit Answer" : "Answer Question"}</DialogTitle>
            <DialogDescription>
              <span className="font-medium text-gray-900 dark:text-gray-100 block mt-2">
                &ldquo;{selectedQuestion?.question}&rdquo;
              </span>
              {selectedQuestion?.email && (
                <span className="text-xs text-gray-500 block mt-1">
                  From: {selectedQuestion.email}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Type your answer here..."
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            rows={5}
            className="mt-2"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setAnswerDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={submitAnswer}
              disabled={answering || !answerText.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="h-4 w-4 mr-2" />
              {answering ? "Saving..." : "Save Answer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
