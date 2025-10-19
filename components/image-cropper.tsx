"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { X } from "lucide-react"

interface ImageCropperProps {
  imageSrc: string
  onCropComplete: (croppedImage: string) => void
  onCancel: () => void
  aspectRatio?: number
}

export function ImageCropper({ imageSrc, onCropComplete, onCancel, aspectRatio = 1 }: ImageCropperProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const cropSize = 300

  useEffect(() => {
    drawCropPreview()
  }, [zoom, position])

  const drawCropPreview = () => {
    const canvas = canvasRef.current
    const image = imageRef.current

    if (!canvas || !image) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = cropSize
    canvas.height = cropSize

    const scaledWidth = image.width * zoom
    const scaledHeight = image.height * zoom

    ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.save()
    ctx.beginPath()
    ctx.arc(cropSize / 2, cropSize / 2, cropSize / 2, 0, Math.PI * 2)
    ctx.clip()

    ctx.drawImage(image, position.x, position.y, scaledWidth, scaledHeight)
    ctx.restore()

    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(cropSize / 2, cropSize / 2, cropSize / 2, 0, Math.PI * 2)
    ctx.stroke()
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleCropComplete = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const croppedImage = canvas.toDataURL("image/jpeg", 0.95)
      onCropComplete(croppedImage)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-md space-y-4 bg-card p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Crop Your Photo</h3>
          <button onClick={onCancel} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Drag to reposition your photo. Use the zoom slider to adjust the size.
          </p>

          <div
            className="relative mx-auto h-80 w-80 cursor-move overflow-hidden rounded-full border-2 border-primary/20 bg-muted"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              ref={imageRef}
              src={imageSrc || "/placeholder.svg"}
              alt="Crop preview"
              className="pointer-events-none absolute h-full w-full object-cover"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
              }}
            />
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/50" />
          </div>

          <canvas ref={canvasRef} className="hidden" />

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Zoom</label>
            <Slider
              value={[zoom]}
              onValueChange={(value) => setZoom(value[0])}
              min={1}
              max={3}
              step={0.1}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">{Math.round(zoom * 100)}%</p>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">
              <strong>Requirements:</strong> Square format, minimum 200x200px. Your cropped image will be 300x300px.
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
            Cancel
          </Button>
          <Button onClick={handleCropComplete} className="flex-1">
            Apply Crop
          </Button>
        </div>
      </Card>
    </div>
  )
}
