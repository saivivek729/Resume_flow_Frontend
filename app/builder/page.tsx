"use client"

import { AuthGuard } from "@/components/auth-guard"
import { useState } from "react"
import { ResumeEditor } from "@/components/resume-editor"
import { ResumePreview } from "@/components/resume-preview"
import { TemplateSelector } from "@/components/template-selector"
import { ExportShare } from "@/components/export-share"
import { Button } from "@/components/ui/button"
import { Eye, Edit, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function BuilderPage() {
  const [template, setTemplate] = useState<
    "modern" | "classic" | "minimal" | "professional" | "creative" | "executive" | "custom"
  >("modern")
  const [customTemplateName, setCustomTemplateName] = useState("")

  const [resumeData, setResumeData] = useState({
    fullName: "Alex Johnson",
    title: "Full Stack Developer",
    email: "alex@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    summary:
      "Passionate developer with 5+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud technologies.",
    profileImage: undefined,
    experience: [
      {
        id: "1",
        company: "Tech Innovations Inc",
        companyUrl: "https://techinnovations.com",
        position: "Senior Developer",
        duration: "2022 - Present",
        description: "Led development of microservices architecture, improved performance by 40%",
      },
    ],
    education: [
      {
        id: "1",
        school: "University of Technology",
        degree: "B.S. Computer Science",
        year: "2020",
      },
    ],
    certifications: [
      {
        id: "1",
        name: "AWS Certified Solutions Architect",
        issuer: "Amazon Web Services",
        date: "Jan 2024",
        certificateUrl: "https://example.com/certificate",
      },
    ],
    skills: ["React", "TypeScript", "Node.js", "Next.js", "PostgreSQL", "AWS", "Docker", "GraphQL"],
    customSections: [],
  })

  const [viewMode, setViewMode] = useState<"split" | "preview" | "edit">("split")

  const handleCustomTemplateCreate = (name: string) => {
    setCustomTemplateName(name)
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                    <span className="text-sm font-bold text-primary-foreground">CV</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-foreground">ResumeFlow</h1>
                    <p className="text-xs text-muted-foreground">Resume Builder</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "split" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("split")}
                  className="hidden sm:flex"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Split View
                </Button>
                <Button
                  variant={viewMode === "preview" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("preview")}
                  className="hidden sm:flex"
                >
                  Preview
                </Button>
                <Button
                  variant={viewMode === "edit" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("edit")}
                  className="hidden sm:flex"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <ExportShare resumeData={resumeData} />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Template Selector */}
          <div className="mb-8 animate-fade-in-up">
            <TemplateSelector
              selectedTemplate={template}
              onTemplateChange={setTemplate}
              customTemplateName={customTemplateName}
              onCustomTemplateCreate={handleCustomTemplateCreate}
            />
          </div>

          {/* Content Area */}
          <div className="grid gap-6">
            {viewMode === "split" && (
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="animate-slide-in-right">
                  <ResumeEditor resumeData={resumeData} onDataChange={setResumeData} />
                </div>
                <div className="animate-fade-in-up" id="resume-preview">
                  <ResumePreview template={template} resumeData={resumeData} />
                </div>
              </div>
            )}

            {viewMode === "preview" && (
              <div className="animate-fade-in-up" id="resume-preview">
                <ResumePreview template={template} resumeData={resumeData} />
              </div>
            )}

            {viewMode === "edit" && (
              <div className="animate-slide-in-right">
                <ResumeEditor resumeData={resumeData} onDataChange={setResumeData} />
              </div>
            )}
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
