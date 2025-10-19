"use client"

import { Button } from "@/components/ui/button"
import { Download, Share2, Mail, Check } from "lucide-react"
import { useState } from "react"

interface ExportShareProps {
  resumeData: {
    fullName: string
    title: string
    email: string
    phone: string
    location: string
    summary: string
    experience: Array<{
      company: string
      position: string
      duration: string
      description: string
    }>
    education: Array<{
      school: string
      degree: string
      year: string
    }>
    certifications: Array<{
      name: string
      issuer: string
      date: string
    }>
    skills: string[]
  }
}

export function ExportShare({ resumeData }: ExportShareProps) {
  const [copied, setCopied] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [shareStatus, setShareStatus] = useState<"idle" | "success" | "error">("idle")

  const handleExportPDF = async () => {
    try {
      setExporting(true)

      const html2pdf = (await import("html2pdf.js")).default

      const element = document.getElementById("resume-preview")
      if (!element) {
        alert("Resume preview not found. Please try again.")
        return
      }

      const clonedElement = element.cloneNode(true) as HTMLElement

      const opt = {
        margin: [10, 10, 10, 10],
        filename: `${resumeData.fullName.replace(/\s+/g, "_")}_Resume.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, allowTaint: true },
        jsPDF: { orientation: "portrait", unit: "mm", format: "a4" },
      }

      await html2pdf().set(opt).from(clonedElement).save()
      setShareStatus("success")
      setTimeout(() => setShareStatus("idle"), 2000)
    } catch (error) {
      console.error("Error exporting PDF:", error)
      setShareStatus("error")
      setTimeout(() => setShareStatus("idle"), 2000)
    } finally {
      setExporting(false)
    }
  }

  const handleShare = async () => {
    const shareText = `Check out my resume! ${resumeData.fullName} - ${resumeData.title}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${resumeData.fullName}'s Resume`,
          text: shareText,
        })
        setShareStatus("success")
        setTimeout(() => setShareStatus("idle"), 2000)
        return
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.log("[v0] Share API failed, falling back to clipboard")
        }
      }
    }

    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(shareText)
      setCopied(true)
      setShareStatus("success")
      setTimeout(() => {
        setCopied(false)
        setShareStatus("idle")
      }, 2000)
    } catch (error) {
      console.error("Error copying to clipboard:", error)
      setShareStatus("error")
      setTimeout(() => setShareStatus("idle"), 2000)
    }
  }

  const handleEmailShare = () => {
    const subject = `${resumeData.fullName}'s Resume`
    const body = `Hi,\n\nPlease find my resume details below:\n\n${resumeData.fullName}\n${resumeData.title}\n\nEmail: ${resumeData.email}\nPhone: ${resumeData.phone}\nLocation: ${resumeData.location}\n\nSummary:\n${resumeData.summary}\n\nBest regards,\n${resumeData.fullName}`

    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoLink
  }

  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        variant="outline"
        className="gap-2 bg-transparent"
        onClick={handleShare}
        title="Share resume or copy to clipboard"
      >
        {copied || shareStatus === "success" ? (
          <>
            <Check className="h-4 w-4" />
            <span className="hidden sm:inline">Copied!</span>
          </>
        ) : (
          <>
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Share</span>
          </>
        )}
      </Button>

      <Button
        size="sm"
        variant="outline"
        className="gap-2 bg-transparent"
        onClick={handleEmailShare}
        title="Send resume via email"
      >
        <Mail className="h-4 w-4" />
        <span className="hidden sm:inline">Email</span>
      </Button>

      <Button
        size="sm"
        className="gap-2 bg-primary hover:bg-primary/90"
        onClick={handleExportPDF}
        disabled={exporting}
        title="Download resume as PDF"
      >
        <Download className="h-4 w-4" />
        <span className="hidden sm:inline">{exporting ? "Exporting..." : "Export PDF"}</span>
      </Button>
    </div>
  )
}
