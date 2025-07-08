"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export default function WalkingTechStack() {
  const containerRef = useRef(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [isHovered, setIsHovered] = useState(false)
  const controls = useAnimation()
  const x = useMotionValue(0)
  const [isDragging, setIsDragging] = useState(false)

  const technologies = [
    "PHP",
    "Laravel",
    "Livewire",
    "MySQL",
    "JavaScript",
    "Tailwind CSS",
    "Alpine.js",
    "Vue.js",
    "Git",
    "REST API",
    "Docker",
    "Linux",
  ]

  // Duplicate the array to create a seamless loop
  const duplicatedTech = [...technologies, ...technologies]

  const handleHoverStart = () => {
    setIsHovered(true)
    controls.stop()
  }

  const handleHoverEnd = () => {
    setIsHovered(false)
    if (!isDragging) {
      controls.start({
        x: ["0%", "-50%"],
        transition: {
          x: {
            duration: 20,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          },
        },
      })
    }
  }

  const handleDragStart = () => {
    setIsDragging(true)
    controls.stop()
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    if (!isHovered) {
      controls.start({
        x: ["0%", "-50%"],
        transition: {
          x: {
            duration: 20,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          },
        },
      })
    }
  }

  return (
    <div className="w-full overflow-hidden py-8 relative">
      <motion.div
        ref={containerRef}
        className="flex gap-4"
        initial={{ x: "0%" }}
        animate={controls}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        drag="x"
        dragConstraints={{ left: -1000, right: 0 }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        style={{ x }}
      >
        {duplicatedTech.map((tech, index) => (
          <motion.div
            key={`${tech}-${index}`}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            className="flex-shrink-0 relative hover:-translate-y-2 hover:scale-105 transition-all duration-300"
          >
            <div className="px-6 py-3 bg-white/5 dark:bg-black/20 backdrop-blur-sm border border-white/10 dark:border-white/5 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:bg-white/10 dark:hover:bg-black/30 hover:border-white/20 dark:hover:border-white/10">
              <span className="font-medium text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 whitespace-nowrap">
                {tech}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
