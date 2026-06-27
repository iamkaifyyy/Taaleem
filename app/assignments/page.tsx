"use client"

import React, { useState } from "react"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  BookOpenCheck, Calendar, FileText, CheckCircle, 
  UploadCloud, ArrowUpRight, Sparkles, Loader2 
} from "lucide-react"

interface Assignment {
  id: number
  title: string
  subject: string
  dueDate: string
  status: "pending" | "submitted" | "graded"
  score?: string
  feedback?: string
}

export default function AssignmentsPage() {
  const [activeTab, setActiveTab] = useState<"pending" | "submitted" | "graded">("pending")
  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: 1, title: "Quadratic Equations Problem Set", subject: "Mathematics", dueDate: "Today, 11:59 PM", status: "pending" },
    { id: 2, title: "Ray Diagrams & Reflection Lab", subject: "Physics", dueDate: "Tomorrow, 02:00 PM", status: "pending" },
    { id: 3, title: "Essay: My Vision for Rural India", subject: "English", dueDate: "July 2, 2026", status: "pending" },
    { id: 4, title: "Cell Division Diagrams", subject: "Biology", dueDate: "June 25, 2026", status: "submitted" },
    { id: 5, title: "French Revolution Timeline", subject: "History", dueDate: "June 20, 2026", status: "graded", score: "9/10", feedback: "Excellent work on detailing the storming of the Bastille." }
  ])

  // Submit Modal state
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null)
  const [fileSelected, setFileSelected] = useState(false)
  const [fileName, setFileName] = useState("")
  const [comments, setComments] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleOpenSubmit = (assignment: Assignment) => {
    setSelectedAssignment(assignment)
    setFileSelected(false)
    setFileName("")
    setComments("")
    setShowSubmitModal(true)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name)
      setFileSelected(true)
    }
  }

  const handleSubmitAssignment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedAssignment || !fileSelected) return
    
    setSubmitting(true)
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setAssignments(prev => prev.map(a => {
      if (a.id === selectedAssignment.id) {
        return { ...a, status: "submitted" }
      }
      return a
    }))
    
    setSubmitting(false)
    setShowSubmitModal(false)
  }

  const filtered = assignments.filter(a => a.status === activeTab)

  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-[#0b1326] py-8 text-white relative">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 blur-[150px] pointer-events-none" />

        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          
          {/* Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">Assignments Portal</h2>
              <p className="text-muted-foreground text-sm mt-1">Submit your classroom tasks and check graded feedback</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-primary/20 text-primary border-none px-3.5 py-1.5 rounded-full text-xs font-bold">
                Pending: {assignments.filter(a => a.status === "pending").length}
              </Badge>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex bg-black/40 border border-white/5 rounded-2xl p-1.5 mb-6 overflow-x-auto no-scrollbar">
            {(["pending", "submitted", "graded"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 px-4 text-xs font-bold rounded-xl transition-all capitalize whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-primary text-white shadow-md shadow-indigo-500/20"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                {tab} Tasks
              </button>
            ))}
          </div>

          {/* List of Tasks */}
          <Card className="glass-panel border-white/10 rounded-2xl shadow-xl">
            <CardHeader className="pb-3 border-b border-white/5">
              <CardTitle className="text-white text-base font-bold capitalize">
                {activeTab} Assignments List
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              
              {filtered.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <CheckCircle className="h-10 w-10 text-emerald-400 mx-auto mb-3 opacity-80" />
                  <p className="text-sm font-semibold text-white">All caught up!</p>
                  <p className="text-xs mt-1">No assignments found in this section.</p>
                </div>
              )}

              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row md:items-center justify-between p-5 border border-white/5 bg-white/5 rounded-2xl hover:border-white/10 transition-all gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <FileText className="h-5.5 w-5.5" />
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-white text-sm">{item.title}</h4>
                        <Badge className="bg-white/5 border-white/10 text-muted-foreground text-[9px] font-medium uppercase tracking-wider">
                          {item.subject}
                        </Badge>
                      </div>

                      {item.status === "pending" ? (
                        <p className="text-xs text-red-400 flex items-center gap-1.5 font-medium">
                          <Calendar className="h-3.5 w-3.5" /> Due: {item.dueDate}
                        </p>
                      ) : item.status === "submitted" ? (
                        <p className="text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
                          <CheckCircle className="h-3.5 w-3.5" /> Successfully Submitted
                        </p>
                      ) : (
                        <div className="space-y-1.5 mt-1.5">
                          <p className="text-xs text-primary font-bold">Grade: {item.score}</p>
                          <p className="text-xs text-muted-foreground bg-black/20 p-2.5 rounded-lg border border-white/5 max-w-lg italic">
                            Feedback: &ldquo;{item.feedback}&rdquo;
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {item.status === "pending" && (
                    <Button onClick={() => handleOpenSubmit(item)} className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl shadow-md text-xs py-5 px-5">
                      Submit Task <ArrowUpRight className="h-4 w-4 ml-1.5" />
                    </Button>
                  )}

                </div>
              ))}

            </CardContent>
          </Card>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* ASSIGNMENT SUBMISSION MODAL */}
      {/* ========================================================================= */}
      <Dialog open={showSubmitModal} onOpenChange={setShowSubmitModal}>
        <DialogContent className="max-w-md bg-[#0f172a] border-white/10 text-white rounded-3xl p-6 shadow-2xl">
          <DialogHeader className="pb-3 border-b border-white/5 mb-4">
            <DialogTitle className="text-white text-lg font-bold">Submit Assignment</DialogTitle>
            <DialogDescription className="text-muted-foreground text-xs">
              Upload your completed homework document
            </DialogDescription>
          </DialogHeader>

          {selectedAssignment && (
            <form onSubmit={handleSubmitAssignment} className="space-y-4">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Selected Assignment:</p>
                <p className="text-sm font-bold text-white mt-0.5">{selectedAssignment.title}</p>
                <p className="text-xs text-primary font-medium mt-0.5">{selectedAssignment.subject}</p>
              </div>

              {/* Upload Dropzone */}
              <div className="border border-dashed border-white/10 rounded-2xl p-6 bg-black/20 text-center flex flex-col items-center justify-center relative hover:border-primary/40 transition-colors">
                <input 
                  type="file" 
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  id="assignment-file"
                />
                <UploadCloud className="h-9 w-9 text-muted-foreground mb-2" />
                {fileSelected ? (
                  <div>
                    <p className="text-xs font-bold text-emerald-400 truncate max-w-[250px]">{fileName}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Click or drag again to change file</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs font-bold text-white">Click to upload file</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">PDF, DOCX, or Image (Max 5MB)</p>
                  </div>
                )}
              </div>

              {/* Comments Textarea */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Teacher Notes / Comments</label>
                <Textarea 
                  placeholder="Optional notes for your teacher..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="bg-black/30 border-white/5 focus:border-primary/50 text-xs rounded-xl min-h-[70px] outline-none text-white resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowSubmitModal(false)}
                  className="flex-1 border-white/10 rounded-xl hover:bg-white/5 text-xs py-5"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={!fileSelected || submitting}
                  className="flex-1 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:brightness-110 shadow-lg text-xs py-5"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Uploading...
                    </>
                  ) : (
                    "Submit Task"
                  )}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </LayoutWrapper>
  )
}
