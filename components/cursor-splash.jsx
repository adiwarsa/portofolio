"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function CursorSplash() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")
  const [splashes, setSplashes] = useState([])

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    const mouseDown = (e) => {
      setCursorVariant("click")
      // Create a new splash
      const newSplash = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      }
      setSplashes((prev) => [...prev, newSplash])

      // Remove splash after animation completes
      setTimeout(() => {
        setSplashes((prev) => prev.filter((splash) => splash.id !== newSplash.id))
      }, 1000)
    }

    const mouseUp = () => {
      setCursorVariant("default")
    }

    window.addEventListener("mousemove", mouseMove)
    window.addEventListener("mousedown", mouseDown)
    window.addEventListener("mouseup", mouseUp)

    return () => {
      window.removeEventListener("mousemove", mouseMove)
      window.removeEventListener("mousedown", mouseDown)
      window.removeEventListener("mouseup", mouseUp)
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
    },
    click: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 0.8,
    },
  }

  const splashVariants = {
    initial: {
      opacity: 0.8,
      scale: 0,
    },
    animate: {
      opacity: 0,
      scale: 4,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  }

  return (
    <>
      <motion.div
        className="cursor z-50 fixed top-0 left-0 w-8 h-8 bg-primary/30 rounded-full pointer-events-none mix-blend-screen backdrop-blur-sm border border-primary/50"
        variants={variants}
        animate={cursorVariant}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />
      <AnimatePresence>
        {splashes.map((splash) => (
          <motion.div
            key={splash.id}
            initial="initial"
            animate="animate"
            exit={{ opacity: 0 }}
            variants={splashVariants}
            className="fixed z-40 w-8 h-8 rounded-full bg-primary/30 mix-blend-screen pointer-events-none"
            style={{
              left: splash.x - 16,
              top: splash.y - 16,
            }}
          />
        ))}
      </AnimatePresence>
    </>
  )
}
