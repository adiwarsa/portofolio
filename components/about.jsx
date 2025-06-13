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
    frontend: [
      { name: "React.js", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "HTML/CSS", level: 95 },
      { name: "Tailwind CSS", level: 80 },
      { name: "Next.js", level: 75 },
    ],
    backend: [
      { name: "Node.js", level: 80 },
      { name: "Express", level: 75 },
      { name: "MongoDB", level: 70 },
      { name: "SQL", level: 65 },
      { name: "GraphQL", level: 60 },
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
              I'm a passionate full-stack developer with over 5 years of experience building web applications. I
              specialize in creating responsive, user-friendly interfaces with modern JavaScript frameworks and robust
              backend systems.
            </p>
            <p className="text-muted-foreground">
              My approach combines technical expertise with creative problem-solving to deliver solutions that exceed
              client expectations. I'm constantly learning new technologies and methodologies to stay at the forefront
              of web development.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl font-bold">Technical Skills</h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium mb-3">Frontend Development</h4>
                <div className="space-y-4">
                  {skillCategories.frontend.map((skill, index) => (
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
                <h4 className="text-lg font-medium mb-3">Backend Development</h4>
                <div className="space-y-4">
                  {skillCategories.backend.map((skill, index) => (
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
