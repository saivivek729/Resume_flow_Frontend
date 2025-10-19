"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataImportModal } from "@/components/data-import-modal"
import { ResumeSuggestionEngine } from "@/components/resume-suggestion-engine"
import { LogOut, Plus, FileText, Award, Upload, Zap, BarChart3 } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
}

interface Achievement {
  id: string
  title: string
  date: string
  type: "certification" | "project" | "award" | "course"
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [resumeData, setResumeData] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)

      const savedAchievements = localStorage.getItem(`achievements_${parsedUser.id}`)
      if (savedAchievements) {
        setAchievements(JSON.parse(savedAchievements))
      }
    }
    setIsLoading(false)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("isAuthenticated")
    router.push("/")
  }

  const handleImportComplete = (importedData: any) => {
    setResumeData(importedData)
    setShowSuggestions(true)

    // Add achievement for import
    const newAchievement: Achievement = {
      id: Math.random().toString(36).substr(2, 9),
      title: "Imported Resume Data",
      date: new Date().toLocaleDateString(),
      type: "project",
    }
    const updatedAchievements = [...achievements, newAchievement]
    setAchievements(updatedAchievements)
    if (user) {
      localStorage.setItem(`achievements_${user.id}`, JSON.stringify(updatedAchievements))
    }
  }

  const handleAddAchievement = (achievement: Achievement) => {
    const updatedAchievements = [...achievements, achievement]
    setAchievements(updatedAchievements)
    if (user) {
      localStorage.setItem(`achievements_${user.id}`, JSON.stringify(updatedAchievements))
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-12 w-12 rounded-lg bg-primary/20"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                <span className="text-sm font-bold text-primary-foreground">CV</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">ResumeFlow</h1>
                <p className="text-xs text-muted-foreground">Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in-up">
          <div className="rounded-xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 p-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Hello, <span className="gradient-text">{user?.name}</span>
            </h2>
            <p className="text-muted-foreground">Welcome back to your resume building journey</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in-up">
          <Link href="/builder">
            <Card className="card-lift cursor-pointer border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Build Resume</h3>
                    <p className="text-xs text-muted-foreground">Create new resume</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Card className="card-lift border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="rounded-lg bg-accent/10 p-3">
                  <Award className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Achievements</h3>
                  <p className="text-xs text-muted-foreground">{achievements.length} total</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="card-lift border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 cursor-pointer"
            onClick={() => setIsImportModalOpen(true)}
          >
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="rounded-lg bg-secondary/10 p-3">
                  <Upload className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Import Data</h3>
                  <p className="text-xs text-muted-foreground">From LinkedIn/Files</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="card-lift border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 cursor-pointer"
            onClick={() => setShowSuggestions(!showSuggestions)}
          >
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">AI Suggestions</h3>
                  <p className="text-xs text-muted-foreground">Smart recommendations</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3 animate-fade-in-up">
          {/* Achievements Section */}
          <div className="lg:col-span-2">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Your Achievements</CardTitle>
                    <CardDescription>Track your professional milestones</CardDescription>
                  </div>
                  <Button size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {achievements.length === 0 ? (
                  <div className="text-center py-8">
                    <Award className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-muted-foreground">No achievements yet</p>
                    <p className="text-sm text-muted-foreground/70">Add your first achievement to get started</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-border/30"
                      >
                        <div className="rounded-lg bg-primary/10 p-2 mt-1">
                          <Award className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{achievement.title}</h4>
                          <p className="text-xs text-muted-foreground">{achievement.date}</p>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                          {achievement.type}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Data Import Section */}
          <div>
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle className="text-lg">Import Data</CardTitle>
                <CardDescription>Auto-populate your resume</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  size="sm"
                  onClick={() => setIsImportModalOpen(true)}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  LinkedIn Profile
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload PDF/File
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  GitHub Profile
                </Button>

                <div className="pt-4 border-t border-border/30">
                  <p className="text-xs text-muted-foreground mb-3">Paste a link to auto-generate resume suggestions</p>
                  <input
                    type="text"
                    placeholder="Paste link here..."
                    className="w-full px-3 py-2 rounded-lg bg-background/50 border border-border/30 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button className="w-full mt-2 btn-interactive" size="sm" onClick={() => setIsImportModalOpen(true)}>
                    <Zap className="h-4 w-4 mr-2" />
                    Generate Suggestions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI Suggestions Section */}
        {showSuggestions && (
          <div className="mt-6 animate-fade-in-up">
            <ResumeSuggestionEngine
              resumeData={resumeData}
              onApplySuggestion={(suggestion) => {
                handleAddAchievement({
                  id: Math.random().toString(36).substr(2, 9),
                  title: `Applied: ${suggestion.title}`,
                  date: new Date().toLocaleDateString(),
                  type: "award",
                })
              }}
            />
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3 animate-fade-in-up">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Resumes</p>
                  <p className="text-2xl font-bold text-foreground">0</p>
                </div>
                <FileText className="h-8 w-8 text-primary/30" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Achievements</p>
                  <p className="text-2xl font-bold text-foreground">{achievements.length}</p>
                </div>
                <Award className="h-8 w-8 text-accent/30" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Profile Strength</p>
                  <p className="text-2xl font-bold text-foreground">45%</p>
                </div>
                <BarChart3 className="h-8 w-8 text-secondary/30" />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Data Import Modal */}
      <DataImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImportComplete={handleImportComplete}
      />
    </div>
  )
}
