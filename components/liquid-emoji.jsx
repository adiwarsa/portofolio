"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

export default function LiquidEmoji() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    let animationFrameId
    let time = 0

    // Set canvas dimensions
    canvas.width = 120
    canvas.height = 120

    // Draw liquid glass emoji
    const drawLiquidEmoji = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw glass background with liquid effect
      ctx.save()

      // Create gradient background
      const gradient = ctx.createRadialGradient(60, 60, 10, 60, 60, 60)
      gradient.addColorStop(0, "rgba(124, 58, 237, 0.2)")
      gradient.addColorStop(1, "rgba(124, 58, 237, 0.1)")

      // Draw wobbling circle
      ctx.beginPath()
      for (let i = 0; i < Math.PI * 2; i += 0.01) {
        const noise = Math.sin(i * 8 + time) * 2
        const x = 60 + (50 + noise) * Math.cos(i)
        const y = 60 + (50 + noise) * Math.sin(i)

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.closePath()

      // Fill with gradient
      ctx.fillStyle = gradient
      ctx.fill()

      // Add glass effect
      ctx.shadowColor = "rgba(255, 255, 255, 0.5)"
      ctx.shadowBlur = 15
      ctx.strokeStyle = "rgba(255, 255, 255, 0.6)"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw emoji
      ctx.font = "60px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText("👋", 60, 60)

      ctx.restore()

      // Update time for animation
      time += 0.05

      // Continue animation loop
      animationFrameId = window.requestAnimationFrame(drawLiquidEmoji)
    }

    drawLiquidEmoji()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <motion.div
      className="absolute -bottom-2 -right-2 h-24 w-24 rounded-full flex items-center justify-center hover:scale-110 hover:rotate-10 transition-transform duration-200"
      initial={{ scale: 0, rotate: -20 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
    >
      <canvas ref={canvasRef} width="120" height="120" className="w-full h-full" />
    </motion.div>
  )
}
