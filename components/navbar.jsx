"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Menu, X, Share2, User, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import ThemeToggle from "./theme-toggle"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="w-full backdrop-blur-md bg-background/80 border-b border-border"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo/Profile Section */}
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center overflow-hidden">
              <img src="/profile.jpg" alt="Profile" className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
          </div>
          <div className="hidden sm:block">
            <h3 className="font-semibold text-foreground">Adi Warsa</h3>
            <div className="flex items-center gap-1 text-xs text-green-500">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Available to Work
            </div>
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          

          <motion.a
            variants={itemVariants}
            href="https://github.com/adiwarsa"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-accent transition-colors hover:scale-105 transition-transform duration-200"
          >
            <Github className="w-4 h-4" />
          </motion.a>

          <motion.button
            variants={itemVariants}
            className="p-2 rounded-lg hover:bg-accent transition-colors hover:scale-105 transition-transform duration-200"
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
            <Share2 className="w-4 h-4" />
          </motion.button>

          <ThemeToggle />
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden py-4 bg-background/95 backdrop-blur-md border-t border-border"
        >
          <nav className="container flex flex-col space-y-4">
           
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/adiwarsa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
                <button
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
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
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
            </div>
          </nav>
        </motion.div>
      )}
    </motion.header>
  )
}
