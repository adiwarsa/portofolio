"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function SparklerEffect() {
  const [sparks, setSparks] = useState([])

  useEffect(() => {
    const handleClick = (e) => {
      const newSparks = []
      const sparkCount = 8 + Math.random() * 4 // 8-12 sparks

      for (let i = 0; i < sparkCount; i++) {
        const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.5
        const velocity = 50 + Math.random() * 100
        const size = 2 + Math.random() * 3

        newSparks.push({
          id: Date.now() + i,
          x: e.clientX,
          y: e.clientY,
          angle,
          velocity,
          size,
          color: `hsl(${45 + Math.random() * 60}, 100%, ${60 + Math.random() * 30}%)`, // Golden colors
        })
      }

      setSparks((prev) => [...prev, ...newSparks])

      // Remove sparks after animation
      setTimeout(() => {
        setSparks((prev) => prev.filter((spark) => !newSparks.includes(spark)))
      }, 1000)
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {sparks.map((spark) => (
          <motion.div
            key={spark.id}
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: spark.color,
              left: spark.x,
              top: spark.y,
              width: spark.size,
              height: spark.size,
            }}
            initial={{
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
            }}
            animate={{
              x: Math.cos(spark.angle) * spark.velocity,
              y: Math.sin(spark.angle) * spark.velocity + 50, // Add gravity
              opacity: 0,
              scale: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
