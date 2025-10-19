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
        <div className="p-4 sm:p-6">
          <h2 className="mb-4 text-xl font-bold text-foreground sm:mb-6 sm:text-2xl">Edit Resume</h2>

          <Tabs defaultValue="personal" className="space-y-4 sm:space-y-6">
            <div className="overflow-x-auto rounded-lg bg-muted p-1">
              <TabsList className="inline-flex w-full gap-2 bg-transparent md:grid md:grid-cols-6 md:gap-2">
                <TabsTrigger
                  value="personal"
                  className="flex-1 whitespace-nowrap rounded-md px-3 py-2 text-xs font-medium transition-all sm:px-4 sm:py-2.5 sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:hover:bg-muted-foreground/10"
                >
                  Personal
                </TabsTrigger>
                <TabsTrigger
                  value="experience"
                  className="flex-1 whitespace-nowrap rounded-md px-3 py-2 text-xs font-medium transition-all sm:px-4 sm:py-2.5 sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:hover:bg-muted-foreground/10"
                >
                  Experience
                </TabsTrigger>
                <TabsTrigger
                  value="education"
                  className="flex-1 whitespace-nowrap rounded-md px-3 py-2 text-xs font-medium transition-all sm:px-4 sm:py-2.5 sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:hover:bg-muted-foreground/10"
                >
                  Education
                </TabsTrigger>
                <TabsTrigger
                  value="certifications"
                  className="flex-1 whitespace-nowrap rounded-md px-3 py-2 text-xs font-medium transition-all sm:px-4 sm:py-2.5 sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:hover:bg-muted-foreground/10"
                >
                  Certifications
                </TabsTrigger>
                <TabsTrigger
                  value="skills"
                  className="flex-1 whitespace-nowrap rounded-md px-3 py-2 text-xs font-medium transition-all sm:px-4 sm:py-2.5 sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:hover:bg-muted-foreground/10"
                >
                  Skills
                </TabsTrigger>
                <TabsTrigger
                  value="custom"
                  className="flex-1 whitespace-nowrap rounded-md px-3 py-2 text-xs font-medium transition-all sm:px-4 sm:py-2.5 sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:hover:bg-muted-foreground/10"
                >
                  Custom
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Personal Tab */}
            <TabsContent value="personal" className="max-h-[600px] space-y-3 overflow-y-auto pr-2 sm:space-y-4 sm:pr-4">
              <div className="flex flex-col gap-4 sm:gap-6 sm:flex-row">
                {/* Photo Upload Section */}
                <div className="flex flex-col items-center gap-2 sm:gap-3 sm:w-32">
                  <div className="rounded-lg border-2 border-dashed border-border p-3 sm:p-4">
                    {resumeData.profileImage ? (
                      <img
                        src={resumeData.profileImage || "/placeholder.svg"}
                        alt="Profile"
                        className="h-20 w-20 rounded-full object-cover sm:h-24 sm:w-24"
                      />
                    ) : (
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted sm:h-24 sm:w-24">
                        <Upload className="h-5 w-5 text-muted-foreground sm:h-6 sm:w-6" />
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
                <div className="flex-1 space-y-3 sm:space-y-4">
                  <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                    <div className="space-y-1 sm:space-y-2">
                      <label className="text-xs font-medium text-foreground sm:text-sm">Full Name</label>
                      <Input
                        value={resumeData.fullName}
                        onChange={(e) => updateField("fullName", e.target.value)}
                        placeholder="Your name"
                        className="bg-input text-sm"
                      />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <label className="text-xs font-medium text-foreground sm:text-sm">Professional Title</label>
                      <Input
                        value={resumeData.title}
                        onChange={(e) => updateField("title", e.target.value)}
                        placeholder="e.g., Full Stack Developer"
                        className="bg-input text-sm"
                      />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <label className="text-xs font-medium text-foreground sm:text-sm">Email</label>
                      <Input
                        value={resumeData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder="your@email.com"
                        className="bg-input text-sm"
                      />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <label className="text-xs font-medium text-foreground sm:text-sm">Phone</label>
                      <Input
                        value={resumeData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="bg-input text-sm"
                      />
                    </div>
                    <div className="space-y-1 sm:space-y-2 sm:col-span-2">
                      <label className="text-xs font-medium text-foreground sm:text-sm">Location</label>
                      <Input
                        value={resumeData.location}
                        onChange={(e) => updateField("location", e.target.value)}
                        placeholder="City, State"
                        className="bg-input text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-xs font-medium text-foreground sm:text-sm">Professional Summary</label>
                    <Textarea
                      value={resumeData.summary}
                      onChange={(e) => updateField("summary", e.target.value)}
                      placeholder="Write a brief summary of your professional background..."
                      className="min-h-20 bg-input text-sm sm:min-h-24"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Experience Tab */}
            <TabsContent
              value="experience"
              className="max-h-[600px] space-y-3 overflow-y-auto pr-2 sm:space-y-4 sm:pr-4"
            >
              {resumeData.experience.map((exp) => (
                <Card key={exp.id} className="border-border/50 bg-muted/30 p-3 sm:p-4">
                  <div className="mb-3 flex items-center justify-between sm:mb-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <GripVertical className="h-4 w-4" />
                      <span className="text-xs font-medium sm:text-sm">Experience</span>
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
                  <div className="space-y-2 sm:space-y-3">
                    <Input
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                      placeholder="Company name"
                      className="bg-input text-sm"
                    />
                    <Input
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                      placeholder="Job title"
                      className="bg-input text-sm"
                    />
                    <Input
                      value={exp.duration}
                      onChange={(e) => updateExperience(exp.id, "duration", e.target.value)}
                      placeholder="2020 - 2023"
                      className="bg-input text-sm"
                    />
                    <Textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                      placeholder="Describe your responsibilities and achievements..."
                      className="min-h-16 bg-input text-sm sm:min-h-20"
                    />
                  </div>
                </Card>
              ))}
              <Button onClick={addExperience} variant="outline" className="w-full gap-2 bg-transparent text-sm">
                <Plus className="h-4 w-4" />
                Add Experience
              </Button>
            </TabsContent>

            {/* Education Tab */}
            <TabsContent
              value="education"
              className="max-h-[600px] space-y-3 overflow-y-auto pr-2 sm:space-y-4 sm:pr-4"
            >
              {resumeData.education.map((edu) => (
                <Card key={edu.id} className="border-border/50 bg-muted/30 p-3 sm:p-4">
                  <div className="mb-3 flex items-center justify-between sm:mb-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <GripVertical className="h-4 w-4" />
                      <span className="text-xs font-medium sm:text-sm">Education</span>
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
                  <div className="space-y-2 sm:space-y-3">
                    <Input
                      value={edu.school}
                      onChange={(e) => updateEducation(edu.id, "school", e.target.value)}
                      placeholder="School/University name"
                      className="bg-input text-sm"
                    />
                    <Input
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                      placeholder="Degree (e.g., B.S. Computer Science)"
                      className="bg-input text-sm"
                    />
                    <Input
                      value={edu.year}
                      onChange={(e) => updateEducation(edu.id, "year", e.target.value)}
                      placeholder="Graduation year (e.g., 2020)"
                      className="bg-input text-sm"
                    />
                  </div>
                </Card>
              ))}
              <Button onClick={addEducation} variant="outline" className="w-full gap-2 bg-transparent text-sm">
                <Plus className="h-4 w-4" />
                Add Education
              </Button>
              <div className="h-8 sm:h-12" />
            </TabsContent>

            {/* Certifications Tab */}
            <TabsContent
              value="certifications"
              className="max-h-[600px] space-y-3 overflow-y-auto pr-2 sm:space-y-4 sm:pr-4"
            >
              {resumeData.certifications.map((cert) => (
                <Card key={cert.id} className="border-border/50 bg-muted/30 p-3 sm:p-4">
                  <div className="mb-3 flex items-center justify-between sm:mb-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <GripVertical className="h-4 w-4" />
                      <span className="text-xs font-medium sm:text-sm">Certification</span>
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
                  <div className="space-y-2 sm:space-y-3">
                    <Input
                      value={cert.name}
                      onChange={(e) => updateCertification(cert.id, "name", e.target.value)}
                      placeholder="Certification name"
                      className="bg-input text-sm"
                    />
                    <Input
                      value={cert.issuer}
                      onChange={(e) => updateCertification(cert.id, "issuer", e.target.value)}
                      placeholder="Issuing organization"
                      className="bg-input text-sm"
                    />
                    <Input
                      value={cert.date}
                      onChange={(e) => updateCertification(cert.id, "date", e.target.value)}
                      placeholder="Date obtained (e.g., Jan 2024)"
                      className="bg-input text-sm"
                    />
                    <div className="flex gap-2">
                      <Input
                        value={cert.certificateUrl || ""}
                        onChange={(e) => updateCertification(cert.id, "certificateUrl", e.target.value)}
                        placeholder="Certificate URL (optional)"
                        className="bg-input text-sm"
                      />
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <LinkIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
              <Button onClick={addCertification} variant="outline" className="w-full gap-2 bg-transparent text-sm">
                <Plus className="h-4 w-4" />
                Add Certification
              </Button>
              <div className="h-8 sm:h-12" />
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value="skills" className="max-h-[600px] space-y-3 overflow-y-auto pr-2 sm:space-y-4 sm:pr-4">
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addSkill()}
                  placeholder="Add a skill (e.g., React, TypeScript)"
                  className="bg-input text-sm"
                />
                <Button onClick={addSkill} className="gap-2 text-sm">
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary sm:px-3 sm:py-1.5 sm:text-sm"
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
            <TabsContent value="custom" className="max-h-[600px] space-y-3 overflow-y-auto pr-2 sm:space-y-4 sm:pr-4">
              {resumeData.customSections.map((section) => (
                <Card key={section.id} className="border-border/50 bg-muted/30 p-3 sm:p-4">
                  <div className="mb-3 flex items-center justify-between sm:mb-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <GripVertical className="h-4 w-4" />
                      <span className="text-xs font-medium sm:text-sm">Custom Section</span>
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
                  <div className="space-y-2 sm:space-y-3">
                    <Input
                      value={section.title}
                      onChange={(e) => updateCustomSection(section.id, "title", e.target.value)}
                      placeholder="Section title (e.g., Publications, Awards)"
                      className="bg-input text-sm"
                    />
                    <Textarea
                      value={section.content}
                      onChange={(e) => updateCustomSection(section.id, "content", e.target.value)}
                      placeholder="Section content..."
                      className="min-h-16 bg-input text-sm sm:min-h-20"
                    />
                  </div>
                </Card>
              ))}
              <Button onClick={addCustomSection} variant="outline" className="w-full gap-2 bg-transparent text-sm">
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
