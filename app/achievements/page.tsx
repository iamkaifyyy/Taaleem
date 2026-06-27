"use client"

import React, { useState } from "react"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Award, Trophy, Star, Sparkles, Share2, 
  Crown, CheckCircle, ArrowRight, Gift 
} from "lucide-react"

export default function AchievementsPage() {
  const [points, setPoints] = useState(2450)
  const [claimedReward, setClaimedReward] = useState(false)
  const [sharingBadge, setSharingBadge] = useState<string | null>(null)

  const badges = [
    { id: "b1", title: "Quick Learner", desc: "Watched 5 recorded lectures in a week", icon: Sparkles, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
    { id: "b2", title: "Perfect Attendance", desc: "Attended all live classes this month", icon: CheckCircle, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    { id: "b3", title: "Math Wizard", desc: "Scored 10/10 on 3 Algebra assignments", icon: Crown, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
    { id: "b4", title: "Punctual Student", desc: "Joined live classes within first 2 minutes", icon: Star, color: "text-purple-400 bg-purple-500/10 border-purple-500/20" }
  ]

  const leaderboard = [
    { rank: 1, name: "Priya Singh", points: 2600, avatar: "PS", isUser: false },
    { rank: 2, name: "Rajesh Kumar", points: 2450, avatar: "RK", isUser: true },
    { rank: 3, name: "Neha Gupta", points: 2300, avatar: "NG", isUser: false },
    { rank: 4, name: "Amit Sharma", points: 2150, avatar: "AS", isUser: false },
    { rank: 5, name: "Kavya Patel", points: 2000, avatar: "KP", isUser: false }
  ]

  const handleClaimPoints = () => {
    if (claimedReward) return
    setPoints(prev => prev + 100)
    setClaimedReward(true)
  }

  const handleShare = (badgeTitle: string) => {
    setSharingBadge(badgeTitle)
    setTimeout(() => {
      setSharingBadge(null)
    }, 2000)
  }

  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-[#0b1326] py-8 text-white relative">
        {/* Glows */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-secondary/5 blur-[150px] pointer-events-none" />

        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Achievements & Leaderboard</h2>
            <p className="text-muted-foreground text-sm mt-1">Unlock badges, earn points, and climb your school rank</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            
            {/* Points card */}
            <Card className="glass-panel border-white/10 rounded-2xl shadow-xl lg:col-span-2 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl pointer-events-none" />
              
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-base font-bold flex items-center gap-1.5">
                  <Award className="h-5 w-5 text-secondary" /> Learning Points Balance
                </CardTitle>
                <CardDescription className="text-muted-foreground text-xs">
                  Points earned by watching lectures and submitting homework on time
                </CardDescription>
              </CardHeader>

              <CardContent className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <span className="text-[10px] text-muted-foreground font-extrabold uppercase tracking-widest bg-white/5 border border-white/10 rounded-full px-3 py-1">
                    Student Account
                  </span>
                  <div className="text-5xl font-black text-white tracking-tight mt-3 flex items-baseline gap-2">
                    {points} <span className="text-xs text-muted-foreground font-semibold">PTS</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Rank #2 in Class 10-A • 150 points away from Rank #1
                  </p>
                </div>

                <div className="border border-white/10 rounded-2xl p-5 bg-white/5 flex flex-col justify-center items-center text-center max-w-[200px] shrink-0">
                  <Gift className="h-8 w-8 text-secondary mb-2 animate-bounce" />
                  <p className="text-xs font-bold text-white mb-1">Weekly Reward</p>
                  <p className="text-[10px] text-muted-foreground mb-3">Claim 100 points for perfect attendance</p>
                  
                  <Button 
                    onClick={handleClaimPoints}
                    disabled={claimedReward}
                    className={`w-full text-[10px] font-bold rounded-lg ${
                      claimedReward 
                        ? "bg-emerald-500/20 text-emerald-400 border-none cursor-default" 
                        : "bg-primary text-white hover:brightness-110 shadow-md shadow-indigo-500/20"
                    }`}
                  >
                    {claimedReward ? "Claimed ✓" : "Claim points"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Rank Card */}
            <Card className="glass-card border-white/5 rounded-2xl shadow-lg relative overflow-hidden flex flex-col justify-center items-center text-center p-6">
              <div className="h-16 w-16 bg-yellow-500/10 rounded-full flex items-center justify-center text-yellow-400 mb-4 border border-yellow-500/20 shadow-inner animate-pulse-glow">
                <Trophy className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-white">Global Rank #2</h3>
              <p className="text-xs text-muted-foreground mt-1 max-w-[200px]">
                You are currently in the top 5% of your class group in Nabha Schools!
              </p>
            </Card>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Badges Grid (2 cols) */}
            <section className="lg:col-span-2">
              <Card className="glass-panel border-white/10 rounded-2xl shadow-xl">
                <CardHeader className="pb-3 border-b border-white/5">
                  <CardTitle className="text-white text-sm font-bold flex items-center gap-1.5">
                    <Sparkles className="h-4.5 w-4.5 text-primary" /> Unlocked Badges
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {badges.map((badge) => (
                      <div
                        key={badge.id}
                        className="glass-card border-white/5 rounded-2xl p-4 flex gap-4 hover:border-primary/20 hover:shadow-lg transition-all group relative"
                      >
                        <div className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 border ${badge.color}`}>
                          <badge.icon className="h-5.5 w-5.5" />
                        </div>
                        
                        <div className="space-y-1 pr-6">
                          <h4 className="font-bold text-white text-sm">{badge.title}</h4>
                          <p className="text-xs text-muted-foreground leading-snug">{badge.desc}</p>
                        </div>

                        <button 
                          onClick={() => handleShare(badge.title)}
                          className="absolute top-4 right-4 text-muted-foreground hover:text-white transition-colors"
                          title="Share Badge"
                        >
                          <Share2 className="h-4 w-4" />
                        </button>

                        {sharingBadge === badge.title && (
                          <div className="absolute inset-0 bg-[#0f172a]/95 backdrop-blur-sm rounded-2xl flex items-center justify-center text-xs font-bold text-emerald-400">
                            Badge link copied to clipboard!
                          </div>
                        )}

                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Leaderboard (1 col) */}
            <section className="lg:col-span-1">
              <Card className="glass-panel border-white/10 rounded-2xl shadow-xl">
                <CardHeader className="pb-3 border-b border-white/5">
                  <CardTitle className="text-white text-sm font-bold flex items-center gap-1.5">
                    <Crown className="h-4.5 w-4.5 text-yellow-500 animate-bounce" /> Class Leaderboard
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                  {leaderboard.map((student) => (
                    <div
                      key={student.rank}
                      className={`flex items-center justify-between p-3 rounded-xl border ${
                        student.isUser 
                          ? "bg-primary/10 border-primary/20" 
                          : "bg-white/5 border-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-bold w-4 ${
                          student.rank === 1 ? "text-yellow-400" :
                          student.rank === 2 ? "text-slate-300" :
                          "text-muted-foreground"
                        }`}>
                          #{student.rank}
                        </span>

                        <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          student.isUser ? "bg-primary text-white" : "bg-white/5 text-muted-foreground border border-white/10"
                        }`}>
                          {student.avatar}
                        </div>

                        <span className="text-xs font-bold text-white">{student.name}</span>
                      </div>

                      <span className="text-xs font-black text-muted-foreground">
                        <span className="text-white">{student.points}</span> pts
                      </span>

                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

          </div>

        </div>
      </div>
    </LayoutWrapper>
  )
}
