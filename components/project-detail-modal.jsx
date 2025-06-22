"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Github, ExternalLink, Calendar, User, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function ProjectDetailModal({ project, isOpen, onClose }) {
  if (!project) return null

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: { duration: 0.2 },
    },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card rounded-2xl border border-border shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="text-xs font-medium bg-secondary/50">
                  {project.type}
                </Badge>
                <h2 className="text-2xl font-bold">{project.title}</h2>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* Project Image */}
              <div className="relative">
                <div
                  className={`aspect-video rounded-xl bg-gradient-to-br ${project.gradient} p-8 flex items-center justify-center relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10 text-white font-bold text-3xl">{project.title}</div>
                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/30 rounded-full"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/20 rounded-full"></div>
                  <div className="absolute top-1/2 left-8 w-6 h-6 bg-white/25 rounded-full"></div>
                </div>
              </div>

              {/* Project Info */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Tag className="w-5 h-5 text-primary" />
                      Project Details
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.description ||
                        `${project.title} is a modern web application built with cutting-edge technologies. This project showcases advanced frontend development techniques and user experience design principles.`}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies?.map((tech, index) => (
                        <Badge key={index} variant="outline" className="border-primary/20">
                          {tech}
                        </Badge>
                      )) || (
                        <>
                          <Badge variant="outline" className="border-primary/20">
                            React
                          </Badge>
                          <Badge variant="outline" className="border-primary/20">
                            Next.js
                          </Badge>
                          <Badge variant="outline" className="border-primary/20">
                            Tailwind CSS
                          </Badge>
                          <Badge variant="outline" className="border-primary/20">
                            TypeScript
                          </Badge>
                        </>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      {project.features?.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          {feature}
                        </li>
                      )) || (
                        <>
                          <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            Responsive design for all devices
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            Modern UI/UX with smooth animations
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            Optimized performance and SEO
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            Clean and maintainable code structure
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Project Meta */}
                  <div className="bg-secondary/20 rounded-xl p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">{project.author}</div>
                        <div className="text-sm text-muted-foreground">Project Author</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{project.date}</div>
                        <div className="text-sm text-muted-foreground">Release Date</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Tag className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium capitalize">{project.type}</div>
                        <div className="text-sm text-muted-foreground">Project Type</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-12"
                      onClick={() => window.open(project.liveUrl || "#", "_blank")}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Live Project
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full border-border hover:bg-accent font-medium h-12"
                      onClick={() => window.open(project.githubUrl || "#", "_blank")}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      View Source Code
                    </Button>
                  </div>

                  {/* Additional Info */}
                  <div className="bg-primary/5 rounded-xl p-6">
                    <h4 className="font-semibold mb-2">Project Status</h4>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-muted-foreground">{project.status || "Completed & Live"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
