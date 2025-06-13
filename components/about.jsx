"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import WalkingTechStack from "./walking-tech-stack"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

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

  const skillCategories = {
    backend: [
      { name: "PHP", level: 95 },
      { name: "Laravel", level: 90 },
      { name: "RESTful APIs", level: 90 },
      { name: "Livewire", level: 85 },
      { name: "JavaScript", level: 85 },
      { name: "Node.js", level: 80 },
      { name: "Express", level: 80 },
      { name: "MySQL", level: 85 },
      { name: "PostgreSQL", level: 80 },
      { name: "MongoDB", level: 80 },
      { name: "Git", level: 75 },
      { name: "Go", level: 60 },
    ],
    frontend: [
      { name: "HTML/CSS", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "Tailwind CSS", level: 80 },
      { name: "Bootstrap", level: 90 },
      { name: "Alpine.js", level: 80 },
      { name: "Vue.js", level: 80 },
      { name: "React.js", level: 70 },
      { name: "Next.js", level: 70 },
    ],
  }

  return (
    <section id="about" className="py-16" ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container px-4 md:px-6"
      >
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h2>
          <div className="h-1 w-20 bg-primary rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-2xl font-bold">Professional Profile</h3>
            <p className="text-muted-foreground">
              I'm a passionate full-stack developer with almost 4 years of experience specializing in PHP and Laravel development. 
              I excel at building robust, scalable web applications using Laravel's powerful ecosystem and modern development practices.
            </p>
            <p className="text-muted-foreground">
              My expertise includes Laravel Livewire for building dynamic interfaces, creating RESTful APIs, and implementing 
              efficient database solutions. I'm dedicated to writing clean, maintainable code and staying current with the 
              latest Laravel features and best practices.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl font-bold">Technical Skills</h3>

            <div className="space-y-8">
              <div>
                <h4 className="text-lg font-medium mb-4">Backend Development</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skillCategories.backend.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      className="space-y-2"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: "100%" } : { width: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <div className="flex justify-between">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-primary"
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium mb-4">Frontend Development</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skillCategories.frontend.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      className="space-y-2"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: "100%" } : { width: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    >
                      <div className="flex justify-between">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-primary"
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-6">Technologies I Work With</h3>
          <WalkingTechStack />
        </motion.div>
      </motion.div>
    </section>
  )
}
