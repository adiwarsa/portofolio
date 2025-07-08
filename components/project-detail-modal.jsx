"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Github, ExternalLink, Calendar, User, Tag, ChevronLeft, ChevronRight, Star, Zap, Code, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"

export default function ProjectDetailModal({ project, isOpen, onClose }) {
  // Dummy data for testing - replace with actual API data later
  const dummyProject = {
    id: 1,
    title: "Modern E-Commerce Platform",
    type: "website",
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&sat=-50",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&hue=180",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&blur=2"
    ],
    author: "Adi Warsa",
    date: "2024-01-15",
    description: "A comprehensive e-commerce platform built with modern web technologies. Features include user authentication, product catalog, shopping cart, payment integration, and admin dashboard.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
    features: [
      "Responsive design for all devices",
      "Advanced search and filtering",
      "Secure payment processing",
      "Real-time inventory management",
      "Admin dashboard with analytics",
      "Multi-language support"
    ],
    status: "Active Development",
    liveUrl: "https://example-ecommerce.com",
    githubUrl: "https://github.com/username/ecommerce-platform",
    gradient: "from-blue-500 to-purple-600"
  }

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isImageLoading, setIsImageLoading] = useState(true)
  const [preloadedImages, setPreloadedImages] = useState(new Set())

  // Reset image index when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0)
      setIsImageLoading(true)
    }
  }, [isOpen])

  // Preload images
  useEffect(() => {
    const projectData = project || dummyProject
    const images = projectData.images || [projectData.image].filter(Boolean)
    
    images.forEach((imageUrl) => {
      if (!preloadedImages.has(imageUrl)) {
        const img = new Image()
        img.onload = () => {
          setPreloadedImages(prev => new Set([...prev, imageUrl]))
        }
        img.src = imageUrl
      }
    })
  }, [project, preloadedImages])

  if (!project) return null

  // Use dummy data for now, replace with actual project data later
  const projectData = project || dummyProject
  const images = projectData.images || [projectData.image].filter(Boolean)

  const nextImage = () => {
    if (images.length <= 1) return
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    if (images.length <= 1) return
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleImageLoad = () => {
    setIsImageLoading(false)
  }

  const handleImageError = (e) => {
    e.target.style.display = 'none'
    const fallback = e.target.nextSibling
    if (fallback) {
      fallback.style.display = 'flex'
    }
    setIsImageLoading(false)
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2, ease: "easeIn" }
    },
  }

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50,
      rotateX: 15
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        duration: 0.6
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      rotateX: 15,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.4, 
        ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for smoother transition
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: { 
        duration: 0.3, 
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        delay: 0.2,
        ease: "easeOut"
      }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'live':
        return 'bg-green-500'
      case 'active development':
        return 'bg-yellow-500'
      case 'planning':
        return 'bg-blue-500'
      default:
        return 'bg-gray-500'
    }
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
            className="relative w-full max-w-5xl max-h-[95vh] overflow-y-auto bg-card rounded-3xl border border-border shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <motion.div 
              className="bg-card border-b border-border p-6 flex items-center justify-between"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center gap-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Badge variant="secondary" className="text-xs font-medium bg-secondary/50">
                    {projectData.type}
                  </Badge>
                </motion.div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  {projectData.title}
                </h2>
              </div>
              <div className="hover:scale-110 hover:rotate-90 transition-all duration-200">
                <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* Project Images Carousel */}
              <motion.div 
                className="relative"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="aspect-video rounded-2xl overflow-hidden relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                  {images.length > 0 ? (
                    <>
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.img 
                          key={currentImageIndex}
                          src={images[currentImageIndex]} 
                          alt={`${projectData.title} - Image ${currentImageIndex + 1}`}
                          className="w-full h-full object-cover"
                          variants={imageVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          onLoad={handleImageLoad}
                          onError={handleImageError}
                          style={{ 
                            willChange: 'transform, opacity',
                            backfaceVisibility: 'hidden'
                          }}
                        />
                      </AnimatePresence>
                      
                      {/* Loading overlay - only show if image is not preloaded */}
                      {isImageLoading && !preloadedImages.has(images[currentImageIndex]) && (
                        <motion.div
                          initial={{ opacity: 1 }}
                          animate={{ opacity: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className="absolute inset-0 bg-gray-200 dark:bg-gray-800 flex items-center justify-center"
                        >
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
                          />
                        </motion.div>
                      )}
                      
                      {/* Navigation arrows */}
                      {images.length > 1 && (
                        <>
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                          >
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={prevImage}
                              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-12 h-12 backdrop-blur-sm hover:scale-110 transition-transform duration-200"
                              disabled={images.length <= 1}
                            >
                              <ChevronLeft className="w-6 h-6" />
                            </Button>
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                          >
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={nextImage}
                              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-12 h-12 backdrop-blur-sm hover:scale-110 transition-transform duration-200"
                              disabled={images.length <= 1}
                            >
                              <ChevronRight className="w-6 h-6" />
                            </Button>
                          </motion.div>
                        </>
                      )}

                      {/* Image counter */}
                      {images.length > 1 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                          className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium"
                        >
                          {currentImageIndex + 1} / {images.length}
                        </motion.div>
                      )}

                      {/* Image thumbnails */}
                      {images.length > 1 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.8 }}
                          className="absolute bottom-4 left-4 flex gap-2"
                        >
                          {images.map((image, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`w-16 h-10 rounded-lg overflow-hidden border-2 transition-all backdrop-blur-sm hover:scale-105 ${
                                index === currentImageIndex 
                                  ? 'border-primary shadow-lg shadow-primary/25' 
                                  : 'border-white/30 hover:border-white/60'
                              }`}
                            >
                              <img 
                                src={image} 
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </>
                  ) : (
                    <motion.div
                      className={`w-full h-full bg-gradient-to-br ${projectData.gradient || 'from-gray-500 to-gray-600'} p-8 flex items-center justify-center relative`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="relative z-10 text-white font-bold text-3xl">{projectData.title}</div>
                      {/* Animated decorative elements */}
                      <motion.div 
                        className="absolute top-4 right-4 w-8 h-8 bg-white/30 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.div 
                        className="absolute bottom-4 left-4 w-12 h-12 bg-white/20 rounded-full"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                      />
                      <motion.div 
                        className="absolute top-1/2 left-8 w-6 h-6 bg-white/25 rounded-full"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                      />
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Project Info */}
              <motion.div 
                className="grid md:grid-cols-2 gap-8"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.div className="space-y-6" variants={staggerContainer}>
                  <motion.div variants={staggerItem}>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <div className="hover:rotate-360 transition-transform duration-500">
                        <Tag className="w-5 h-5 text-primary" />
                      </div>
                      Project Details
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {projectData.description ||
                        `${projectData.title} is a modern web application built with cutting-edge technologies. This project showcases advanced frontend development techniques and user experience design principles.`}
                    </p>
                  </motion.div>

                  <motion.div variants={staggerItem}>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <div className="hover:rotate-360 transition-transform duration-500">
                        <Code className="w-5 h-5 text-primary" />
                      </div>
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {projectData.technologies?.map((tech, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.08 }}
                          className="group"
                        >
                          <span 
                            className="inline-block px-3 py-1.5 text-sm font-medium text-muted-foreground bg-secondary/30 rounded-lg border border-border/50 hover:bg-secondary/50 hover:text-foreground hover:-translate-y-0.5 transition-all duration-200 cursor-default"
                          >
                            {tech}
                          </span>
                        </motion.div>
                      )) || (
                        <>
                          <span className="inline-block px-3 py-1.5 text-sm font-medium text-muted-foreground bg-secondary/30 rounded-lg border border-border/50 hover:bg-secondary/50 hover:text-foreground hover:-translate-y-0.5 transition-all duration-200">
                            React
                          </span>
                          <span className="inline-block px-3 py-1.5 text-sm font-medium text-muted-foreground bg-secondary/30 rounded-lg border border-border/50 hover:bg-secondary/50 hover:text-foreground hover:-translate-y-0.5 transition-all duration-200">
                            Next.js
                          </span>
                          <span className="inline-block px-3 py-1.5 text-sm font-medium text-muted-foreground bg-secondary/30 rounded-lg border border-border/50 hover:bg-secondary/50 hover:text-foreground hover:-translate-y-0.5 transition-all duration-200">
                            Tailwind CSS
                          </span>
                          <span className="inline-block px-3 py-1.5 text-sm font-medium text-muted-foreground bg-secondary/30 rounded-lg border border-border/50 hover:bg-secondary/50 hover:text-foreground hover:-translate-y-0.5 transition-all duration-200">
                            TypeScript
                          </span>
                        </>
                      )}
                    </div>
                  </motion.div>

                  <motion.div variants={staggerItem}>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <div className="hover:rotate-360 transition-transform duration-500">
                        <Zap className="w-5 h-5 text-primary" />
                      </div>
                      Key Features
                    </h3>
                    <ul className="space-y-2 text-muted-foreground">
                      {projectData.features?.map((feature, index) => (
                        <motion.li 
                          key={index} 
                          className="flex items-start gap-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <motion.div 
                            className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                          />
                          {feature}
                        </motion.li>
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
                  </motion.div>
                </motion.div>

                <motion.div className="space-y-6" variants={staggerContainer}>
                  {/* Project Meta */}
                  <motion.div 
                    className="bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-2xl p-6 space-y-4 border border-secondary/20 hover:scale-105 transition-transform duration-200"
                    variants={staggerItem}
                  >
                    <div 
                      className="flex items-center gap-3 hover:translate-x-1 transition-transform duration-200"
                    >
                      <div 
                        className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center hover:scale-110 hover:rotate-360 transition-all duration-300"
                      >
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">{projectData.author}</div>
                        <div className="text-sm text-muted-foreground">Project Author</div>
                      </div>
                    </div>

                    <div 
                      className="flex items-center gap-3 hover:translate-x-1 transition-transform duration-200"
                    >
                      <div className="hover:rotate-360 transition-transform duration-500">
                        <Calendar className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-medium">{projectData.date}</div>
                        <div className="text-sm text-muted-foreground">Release Date</div>
                      </div>
                    </div>

                    <div 
                      className="flex items-center gap-3 hover:translate-x-1 transition-transform duration-200"
                    >
                      <div className="hover:rotate-360 transition-transform duration-500">
                        <Tag className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-medium capitalize">{projectData.type}</div>
                        <div className="text-sm text-muted-foreground">Project Type</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div className="space-y-3" variants={staggerItem}>
                    <div className="hover:scale-105 transition-transform duration-200">
                      <Button
                        className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-medium h-12 shadow-lg shadow-primary/25"
                        onClick={() => window.open(projectData.liveUrl || "#", "_blank")}
                      >
                        <Globe className="w-4 h-4 mr-2" />
                        View Live Project
                      </Button>
                    </div>

                    <div className="hover:scale-105 transition-transform duration-200">
                      <Button
                        variant="outline"
                        className="w-full border-border hover:bg-accent font-medium h-12 hover:border-primary/50 transition-all"
                        onClick={() => window.open(projectData.githubUrl || "#", "_blank")}
                      >
                        <Github className="w-4 h-4 mr-2" />
                        View Source Code
                      </Button>
                    </div>
                  </motion.div>

                  {/* Additional Info */}
                  <motion.div 
                    className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/10 hover:scale-105 transition-transform duration-200"
                    variants={staggerItem}
                  >
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Star className="w-4 h-4 text-primary" />
                      Project Status
                    </h4>
                    <div className="flex items-center gap-2">
                      <motion.div 
                        className={`w-2 h-2 ${getStatusColor(projectData.status)} rounded-full`}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-sm text-muted-foreground">{projectData.status || "Completed & Live"}</span>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
