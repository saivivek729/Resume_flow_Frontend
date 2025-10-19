"use client"
import { Card } from "@/components/ui/card"
import { Sparkles, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface TemplateSelectorProps {
  selectedTemplate: "modern" | "classic" | "minimal" | "professional" | "creative" | "executive" | "custom"
  onTemplateChange: (
    template: "modern" | "classic" | "minimal" | "professional" | "creative" | "executive" | "custom",
  ) => void
  customTemplateName?: string
  onCustomTemplateCreate?: (name: string) => void
}

export function TemplateSelector({
  selectedTemplate,
  onTemplateChange,
  customTemplateName,
  onCustomTemplateCreate,
}: TemplateSelectorProps) {
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [customName, setCustomName] = useState(customTemplateName || "")

  const templates = [
    {
      id: "modern",
      name: "Modern",
      description: "Contemporary design with vibrant accents",
      preview: "✨",
    },
    {
      id: "classic",
      name: "Classic",
      description: "Timeless professional layout",
      preview: "📋",
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Clean and distraction-free",
      preview: "◻️",
    },
    {
      id: "professional",
      name: "Professional",
      description: "Corporate with profile image",
      preview: "💼",
    },
    {
      id: "creative",
      name: "Creative",
      description: "Bold and colorful design",
      preview: "🎨",
    },
    {
      id: "executive",
      name: "Executive",
      description: "Sidebar layout for leaders",
      preview: "👔",
    },
  ]

  const handleCreateCustom = () => {
    if (customName.trim()) {
      onCustomTemplateCreate?.(customName)
      onTemplateChange("custom")
      setShowCustomInput(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-accent" />
        <h2 className="text-lg font-semibold text-foreground">Choose Your Template</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {templates.map((tmpl) => (
          <Card
            key={tmpl.id}
            className={`cursor-pointer transition-all duration-300 ${
              selectedTemplate === tmpl.id
                ? "border-primary bg-primary/5 ring-2 ring-primary"
                : "border-border hover:border-primary/50 hover:bg-muted/50"
            }`}
            onClick={() => onTemplateChange(tmpl.id as any)}
          >
            <div className="p-4 text-center">
              <div className="mb-2 text-3xl">{tmpl.preview}</div>
              <h3 className="text-sm font-semibold text-foreground">{tmpl.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{tmpl.description}</p>
              {selectedTemplate === tmpl.id && (
                <div className="mt-2 inline-block rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                  Active
                </div>
              )}
            </div>
          </Card>
        ))}

        <Card
          className={`cursor-pointer transition-all duration-300 ${
            selectedTemplate === "custom"
              ? "border-primary bg-primary/5 ring-2 ring-primary"
              : "border-border hover:border-primary/50 hover:bg-muted/50"
          }`}
          onClick={() => setShowCustomInput(!showCustomInput)}
        >
          <div className="p-4 text-center">
            <div className="mb-2 text-3xl">⚙️</div>
            <h3 className="text-sm font-semibold text-foreground">Custom</h3>
            <p className="mt-1 text-xs text-muted-foreground">Create your own</p>
            {selectedTemplate === "custom" && (
              <div className="mt-2 inline-block rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                Active
              </div>
            )}
          </div>
        </Card>
      </div>

      {showCustomInput && (
        <Card className="border-primary/50 bg-primary/5 p-4">
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Custom Template Name</label>
            <div className="flex gap-2">
              <Input
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="e.g., My Professional Template"
                className="bg-input"
              />
              <Button onClick={handleCreateCustom} className="gap-2">
                <Plus className="h-4 w-4" />
                Create
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
