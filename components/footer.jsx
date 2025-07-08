"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Instagram, Heart } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

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

  const socialLinks = [
    { icon: Github, label: "GitHub", link: "https://github.com/adiwarsa" },
    { icon: Instagram, label: "Instagram", link: "https://instagram.com/adiwarsaa" },
    { icon: Linkedin, label: "LinkedIn", link: "https://linkedin.com/in/adiwarsa/" },
    { icon: Mail, label: "Email", link: "mailto:adiwarsa03@gmail.com" },
  ]

  return (
    <motion.footer
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="border-t border-border bg-white/80 dark:bg-black/80 backdrop-blur-md"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Logo and Tagline */}
          <motion.div variants={itemVariants} className="text-center">
            <h3 className="text-2xl font-bold text-primary mb-2">Adi Warsa</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Creating digital experiences that blend creativity with technical excellence
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex gap-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.link}
                aria-label={social.label}
                className="text-muted-foreground hover:text-primary transition-colors hover:scale-120 hover:rotate-5 transition-transform duration-200"
              >
                <social.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          />

          {/* Copyright */}
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center gap-2 text-center">
            <p className="text-sm text-muted-foreground">© {currentYear} Adi Warsa. All rights reserved.</p>
            <span className="hidden md:inline text-muted-foreground">•</span>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Made with <Heart className="h-3 w-3 text-primary fill-primary" /> by Adi
            </p>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  )
}
