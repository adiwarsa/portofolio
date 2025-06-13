"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import GlitchImage from "./glitch-image"

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Different intensity levels for variety
  const intensityLevels = ["low", "medium", "high", "medium", "low", "high"]

  const projects = [
    {
      id: 1,
      title: "Personal Blog",
      description: "A minimalist blog platform built with Next.js and MDX for content management.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["React", "Next.js", "MDX"],
      demoLink: "#",
      githubLink: "#",
      category: "Web App",
    },
    {
      id: 2,
      title: "Task Manager",
      description: "A productivity app for managing tasks with drag-and-drop functionality.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["React", "Redux", "Firebase"],
      demoLink: "#",
      githubLink: "#",
      category: "Web App",
    },
    {
      id: 3,
      title: "Search Engine",
      description: "A custom search engine with advanced filtering capabilities.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["JavaScript", "API", "Algolia"],
      demoLink: "#",
      githubLink: "#",
      category: "Tool",
    },
    {
      id: 4,
      title: "Portfolio Template",
      description: "A customizable portfolio template for developers and designers.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["React", "Tailwind CSS", "Framer Motion"],
      demoLink: "#",
      githubLink: "#",
      category: "Template",
    },
    {
      id: 5,
      title: "E-commerce Dashboard",
      description: "An admin dashboard for managing products, orders, and customers.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["React", "Chart.js", "Material UI"],
      demoLink: "#",
      githubLink: "#",
      category: "Dashboard",
    },
    {
      id: 6,
      title: "Weather App",
      description: "A weather forecast application with location-based data.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["React", "API", "Geolocation"],
      demoLink: "#",
      githubLink: "#",
      category: "Tool",
    },
  ]

  const categories = ["All", "Web App", "Tool", "Template", "Dashboard"]

  const filteredProjects =
    activeFilter === "All" ? projects : projects.filter((project) => project.category === activeFilter)

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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <section id="projects" className="py-16 bg-secondary/30 dark:bg-black/30" ref={ref}>
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
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">My Projects</h2>
          <div className="h-1 w-20 bg-primary rounded-full"></div>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            A showcase of my recent work and personal projects
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2 mt-6">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeFilter === category ? "default" : "outline"}
              onClick={() => setActiveFilter(category)}
              className="rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        <motion.div variants={containerVariants} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              custom={index}
              whileHover={{
                y: -10,
                transition: { type: "spring", stiffness: 300, damping: 10 },
              }}
            >
              <Card className="overflow-hidden h-full border border-primary/20 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
                <div className="aspect-video overflow-hidden">
                  <GlitchImage
                    src={project.image}
                    alt={project.title}
                    intensity={intensityLevels[index % intensityLevels.length]}
                  />
                </div>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </a>
                  </Button>
                  <Button size="sm" asChild>
                    <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Demo
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
