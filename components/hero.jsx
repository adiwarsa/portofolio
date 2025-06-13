"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react"
import LiquidEmoji from "./liquid-emoji"
import GlitchImage from "./glitch-image"

export default function Hero() {
  const [typedText, setTypedText] = useState("")
  const fullText = "Full Stack Developer"
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

  const imageVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.6,
      },
    },
  }

  const socialVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 1.2,
        staggerChildren: 0.1,
      },
    },
  }

  const socialItemVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { type: "spring", stiffness: 300, damping: 10 } },
  }

  return (
    <section id="home" className="py-24 md:py-32 relative overflow-hidden" ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container px-4 md:px-6"
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <motion.h1
                variants={itemVariants}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
              >
                Hi, I'm <span className="text-primary">Adi</span>
              </motion.h1>
              <motion.p variants={itemVariants} className="text-xl text-muted-foreground md:text-2xl h-8">
                {typedText}
                <span className="animate-blink">|</span>
              </motion.p>
            </div>
            <motion.p variants={itemVariants} className="max-w-[600px] text-muted-foreground md:text-xl">
              I build modern, responsive web applications with cutting-edge technologies. Let's create something amazing
              together.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Download Resume
              </Button>
            </motion.div>
            <motion.div variants={socialVariants} className="flex gap-4 mt-4">
              {[Github, Linkedin, Twitter].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  aria-label={Icon.name}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  variants={socialItemVariants}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </motion.div>
          </div>
          <motion.div variants={imageVariants} className="flex items-center justify-center">
            <div className="relative aspect-square w-[280px] h-[280px] md:w-[400px] md:h-[400px]">
              <GlitchImage
                src="/placeholder.svg?height=400&width=400"
                alt="Profile"
                className="rounded-2xl border-2 border-primary/20 bg-muted"
                aspectRatio="aspect-square"
                intensity="medium"
              />
              <div className="absolute -bottom-2 -right-2 z-10">
                <LiquidEmoji />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Animated background elements */}
      <motion.div
        className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 1,
        }}
      />
    </section>
  )
}
