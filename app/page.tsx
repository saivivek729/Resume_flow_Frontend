"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Shield, Sparkles } from "lucide-react"

export default function LandingPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"
    if (isAuthenticated) {
      router.push("/dashboard")
    }
    setIsLoading(false)
  }, [router])

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
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                <span className="text-sm font-bold text-primary-foreground">CV</span>
              </div>
              <h1 className="text-xl font-bold text-foreground">ResumeFlow</h1>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => router.push("/auth/login")}>
                Sign In
              </Button>
              <Button onClick={() => router.push("/auth/register")}>
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Build Your Perfect <span className="gradient-text">Resume</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Next-generation resume builder that automatically generates verified resumes based on your real achievements
            from internships, courses, hackathons, and projects.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" onClick={() => router.push("/auth/register")} className="btn-interactive">
              Start Building
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm card-lift">
              <Zap className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">AI-Powered</h3>
              <p className="text-sm text-muted-foreground">Smart suggestions and auto-generation based on your data</p>
            </div>

            <div className="p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm card-lift">
              <Shield className="h-8 w-8 text-accent mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Verified Data</h3>
              <p className="text-sm text-muted-foreground">
                Automatically verified achievements from trusted platforms
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm card-lift">
              <Sparkles className="h-8 w-8 text-secondary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Beautiful Templates</h3>
              <p className="text-sm text-muted-foreground">7 professional templates to showcase your best self</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
