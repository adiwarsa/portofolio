"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export default function GridBackground() {
  const canvasRef = useRef(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    let animationFrameId
    let offset = 0

    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Draw grid with animation
    function drawGrid() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const gridSize = 30
      // Use different colors based on theme
      ctx.strokeStyle = resolvedTheme === "dark" ? "rgba(255, 255, 255, 0.07)" : "rgba(0, 0, 0, 0.07)"
      ctx.lineWidth = 1

      // Slowly increment offset for animation
      offset += 0.2

      // Draw vertical lines with offset
      for (let x = -gridSize + (offset % gridSize); x <= canvas.width + gridSize; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Draw horizontal lines with offset
      for (let y = -gridSize + (offset % gridSize); y <= canvas.height + gridSize; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
    }

    // Animation loop
    const animate = () => {
      drawGrid()
      animationFrameId = window.requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
    }
  }, [resolvedTheme])

  return (
    <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none" style={{ opacity: 0.5 }} />
  )
}
