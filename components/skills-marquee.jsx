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
        
        console.log('Fetching skills from API...')
        
        const response = await fetch('https://adiwarsa.yayasan-rohmah.com/api/skills', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer Asndaih123ASFahcm331',
            'Content-Type': 'application/json'
          },
          mode: 'cors'
        })

        console.log('Response status:', response.status)

        if (!response.ok) {
          const errorText = await response.text()
          console.error('API Error Response:', errorText)
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
        }

        const data = await response.json()
        console.log('Fetched skills data:', data)
        console.log('Data type:', typeof data)
        console.log('Data length:', Array.isArray(data) ? data.length : 'Not an array')
        console.log('Raw data:', JSON.stringify(data, null, 2))
        setSkills(data)
      } catch (err) {
        console.error('Error fetching skills:', err)
        console.error('Error details:', {
          name: err.name,
          message: err.message,
          stack: err.stack
        })
        setError(err.message)
        // Use fallback data when API fails
        console.log('Using fallback data due to API error')
        setSkills([
          { name: "JavaScript", color: "bg-yellow-500 text-black" },
          { name: "HTML/CSS", color: "bg-pink-500 text-white" },
          { name: "React.js", color: "bg-blue-600 text-white" },
          { name: "Next.js", color: "bg-black text-white" },
          { name: "Node.js", color: "bg-green-600 text-white" },
          { name: "Express", color: "bg-gray-800 text-white" },
          { name: "Tailwind CSS", color: "bg-cyan-600 text-white" },
          { name: "Vue.js", color: "bg-red-600 text-white" },
          { name: "Laravel", color: "bg-red-600 text-white" },
          { name: "Livewire", color: "bg-yellow-600 text-white" },
          { name: "MySQL", color: "bg-red-600 text-white" },
          { name: "Git", color: "bg-red-600 text-white" },
          { name: "Figma", color: "bg-purple-600 text-white" },
          { name: "MongoDB", color: "bg-green-600 text-white" },
          { name: "PostgreSQL", color: "bg-blue-600 text-white" },
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
                    className={`${skill.color || 'bg-gray-600 text-white'} px-4 py-2 text-sm font-medium rounded-lg border-0 flex-shrink-0 hover:scale-105 transition-transform cursor-pointer`}
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
                    className={`${skill.color || 'bg-gray-600 text-white'} px-4 py-2 text-sm font-medium rounded-lg border-0 flex-shrink-0 hover:scale-105 transition-transform cursor-pointer`}
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
