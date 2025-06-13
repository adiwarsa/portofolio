"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"

export default function GlitchImage({ src, alt, className = "", aspectRatio = "aspect-video", intensity = "medium" }) {
  const [isHovered, setIsHovered] = useState(false)
  const [glitchActive, setGlitchActive] = useState(false)
  const intervalRef = useRef(null)
  const timeoutRef = useRef(null)

  // Set intensity levels
  const intensityLevels = {
    low: { interval: 300, duration: 150, offset: 5 },
    medium: { interval: 200, duration: 100, offset: 8 },
    high: { interval: 100, duration: 50, offset: 12 },
  }

  const settings = intensityLevels[intensity] || intensityLevels.medium

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const startGlitchEffect = () => {
    setIsHovered(true)

    // Create random glitch intervals
    intervalRef.current = setInterval(() => {
      setGlitchActive(true)

      // Turn off glitch after a short duration
      timeoutRef.current = setTimeout(() => {
        setGlitchActive(false)
      }, settings.duration)
    }, settings.interval)
  }

  const stopGlitchEffect = () => {
    setIsHovered(false)
    setGlitchActive(false)
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }

  return (
    <div
      className={`overflow-hidden relative ${aspectRatio} ${className}`}
      onMouseEnter={startGlitchEffect}
      onMouseLeave={stopGlitchEffect}
    >
      {/* Base image */}
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        className="w-full h-full object-cover transition-all duration-300"
        style={{
          filter: isHovered ? "contrast(1.1) brightness(1.1)" : "none",
        }}
      />

      {/* Red channel */}
      <motion.div
        className="absolute inset-0 mix-blend-screen"
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: glitchActive ? 0.8 : 0,
          filter: "url('#red-filter')",
          transform: glitchActive
            ? `translate(${Math.random() * settings.offset - settings.offset / 2}px, ${(Math.random() * settings.offset) / 2 - settings.offset / 4}px)`
            : "none",
        }}
      />

      {/* Blue channel */}
      <motion.div
        className="absolute inset-0 mix-blend-screen"
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: glitchActive ? 0.8 : 0,
          filter: "url('#blue-filter')",
          transform: glitchActive
            ? `translate(${Math.random() * -settings.offset + settings.offset / 2}px, ${(Math.random() * settings.offset) / 2 - settings.offset / 4}px)`
            : "none",
        }}
      />

      {/* Noise overlay */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-20"
          style={{
            backgroundImage:
              "url('data:image/png;base64,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')",
            opacity: glitchActive ? 0.5 : 0.2,
          }}
        />
      )}

      {/* Horizontal lines */}
      {isHovered && glitchActive && (
        <>
          <div
            className="absolute pointer-events-none bg-white/30 h-[1px]"
            style={{
              top: `${Math.random() * 100}%`,
              left: 0,
              right: 0,
            }}
          />
          <div
            className="absolute pointer-events-none bg-white/30 h-[1px]"
            style={{
              top: `${Math.random() * 100}%`,
              left: 0,
              right: 0,
            }}
          />
        </>
      )}

      {/* SVG filters */}
      <svg className="absolute -z-10 opacity-0 pointer-events-none">
        <defs>
          <filter id="red-filter">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
            />
          </filter>
          <filter id="blue-filter">
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
            />
          </filter>
        </defs>
      </svg>
    </div>
  )
}
