"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, GripVertical, Upload, LinkIcon } from "lucide-react"
import { ImageCropper } from "./image-cropper"

interface ResumeData {
  fullName: string
  title: string
  email: string
  phone: string
  location: string
  summary: string
  profileImage?: string
  experience: Array<{
    id: string
    company: string
    companyUrl?: string
    position: string
    duration: string
    description: string
  }>
  education: Array<{
    id: string
    school: string
    degree: string
    year: string
  }>
  certifications: Array<{
    id: string
    name: string
    issuer: string
    date: string
    certificateUrl?: string
  }>
  skills: string[]
  customSections: Array<{
    id: string
    title: string
    content: string
  }>
}

interface ResumeEditorProps {
  resumeData: ResumeData
  onDataChange: (data: ResumeData) => void
}

export function ResumeEditor({ resumeData, onDataChange }: ResumeEditorProps) {
  const [newSkill, setNewSkill] = useState("")
  const [showCropper, setShowCropper] = useState(false)
  const [tempImage, setTempImage] = useState<string>("")

  const updateField = (field: keyof ResumeData, value: any) => {
    onDataChange({ ...resumeData, [field]: value })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setTempImage(event.target?.result as string)
        setShowCropper(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCropComplete = (croppedImage: string) => {
    updateField("profileImage", croppedImage)
    setShowCropper(false)
    setTempImage("")
  }

  const addSkill = () => {
    if (newSkill.trim()) {
      updateField("skills", [...resumeData.skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (index: number) => {
    updateField(
      "skills",
      resumeData.skills.filter((_, i) => i !== index),
    )
  }

  const addExperience = () => {
    updateField("experience", [
      ...resumeData.experience,
      {
        id: Date.now().toString(),
        company: "",
        companyUrl: "",
        position: "",
        duration: "",
        description: "",
      },
    ])
  }

  const updateExperience = (id: string, field: string, value: string) => {
    updateField(
      "experience",
      resumeData.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    )
  }

  const removeExperience = (id: string) => {
    updateField(
      "experience",
      resumeData.experience.filter((exp) => exp.id !== id),
    )
  }

  const addEducation = () => {
    updateField("education", [
      ...resumeData.education,
      {
        id: Date.now().toString(),
        school: "",
        degree: "",
        year: "",
      },
    ])
  }

  const updateEducation = (id: string, field: string, value: string) => {
    updateField(
      "education",
      resumeData.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    )
  }

  const removeEducation = (id: string) => {
    updateField(
      "education",
      resumeData.education.filter((edu) => edu.id !== id),
    )
  }

  const addCertification = () => {
    updateField("certifications", [
      ...resumeData.certifications,
      {
        id: Date.now().toString(),
        name: "",
        issuer: "",
        date: "",
        certificateUrl: "",
      },
    ])
  }

  const updateCertification = (id: string, field: string, value: string) => {
    updateField(
      "certifications",
      resumeData.certifications.map((cert) => (cert.id === id ? { ...cert, [field]: value } : cert)),
    )
  }

  const removeCertification = (id: string) => {
    updateField(
      "certifications",
      resumeData.certifications.filter((cert) => cert.id !== id),
    )
  }

  const addCustomSection = () => {
    updateField("customSections", [
      ...resumeData.customSections,
      {
        id: Date.now().toString(),
        title: "",
        content: "",
      },
    ])
  }

  const updateCustomSection = (id: string, field: string, value: string) => {
    updateField(
      "customSections",
      resumeData.customSections.map((section) => (section.id === id ? { ...section, [field]: value } : section)),
    )
  }

  const removeCustomSection = (id: string) => {
    updateField(
      "customSections",
      resumeData.customSections.filter((section) => section.id !== id),
    )
  }

  return (
    <>
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="p-6">
          <h2 className="mb-6 text-2xl font-bold text-foreground">Edit Resume</h2>

          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6 gap-1 bg-muted overflow-x-auto">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="custom">Custom</TabsTrigger>
            </TabsList>

            {/* Personal Tab */}
            <TabsContent value="personal" className="max-h-[600px] space-y-4 overflow-y-auto pr-4">
              <div className="flex flex-col gap-6 sm:flex-row">
                {/* Photo Upload Section */}
                <div className="flex flex-col items-center gap-3 sm:w-32">
                  <div className="rounded-lg border-2 border-dashed border-border p-4">
                    {resumeData.profileImage ? (
                      <img
                        src={resumeData.profileImage || "/placeholder.svg"}
                        alt="Profile"
                        className="h-24 w-24 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                        <Upload className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="personal-photo-upload"
                  />
                  <label htmlFor="personal-photo-upload" className="w-full">
                    <Button variant="outline" className="w-full bg-transparent text-xs" asChild>
                      <span>{resumeData.profileImage ? "Change" : "Add Photo"}</span>
                    </Button>
                  </label>
                  {resumeData.profileImage && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateField("profileImage", undefined)}
                      className="w-full bg-transparent text-xs"
                    >
                      Remove
                    </Button>
                  )}
                </div>

                {/* Personal Information Fields */}
                <div className="flex-1 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Full Name</label>
                      <Input
                        value={resumeData.fullName}
                        onChange={(e) => updateField("fullName", e.target.value)}
                        placeholder="Your name"
                        className="bg-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Professional Title</label>
                      <Input
                        value={resumeData.title}
                        onChange={(e) => updateField("title", e.target.value)}
                        placeholder="e.g., Full Stack Developer"
                        className="bg-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Email</label>
                      <Input
                        value={resumeData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder="your@email.com"
                        className="bg-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Phone</label>
                      <Input
                        value={resumeData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="bg-input"
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <label className="text-sm font-medium text-foreground">Location</label>
                      <Input
                        value={resumeData.location}
                        onChange={(e) => updateField("location", e.target.value)}
                        placeholder="City, State"
                        className="bg-input"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Professional Summary</label>
                    <Textarea
                      value={resumeData.summary}
                      onChange={(e) => updateField("summary", e.target.value)}
                      placeholder="Write a brief summary of your professional background..."
                      className="min-h-24 bg-input"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Experience Tab */}
            <TabsContent value="experience" className="max-h-[600px] space-y-4 overflow-y-auto pr-4">
              {resumeData.experience.map((exp) => (
                <Card key={exp.id} className="border-border/50 bg-muted/30 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <GripVertical className="h-4 w-4" />
                      <span className="text-sm font-medium">Experience</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExperience(exp.id)}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <Input
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                      placeholder="Company name"
                      className="bg-input"
                    />
                    <Input
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                      placeholder="Job title"
                      className="bg-input"
                    />
                    <Input
                      value={exp.duration}
                      onChange={(e) => updateExperience(exp.id, "duration", e.target.value)}
                      placeholder="2020 - 2023"
                      className="bg-input"
                    />
                    <Textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                      placeholder="Describe your responsibilities and achievements..."
                      className="min-h-20 bg-input"
                    />
                  </div>
                </Card>
              ))}
              <Button onClick={addExperience} variant="outline" className="w-full gap-2 bg-transparent">
                <Plus className="h-4 w-4" />
                Add Experience
              </Button>
            </TabsContent>

            {/* Education Tab */}
            <TabsContent value="education" className="max-h-[600px] space-y-4 overflow-y-auto pr-4">
              {resumeData.education.map((edu) => (
                <Card key={edu.id} className="border-border/50 bg-muted/30 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <GripVertical className="h-4 w-4" />
                      <span className="text-sm font-medium">Education</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEducation(edu.id)}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <Input
                      value={edu.school}
                      onChange={(e) => updateEducation(edu.id, "school", e.target.value)}
                      placeholder="School/University name"
                      className="bg-input"
                    />
                    <Input
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                      placeholder="Degree (e.g., B.S. Computer Science)"
                      className="bg-input"
                    />
                    <Input
                      value={edu.year}
                      onChange={(e) => updateEducation(edu.id, "year", e.target.value)}
                      placeholder="Graduation year (e.g., 2020)"
                      className="bg-input"
                    />
                  </div>
                </Card>
              ))}
              <Button onClick={addEducation} variant="outline" className="w-full gap-2 bg-transparent">
                <Plus className="h-4 w-4" />
                Add Education
              </Button>
              <div className="h-6" />
            </TabsContent>

            {/* Certifications Tab */}
            <TabsContent value="certifications" className="max-h-[600px] space-y-4 overflow-y-auto pr-4">
              {resumeData.certifications.map((cert) => (
                <Card key={cert.id} className="border-border/50 bg-muted/30 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <GripVertical className="h-4 w-4" />
                      <span className="text-sm font-medium">Certification</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCertification(cert.id)}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <Input
                      value={cert.name}
                      onChange={(e) => updateCertification(cert.id, "name", e.target.value)}
                      placeholder="Certification name"
                      className="bg-input"
                    />
                    <Input
                      value={cert.issuer}
                      onChange={(e) => updateCertification(cert.id, "issuer", e.target.value)}
                      placeholder="Issuing organization"
                      className="bg-input"
                    />
                    <Input
                      value={cert.date}
                      onChange={(e) => updateCertification(cert.id, "date", e.target.value)}
                      placeholder="Date obtained (e.g., Jan 2024)"
                      className="bg-input"
                    />
                    <div className="flex gap-2">
                      <Input
                        value={cert.certificateUrl || ""}
                        onChange={(e) => updateCertification(cert.id, "certificateUrl", e.target.value)}
                        placeholder="Certificate URL (optional)"
                        className="bg-input"
                      />
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <LinkIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
              <Button onClick={addCertification} variant="outline" className="w-full gap-2 bg-transparent">
                <Plus className="h-4 w-4" />
                Add Certification
              </Button>
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value="skills" className="max-h-[600px] space-y-4 overflow-y-auto pr-4">
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addSkill()}
                  placeholder="Add a skill (e.g., React, TypeScript)"
                  className="bg-input"
                />
                <Button onClick={addSkill} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary"
                  >
                    {skill}
                    <button onClick={() => removeSkill(index)} className="ml-1 hover:text-primary/70">
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Custom Sections Tab */}
            <TabsContent value="custom" className="max-h-[600px] space-y-4 overflow-y-auto pr-4">
              {resumeData.customSections.map((section) => (
                <Card key={section.id} className="border-border/50 bg-muted/30 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <GripVertical className="h-4 w-4" />
                      <span className="text-sm font-medium">Custom Section</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCustomSection(section.id)}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <Input
                      value={section.title}
                      onChange={(e) => updateCustomSection(section.id, "title", e.target.value)}
                      placeholder="Section title (e.g., Publications, Awards)"
                      className="bg-input"
                    />
                    <Textarea
                      value={section.content}
                      onChange={(e) => updateCustomSection(section.id, "content", e.target.value)}
                      placeholder="Section content..."
                      className="min-h-20 bg-input"
                    />
                  </div>
                </Card>
              ))}
              <Button onClick={addCustomSection} variant="outline" className="w-full gap-2 bg-transparent">
                <Plus className="h-4 w-4" />
                Add Custom Section
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </Card>

      {showCropper && (
        <ImageCropper
          imageSrc={tempImage}
          onCropComplete={handleCropComplete}
          onCancel={() => {
            setShowCropper(false)
            setTempImage("")
          }}
        />
      )}
    </>
  )
}
