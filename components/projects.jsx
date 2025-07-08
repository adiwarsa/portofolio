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
        
        console.log('Fetching projects from API...')
        
        // For testing, use dummy data instead of API call
        // Uncomment the API call when ready to use real data
        /*
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
        console.log('Fetched projects data:', data)
        console.log('Data type:', typeof data)
        console.log('Data length:', Array.isArray(data) ? data.length : 'Not an array')
        console.log('Raw data:', JSON.stringify(data, null, 2))
        setProjects(data.data || data) // Handle both API response formats
        */

        // Dummy data for testing - replace with actual API call above
        const dummyProjects = [
          {
            id: 1,
            title: "Modern E-Commerce Platform",
            type: "website",
            images: [
              "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
              "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&sat=-50",
              "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&hue=180"
            ],
            author: "Adi Warsa",
            date: "2024-01-15",
            description: "A comprehensive e-commerce platform built with modern web technologies.",
            technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
            features: [
              "Responsive design for all devices",
              "Advanced search and filtering",
              "Secure payment processing",
              "Real-time inventory management"
            ],
            status: "Active Development",
            liveUrl: "https://example-ecommerce.com",
            githubUrl: "https://github.com/username/ecommerce-platform",
            gradient: "from-blue-500 to-purple-600"
          },
          {
            id: 2,
            title: "Task Management App",
            type: "mobile",
            images: [
              "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
              "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&sat=-30",
              "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&hue=180",
              "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&blur=2"
            ],
            author: "Adi Warsa",
            date: "2024-02-20",
            description: "A mobile-first task management application with real-time collaboration.",
            technologies: ["React Native", "Firebase", "Redux", "TypeScript"],
            features: [
              "Real-time collaboration",
              "Offline support",
              "Push notifications",
              "Team management"
            ],
            status: "Completed",
            liveUrl: "https://example-task-app.com",
            githubUrl: "https://github.com/username/task-app",
            gradient: "from-green-500 to-teal-600"
          },
          {
            id: 3,
            title: "Portfolio Website",
            type: "website",
            images: [
              "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
              "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop&hue=90"
            ],
            author: "Adi Warsa",
            date: "2024-03-10",
            description: "A modern portfolio website showcasing creative work and projects.",
            technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
            features: [
              "Dark/Light theme",
              "Smooth animations",
              "Responsive design",
              "SEO optimized"
            ],
            status: "Live",
            liveUrl: "https://example-portfolio.com",
            githubUrl: "https://github.com/username/portfolio",
            gradient: "from-purple-500 to-pink-600"
          },
          {
            id: 4,
            title: "Weather Dashboard",
            type: "webapp",
            images: [
              "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=600&fit=crop",
              "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=600&fit=crop&sat=-20"
            ],
            author: "Adi Warsa",
            date: "2024-04-05",
            description: "A weather dashboard with real-time data and interactive charts.",
            technologies: ["Vue.js", "Chart.js", "OpenWeather API", "Vuetify"],
            features: [
              "Real-time weather data",
              "Interactive charts",
              "Location-based forecasts",
              "Weather alerts"
            ],
            status: "Active Development",
            liveUrl: "https://example-weather.com",
            githubUrl: "https://github.com/username/weather-app",
            gradient: "from-cyan-500 to-blue-600"
          },
          {
            id: 5,
            title: "Social Media Analytics",
            type: "dashboard",
            images: [
              "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
              "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&hue=120"
            ],
            author: "Adi Warsa",
            date: "2024-05-12",
            description: "Analytics dashboard for social media performance tracking.",
            technologies: ["Angular", "D3.js", "Node.js", "MongoDB"],
            features: [
              "Real-time analytics",
              "Custom dashboards",
              "Data export",
              "Multi-platform support"
            ],
            status: "Completed",
            liveUrl: "https://example-analytics.com",
            githubUrl: "https://github.com/username/analytics-dashboard",
            gradient: "from-orange-500 to-red-600"
          },
          {
            id: 6,
            title: "Learning Management System",
            type: "webapp",
            images: [
              "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
              "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&sat=-40"
            ],
            author: "Adi Warsa",
            date: "2024-06-18",
            description: "A comprehensive LMS for online education and course management.",
            technologies: ["Laravel", "Vue.js", "MySQL", "Redis"],
            features: [
              "Course creation tools",
              "Video streaming",
              "Progress tracking",
              "Assessment system"
            ],
            status: "Active Development",
            liveUrl: "https://example-lms.com",
            githubUrl: "https://github.com/username/lms-platform",
            gradient: "from-indigo-500 to-purple-600"
          }
        ]

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        setProjects(dummyProjects)
        console.log('Using dummy projects data:', dummyProjects)
        
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
