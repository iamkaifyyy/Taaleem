"use client"

import React, { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { 
  Video, Mic, MicOff, VideoOff, MonitorUp, Settings, Share2, 
  MessageSquare, Users, Send, Hand, Eraser, PenTool, Trash2, HelpCircle 
} from "lucide-react"
import { useAuth } from "@/context/auth-context"

export function LiveClasses() {
  const { user } = useAuth()
  
  // Media Status States
  const [isMicOn, setIsMicOn] = useState(true)
  const [isCamOn, setIsCamOn] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isHandRaised, setIsHandRaised] = useState(false)
  
  // Whiteboard drawing states
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [brushColor, setBrushColor] = useState("#a855f7")
  const [brushSize, setBrushSize] = useState(4)
  const [isEraser, setIsEraser] = useState(false)

  // Chat message states
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: "Mrs. Priya Sharma", text: "Welcome everyone! Today we'll be learning about quadratic equations.", isTeacher: true, time: "10:00 AM" },
    { id: 2, sender: "Rajesh Kumar", text: "Good morning ma'am!", isTeacher: false, time: "10:01 AM" },
    { id: 3, sender: "Neha Gupta", text: "I have a question about the previous lesson.", isTeacher: false, time: "10:02 AM" },
  ])
  const [newMsg, setNewMsg] = useState("")

  // Student roster state (Rajesh is the user)
  const [students, setStudents] = useState([
    { name: "Rajesh Kumar", status: "active", initials: "RK" },
    { name: "Priya Singh", status: "muted", initials: "PS" },
    { name: "Amit Sharma", status: "active", initials: "AS" },
    { name: "Neha Gupta", status: "hand-raised", initials: "NG" },
    { name: "Rohit Verma", status: "muted", initials: "RV" },
    { name: "Kavya Patel", status: "active", initials: "KP" },
    { name: "Arjun Singh", status: "muted", initials: "AS" },
    { name: "Riya Jain", status: "active", initials: "RJ" },
  ])

  // Whiteboard canvas setup
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
        ctx.strokeStyle = brushColor
        ctx.lineWidth = brushSize
        
        ctx.fillStyle = "#0c1222"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
    }
  }, [])

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
      ctx.strokeStyle = isEraser ? "#0c1222" : brushColor
      ctx.lineWidth = isEraser ? 20 : brushSize
      ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top)
      ctx.stroke()
    }
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.fillStyle = "#0c1222"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
  }

  // Toggling hand raised state updates Rajesh's status in list
  const toggleHandRaise = () => {
    const nextState = !isHandRaised
    setIsHandRaised(nextState)
    setStudents(prev => prev.map(s => {
      if (s.name === (user?.name || "Rajesh Kumar")) {
        return { ...s, status: nextState ? "hand-raised" : isMicOn ? "active" : "muted" }
      }
      return s
    }))
  }

  // Send message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMsg.trim()) return
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setChatMessages(prev => [
      ...prev,
      {
        id: prev.length + 1,
        sender: user?.name || "Rajesh Kumar",
        text: newMsg,
        isTeacher: false,
        time: timeNow
      }
    ])
    setNewMsg("")
  }

  return (
    <div className="min-h-screen bg-[#0b1326] py-8 text-white relative">
      {/* Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Title bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Live Classroom</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">Interactive Session</h2>
          </div>
          <Badge className="bg-primary/20 text-primary border-none px-3.5 py-1.5 rounded-full text-xs font-bold">
            <Users className="h-4 w-4 mr-2 inline" /> 24 Students Attending
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Left / Middle: Classroom Stream & Whiteboard (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Live Video Feed */}
            <Card className="glass-panel border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
              <div className="aspect-video bg-black/45 flex flex-col justify-center items-center relative">
                
                {/* Teacher Video Placeholder */}
                {isCamOn ? (
                  <div className="text-center space-y-4">
                    <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto shadow-lg glow-indigo animate-pulse">
                      <Video className="h-10 w-10 text-white" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold">Teacher: Mrs. Priya Sharma</p>
                      <p className="text-xs text-muted-foreground">Sharing: Algebra Lessons & Whiteboard</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-3">
                    <VideoOff className="h-12 w-12 text-muted-foreground mx-auto" />
                    <p className="text-xs text-muted-foreground">Classroom video paused</p>
                  </div>
                )}

                {/* Floating Classroom Indicators */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-[10px] px-3 py-1 rounded-full font-bold border border-white/10 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 bg-red-500 rounded-full animate-pulse" />
                  Mrs. Priya Sharma (Teacher)
                </div>

                {isScreenSharing && (
                  <div className="absolute top-4 right-4 bg-primary/80 backdrop-blur-md text-[10px] px-3 py-1 rounded-full font-bold border border-white/10 flex items-center gap-1.5 text-white">
                    <MonitorUp className="h-3 w-3 animate-bounce" />
                    You are sharing screen
                  </div>
                )}

                {/* Bottom Control Overlay Bar */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md rounded-2xl px-5 py-3 flex items-center gap-3 border border-white/10">
                  <Button 
                    onClick={() => setIsMicOn(!isMicOn)}
                    variant="ghost" 
                    size="icon" 
                    className={`rounded-xl hover:bg-white/10 ${isMicOn ? "text-white" : "text-red-400 bg-red-500/10"}`}
                  >
                    {isMicOn ? <Mic className="h-4.5 w-4.5" /> : <MicOff className="h-4.5 w-4.5" />}
                  </Button>

                  <Button 
                    onClick={() => setIsCamOn(!isCamOn)}
                    variant="ghost" 
                    size="icon" 
                    className={`rounded-xl hover:bg-white/10 ${isCamOn ? "text-white" : "text-red-400 bg-red-500/10"}`}
                  >
                    {isCamOn ? <Video className="h-4.5 w-4.5" /> : <VideoOff className="h-4.5 w-4.5" />}
                  </Button>

                  <Button 
                    onClick={() => setIsScreenSharing(!isScreenSharing)}
                    variant="ghost" 
                    size="icon" 
                    className={`rounded-xl hover:bg-white/10 ${isScreenSharing ? "text-primary bg-primary/10" : "text-white"}`}
                  >
                    <MonitorUp className="h-4.5 w-4.5" />
                  </Button>

                  <span className="h-5 w-[1px] bg-white/10" />

                  <Button 
                    onClick={toggleHandRaise}
                    variant="ghost" 
                    size="icon" 
                    className={`rounded-xl hover:bg-white/10 ${isHandRaised ? "text-yellow-400 bg-yellow-500/10 animate-bounce" : "text-white"}`}
                  >
                    <Hand className="h-4.5 w-4.5" />
                  </Button>

                  <Button variant="ghost" size="icon" className="rounded-xl text-white hover:bg-white/10">
                    <Settings className="h-4.5 w-4.5" />
                  </Button>
                </div>

              </div>
            </Card>

            {/* Interactive Student Board */}
            <Card className="glass-panel border-white/10 rounded-2xl shadow-xl overflow-hidden">
              <div className="px-5 py-3 border-b border-white/5 bg-white/5 flex items-center justify-between">
                <CardTitle className="text-white text-sm font-bold flex items-center gap-1.5">
                  <PenTool className="h-4 w-4 text-primary" /> Interactive Whiteboard Sketchpad
                </CardTitle>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-muted-foreground mr-1">Choose Brush:</span>
                  <div className="flex items-center gap-1.5">
                    {["#6366f1", "#a855f7", "#10b981", "#eab308"].map(c => (
                      <button 
                        key={c}
                        onClick={() => {
                          setBrushColor(c)
                          setIsEraser(false)
                        }}
                        className={`h-4.5 w-4.5 rounded-full border border-white/10 transition-transform ${brushColor === c && !isEraser ? "scale-125 ring-1 ring-white" : ""}`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                  <span className="h-4 w-[1px] bg-white/10" />
                  <button 
                    onClick={() => setIsEraser(true)} 
                    className={`p-1.5 rounded-md hover:bg-white/5 ${isEraser ? "bg-primary text-white" : "text-muted-foreground"}`}
                    title="Eraser"
                  >
                    <Eraser className="h-4 w-4" />
                  </button>
                  <button onClick={clearCanvas} className="p-1.5 rounded-md hover:bg-white/5 text-red-400" title="Clear All">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="bg-[#0c1222] min-h-[250px] relative cursor-crosshair">
                <canvas
                  ref={canvasRef}
                  width={900}
                  height={250}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  className="w-full h-full block"
                />
              </div>
            </Card>

            {/* Today's Topic Info */}
            <Card className="glass-card border-white/5 rounded-2xl shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-base">Today&apos;s Topic: Quadratic Equations</CardTitle>
                <CardDescription className="text-muted-foreground text-xs">
                  Learning objectives: Understanding standard form (ax² + bx + c = 0), solving by factoring and completing squares.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Student Video Grid */}
            <Card className="glass-panel border-white/10 rounded-2xl shadow-xl">
              <CardHeader className="pb-3 border-b border-white/5">
                <CardTitle className="text-white text-sm font-bold">Class Roster (Attending Live)</CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {students.map((student, idx) => (
                    <div key={idx} className="relative glass-card border-white/5 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs mb-2">
                        {student.initials}
                      </div>
                      
                      <div className="absolute top-2 right-2">
                        {student.status === "muted" && (
                          <span className="h-5 w-5 bg-red-500/25 border border-red-500/30 rounded-full flex items-center justify-center">
                            <MicOff className="h-2.5 w-2.5 text-red-400" />
                          </span>
                        )}
                        {student.status === "hand-raised" && (
                          <span className="h-5 w-5 bg-yellow-500/25 border border-yellow-500/30 rounded-full flex items-center justify-center animate-bounce">
                            <Hand className="h-2.5 w-2.5 text-yellow-400" />
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-semibold truncate max-w-full text-white">{student.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Right: Sidebar Classroom Chat (1 col) */}
          <div className="lg:col-span-1">
            <Card className="glass-panel border-white/10 rounded-2xl shadow-xl h-[650px] flex flex-col">
              <CardHeader className="pb-3 border-b border-white/5">
                <CardTitle className="text-white text-sm font-bold flex items-center gap-1.5">
                  <MessageSquare className="h-4.5 w-4.5 text-primary" /> Class Chat Room
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 p-0 flex flex-col justify-between overflow-hidden">
                <ScrollArea className="flex-1 px-4 py-4 space-y-4">
                  <div className="space-y-4 pb-4">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className="flex flex-col">
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-[10px] font-bold ${msg.isTeacher ? "text-secondary" : "text-primary"}`}>
                            {msg.sender}
                          </span>
                          <span className="text-[9px] text-muted-foreground">{msg.time}</span>
                        </div>
                        <div className={`p-3 rounded-2xl text-xs text-white border ${
                          msg.isTeacher 
                            ? "bg-secondary/5 border-secondary/15 rounded-tl-none" 
                            : "bg-white/5 border-white/5 rounded-tr-none"
                        }`}>
                          <p>{msg.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <form onSubmit={handleSendMessage} className="p-4 border-t border-white/5 bg-black/20 flex gap-2">
                  <Input
                    type="text"
                    placeholder="Ask a question..."
                    value={newMsg}
                    onChange={(e) => setNewMsg(e.target.value)}
                    className="bg-black/30 border-white/5 text-xs py-5 rounded-xl text-white placeholder:text-muted-foreground focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
                  />
                  <Button type="submit" size="icon" className="bg-primary hover:bg-primary-hover rounded-xl shrink-0 shadow-lg glow-indigo">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

        </div>

      </div>
    </div>
  )
}
