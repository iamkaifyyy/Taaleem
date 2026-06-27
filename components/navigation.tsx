"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BookOpen, Video, PlayCircle, Calendar, Award, Settings, User, LogOut, Bell, Home, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/context/auth-context"

const navigationItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Live Classes",
    href: "/live-classes",
    icon: Video,
  },
  {
    title: "Recorded Lectures",
    href: "/recorded-lectures",
    icon: PlayCircle,
  },
  {
    title: "Schedule",
    href: "/schedule",
    icon: Calendar,
  },
  {
    title: "Assignments",
    href: "/assignments",
    icon: BookOpen,
  },
  {
    title: "Achievements",
    href: "/achievements",
    icon: Award,
  },
]

export function Navigation() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  // Get initials for Avatar Fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0b1326]/80 backdrop-blur-md supports-[backdrop-filter]:bg-[#0b1326]/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-all duration-200">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-sm font-bold text-white tracking-wide">Digital Learning</h1>
                <p className="text-[10px] text-muted-foreground uppercase font-semibold tracking-widest">Nabha Rural Schools</p>
              </div>
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "gap-2 text-muted-foreground rounded-lg hover:text-white hover:bg-white/5 transition-all",
                      isActive && "bg-primary/10 text-white border-b-2 border-primary rounded-none hover:bg-primary/15"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.title}
                  </Button>
                </Link>
              )
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-white rounded-xl hover:bg-white/5">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[9px] bg-secondary text-white border-none shadow-md shadow-purple-500/20">
                3
              </Badge>
            </Button>

            {/* Class Info */}
            {user && (
              <div className="hidden sm:flex items-center gap-2">
                <Badge variant="outline" className="gap-1 border-white/10 bg-white/5 text-muted-foreground px-2.5 py-1">
                  <Users className="h-3 w-3 text-secondary" />
                  {user.classGroup}
                </Badge>
              </div>
            )}

            {/* User Menu */}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full border border-white/10 hover:border-white/20 p-0 overflow-hidden shadow-inner">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg" alt={user.name} />
                      <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-[#131b2e] border-white/10 text-white" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-white">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/5" />
                  <DropdownMenuItem className="hover:bg-white/5 cursor-pointer">
                    <User className="mr-2 h-4 w-4 text-primary" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-white/5 cursor-pointer">
                    <Settings className="mr-2 h-4 w-4 text-secondary" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/5" />
                  <DropdownMenuItem className="hover:bg-white/5 cursor-pointer text-red-400 focus:text-red-400 focus:bg-red-500/10" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-white/5 py-2">
          <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "gap-2 whitespace-nowrap text-muted-foreground rounded-lg hover:text-white hover:bg-white/5",
                      isActive && "bg-primary/10 text-white font-medium"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.title}
                  </Button>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}
