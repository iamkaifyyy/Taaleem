"use client"

import type React from "react"
import { Navigation } from "@/components/navigation"
import { useAuth } from "@/context/auth-context"
import { LoginView } from "@/components/login-view"
import { Loader2 } from "lucide-react"

interface LayoutWrapperProps {
  children: React.ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0b1326] text-white">
        <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
        <p className="text-sm text-muted-foreground animate-pulse">Loading Classroom Sessions...</p>
      </div>
    )
  }

  if (!user) {
    return <LoginView />
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />
      <main className="flex-1 w-full">{children}</main>
    </div>
  )
}

