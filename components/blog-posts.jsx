"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Clock } from "lucide-react"

// First, add the import at the top of the file
import HoverImage from "./hover-image"

export default function BlogPosts() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const posts = [
    {
      id: 1,
      title: "Building a Modern React Application with Next.js",
      excerpt: "Learn how to create a full-featured web application using Next.js and React.",
      date: "June 15, 2023",
      readTime: "5 min read",
      image: "/placeholder.svg?height=200&width=400",
      link: "#",
    },
    {
      id: 2,
      title: "Mastering CSS Grid Layout",
      excerpt: "A comprehensive guide to using CSS Grid for modern web layouts.",
      date: "May 22, 2023",
      readTime: "8 min read",
      image: "/placeholder.svg?height=200&width=400",
      link: "#",
    },
    {
      id: 3,
      title: "Introduction to Framer Motion",
      excerpt: "Learn how to add beautiful animations to your React applications.",
      date: "April 10, 2023",
      readTime: "6 min read",
      image: "/placeholder.svg?height=200&width=400",
      link: "#",
    },
  ]

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

  return (
    <section id="blog" className="py-16" ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container px-4 md:px-6"
      >
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Latest Posts</h2>
          <div className="h-1 w-20 bg-primary rounded-full"></div>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Thoughts, tutorials, and insights about web development
          </p>
        </motion.div>

        <motion.div variants={containerVariants} className="grid grid-cols-1 gap-6 md:grid-cols-3 mt-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <Card className="overflow-hidden h-full border border-primary/20 bg-black/50 backdrop-blur-sm">
                <div className="aspect-[16/9] overflow-hidden">
                  <HoverImage src={post.image} alt={post.title} className="w-full" />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      {post.readTime}
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="link" className="p-0 h-auto text-primary" asChild>
                    <a href={post.link}>
                      Read More <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="flex justify-center mt-10">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Posts <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
