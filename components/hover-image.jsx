"use client"

import { useState, useRef } from "react"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"

export default function HoverImage({
  src,
  alt,
  className = "",
  aspectRatio = "aspect-video",
  effect = "zoom", // Options: zoom, tilt, shine, reveal, glow
  ...props
}) {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef(null)

  // For tilt effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-100, 100], [10, -10])
  const rotateY = useTransform(x, [-100, 100], [-10, 10])

  // For smooth animation
  const springConfig = { stiffness: 300, damping: 30, mass: 0.5 }
  const scaleSpring = useSpring(1, springConfig)
  const opacitySpring = useSpring(0, springConfig)
  const xSpring = useSpring(0, springConfig)
  const ySpring = useSpring(0, springConfig)

  const handleMouseMove = (e) => {
    if (!ref.current || !isHovered) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    x.set(mouseX)
    y.set(mouseY)

    // For shine effect
    if (effect === "shine") {
      const xPercent = (e.clientX - rect.left) / rect.width
      const yPercent = (e.clientY - rect.top) / rect.height
      xSpring.set(xPercent * 100)
      ySpring.set(yPercent * 100)
    }
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    scaleSpring.set(effect === "zoom" ? 1.1 : 1.03)
    opacitySpring.set(1)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    scaleSpring.set(1)
    opacitySpring.set(0)
    x.set(0)
    y.set(0)
    xSpring.set(50)
    ySpring.set(50)
  }

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden relative ${aspectRatio} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={
        effect === "tilt"
          ? {
              perspective: 1000,
              transformStyle: "preserve-3d",
            }
          : {}
      }
      {...props}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{
          scale: scaleSpring,
          rotateX: effect === "tilt" ? rotateX : 0,
          rotateY: effect === "tilt" ? rotateY : 0,
          filter: isHovered ? "brightness(1.1) contrast(1.05) saturate(1.1)" : "brightness(1) contrast(1) saturate(1)",
          transition: "filter 0.3s ease",
        }}
      />

      {/* Overlay for all effects */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"
        style={{ opacity: opacitySpring }}
      />

      {/* Shine effect */}
      {effect === "shine" && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)",
            backgroundSize: "200% 200%",
            backgroundPosition: `${xSpring}% ${ySpring}%`,
            mixBlendMode: "overlay",
          }}
        />
      )}

      {/* Glow effect */}
      {effect === "glow" && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: isHovered ? "inset 0 0 30px rgba(124, 58, 237, 0.5)" : "none",
            transition: "box-shadow 0.3s ease",
          }}
        />
      )}

      {/* Reveal effect */}
      {effect === "reveal" && (
        <motion.div
          className="absolute inset-0 bg-primary/20 pointer-events-none"
          initial={{ x: "-100%" }}
          animate={{ x: isHovered ? "100%" : "-100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      )}
    </motion.div>
  )
}
