"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react"

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

interface ResumePreviewProps {
  template: "modern" | "classic" | "minimal" | "professional" | "creative" | "executive" | "custom"
  resumeData: ResumeData
}

const getEmailLink = (email: string) => `mailto:${email}`
const getPhoneLink = (phone: string) => `tel:${phone.replace(/\D/g, "")}`
const getLocationLink = (location: string) => `https://www.google.com/maps/search/${encodeURIComponent(location)}`

export function ResumePreview({ template, resumeData }: ResumePreviewProps) {
  if (template === "modern") {
    return <ModernTemplate resumeData={resumeData} />
  } else if (template === "classic") {
    return <ClassicTemplate resumeData={resumeData} />
  } else if (template === "minimal") {
    return <MinimalTemplate resumeData={resumeData} />
  } else if (template === "professional") {
    return <ProfessionalTemplate resumeData={resumeData} />
  } else if (template === "creative") {
    return <CreativeTemplate resumeData={resumeData} />
  } else if (template === "executive") {
    return <ExecutiveTemplate resumeData={resumeData} />
  } else {
    return <CustomTemplate resumeData={resumeData} />
  }
}

function ModernTemplate({ resumeData }: { resumeData: ResumeData }) {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="space-y-8 p-8">
        {/* Header */}
        <div className="border-b-2 border-primary/20 pb-6">
          <div className="flex gap-6 items-start">
            {resumeData.profileImage && (
              <img
                src={resumeData.profileImage || "/placeholder.svg"}
                alt={resumeData.fullName}
                className="h-24 w-24 rounded-lg object-cover flex-shrink-0"
              />
            )}
            <div className="flex-1">
              <div className="mb-2 inline-block rounded-lg bg-gradient-to-r from-primary to-accent px-3 py-1 text-xs font-semibold text-primary-foreground">
                {resumeData.title}
              </div>
              <h1 className="text-4xl font-bold text-foreground">{resumeData.fullName}</h1>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <a
                  href={getEmailLink(resumeData.email)}
                  className="flex items-center gap-1 transition-colors hover:text-primary"
                  title="Click to send email"
                >
                  <Mail className="h-4 w-4" />
                  {resumeData.email}
                </a>
                <a
                  href={getPhoneLink(resumeData.phone)}
                  className="flex items-center gap-1 transition-colors hover:text-primary"
                  title="Click to call"
                >
                  <Phone className="h-4 w-4" />
                  {resumeData.phone}
                </a>
                <a
                  href={getLocationLink(resumeData.location)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 transition-colors hover:text-primary"
                  title="Click to view on Google Maps"
                >
                  <MapPin className="h-4 w-4" />
                  {resumeData.location}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        {resumeData.summary && (
          <div>
            <h2 className="mb-3 text-lg font-bold text-foreground">About</h2>
            <p className="leading-relaxed text-muted-foreground">{resumeData.summary}</p>
          </div>
        )}

        {/* Experience */}
        {resumeData.experience.length > 0 && (
          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">Experience</h2>
            <div className="space-y-4">
              {resumeData.experience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-primary/30 pl-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{exp.position}</h3>
                      <div className="flex items-center gap-1">
                        {exp.companyUrl ? (
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline flex items-center gap-1"
                          >
                            {exp.company}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        ) : (
                          <p className="text-sm text-primary">{exp.company}</p>
                        )}
                      </div>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">{exp.duration}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">Education</h2>
            <div className="space-y-3">
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                    <p className="text-sm text-muted-foreground">{edu.school}</p>
                  </div>
                  <span className="text-xs font-medium text-primary">{edu.year}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {resumeData.certifications.length > 0 && (
          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">Certifications</h2>
            <div className="space-y-3">
              {resumeData.certifications.map((cert) => (
                <div key={cert.id} className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{cert.name}</h3>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                    {cert.certificateUrl && (
                      <a
                        href={cert.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline flex items-center gap-1 mt-1"
                      >
                        View Certificate
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                  <span className="text-xs font-medium text-primary">{cert.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {resumeData.skills.length > 0 && (
          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, index) => (
                <Badge key={index} className="bg-primary/10 text-primary hover:bg-primary/20">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Custom Sections */}
        {resumeData.customSections.map((section) => (
          <div key={section.id}>
            <h2 className="mb-4 text-lg font-bold text-foreground">{section.title}</h2>
            <p className="leading-relaxed text-muted-foreground whitespace-pre-wrap">{section.content}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}

function ClassicTemplate({ resumeData }: { resumeData: ResumeData }) {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="space-y-6 p-8">
        {/* Header */}
        <div className="border-b-4 border-foreground pb-4">
          <div className="flex gap-4 items-start">
            {resumeData.profileImage && (
              <img
                src={resumeData.profileImage || "/placeholder.svg"}
                alt={resumeData.fullName}
                className="h-20 w-20 rounded object-cover flex-shrink-0"
              />
            )}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground">{resumeData.fullName}</h1>
              <p className="mt-1 text-sm font-semibold text-muted-foreground">{resumeData.title}</p>
              <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
                <a
                  href={getEmailLink(resumeData.email)}
                  className="transition-colors hover:text-primary"
                  title="Click to send email"
                >
                  {resumeData.email}
                </a>
                <span>•</span>
                <a
                  href={getPhoneLink(resumeData.phone)}
                  className="transition-colors hover:text-primary"
                  title="Click to call"
                >
                  {resumeData.phone}
                </a>
                <span>•</span>
                <a
                  href={getLocationLink(resumeData.location)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary"
                  title="Click to view on Google Maps"
                >
                  {resumeData.location}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        {resumeData.summary && (
          <div>
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-foreground">Professional Summary</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{resumeData.summary}</p>
          </div>
        )}

        {/* Experience */}
        {resumeData.experience.length > 0 && (
          <div>
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-foreground">Experience</h2>
            <div className="space-y-3">
              {resumeData.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{exp.position}</p>
                      <p className="text-xs text-muted-foreground">{exp.company}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{exp.duration}</p>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <div>
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-foreground">Education</h2>
            <div className="space-y-2">
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{edu.degree}</p>
                    <p className="text-xs text-muted-foreground">{edu.school}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {resumeData.certifications.length > 0 && (
          <div>
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-foreground">Certifications</h2>
            <div className="space-y-2">
              {resumeData.certifications.map((cert) => (
                <div key={cert.id}>
                  <p className="font-semibold text-foreground">{cert.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {cert.issuer} • {cert.date}
                  </p>
                  {cert.certificateUrl && (
                    <a
                      href={cert.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline"
                    >
                      View Certificate →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Custom Sections */}
        {resumeData.customSections.map((section) => (
          <div key={section.id}>
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-foreground">{section.title}</h2>
            <p className="text-xs leading-relaxed text-muted-foreground whitespace-pre-wrap">{section.content}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}

function MinimalTemplate({ resumeData }: { resumeData: ResumeData }) {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="space-y-5 p-8">
        {/* Header */}
        <div>
          <div className="flex gap-4 items-start">
            {resumeData.profileImage && (
              <img
                src={resumeData.profileImage || "/placeholder.svg"}
                alt={resumeData.fullName}
                className="h-16 w-16 rounded object-cover flex-shrink-0"
              />
            )}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground">{resumeData.fullName}</h1>
              <p className="text-xs text-muted-foreground">{resumeData.title}</p>
              <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                <a
                  href={getEmailLink(resumeData.email)}
                  className="transition-colors hover:text-primary"
                  title="Click to send email"
                >
                  {resumeData.email}
                </a>
                <span>•</span>
                <a
                  href={getPhoneLink(resumeData.phone)}
                  className="transition-colors hover:text-primary"
                  title="Click to call"
                >
                  {resumeData.phone}
                </a>
                <span>•</span>
                <a
                  href={getLocationLink(resumeData.location)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary"
                  title="Click to view on Google Maps"
                >
                  {resumeData.location}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        {resumeData.summary && <p className="text-xs leading-relaxed text-muted-foreground">{resumeData.summary}</p>}

        {/* Experience */}
        {resumeData.experience.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-semibold uppercase text-foreground">Experience</p>
            <div className="space-y-2">
              {resumeData.experience.map((exp) => (
                <div key={exp.id} className="text-xs">
                  <div className="flex justify-between">
                    <span className="font-semibold text-foreground">{exp.position}</span>
                    <span className="text-muted-foreground">{exp.duration}</span>
                  </div>
                  <p className="text-muted-foreground">{exp.company}</p>
                  <p className="mt-1 text-muted-foreground">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-semibold uppercase text-foreground">Education</p>
            <div className="space-y-1">
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <div className="flex justify-between">
                    <span className="font-semibold text-foreground">{edu.degree}</span>
                    <span className="text-muted-foreground">{edu.year}</span>
                  </div>
                  <p className="text-muted-foreground">{edu.school}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {resumeData.certifications.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-semibold uppercase text-foreground">Certifications</p>
            <div className="space-y-1">
              {resumeData.certifications.map((cert) => (
                <div key={cert.id} className="text-xs">
                  <span className="font-semibold text-foreground">{cert.name}</span>
                  <p className="text-muted-foreground">
                    {cert.issuer} • {cert.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Custom Sections */}
        {resumeData.customSections.map((section) => (
          <div key={section.id}>
            <p className="mb-2 text-xs font-semibold uppercase text-foreground">{section.title}</p>
            <p className="text-xs text-muted-foreground whitespace-pre-wrap">{section.content}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}

function ProfessionalTemplate({ resumeData }: { resumeData: ResumeData }) {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="space-y-6 p-8">
        {/* Header with Image */}
        <div className="flex gap-6 border-b-2 border-primary/20 pb-6">
          {resumeData.profileImage && (
            <img
              src={resumeData.profileImage || "/placeholder.svg"}
              alt={resumeData.fullName}
              className="h-24 w-24 rounded-lg object-cover"
            />
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">{resumeData.fullName}</h1>
            <p className="mt-1 text-lg font-semibold text-primary">{resumeData.title}</p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <a
                href={getEmailLink(resumeData.email)}
                className="transition-colors hover:text-primary"
                title="Click to send email"
              >
                {resumeData.email}
              </a>
              <span>•</span>
              <a
                href={getPhoneLink(resumeData.phone)}
                className="transition-colors hover:text-primary"
                title="Click to call"
              >
                {resumeData.phone}
              </a>
              <span>•</span>
              <a
                href={getLocationLink(resumeData.location)}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-primary"
                title="Click to view on Google Maps"
              >
                {resumeData.location}
              </a>
            </div>
          </div>
        </div>

        {/* Summary */}
        {resumeData.summary && (
          <div>
            <h2 className="mb-3 text-lg font-bold text-foreground">Professional Summary</h2>
            <p className="leading-relaxed text-muted-foreground">{resumeData.summary}</p>
          </div>
        )}

        {/* Experience */}
        {resumeData.experience.length > 0 && (
          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">Experience</h2>
            <div className="space-y-4">
              {resumeData.experience.map((exp) => (
                <div key={exp.id} className="border-l-4 border-primary pl-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{exp.position}</h3>
                      <p className="text-sm text-primary">{exp.company}</p>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">{exp.duration}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">Education</h2>
            <div className="space-y-3">
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                    <p className="text-sm text-muted-foreground">{edu.school}</p>
                  </div>
                  <span className="text-xs font-medium text-primary">{edu.year}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {resumeData.certifications.length > 0 && (
          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">Certifications</h2>
            <div className="space-y-3">
              {resumeData.certifications.map((cert) => (
                <div key={cert.id} className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-foreground">{cert.name}</h3>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-primary">{cert.date}</span>
                    {cert.certificateUrl && (
                      <a
                        href={cert.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline flex items-center gap-1"
                      >
                        View
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Custom Sections */}
        {resumeData.customSections.map((section) => (
          <div key={section.id}>
            <h2 className="mb-4 text-lg font-bold text-foreground">{section.title}</h2>
            <p className="leading-relaxed text-muted-foreground whitespace-pre-wrap">{section.content}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}

function CreativeTemplate({ resumeData }: { resumeData: ResumeData }) {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="space-y-6 p-8">
        {/* Header with Image */}
        <div className="rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 p-6">
          <div className="flex gap-6">
            {resumeData.profileImage && (
              <img
                src={resumeData.profileImage || "/placeholder.svg"}
                alt={resumeData.fullName}
                className="h-28 w-28 rounded-full border-4 border-primary object-cover"
              />
            )}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-foreground">{resumeData.fullName}</h1>
              <p className="mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-xl font-bold text-transparent">
                {resumeData.title}
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
                <a
                  href={getEmailLink(resumeData.email)}
                  className="transition-colors hover:text-primary"
                  title="Click to send email"
                >
                  {resumeData.email}
                </a>
                <span>•</span>
                <a
                  href={getPhoneLink(resumeData.phone)}
                  className="transition-colors hover:text-primary"
                  title="Click to call"
                >
                  {resumeData.phone}
                </a>
                <span>•</span>
                <a
                  href={getLocationLink(resumeData.location)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary"
                  title="Click to view on Google Maps"
                >
                  {resumeData.location}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        {resumeData.summary && (
          <div>
            <h2 className="mb-3 text-lg font-bold text-foreground">About Me</h2>
            <p className="leading-relaxed text-muted-foreground">{resumeData.summary}</p>
          </div>
        )}

        {/* Experience */}
        {resumeData.experience.length > 0 && (
          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">Experience</h2>
            <div className="space-y-4">
              {resumeData.experience.map((exp, idx) => (
                <div key={exp.id} className="rounded-lg bg-muted/50 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{exp.position}</h3>
                      <p className="text-sm text-accent">{exp.company}</p>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">{exp.duration}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">Education</h2>
            <div className="space-y-3">
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="flex items-start justify-between rounded-lg bg-muted/30 p-3">
                  <div>
                    <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                    <p className="text-sm text-muted-foreground">{edu.school}</p>
                  </div>
                  <span className="text-xs font-medium text-accent">{edu.year}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {resumeData.certifications.length > 0 && (
          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">Certifications</h2>
            <div className="space-y-3">
              {resumeData.certifications.map((cert) => (
                <div key={cert.id} className="rounded-lg bg-muted/50 p-4">
                  <h3 className="font-semibold text-foreground">{cert.name}</h3>
                  <p className="text-sm text-accent">{cert.issuer}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">{cert.date}</span>
                    {cert.certificateUrl && (
                      <a
                        href={cert.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-accent hover:underline"
                      >
                        View Certificate →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Custom Sections */}
        {resumeData.customSections.map((section) => (
          <div key={section.id}>
            <h2 className="mb-4 text-lg font-bold text-foreground">{section.title}</h2>
            <p className="leading-relaxed text-muted-foreground whitespace-pre-wrap">{section.content}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}

function ExecutiveTemplate({ resumeData }: { resumeData: ResumeData }) {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="grid gap-8 p-8 lg:grid-cols-3">
        {/* Sidebar */}
        <div className="space-y-6 rounded-lg bg-muted/30 p-6 lg:col-span-1">
          {resumeData.profileImage && (
            <img
              src={resumeData.profileImage || "/placeholder.svg"}
              alt={resumeData.fullName}
              className="h-32 w-32 rounded-lg object-cover"
            />
          )}
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase text-foreground">Contact</h3>
            <div className="space-y-2 text-xs text-muted-foreground">
              <a
                href={getEmailLink(resumeData.email)}
                className="block transition-colors hover:text-primary"
                title="Click to send email"
              >
                {resumeData.email}
              </a>
              <a
                href={getPhoneLink(resumeData.phone)}
                className="block transition-colors hover:text-primary"
                title="Click to call"
              >
                {resumeData.phone}
              </a>
              <a
                href={getLocationLink(resumeData.location)}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-colors hover:text-primary"
                title="Click to view on Google Maps"
              >
                {resumeData.location}
              </a>
            </div>
          </div>

          {/* Skills in Sidebar */}
          {resumeData.skills.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase text-foreground">Skills</h3>
              <div className="flex flex-wrap gap-1">
                {resumeData.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">{resumeData.fullName}</h1>
            <p className="mt-1 text-lg font-semibold text-primary">{resumeData.title}</p>
          </div>

          {/* Summary */}
          {resumeData.summary && (
            <div>
              <h2 className="mb-2 text-sm font-bold uppercase text-foreground">Executive Summary</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{resumeData.summary}</p>
            </div>
          )}

          {/* Experience */}
          {resumeData.experience.length > 0 && (
            <div>
              <h2 className="mb-3 text-sm font-bold uppercase text-foreground">Experience</h2>
              <div className="space-y-3">
                {resumeData.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{exp.position}</h3>
                        <p className="text-xs text-primary">{exp.company}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{exp.duration}</span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {resumeData.education.length > 0 && (
            <div>
              <h2 className="mb-3 text-sm font-bold uppercase text-foreground">Education</h2>
              <div className="space-y-2">
                {resumeData.education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                        <p className="text-xs text-muted-foreground">{edu.school}</p>
                      </div>
                      <span className="text-xs text-primary">{edu.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {resumeData.certifications.length > 0 && (
            <div>
              <h2 className="mb-3 text-sm font-bold uppercase text-foreground">Certifications</h2>
              <div className="space-y-2">
                {resumeData.certifications.map((cert) => (
                  <div key={cert.id}>
                    <h3 className="font-semibold text-foreground text-sm">{cert.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {cert.issuer} • {cert.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custom Sections */}
          {resumeData.customSections.map((section) => (
            <div key={section.id}>
              <h2 className="mb-3 text-sm font-bold uppercase text-foreground">{section.title}</h2>
              <p className="text-xs leading-relaxed text-muted-foreground whitespace-pre-wrap">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

function CustomTemplate({ resumeData }: { resumeData: ResumeData }) {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="space-y-8 p-8">
        {/* Header */}
        <div className="border-b-2 border-primary/20 pb-6">
          <div className="flex gap-6 items-start">
            {resumeData.profileImage && (
              <img
                src={resumeData.profileImage || "/placeholder.svg"}
                alt={resumeData.fullName}
                className="h-24 w-24 rounded-lg object-cover flex-shrink-0"
              />
            )}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-foreground">{resumeData.fullName}</h1>
              <p className="mt-2 text-lg font-semibold text-primary">{resumeData.title}</p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <a
                  href={getEmailLink(resumeData.email)}
                  className="flex items-center gap-1 transition-colors hover:text-primary"
                  title="Click to send email"
                >
                  <Mail className="h-4 w-4" />
                  {resumeData.email}
                </a>
                <a
                  href={getPhoneLink(resumeData.phone)}
                  className="flex items-center gap-1 transition-colors hover:text-primary"
                  title="Click to call"
                >
                  <Phone className="h-4 w-4" />
                  {resumeData.phone}
                </a>
                <a
                  href={getLocationLink(resumeData.location)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 transition-colors hover:text-primary"
                  title="Click to view on Google Maps"
                >
                  <MapPin className="h-4 w-4" />
                  {resumeData.location}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        {resumeData.summary && (
          <div>
            <h2 className="mb-3 text-lg font-bold text-foreground">Professional Summary</h2>
            <p className="leading-relaxed text-muted-foreground">{resumeData.summary}</p>
          </div>
        )}

        {/* Experience */}
        {resumeData.experience.length > 0 && (
          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">Experience</h2>
            <div className="space-y-4">
              {resumeData.experience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-primary/30 pl-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{exp.position}</h3>
                      <div className="flex items-center gap-1">
                        {exp.companyUrl ? (
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline flex items-center gap-1"
                          >
                            {exp.company}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        ) : (
                          <p className="text-sm text-primary">{exp.company}</p>
                        )}
                      </div>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">{exp.duration}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">Education</h2>
            <div className="space-y-3">
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                    <p className="text-sm text-muted-foreground">{edu.school}</p>
                  </div>
                  <span className="text-xs font-medium text-primary">{edu.year}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {resumeData.certifications.length > 0 && (
          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">Certifications</h2>
            <div className="space-y-3">
              {resumeData.certifications.map((cert) => (
                <div key={cert.id} className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{cert.name}</h3>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                    {cert.certificateUrl && (
                      <a
                        href={cert.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline flex items-center gap-1 mt-1"
                      >
                        View Certificate
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                  <span className="text-xs font-medium text-primary">{cert.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {resumeData.skills.length > 0 && (
          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, index) => (
                <Badge key={index} className="bg-primary/10 text-primary hover:bg-primary/20">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Custom Sections */}
        {resumeData.customSections.map((section) => (
          <div key={section.id}>
            <h2 className="mb-4 text-lg font-bold text-foreground">{section.title}</h2>
            <p className="leading-relaxed text-muted-foreground whitespace-pre-wrap">{section.content}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}
