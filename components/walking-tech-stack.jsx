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
            whileHover={{
              y: -15,
              scale: 1.1,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
              },
            }}
            className="flex-shrink-0 relative"
          >
            <motion.div
              className="absolute -inset-2 bg-gradient-to-r from-primary/30 via-primary/50 to-primary/30 rounded-xl opacity-0 blur-xl"
              animate={{
                opacity: hoveredIndex === index ? 0.6 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
            <Card className="border border-primary/20 bg-white/10 dark:bg-black/50 backdrop-blur-md overflow-hidden w-32 transition-all duration-300 hover:border-primary/50 hover:bg-white/20 dark:hover:bg-black/70 relative z-10 shadow-lg hover:shadow-xl">
              <CardContent className="p-4 flex items-center justify-center h-24">
                <motion.span
                  className="font-medium text-center"
                  animate={{
                    color: hoveredIndex === index ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {tech}
                </motion.span>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
