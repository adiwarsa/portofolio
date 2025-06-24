"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

export default function SkillsMarquee() {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('https://adiwarsa.yayasan-rohmah.com/api/skills', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer Asndaih123ASFahcm331',
            'Content-Type': 'application/json'
          },
          mode: 'cors'
        })

        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
        }

        const data = await response.json()
        setSkills(data)
      } catch (err) {
        setError(err.message)
        // Use fallback data when API fails
        setSkills([
          { name: "JavaScript" },
          { name: "HTML/CSS" },
          { name: "React.js" },
          { name: "Next.js" },
          { name: "Node.js" },
          { name: "Express" },
          { name: "Tailwind CSS" },
          { name: "Vue.js" },
          { name: "Laravel" },
          { name: "Livewire" },
          { name: "MySQL" },
          { name: "Git" },
          { name: "Figma" },
          { name: "MongoDB" },
          { name: "PostgreSQL" },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  // Skeleton component for skills
  const SkillsSkeleton = () => (
    <div className="flex gap-4 whitespace-nowrap">
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton key={index} className="h-8 w-24 rounded-lg" />
      ))}
    </div>
  )

  // Duplicate skills for seamless loop
  const duplicatedSkills = [...skills, ...skills]

  return (
    <section className="py-16 overflow-hidden">
      <div className="container px-4 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-medium text-muted-foreground tracking-wider uppercase mb-8"
        >
          SKILLS & TECHNOLOGIES
        </motion.h2>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center py-4 mb-6"
          >
            <p className="text-destructive text-sm">Error loading skills: {error}</p>
          </motion.div>
        )}

        {loading ? (
          // Show skeleton loading state
          <>
            <div className="relative mb-6">
              <SkillsSkeleton />
            </div>
            <div className="relative">
              <SkillsSkeleton />
            </div>
          </>
        ) : (
          // Show actual skills
          <>
            {/* First row - moving right */}
            <div className="relative mb-6">
              <motion.div
                className="flex gap-4 whitespace-nowrap"
                animate={{
                  x: ["0%", "-50%"],
                }}
                transition={{
                  x: {
                    duration: 30,
                    ease: "linear",
                    repeat: Number.POSITIVE_INFINITY,
                  },
                }}
              >
                {duplicatedSkills.map((skill, index) => (
                  <Badge
                    key={`${skill.name}-${index}`}
                    className="px-4 py-2 text-sm font-medium rounded-lg border border-foreground/20 bg-transparent text-foreground hover:scale-105 transition-transform cursor-pointer"
                  >
                    {skill.name}
                  </Badge>
                ))}
              </motion.div>
            </div>

            {/* Second row - moving left */}
            <div className="relative">
              <motion.div
                className="flex gap-4 whitespace-nowrap"
                animate={{
                  x: ["-50%", "0%"],
                }}
                transition={{
                  x: {
                    duration: 25,
                    ease: "linear",
                    repeat: Number.POSITIVE_INFINITY,
                  },
                }}
              >
                {duplicatedSkills.reverse().map((skill, index) => (
                  <Badge
                    key={`${skill.name}-reverse-${index}`}
                    className="px-4 py-2 text-sm font-medium rounded-lg border border-foreground/20 bg-transparent text-foreground hover:scale-105 transition-transform cursor-pointer"
                  >
                    {skill.name}
                  </Badge>
                ))}
              </motion.div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
