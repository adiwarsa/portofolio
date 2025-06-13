"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export default function WalkingTechStack() {
  const containerRef = useRef(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const technologies = [
    "React",
    "JavaScript",
    "Node.js",
    "MongoDB",
    "Express",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "GraphQL",
    "Redux",
    "Git",
    "Figma",
  ]

  // Duplicate the array to create a seamless loop
  const duplicatedTech = [...technologies, ...technologies]

  return (
    <div className="w-full overflow-hidden py-8">
      <motion.div
        ref={containerRef}
        className="flex gap-4"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          x: {
            duration: 20,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          },
        }}
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
            <Card className="border border-primary/20 bg-black/50 backdrop-blur-sm overflow-hidden w-32 transition-all duration-300 hover:border-primary/50 hover:bg-black/70 relative z-10">
              <CardContent className="p-4 flex items-center justify-center h-24">
                <motion.span
                  className="font-medium text-center"
                  animate={{
                    color: hoveredIndex === index ? "hsl(var(--primary))" : "white",
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
