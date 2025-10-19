"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, LinkIcon, FileText, Loader2, CheckCircle, AlertCircle } from "lucide-react"

interface ImportedData {
  fullName?: string
  title?: string
  email?: string
  phone?: string
  location?: string
  summary?: string
  experience?: Array<{
    company: string
    position: string
    duration: string
    description: string
  }>
  education?: Array<{
    school: string
    degree: string
    year: string
  }>
  skills?: string[]
}

interface DataImportModalProps {
  onImportComplete: (data: ImportedData) => void
  isOpen: boolean
  onClose: () => void
}

export function DataImportModal({ onImportComplete, isOpen, onClose }: DataImportModalProps) {
  const [importUrl, setImportUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [importStatus, setImportStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [importedData, setImportedData] = useState<ImportedData | null>(null)

  const handleImportFromUrl = async () => {
    if (!importUrl.trim()) {
      setImportStatus("error")
      return
    }

    setIsLoading(true)
    setImportStatus("loading")

    try {
      // Simulate API call to parse LinkedIn/file data
      // In production, this would call your backend API
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock data extraction based on URL
      const mockData: ImportedData = {
        fullName: "John Doe",
        title: "Senior Software Engineer",
        email: "john@example.com",
        phone: "+1 (555) 987-6543",
        location: "San Francisco, CA",
        summary:
          "Experienced software engineer with 8+ years in full-stack development. Specialized in cloud architecture and team leadership.",
        experience: [
          {
            company: "Tech Corp",
            position: "Senior Engineer",
            duration: "2021 - Present",
            description: "Led team of 5 engineers, architected microservices platform",
          },
          {
            company: "StartUp Inc",
            position: "Full Stack Developer",
            duration: "2018 - 2021",
            description: "Built and maintained 15+ production applications",
          },
        ],
        education: [
          {
            school: "State University",
            degree: "B.S. Computer Science",
            year: "2016",
          },
        ],
        skills: ["React", "Node.js", "TypeScript", "AWS", "Docker", "PostgreSQL", "GraphQL", "Python"],
      }

      setImportedData(mockData)
      setImportStatus("success")
    } catch (error) {
      setImportStatus("error")
    } finally {
      setIsLoading(false)
    }
  }

  const handleConfirmImport = () => {
    if (importedData) {
      onImportComplete(importedData)
      setImportUrl("")
      setImportStatus("idle")
      setImportedData(null)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-border/50 bg-card/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Import Resume Data</CardTitle>
          <CardDescription>
            Paste a link to auto-populate your resume with data from LinkedIn, GitHub, or uploaded files
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Import Methods */}
          <div className="grid sm:grid-cols-3 gap-3">
            <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4 bg-transparent">
              <LinkIcon className="h-5 w-5" />
              <span className="text-xs">LinkedIn</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4 bg-transparent">
              <FileText className="h-5 w-5" />
              <span className="text-xs">Upload File</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4 bg-transparent">
              <Upload className="h-5 w-5" />
              <span className="text-xs">GitHub</span>
            </Button>
          </div>

          {/* URL Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Paste Link</label>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="https://linkedin.com/in/yourprofile or paste file content..."
                value={importUrl}
                onChange={(e) => setImportUrl(e.target.value)}
                disabled={isLoading}
                className="input-focus"
              />
              <Button onClick={handleImportFromUrl} disabled={isLoading || !importUrl.trim()}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Parsing...
                  </>
                ) : (
                  "Parse"
                )}
              </Button>
            </div>
          </div>

          {/* Status Messages */}
          {importStatus === "success" && importedData && (
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium text-green-700 dark:text-green-400">Data imported successfully!</p>
                  <p className="text-sm text-green-600 dark:text-green-300">Review the extracted information below</p>
                </div>
              </div>

              {/* Preview of Imported Data */}
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {importedData.fullName && (
                  <div className="p-3 rounded-lg bg-background/50 border border-border/30">
                    <p className="text-xs text-muted-foreground">Name</p>
                    <p className="font-medium text-foreground">{importedData.fullName}</p>
                  </div>
                )}
                {importedData.title && (
                  <div className="p-3 rounded-lg bg-background/50 border border-border/30">
                    <p className="text-xs text-muted-foreground">Title</p>
                    <p className="font-medium text-foreground">{importedData.title}</p>
                  </div>
                )}
                {importedData.skills && importedData.skills.length > 0 && (
                  <div className="p-3 rounded-lg bg-background/50 border border-border/30">
                    <p className="text-xs text-muted-foreground mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {importedData.skills.slice(0, 5).map((skill) => (
                        <span key={skill} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                          {skill}
                        </span>
                      ))}
                      {importedData.skills.length > 5 && (
                        <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                          +{importedData.skills.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button onClick={handleConfirmImport} className="flex-1 btn-interactive">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Import Data
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setImportStatus("idle")
                    setImportedData(null)
                    setImportUrl("")
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {importStatus === "error" && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
              <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
              <div>
                <p className="font-medium text-destructive">Import failed</p>
                <p className="text-sm text-destructive/80">Please check the URL and try again</p>
              </div>
            </div>
          )}

          {/* Close Button */}
          {importStatus !== "success" && (
            <Button variant="outline" onClick={onClose} className="w-full bg-transparent">
              Close
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
