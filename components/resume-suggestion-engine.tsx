"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, CheckCircle } from "lucide-react"

interface ResumeSuggestion {
  id: string
  title: string
  description: string
  impact: "high" | "medium" | "low"
  category: "content" | "formatting" | "skills" | "experience"
  suggestion: string
}

interface ResumeSuggestionEngineProps {
  resumeData: any
  onApplySuggestion: (suggestion: ResumeSuggestion) => void
}

export function ResumeSuggestionEngine({ resumeData, onApplySuggestion }: ResumeSuggestionEngineProps) {
  const [suggestions, setSuggestions] = useState<ResumeSuggestion[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [appliedSuggestions, setAppliedSuggestions] = useState<string[]>([])

  const generateSuggestions = async () => {
    setIsGenerating(true)

    try {
      // Simulate AI analysis
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const mockSuggestions: ResumeSuggestion[] = [
        {
          id: "1",
          title: "Add Quantifiable Metrics",
          description: "Your experience descriptions lack specific metrics and achievements",
          impact: "high",
          category: "content",
          suggestion:
            "Add numbers to your achievements: 'Improved performance by 40%', 'Led team of 5 engineers', 'Reduced costs by $50K'",
        },
        {
          id: "2",
          title: "Enhance Summary",
          description: "Your professional summary could be more compelling",
          impact: "high",
          category: "content",
          suggestion:
            "Include specific technologies and years of experience. Example: 'Full-stack developer with 8+ years specializing in React and Node.js'",
        },
        {
          id: "3",
          title: "Add More Skills",
          description: "Consider adding more technical skills to improve ATS compatibility",
          impact: "medium",
          category: "skills",
          suggestion: "Add: Cloud platforms (AWS, GCP), CI/CD tools, Testing frameworks",
        },
        {
          id: "4",
          title: "Improve Formatting",
          description: "Use consistent date formats and bullet point structure",
          impact: "medium",
          category: "formatting",
          suggestion: "Standardize dates to 'Month Year - Month Year' format throughout",
        },
        {
          id: "5",
          title: "Add Certifications",
          description: "Include relevant professional certifications",
          impact: "low",
          category: "experience",
          suggestion: "Add AWS, Google Cloud, or industry-specific certifications",
        },
      ]

      setSuggestions(mockSuggestions)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleApplySuggestion = (suggestion: ResumeSuggestion) => {
    setAppliedSuggestions([...appliedSuggestions, suggestion.id])
    onApplySuggestion(suggestion)
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20"
      case "medium":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20"
      case "low":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20"
      default:
        return ""
    }
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              AI Resume Suggestions
            </CardTitle>
            <CardDescription>Get personalized recommendations to improve your resume</CardDescription>
          </div>
          <Button onClick={generateSuggestions} disabled={isGenerating} className="btn-interactive">
            {isGenerating ? "Analyzing..." : "Generate Suggestions"}
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {suggestions.length === 0 ? (
          <div className="text-center py-8">
            <Zap className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">Click "Generate Suggestions" to get AI-powered recommendations</p>
          </div>
        ) : (
          <div className="space-y-3">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className={`p-4 rounded-lg border ${getImpactColor(suggestion.impact)} transition-all`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{suggestion.title}</h4>
                      <span className="text-xs px-2 py-1 rounded-full bg-background/50 border border-border/30">
                        {suggestion.impact}
                      </span>
                    </div>
                    <p className="text-sm mb-2">{suggestion.description}</p>
                    <p className="text-xs opacity-80 italic">{suggestion.suggestion}</p>
                  </div>
                  {appliedSuggestions.includes(suggestion.id) ? (
                    <div className="flex items-center gap-1 text-xs font-medium">
                      <CheckCircle className="h-4 w-4" />
                      Applied
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleApplySuggestion(suggestion)}
                      className="whitespace-nowrap"
                    >
                      Apply
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
