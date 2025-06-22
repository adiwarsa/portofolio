"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User, Calendar } from "lucide-react"
import ProjectDetailModal from "./project-detail-modal"

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const projects = [
    {
      id: 1,
      title: "Siverlent",
      type: "website",
      image: "/placeholder.svg?height=200&width=300",
      author: "Adi Warsa",
      date: "22 2025",
      gradient: "from-purple-500 to-pink-500",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "AI/ML"],
      features: [
        "Website for a company that provides software solutions for businesses.",
      ],
      status: "Active Development",
      liveUrl: "https://siverlent.id",
      githubUrl: "#",
    },
    {
      id: 2,
      title: "Undangan Online",
      type: "website",
      image: "/placeholder.svg?height=200&width=300",
      author: "Adi Warsa",
      date: "22 2025",
      gradient: "from-yellow-500 to-orange-500",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      technologies: ["React", "JavaScript", "CSS3", "Local Storage", "Web APIs"],
      features: [
        "Website for a company that provides online invitation services.",
      ],
      status: "Completed & Live",
      liveUrl: "https://unol.siverlent.id",
      githubUrl: "#",
    },
    {
      id: 3,
      title: "Softcomp POS",
      type: "web application",
      image: "/placeholder.svg?height=200&width=300",
      author: "Adi Warsa",
      date: "22 Juni 2025",
      gradient: "from-blue-500 to-cyan-500",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      technologies: ["Laravel", "Livewire", "PostgreSQL", "Tailwind CSS", "Alpine.js"],
      features: [
        "Point of Sale System for a company that provides software solutions for businesses.",
      ],
      status: "Completed & Live",
      liveUrl: "https://softcomp.io",
      githubUrl: "#",
    },
    
    
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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const handleProjectClick = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  return (
    <>
      <section className="py-16" ref={ref} id="projects">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="container px-4 md:px-6"
        >
          <motion.h2
            variants={itemVariants}
            className="text-sm font-medium text-muted-foreground tracking-wider uppercase mb-8"
          >
            PROJECTS
          </motion.h2>

          <motion.div variants={containerVariants} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  transition: { type: "spring", stiffness: 300, damping: 10 },
                }}
              >
                <Card className="overflow-hidden bg-card border-border hover:border-primary/20 transition-all duration-300 group">
                  {/* Project Type Badge */}
                  <div className="p-4 pb-0">
                    <Badge variant="secondary" className="text-xs font-medium bg-secondary/50">
                      {project.type}
                    </Badge>
                  </div>

                  {/* Project Image */}
                  <CardContent className="p-4">
                    <div
                      className={`aspect-video rounded-lg bg-gradient-to-br ${project.gradient} p-4 flex items-center justify-center relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="relative z-10 text-white font-bold text-lg">{project.title}</div>
                      {/* Decorative elements */}
                      <div className="absolute top-2 right-2 w-4 h-4 bg-white/30 rounded-full"></div>
                      <div className="absolute bottom-2 left-2 w-6 h-6 bg-white/20 rounded-full"></div>
                    </div>

                    <h3 className="font-semibold text-lg mt-4 mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center">
                        <User className="w-3 h-3 text-white" />
                      </div>
                      <span>{project.author}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{project.date}</span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="p-4 pt-0">
                    <Button
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                      onClick={() => handleProjectClick(project)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Details
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Project Detail Modal */}
      <ProjectDetailModal project={selectedProject} isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  )
}
