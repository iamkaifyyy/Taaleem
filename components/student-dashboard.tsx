"use client"

import React, { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { 
  BookOpen, Video, Calendar, Clock, Award, PlayCircle, 
  BookOpenCheck, Search, Users, MessageSquare, Send, Sparkles, 
  X, PenTool, Eraser, Trash2, Heart, Share2, Play
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/context/auth-context"

export function StudentDashboard() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  
  // Simulated Live Classroom Modal State
  const [showLiveClassModal, setShowLiveClassModal] = useState(false)
  const [liveChatMessages, setLiveChatMessages] = useState([
    { id: 1, sender: "Mrs. Priya Sharma", text: "Welcome everyone! Let's start with Quadratic Equations.", isTeacher: true },
    { id: 2, sender: "Rajesh Kumar", text: "Good morning ma'am! Ready for the session.", isTeacher: false },
    { id: 3, sender: "Neha Gupta", text: "Ma'am, will we learn the quadratic formula today?", isTeacher: false },
  ])
  const [newLiveMessage, setNewLiveMessage] = useState("")
  
  // Interactive Whiteboard State
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [brushColor, setBrushColor] = useState("#6366f1")
  const [brushSize, setBrushSize] = useState(4)
  const [isEraser, setIsEraser] = useState(false)

  // Recorded Lecture Modal State
  const [showLectureModal, setShowLectureModal] = useState(false)
  const [selectedLecture, setSelectedLecture] = useState<any>(null)
  const [notes, setNotes] = useState("")
  const [savedNotes, setSavedNotes] = useState<string[]>([])

  // Mock Data
  const recentLectures = [
    { id: 1, title: "Quadratic Equations - Part 1", subject: "Mathematics", duration: "45 min", progress: 0, thumbnail: "/math-thumbnail.jpg", teacher: "Mrs. Priya Sharma" },
    { id: 2, title: "Light and Reflection", subject: "Physics", duration: "38 min", progress: 65, thumbnail: "/physics-thumbnail.jpg", teacher: "Mr. Rajesh Kumar" },
    { id: 3, title: "Essay Writing Techniques", subject: "English", duration: "32 min", progress: 100, thumbnail: "/english-thumbnail.jpg", teacher: "Ms. Shalini Gupta" }
  ]

  // Filter Lectures
  const filteredLectures = recentLectures.filter(lec => 
    lec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lec.subject.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Whiteboard drawing logic
  useEffect(() => {
    if (showLiveClassModal && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
        ctx.strokeStyle = brushColor
        ctx.lineWidth = brushSize
        
        // Fill canvas with dark slate base for nice sketch look
        ctx.fillStyle = "#0f172a"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
    }
  }, [showLiveClassModal])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.beginPath()
      ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
      setIsDrawing(true)
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.strokeStyle = isEraser ? "#0f172a" : brushColor
      ctx.lineWidth = isEraser ? 20 : brushSize
      ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top)
      ctx.stroke()
    }
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearWhiteboard = () => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.fillStyle = "#0f172a"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
  }

  const handleSendLiveMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newLiveMessage.trim()) return
    setLiveChatMessages(prev => [
      ...prev,
      {
        id: prev.length + 1,
        sender: user?.name || "Rajesh Kumar",
        text: newLiveMessage,
        isTeacher: false
      }
    ])
    setNewLiveMessage("")
  }

  const handleWatchLecture = (lecture: any) => {
    setSelectedLecture(lecture)
    setNotes("")
    setSavedNotes([])
    setShowLectureModal(true)
  }

  const handleAddNote = () => {
    if (!notes.trim()) return
    setSavedNotes(prev => [...prev, notes.trim()])
    setNotes("")
  }

  return (
    <div className="min-h-screen bg-[#0b1326] py-8 text-white relative">
      {/* Visual background glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-secondary/5 blur-[150px] pointer-events-none" />

      <main className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Interactive Hero Section */}
        <section className="glass-panel border-white/10 rounded-3xl p-8 md:p-10 mb-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl pointer-events-none" />
          
          <div className="max-w-3xl">
            <Badge className="bg-primary/20 text-primary border-none mb-3 px-3 py-1 rounded-full uppercase tracking-wider text-[10px] font-bold">
              <Sparkles className="h-3 w-3 mr-1.5 inline" /> Live Session Active
            </Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
              Welcome back, {user?.name || "Rajesh"}!
            </h2>
            <p className="text-muted-foreground text-sm md:text-base mb-6">
              You are doing great! Let&apos;s explore your courses, join live lessons, or finish pending assignments.
            </p>

            {/* Interactive Search bar */}
            <div className="relative max-w-lg mb-6 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                type="text"
                placeholder="Search lectures, topics, or subjects (e.g., Physics, Algebra)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 bg-black/40 border-white/10 rounded-2xl text-white placeholder:text-muted-foreground focus:border-primary/50 focus:ring-primary/20 transition-all text-sm w-full shadow-inner"
              />
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => setShowLiveClassModal(true)} className="bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl hover:brightness-110 shadow-lg glow-indigo">
                <Video className="h-4 w-4 mr-2" /> Join Live Classroom
              </Button>
              <Link href="/assignments">
                <Button variant="outline" className="border-white/10 hover:bg-white/5 rounded-xl text-muted-foreground hover:text-white">
                  <BookOpenCheck className="h-4 w-4 mr-2 text-secondary" /> Submit Assignments
                </Button>
              </Link>
              <Link href="/achievements">
                <Button variant="outline" className="border-white/10 hover:bg-white/5 rounded-xl text-muted-foreground hover:text-white">
                  <Award className="h-4 w-4 mr-2 text-yellow-500" /> Leaderboard Rank
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { title: "Completed Lectures", value: "12", sub: "Lessons Finished", icon: BookOpenCheck, color: "text-primary bg-primary/10" },
            { title: "Today's Live Classes", value: "3", sub: "1 Active Now", icon: Video, color: "text-secondary bg-secondary/10" },
            { title: "Study Watch Time", value: "24h", sub: "This week", icon: Clock, color: "text-emerald-400 bg-emerald-500/10" },
            { title: "Achievements", value: "8 Badges", sub: "Current Rank: Top 5%", icon: Award, color: "text-yellow-500 bg-yellow-500/10" }
          ].map((stat, idx) => (
            <Card key={idx} className="glass-card border-white/5 rounded-2xl relative overflow-hidden shadow-lg">
              <CardContent className="p-5 flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{stat.title}</p>
                  <p className="text-2xl font-black text-white">{stat.value}</p>
                  <p className="text-[10px] text-muted-foreground">{stat.sub}</p>
                </div>
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${stat.color} shadow-inner`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Classes Section */}
          <section className="lg:col-span-2">
            <Card className="glass-panel border-white/10 rounded-2xl shadow-xl">
              <CardHeader className="pb-3 border-b border-white/5">
                <CardTitle className="flex items-center gap-2 text-white">
                  <span className="relative flex h-3 w-3 mr-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
                  </span>
                  Live Classroom Hub
                </CardTitle>
                <CardDescription className="text-muted-foreground text-xs">
                  Interact live with your teachers and classmates
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                
                {/* Active Live Class */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 border border-white/10 rounded-2xl bg-primary/5 gap-4 relative overflow-hidden hover:border-primary/30 transition-all">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-2xl pointer-events-none" />
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-indigo-700 flex items-center justify-center shadow-lg">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-widest font-extrabold bg-secondary text-white px-2 py-0.5 rounded-full mb-1 inline-block">
                        Active Now
                      </span>
                      <h4 className="font-bold text-white text-base">Mathematics - Quadratic Equations</h4>
                      <p className="text-xs text-muted-foreground flex items-center mt-1">
                        <Users className="h-3.5 w-3.5 mr-1 text-primary" /> 24 Students attending • Mrs. Priya Sharma
                      </p>
                    </div>
                  </div>
                  <Button onClick={() => setShowLiveClassModal(true)} className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary text-white hover:brightness-110 px-5 rounded-xl shadow-md">
                    Join Classroom
                  </Button>
                </div>

                {/* Upcoming Live Class 1 */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 border border-white/5 rounded-2xl bg-white/5 gap-4 hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 text-muted-foreground">
                      <Video className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">Science - Light & Reflection</h4>
                      <p className="text-xs text-muted-foreground mt-1">Starts today at 02:00 PM • Mr. Rajesh Kumar</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full sm:w-auto border-white/10 rounded-xl text-muted-foreground hover:text-white">
                    Remind Me
                  </Button>
                </div>

                {/* Upcoming Live Class 2 */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 border border-white/5 rounded-2xl bg-white/5 gap-4 hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 text-muted-foreground">
                      <Video className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">English - Writing Skills</h4>
                      <p className="text-xs text-muted-foreground mt-1">Starts today at 04:00 PM • Ms. Shalini Gupta</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full sm:w-auto border-white/10 rounded-xl text-muted-foreground hover:text-white">
                    Remind Me
                  </Button>
                </div>

              </CardContent>
            </Card>
          </section>

          {/* Right Sidebar */}
          <section className="space-y-6">
            
            {/* Subject Progress */}
            <Card className="glass-panel border-white/10 rounded-2xl shadow-xl">
              <CardHeader className="pb-3 border-b border-white/5">
                <CardTitle className="text-white text-lg">Subject Progress</CardTitle>
                <CardDescription className="text-muted-foreground text-xs">
                  Your academic progress tracking
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {[
                  { name: "Mathematics", val: 85, color: "bg-primary" },
                  { name: "Science", val: 72, color: "bg-secondary" },
                  { name: "English", val: 90, color: "bg-emerald-400" },
                  { name: "Hindi", val: 68, color: "bg-yellow-500" }
                ].map((subj, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-white">{subj.name}</span>
                      <span className="text-muted-foreground">{subj.val}%</span>
                    </div>
                    <Progress value={subj.val} className="h-1.5 bg-black/40" indicatorClassName={subj.color} />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Learning Tools */}
            <Card className="glass-panel border-white/10 rounded-2xl shadow-xl">
              <CardHeader className="pb-3 border-b border-white/5">
                <CardTitle className="text-white text-lg">Quick Access</CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-3">
                <Link href="/recorded-lectures" className="block w-full">
                  <Button className="w-full justify-start border-white/10 bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white rounded-xl py-6" variant="outline">
                    <PlayCircle className="h-4 w-4 mr-3 text-primary" /> Browse Lectures
                  </Button>
                </Link>
                <Link href="/schedule" className="block w-full">
                  <Button className="w-full justify-start border-white/10 bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white rounded-xl py-6" variant="outline">
                    <Calendar className="h-4 w-4 mr-3 text-secondary" /> Complete Class Schedule
                  </Button>
                </Link>
                <Link href="/assignments" className="block w-full">
                  <Button className="w-full justify-start border-white/10 bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white rounded-xl py-6" variant="outline">
                    <Award className="h-4 w-4 mr-3 text-emerald-400" /> Pending Assignments
                  </Button>
                </Link>
              </CardContent>
            </Card>

          </section>
        </div>

        {/* Recent Recorded Lectures Section */}
        <section className="mt-8">
          <Card className="glass-panel border-white/10 rounded-2xl shadow-xl">
            <CardHeader className="pb-3 border-b border-white/5">
              <CardTitle className="flex items-center gap-2 text-white">
                <PlayCircle className="h-5 w-5 text-primary" />
                Recent Recorded Lectures
              </CardTitle>
              <CardDescription className="text-muted-foreground text-xs">
                Learn at your own pace. Watch, re-watch, and take notes.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              
              {/* Dynamic Warning for empty search */}
              {filteredLectures.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Search className="h-8 w-8 mx-auto mb-3 opacity-40 text-primary animate-pulse" />
                  <p className="text-sm">No lectures found matching &ldquo;{searchQuery}&rdquo;</p>
                  <Button size="sm" variant="ghost" onClick={() => setSearchQuery("")} className="mt-2 text-primary">
                    Clear Search Filter
                  </Button>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLectures.map((lecture) => (
                  <div
                    key={lecture.id}
                    onClick={() => handleWatchLecture(lecture)}
                    className="glass-card border-white/5 rounded-2xl p-4 hover:border-primary/20 group cursor-pointer transition-all shadow-md relative overflow-hidden"
                  >
                    <div className="aspect-video bg-black/40 rounded-xl mb-4 relative overflow-hidden flex items-center justify-center border border-white/5">
                      {/* Thumbnail Placeholder with Subject-Based Gradients */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${
                        lecture.subject === "Mathematics" ? "from-indigo-900/60 to-slate-900" :
                        lecture.subject === "Physics" ? "from-purple-900/60 to-slate-900" :
                        "from-emerald-950/60 to-slate-900"
                      } flex flex-col justify-center items-center p-4`} />
                      
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <Play className="h-10 w-10 text-white bg-primary/80 group-hover:bg-primary rounded-full p-2.5 shadow-lg group-hover:scale-110 transition-all" />
                      </div>
                      
                      <div className="absolute bottom-2.5 right-2.5 bg-black/75 text-white text-[10px] px-2 py-0.5 rounded-md font-semibold tracking-wider">
                        {lecture.duration}
                      </div>

                      <div className="absolute top-2.5 left-2.5">
                        <Badge className="bg-black/50 border-white/5 text-[9px] font-bold text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                          {lecture.subject}
                        </Badge>
                      </div>
                    </div>

                    <h4 className="font-bold text-white text-base mb-1 group-hover:text-primary transition-colors truncate">
                      {lecture.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-3 flex items-center justify-between">
                      <span>{lecture.teacher}</span>
                    </p>

                    {lecture.progress > 0 && lecture.progress < 100 ? (
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-semibold text-muted-foreground">
                          <span>Progress</span>
                          <span>{lecture.progress}%</span>
                        </div>
                        <Progress value={lecture.progress} className="h-1 bg-black/40" indicatorClassName="bg-secondary" />
                      </div>
                    ) : lecture.progress === 100 ? (
                      <Badge className="bg-emerald-500/20 text-emerald-400 border-none text-[10px] font-semibold">
                        Completed
                      </Badge>
                    ) : (
                      <span className="text-[10px] text-muted-foreground italic">Not started</span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

      </main>

      {/* ========================================================================= */}
      {/* 1. SIMULATED LIVE CLASSROOM MODAL */}
      {/* ========================================================================= */}
      <Dialog open={showLiveClassModal} onOpenChange={setShowLiveClassModal}>
        <DialogContent className="max-w-5xl bg-[#0f172a] border-white/10 text-white rounded-3xl p-0 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 h-[85vh] lg:h-[75vh]">
            
            {/* Left Col: Live Video Feed and Drawing Whiteboard */}
            <div className="lg:col-span-2 flex flex-col h-full border-r border-white/5 bg-black/20">
              <div className="p-4 bg-[#131b2e] border-b border-white/5 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 bg-red-500 rounded-full animate-ping" />
                    <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Live Interactive Classroom</span>
                  </div>
                  <h3 className="font-bold text-white text-sm">Topic: Quadratic Equations (Algebra)</h3>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Users className="h-4 w-4 text-primary" />
                  <span>24 Attending</span>
                </div>
              </div>

              {/* Classroom Video Frame + Interactive Drawing Board */}
              <div className="flex-1 flex flex-col p-4 space-y-4 overflow-y-auto">
                {/* Simulated teacher screen */}
                <div className="aspect-video bg-[#131b2e] border border-white/5 rounded-2xl overflow-hidden relative flex flex-col items-center justify-center p-4">
                  <div className="absolute top-3 left-3 bg-black/60 text-[10px] px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1.5 border border-white/10">
                    <span className="h-1.5 w-1.5 bg-secondary rounded-full animate-pulse" />
                    Mrs. Priya Sharma (Teacher)
                  </div>
                  
                  {/* Mock content displayed by teacher */}
                  <div className="text-center space-y-2 select-none pointer-events-none p-4 max-w-sm bg-black/40 border border-white/5 rounded-xl">
                    <p className="text-sm font-bold text-primary">Quadratic Formula</p>
                    <p className="text-xl font-mono tracking-wider font-extrabold text-white">x = (-b ± √(b² - 4ac)) / 2a</p>
                    <p className="text-xs text-muted-foreground">Use standard form: ax² + bx + c = 0</p>
                  </div>
                </div>

                {/* Interactive Shared Student Whiteboard */}
                <div className="flex-1 min-h-[220px] bg-[#0f172a] border border-white/10 rounded-2xl overflow-hidden flex flex-col">
                  <div className="px-4 py-2 border-b border-white/5 bg-white/5 flex items-center justify-between text-xs">
                    <span className="font-semibold text-muted-foreground flex items-center gap-1.5">
                      <PenTool className="h-3.5 w-3.5 text-secondary" /> Student Shared Sketchpad (Draw here!)
                    </span>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setIsEraser(false)} 
                        className={`p-1.5 rounded-md hover:bg-white/5 ${!isEraser ? "bg-primary text-white" : "text-muted-foreground"}`}
                        title="Pen Tool"
                      >
                        <PenTool className="h-3.5 w-3.5" />
                      </button>
                      <button 
                        onClick={() => setIsEraser(true)} 
                        className={`p-1.5 rounded-md hover:bg-white/5 ${isEraser ? "bg-primary text-white" : "text-muted-foreground"}`}
                        title="Eraser Tool"
                      >
                        <Eraser className="h-3.5 w-3.5" />
                      </button>
                      <span className="h-4 w-[1px] bg-white/10" />
                      <button onClick={clearWhiteboard} className="p-1.5 rounded-md hover:bg-white/5 text-red-400" title="Clear Canvas">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 relative bg-[#0f172a] cursor-crosshair overflow-hidden">
                    <canvas
                      ref={canvasRef}
                      width={600}
                      height={200}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Classroom Chat (Functional) */}
            <div className="flex flex-col h-full bg-[#131b2e]">
              <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <span className="text-sm font-bold text-white flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-primary" /> Live Class Chat
                </span>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto space-y-3 flex flex-col justify-end">
                {liveChatMessages.map((msg) => (
                  <div key={msg.id} className={`max-w-[85%] rounded-2xl p-3 text-xs ${
                    msg.isTeacher 
                      ? "bg-secondary/10 border border-secondary/20 text-white self-start" 
                      : "bg-white/5 text-white self-end border border-white/5"
                  }`}>
                    <p className={`font-bold mb-1 ${msg.isTeacher ? "text-secondary" : "text-primary"}`}>
                      {msg.sender}
                    </p>
                    <p>{msg.text}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendLiveMessage} className="p-4 border-t border-white/5 flex gap-2">
                <Input
                  type="text"
                  placeholder="Type a message to class..."
                  value={newLiveMessage}
                  onChange={(e) => setNewLiveMessage(e.target.value)}
                  className="bg-black/30 border-white/5 focus:border-primary/50 text-xs py-5 rounded-xl text-white"
                />
                <Button type="submit" size="icon" className="bg-primary hover:bg-primary-hover rounded-xl shrink-0">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>

          </div>
        </DialogContent>
      </Dialog>


      {/* ========================================================================= */}
      {/* 2. RECORDED LECTURE WATCH MODAL */}
      {/* ========================================================================= */}
      <Dialog open={showLectureModal} onOpenChange={setShowLectureModal}>
        <DialogContent className="max-w-4xl bg-[#0f172a] border-white/10 text-white rounded-3xl p-0 overflow-hidden shadow-2xl">
          {selectedLecture && (
            <div className="grid grid-cols-1 md:grid-cols-3 h-[75vh] md:h-[65vh]">
              
              {/* Left Col: Lecture Video Player */}
              <div className="md:col-span-2 flex flex-col h-full border-r border-white/5 bg-black/40">
                <div className="p-4 bg-[#131b2e] border-b border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-extrabold uppercase bg-primary text-white px-2 py-0.5 rounded-full tracking-wider">
                      {selectedLecture.subject}
                    </span>
                    <h3 className="font-bold text-white text-sm mt-1">{selectedLecture.title}</h3>
                  </div>
                  <Button size="icon" variant="ghost" onClick={() => setShowLectureModal(false)} className="text-muted-foreground hover:text-white rounded-full">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Simulated Video Player */}
                <div className="flex-1 bg-black flex items-center justify-center relative group">
                  <div className={`absolute inset-0 bg-gradient-to-br ${
                    selectedLecture.subject === "Mathematics" ? "from-indigo-900/40 to-slate-950" :
                    selectedLecture.subject === "Physics" ? "from-purple-900/40 to-slate-950" :
                    "from-emerald-950/40 to-slate-950"
                  }`} />
                  
                  {/* Play Interface */}
                  <div className="text-center z-10 space-y-4">
                    <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center mx-auto shadow-lg glow-indigo group-hover:scale-105 transition-all cursor-pointer">
                      <Play className="h-6 w-6 text-white ml-1 fill-white" />
                    </div>
                    <p className="text-xs text-muted-foreground">Click to watch tutorial video ({selectedLecture.duration})</p>
                  </div>

                  {/* Player controls */}
                  <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md rounded-lg p-2.5 flex items-center justify-between text-xs border border-white/5">
                    <span className="font-mono text-[10px]">00:00 / {selectedLecture.duration}</span>
                    <Progress value={0} className="h-1.5 flex-1 mx-4 bg-white/10" indicatorClassName="bg-primary" />
                    <span className="text-muted-foreground text-[10px]">1080p HD</span>
                  </div>
                </div>
              </div>

              {/* Right Col: Video Notes Tool */}
              <div className="flex flex-col h-full bg-[#131b2e] p-4">
                <h4 className="font-bold text-white text-sm flex items-center gap-1.5 mb-3">
                  <PenTool className="h-4 w-4 text-secondary" /> Personal Lecture Notes
                </h4>
                
                {/* Saved notes container */}
                <div className="flex-1 overflow-y-auto mb-3 space-y-2">
                  {savedNotes.length === 0 ? (
                    <p className="text-xs text-muted-foreground italic text-center pt-8">
                      No notes saved yet. Type below to save key points.
                    </p>
                  ) : (
                    savedNotes.map((note, idx) => (
                      <div key={idx} className="bg-black/30 border border-white/5 rounded-xl p-3 text-xs">
                        <p className="text-[9px] uppercase tracking-wider text-primary font-bold mb-1">Note {idx + 1}</p>
                        <p className="text-muted-foreground">{note}</p>
                      </div>
                    ))
                  )}
                </div>

                <div className="space-y-2 mt-auto">
                  <textarea
                    placeholder="Write a custom note during lecture..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full min-h-[80px] p-3 text-xs bg-black/40 border border-white/5 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 rounded-xl resize-none text-white outline-none"
                  />
                  <Button onClick={handleAddNote} className="w-full bg-secondary hover:bg-secondary-hover text-white text-xs font-semibold py-5 rounded-xl shadow-md">
                    Save Note
                  </Button>
                </div>
              </div>

            </div>
          )}
        </DialogContent>
      </Dialog>

    </div>
  )
}
