"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Mail, Share2, User } from "lucide-react"

export default function Hero() {
  const [typedText, setTypedText] = useState("")
  const fullText = "The One Who Codes, Creates, And Conquers."
  const typingSpeed = 100
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1))
      }, typingSpeed)
      return () => clearTimeout(timeout)
    }
  }, [typedText])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
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
    <section className="py-24 md:py-32 relative overflow-hidden" ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container px-4 md:px-6"
      >
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-6">
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground tracking-wider uppercase">
                Fullstack Developer
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {typedText}
                <span className="animate-blink">|</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                Fullstack Developer crafting end-to-end digital solutions. From sleek frontends to
                robust backends, I build complete applications that deliver exceptional user experiences. Passionate
                about clean code, scalable architecture, and innovative design.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span className="text-sm">adiwarsa03@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="text-sm">Adi Warsa</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-3 min-[400px]:flex-row">
              {/* Download CV Button */}
              <a
                href="#"
                download
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 h-12 flex items-center justify-center rounded-lg shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                style={{ minWidth: 180 }}
              >
                <span className="mr-2">Download CV</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" /></svg>
              </a>
              {/* Projects Button */}
              <a
                href="#projects"
                className="border border-primary bg-white text-primary font-medium px-8 h-12 flex items-center justify-center rounded-lg shadow hover:bg-primary hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                style={{ minWidth: 180 }}
              >
                <span className="mr-2">View Projects</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </a>
              {/* Share Button */}
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 shadow"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'Adi Warsa Portfolio',
                      text: 'Check out my portfolio!',
                      url: window.location.href,
                    });
                  } else {
                    alert('Sharing is not supported in this browser.');
                  }
                }}
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </motion.div>
          </div>

          {/* Right Illustration */}
          <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              {/* Main Orange Container */}
              <div className="relative bg-gradient-to-br from-primary via-primary to-primary/80 rounded-3xl p-8 shadow-2xl">
                {/* Decorative Elements */}
                <div className="absolute top-6 left-6 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>

                <div className="absolute top-6 right-6 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </div>

                {/* Sun decorations */}
                <div className="absolute top-12 right-12">
                  <div className="w-8 h-8 text-yellow-300">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74L12 2z" />
                    </svg>
                  </div>
                </div>

                {/* Browser Window */}
                <div className="relative mt-8 bg-white rounded-xl shadow-lg overflow-hidden transform rotate-3">
                  <div className="bg-gray-100 px-4 py-3 flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-gray-500">https://adiwarsa.siverlent.id</div>
                  </div>

                  <div className="p-6 bg-white">
                    <div className="space-y-3">
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                </div>

                {/* Available to Work Badge */}
                <div className="absolute -bottom-2 left-8 bg-white rounded-full px-4 py-2 shadow-lg border-2 border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Available to work</span>
                  </div>
                </div>

                {/* Profile Card */}
                <div className="absolute -bottom-4 right-4 bg-gray-900 rounded-lg p-3 shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center overflow-hidden">
                      <img src="/profile.jpg" alt="Profile" className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-white">Adi Warsa</div>
                      <div className="flex gap-1 mt-1">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                        <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
