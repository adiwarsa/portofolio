"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

export default function SkillsBadges() {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            variants={itemVariants}
            className="text-sm font-medium text-muted-foreground tracking-wider uppercase mb-8"
          >
            SKILLS
          </motion.h2>

          <motion.div variants={containerVariants} className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                className="hover:scale-105 transition-transform duration-200"
              >
                <Badge
                  className={`${skill.color} px-4 py-2 text-sm font-medium rounded-lg border-0 hover:opacity-90 transition-opacity`}
                >
                  {skill.name}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
