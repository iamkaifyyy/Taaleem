"use client"

import React, { useState } from "react"
import { useAuth } from "@/context/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, KeyRound, Mail, Sparkles, Loader2 } from "lucide-react"

export function LoginView() {
  const { login } = useAuth()
  const [email, setEmail] = useState("rajesh.kumar@student.nabha.edu")
  const [password, setPassword] = useState("password123")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!email || !password) {
      setError("Please enter both email and password")
      return
    }
    setLoading(true)
    try {
      await login(email)
    } catch (err) {
      setError("Invalid credentials. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0b1326] px-4">
      {/* Background Decorative Neon Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-secondary/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-indigo-500/5 blur-[80px] pointer-events-none" />

      {/* Main Login Card Container */}
      <div className="w-full max-w-md z-10">
        <Card className="glass-panel border-white/10 shadow-2xl relative overflow-hidden">
          {/* Top Decorative Luminous Border */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          
          <CardHeader className="space-y-2 text-center pt-8">
            <div className="mx-auto h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg relative glow-indigo mb-2">
              <BookOpen className="h-6 w-6 text-white" />
              <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-300 animate-pulse" />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight text-white">
              Digital Learning Platform
            </CardTitle>
            <CardDescription className="text-muted-foreground text-sm">
              Nabha Rural Schools • Student Portal
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-2">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-destructive/15 border border-destructive/20 text-destructive text-xs text-center font-medium">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Student Email / ID
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="student@nabha.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-black/30 border-white/5 focus:border-primary/50 focus:ring-primary/20 transition-all text-sm rounded-lg text-white"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-black/30 border-white/5 focus:border-primary/50 focus:ring-primary/20 transition-all text-sm rounded-lg text-white"
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-secondary text-white font-medium shadow-md hover:brightness-110 active:scale-[0.98] transition-all py-6 rounded-lg mt-4 flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In to Classroom"
                )}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-2 pb-8 border-t border-white/5 pt-4 text-center">
            <span className="text-xs text-muted-foreground/80">
              Demo Credentials:
            </span>
            <div className="text-[11px] text-muted-foreground bg-white/5 px-3 py-1.5 rounded-md font-mono select-all">
              Email: rajesh.kumar@student.nabha.edu
              <br />
              Password: password123
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
