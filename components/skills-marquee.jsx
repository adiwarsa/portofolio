"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

export default function SkillsMarquee() {
    const skills = [
        // JavaScript-related
        { name: "JavaScript", color: "bg-yellow-500 text-black" },
        { name: "HTML/CSS", color: "bg-pink-500 text-white" },
        { name: "React.js", color: "bg-blue-600 text-white" },
        { name: "Next.js", color: "bg-black text-white" },
        { name: "Node.js", color: "bg-green-600 text-white" },
        { name: "Express", color: "bg-gray-800 text-white" },
        { name: "Tailwind CSS", color: "bg-cyan-600 text-white" },
        { name: "Vue.js", color: "bg-red-600 text-white" },
        // PHP-related
        { name: "Laravel", color: "bg-red-600 text-white" },
        { name: "Livewire", color: "bg-yellow-600 text-white" },
        { name: "MySQL", color: "bg-red-600 text-white" },
        // Other
        { name: "Git", color: "bg-red-600 text-white" },
        { name: "Figma", color: "bg-purple-600 text-white" },
        { name: "MongoDB", color: "bg-green-600 text-white" },
        { name: "PostgreSQL", color: "bg-blue-600 text-white" },
      ]

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
                className={`${skill.color} px-4 py-2 text-sm font-medium rounded-lg border-0 flex-shrink-0 hover:scale-105 transition-transform cursor-pointer`}
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
                className={`${skill.color} px-4 py-2 text-sm font-medium rounded-lg border-0 flex-shrink-0 hover:scale-105 transition-transform cursor-pointer`}
              >
                {skill.name}
              </Badge>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
