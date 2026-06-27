"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { 
  PlayCircle, Search, Filter, BookOpen, Clock, Star, 
  Download, Share2, Eye, PenTool, X, Play, Heart 
} from "lucide-react"
import Image from "next/image"

export function RecordedLectures() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedClass, setSelectedClass] = useState("all")
  
  // Interactive Modal Player State
  const [showPlayerModal, setShowPlayerModal] = useState(false)
  const [activeLecture, setActiveLecture] = useState<any>(null)
  const [noteText, setNoteText] = useState("")
  const [savedNotes, setSavedNotes] = useState<string[]>([])
  
  // Liked lectures state
  const [likedLectures, setLikedLectures] = useState<number[]>([])

  const lectures = [
    {
      id: 1,
      title: "Quadratic Equations - Introduction",
      subject: "Mathematics",
      class: "10",
      teacher: "Mrs. Priya Sharma",
      duration: "45 min",
      views: 234,
      rating: 4.8,
      progress: 0,
      thumbnail: "/math-equations.jpg",
      description: "Learn the basics of quadratic equations, standard form, and solving techniques.",
      uploadDate: "2024-01-15",
      tags: ["Algebra", "Equations", "Mathematics"],
    },
    {
      id: 2,
      title: "Light and Reflection - Physics",
      subject: "Physics",
      class: "10",
      teacher: "Mr. Rajesh Kumar",
      duration: "38 min",
      views: 189,
      rating: 4.6,
      progress: 65,
      thumbnail: "/physics-prism.jpg",
      description: "Understanding the properties of light, reflection, and refraction with practical examples.",
      uploadDate: "2024-01-12",
      tags: ["Optics", "Light", "Physics"],
    },
    {
      id: 3,
      title: "Essay Writing Techniques",
      subject: "English",
      class: "10",
      teacher: "Ms. Shalini Gupta",
      duration: "32 min",
      views: 145,
      rating: 4.5,
      progress: 100,
      thumbnail: "/english-essay.jpg",
      description: "Step-by-step guide to writing structured, highly-impactful academic essays.",
      uploadDate: "2024-01-10",
      tags: ["Grammar", "Writing", "English"],
    },
    {
      id: 4,
      title: "Cell Division - Biology",
      subject: "Biology",
      class: "10",
      teacher: "Dr. Kavita Patel",
      duration: "52 min",
      views: 312,
      rating: 4.9,
      progress: 20,
      thumbnail: "/biology-cells.jpg",
      description: "Explore cell cycles, mitosis, and meiosis with high-resolution cellular diagrams.",
      uploadDate: "2024-01-08",
      tags: ["Cells", "Biology", "Science"],
    },
    {
      id: 5,
      title: "Indian Freedom Struggle - History",
      subject: "History",
      class: "10",
      teacher: "Mr. Arjun Singh",
      duration: "50 min",
      views: 98,
      rating: 4.4,
      progress: 0,
      thumbnail: "/history-freedom.jpg",
      description: "Overview of key revolutionary milestones in India's struggle for independence.",
      uploadDate: "2024-01-05",
      tags: ["History", "Independence", "Social Science"],
    }
  ]

  const filteredLectures = lectures.filter((lecture) => {
    const matchesSearch = lecture.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          lecture.subject.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSubject = selectedSubject === "all" || lecture.subject.toLowerCase() === selectedSubject.toLowerCase()
    const matchesClass = selectedClass === "all" || lecture.class === selectedClass
    return matchesSearch && matchesSubject && matchesClass
  })

  const toggleLike = (id: number) => {
    setLikedLectures(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const handlePlayLecture = (lecture: any) => {
    setActiveLecture(lecture)
    setNoteText("")
    setSavedNotes([])
    setShowPlayerModal(true)
  }

  const handleSaveNote = () => {
    if (!noteText.trim()) return
    setSavedNotes(prev => [...prev, noteText.trim()])
    setNoteText("")
  }

  return (
    <div className="min-h-screen bg-[#0b1326] py-8 text-white relative">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Recorded Lectures</h2>
          <p className="text-muted-foreground text-sm mt-1">Study anytime, anywhere with tutorials led by expert teachers</p>
        </div>

        {/* Filter Controls Bar */}
        <div className="glass-panel border-white/10 rounded-2xl p-5 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
          
          <div className="relative flex-1 max-w-md group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              type="text"
              placeholder="Search lectures, topics, teachers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 pr-4 bg-black/40 border-white/5 focus:border-primary/50 text-white rounded-xl placeholder:text-muted-foreground transition-all w-full"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Subject</span>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-[140px] bg-black/40 border-white/5 text-white rounded-xl text-xs">
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent className="bg-[#131b2e] border-white/10 text-white">
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="biology">Biology</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Class</span>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-[110px] bg-black/40 border-white/5 text-white rounded-xl text-xs">
                  <SelectValue placeholder="All Classes" />
                </SelectTrigger>
                <SelectContent className="bg-[#131b2e] border-white/10 text-white">
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="10">Class 10</SelectItem>
                  <SelectItem value="9">Class 9</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

        </div>

        {/* Continue Watching Block */}
        {lectures.some((lecture) => lecture.progress > 0 && lecture.progress < 100) && (
          <Card className="glass-panel border-white/10 rounded-2xl mb-8 shadow-xl">
            <CardHeader className="pb-3 border-b border-white/5">
              <CardTitle className="flex items-center gap-2 text-white">
                <PlayCircle className="h-5 w-5 text-primary animate-pulse" />
                Continue Learning
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lectures
                  .filter((lecture) => lecture.progress > 0 && lecture.progress < 100)
                  .map((lecture) => (
                    <div
                      key={lecture.id}
                      onClick={() => handlePlayLecture(lecture)}
                      className="glass-card border-white/5 rounded-2xl p-4 hover:border-primary/20 cursor-pointer transition-all shadow-md flex flex-col relative overflow-hidden"
                    >
                      <div className="aspect-video bg-black/40 rounded-xl mb-3 relative overflow-hidden flex items-center justify-center border border-white/5">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-slate-950" />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <Play className="h-9 w-9 text-white bg-primary/80 rounded-full p-2.5 shadow-lg" />
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/75 text-white text-[10px] px-2 py-0.5 rounded-md font-semibold">
                          {lecture.duration}
                        </div>
                      </div>
                      <h4 className="font-bold text-white mb-1 truncate">{lecture.title}</h4>
                      <p className="text-xs text-muted-foreground mb-3">
                        {lecture.subject} • {lecture.teacher}
                      </p>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] text-muted-foreground font-semibold">{lecture.progress}% complete</span>
                      </div>
                      <Progress value={lecture.progress} className="h-1 bg-black/40" indicatorClassName="bg-secondary" />
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* All Lectures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLectures.map((lecture) => (
            <Card key={lecture.id} className="glass-card border-white/5 rounded-2xl overflow-hidden shadow-lg hover:border-primary/20 flex flex-col transition-all">
              <div className="aspect-video bg-black/40 relative overflow-hidden flex items-center justify-center border-b border-white/5">
                <div className={`absolute inset-0 bg-gradient-to-br ${
                  lecture.subject === "Mathematics" ? "from-indigo-900/50 to-slate-950" :
                  lecture.subject === "Physics" ? "from-purple-900/50 to-slate-950" :
                  "from-emerald-950/50 to-slate-950"
                }`} />
                <div className="absolute inset-0 bg-black/20 hover:bg-black/45 transition-colors flex items-center justify-center cursor-pointer" onClick={() => handlePlayLecture(lecture)}>
                  <Play className="h-11 w-11 text-white bg-primary/80 rounded-full p-3 shadow-lg hover:scale-110 transition-transform" />
                </div>
                <div className="absolute top-3 left-3">
                  <Badge className="bg-black/60 border-white/5 text-[9px] font-bold text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {lecture.subject}
                  </Badge>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/75 text-white text-[10px] px-2 py-0.5 rounded-md font-semibold">
                  {lecture.duration}
                </div>
              </div>

              <CardContent className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-white text-base mb-1 truncate leading-tight">{lecture.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{lecture.teacher}</p>
                  <p className="text-xs text-muted-foreground/80 line-clamp-2 mb-4 leading-relaxed">{lecture.description}</p>
                </div>

                <div>
                  {/* Actions Row */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-4">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => toggleLike(lecture.id)} 
                        className={`text-muted-foreground hover:text-red-400 transition-colors flex items-center gap-1.5`}
                      >
                        <Heart className={`h-4.5 w-4.5 ${likedLectures.includes(lecture.id) ? "fill-red-500 text-red-500" : ""}`} />
                        <span className="text-[10px] font-semibold">{likedLectures.includes(lecture.id) ? lecture.views + 1 : lecture.views}</span>
                      </button>
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Star className="h-4.5 w-4.5 text-yellow-500 fill-yellow-500" />
                        <span className="text-[10px] font-semibold text-white">{lecture.rating}</span>
                      </span>
                    </div>

                    <Button onClick={() => handlePlayLecture(lecture)} size="sm" className="bg-white/5 border border-white/10 hover:bg-white/10 text-xs px-4 rounded-xl">
                      Watch Lecture
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* RECORDED LECTURE MODAL PLAYER (WITH NOTE TAKING) */}
      {/* ========================================================================= */}
      <Dialog open={showPlayerModal} onOpenChange={setShowPlayerModal}>
        <DialogContent className="max-w-4xl bg-[#0f172a] border-white/10 text-white rounded-3xl p-0 overflow-hidden shadow-2xl">
          {activeLecture && (
            <div className="grid grid-cols-1 md:grid-cols-3 h-[75vh] md:h-[65vh]">
              
              {/* Left Col: Lecture Video Player */}
              <div className="md:col-span-2 flex flex-col h-full border-r border-white/5 bg-black/40">
                <div className="p-4 bg-[#131b2e] border-b border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-extrabold uppercase bg-primary text-white px-2 py-0.5 rounded-full tracking-wider">
                      {activeLecture.subject}
                    </span>
                    <h3 className="font-bold text-white text-sm mt-1">{activeLecture.title}</h3>
                  </div>
                  <Button size="icon" variant="ghost" onClick={() => setShowPlayerModal(false)} className="text-muted-foreground hover:text-white rounded-full">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Simulated Video Player */}
                <div className="flex-1 bg-black flex items-center justify-center relative group">
                  <div className={`absolute inset-0 bg-gradient-to-br ${
                    activeLecture.subject === "Mathematics" ? "from-indigo-900/40 to-slate-950" :
                    activeLecture.subject === "Physics" ? "from-purple-900/40 to-slate-950" :
                    "from-emerald-950/40 to-slate-950"
                  }`} />
                  
                  {/* Play Interface */}
                  <div className="text-center z-10 space-y-4">
                    <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center mx-auto shadow-lg glow-indigo group-hover:scale-105 transition-all cursor-pointer">
                      <Play className="h-6 w-6 text-white ml-1 fill-white" />
                    </div>
                    <p className="text-xs text-muted-foreground">Click to watch tutorial video ({activeLecture.duration})</p>
                  </div>

                  {/* Player controls */}
                  <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md rounded-lg p-2.5 flex items-center justify-between text-xs border border-white/5">
                    <span className="font-mono text-[10px]">00:00 / {activeLecture.duration}</span>
                    <Progress value={activeLecture.progress} className="h-1.5 flex-1 mx-4 bg-white/10" indicatorClassName="bg-primary" />
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
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    className="w-full min-h-[80px] p-3 text-xs bg-black/40 border border-white/5 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 rounded-xl resize-none text-white outline-none"
                  />
                  <Button onClick={handleSaveNote} className="w-full bg-secondary hover:bg-secondary-hover text-white text-xs font-semibold py-5 rounded-xl shadow-md">
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
