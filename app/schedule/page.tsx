"use client"

import React, { useState } from "react"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Video, Users, Bell, BellOff, ArrowRight } from "lucide-react"

export default function SchedulePage() {
  const [activeDay, setActiveDay] = useState("Mon")
  const [reminders, setReminders] = useState<number[]>([])

  const weekdays = [
    { label: "Monday", value: "Mon" },
    { label: "Tuesday", value: "Tue" },
    { label: "Wednesday", value: "Wed" },
    { label: "Thursday", value: "Thu" },
    { label: "Friday", value: "Fri" }
  ]

  const scheduleData: Record<string, any[]> = {
    Mon: [
      { id: 1, subject: "Mathematics - Algebra", time: "10:00 AM - 11:00 AM", teacher: "Mrs. Priya Sharma", status: "completed" },
      { id: 2, subject: "Science - Physics", time: "02:00 PM - 03:00 PM", teacher: "Mr. Rajesh Kumar", status: "live" },
      { id: 3, subject: "English - Literature", time: "04:00 PM - 05:00 PM", teacher: "Ms. Shalini Gupta", status: "upcoming" }
    ],
    Tue: [
      { id: 4, subject: "Social Science - Civics", time: "10:00 AM - 11:00 AM", teacher: "Mr. Arjun Singh", status: "upcoming" },
      { id: 5, subject: "Mathematics - Geometry", time: "11:30 AM - 12:30 PM", teacher: "Mrs. Priya Sharma", status: "upcoming" },
      { id: 6, subject: "Science - Chemistry", time: "02:00 PM - 03:00 PM", teacher: "Mr. Rajesh Kumar", status: "upcoming" }
    ],
    Wed: [
      { id: 7, subject: "Hindi - Grammar", time: "09:30 AM - 10:30 AM", teacher: "Mrs. Sunita Devi", status: "upcoming" },
      { id: 8, subject: "Science - Biology", time: "02:00 PM - 03:00 PM", teacher: "Dr. Kavita Patel", status: "upcoming" },
      { id: 9, subject: "Physical Education", time: "03:30 PM - 04:30 PM", teacher: "Mr. Gurpreet Singh", status: "upcoming" }
    ],
    Thu: [
      { id: 10, subject: "Mathematics - Algebra", time: "10:00 AM - 11:00 AM", teacher: "Mrs. Priya Sharma", status: "upcoming" },
      { id: 11, subject: "English - Vocabulary", time: "11:30 AM - 12:30 PM", teacher: "Ms. Shalini Gupta", status: "upcoming" },
      { id: 12, subject: "Science - Physics Lab", time: "02:00 PM - 03:30 PM", teacher: "Mr. Rajesh Kumar", status: "upcoming" }
    ],
    Fri: [
      { id: 13, subject: "Social Science - History", time: "10:00 AM - 11:00 AM", teacher: "Mr. Arjun Singh", status: "upcoming" },
      { id: 14, subject: "Science - Biology Lab", time: "02:00 PM - 03:30 PM", teacher: "Dr. Kavita Patel", status: "upcoming" },
      { id: 15, subject: "Weekly Quiz & Review", time: "04:00 PM - 05:00 PM", teacher: "All Mentors", status: "upcoming" }
    ]
  }

  const toggleReminder = (id: number) => {
    setReminders(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-[#0b1326] py-8 text-white relative">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 blur-[150px] pointer-events-none" />
        
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Class Schedule</h2>
            <p className="text-muted-foreground text-sm mt-1">Manage your study hours and join live classes</p>
          </div>

          {/* Weekday Tab Switcher */}
          <div className="flex bg-black/40 border border-white/5 rounded-2xl p-1.5 mb-6 overflow-x-auto no-scrollbar">
            {weekdays.map((day) => (
              <button
                key={day.value}
                onClick={() => setActiveDay(day.value)}
                className={`flex-1 py-3 px-4 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                  activeDay === day.value
                    ? "bg-primary text-white shadow-md shadow-indigo-500/20"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                {day.label}
              </button>
            ))}
          </div>

          {/* Schedule List */}
          <Card className="glass-panel border-white/10 rounded-2xl shadow-xl">
            <CardHeader className="pb-3 border-b border-white/5">
              <CardTitle className="text-white text-base font-bold">
                Timetable for {weekdays.find(d => d.value === activeDay)?.label}
              </CardTitle>
              <CardDescription className="text-muted-foreground text-xs">
                Make sure to join live classes on time
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {scheduleData[activeDay]?.map((slot) => (
                <div
                  key={slot.id}
                  className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 border rounded-2xl transition-all gap-4 relative overflow-hidden ${
                    slot.status === "live" 
                      ? "border-primary bg-primary/5 shadow-md shadow-indigo-500/5" 
                      : "border-white/5 bg-white/5"
                  }`}
                >
                  {slot.status === "live" && (
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-2xl pointer-events-none" />
                  )}

                  <div className="flex items-start sm:items-center gap-4">
                    <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${
                      slot.status === "live" ? "bg-primary/20 text-primary" : 
                      slot.status === "completed" ? "bg-emerald-500/10 text-emerald-400" :
                      "bg-white/5 text-muted-foreground border border-white/10"
                    }`}>
                      <Video className="h-5.5 w-5.5" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-white text-sm">{slot.subject}</h4>
                        {slot.status === "live" ? (
                          <Badge className="bg-secondary text-white border-none text-[9px] font-extrabold uppercase animate-pulse">Live Now</Badge>
                        ) : slot.status === "completed" ? (
                          <Badge className="bg-emerald-500/10 text-emerald-400 border-none text-[9px] font-semibold">Done</Badge>
                        ) : (
                          <Badge className="bg-white/5 border-white/10 text-muted-foreground text-[9px] font-medium">Upcoming</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground flex items-center gap-3">
                        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {slot.time}</span>
                        <span>•</span>
                        <span>{slot.teacher}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 w-full sm:w-auto mt-2 sm:mt-0">
                    {slot.status === "live" ? (
                      <Button className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:brightness-110 shadow-lg px-5 text-xs py-5">
                        Join Class <ArrowRight className="h-4 w-4 ml-1.5" />
                      </Button>
                    ) : slot.status === "completed" ? (
                      <Button size="sm" variant="ghost" className="w-full sm:w-auto text-muted-foreground text-xs rounded-xl pointer-events-none">
                        Completed
                      </Button>
                    ) : (
                      <Button
                        onClick={() => toggleReminder(slot.id)}
                        variant="ghost"
                        size="sm"
                        className={`w-full sm:w-auto gap-2 border border-white/5 rounded-xl text-xs py-5 hover:bg-white/5 ${
                          reminders.includes(slot.id) 
                            ? "text-primary bg-primary/10 border-primary/20" 
                            : "text-muted-foreground"
                        }`}
                      >
                        {reminders.includes(slot.id) ? (
                          <>
                            <Bell className="h-4 w-4" /> Reminder Set
                          </>
                        ) : (
                          <>
                            <BellOff className="h-4 w-4" /> Remind Me
                          </>
                        )}
                      </Button>
                    )}
                  </div>

                </div>
              ))}
            </CardContent>
          </Card>

        </div>
      </div>
    </LayoutWrapper>
  )
}
