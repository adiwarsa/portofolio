"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { User, Calendar } from "lucide-react"
import ProjectDetailModal from "./project-detail-modal"

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch('https://adiwarsa.yayasan-rohmah.com/api/projects', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer Asndaih123ASFahcm331',
            'Content-Type': 'application/json'
          },
          mode: 'cors'
        })

        console.log('Response status:', response.status)
        console.log('Response headers:', response.headers)

        if (!response.ok) {
          const errorText = await response.text()
          console.error('API Error Response:', errorText)
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
        }

        const data = await response.json()
        
        // Set the projects from API response
        setProjects(data.data || data)
        console.log('API Response:', data)
        
      } catch (err) {
        console.error('Error fetching projects:', err)
        console.error('Error details:', {
          name: err.name,
          message: err.message,
          stack: err.stack
        })
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Skeleton component for project cards
  const ProjectSkeleton = () => (
    <Card className="overflow-hidden bg-card border-border">
      <CardContent className="p-4">
        <Skeleton className="aspect-video rounded-lg w-full mb-4" />
        <Skeleton className="h-6 w-3/4 mb-3" />
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="w-6 h-6 rounded-full" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-4" />
          <div className="flex items-center gap-1">
            <Skeleton className="w-3 h-3" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Skeleton className="w-full h-10 rounded-md" />
      </CardFooter>
    </Card>
  )

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

          {error && (
            <motion.div
              variants={itemVariants}
              className="text-center py-8"
            >
              <p className="text-destructive">Error loading projects: {error}</p>
              <Button 
                onClick={() => window.location.reload()} 
                className="mt-4"
                variant="outline"
              >
                Try Again
              </Button>
            </motion.div>
          )}

          <motion.div variants={containerVariants} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              // Show skeleton loading state
              Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                  key={`skeleton-${index}`}
                  variants={itemVariants}
                >
                  <ProjectSkeleton />
                </motion.div>
              ))
            ) : (
              // Show actual projects
              projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="hover:-translate-y-2 transition-transform duration-300"
                >
                  <Card className="overflow-hidden bg-card border-border hover:border-primary/20 transition-all duration-300 group">
                    {/* Project Image */}
                    <CardContent className="p-4">
                      <div className="aspect-video rounded-lg overflow-hidden relative">
                        {project.images && project.images.length > 0 ? (
                          <img 
                            src={project.images[0]} 
                            alt={project.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback to gradient if image fails to load
                              e.target.style.display = 'none'
                              e.target.nextSibling.style.display = 'flex'
                            }}
                          />
                        ) : project.image ? (
                          <img 
                            src={`https://adiwarsa.yayasan-rohmah.com/storage/${project.image}`} 
                            alt={project.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback to gradient if image fails to load
                              e.target.style.display = 'none'
                              e.target.nextSibling.style.display = 'flex'
                            }}
                          />
                        ) : null}
                        <div
                          className={`w-full h-full bg-gradient-to-br ${project.gradient || 'from-gray-500 to-gray-600'} p-4 flex items-center justify-center relative ${
                            (project.images && project.images.length > 0) || project.image ? 'hidden' : 'flex'
                          }`}
                        >
                          <div className="absolute inset-0 bg-black/20"></div>
                          <div className="relative z-10 text-white font-bold text-lg">{project.title}</div>
                          {/* Decorative elements */}
                          <div className="absolute top-2 right-2 w-4 h-4 bg-white/30 rounded-full"></div>
                          <div className="absolute bottom-2 left-2 w-6 h-6 bg-white/20 rounded-full"></div>
                        </div>

                        {/* Image count indicator */}
                        {project.images && project.images.length > 1 && (
                          <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                            +{project.images.length - 1}
                          </div>
                        )}
                      </div>

                      <h3 className="font-semibold text-lg mt-4 mb-3 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center">
                          <User className="w-3 h-3 text-white" />
                        </div>
                        <span>{project.author || 'Unknown'}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{project.date || 'Unknown'}</span>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="p-4 pt-0">
                      <Button
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium hover:scale-105 transition-transform duration-200"
                        onClick={() => handleProjectClick(project)}
                      >
                        Details
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* Project Detail Modal */}
      <ProjectDetailModal project={selectedProject} isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  )
}
