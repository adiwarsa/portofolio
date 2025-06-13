"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MapPin, Phone, Calendar, ExternalLink, Github, Linkedin, Twitter } from "lucide-react"

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

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

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "hello@example.com",
      link: "mailto:hello@example.com",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "San Francisco, CA",
      link: "https://maps.google.com/?q=San+Francisco,+CA",
    },
    {
      icon: Calendar,
      title: "Availability",
      value: "Monday - Friday, 9AM - 5PM",
    },
  ]

  const socialLinks = [
    { icon: Github, label: "GitHub", link: "https://github.com/adiwarsa" },
    { icon: Linkedin, label: "LinkedIn", link: "https://linkedin.com/in/adiwarsa/" },
    { icon: Twitter, label: "Twitter", link: "https://twitter.com/" },
    { icon: ExternalLink, label: "Portfolio", link: "#" },
  ]

  return (
    <section id="contact" className="py-16 bg-secondary/30 dark:bg-black/30" ref={ref}>
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
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get In Touch</h2>
          <div className="h-1 w-20 bg-primary rounded-full"></div>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Have a project in mind? Let's work together!
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Card className="border border-primary/20 bg-white/50 dark:bg-black/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl md:text-3xl">Contact Information</CardTitle>
              <CardDescription>Feel free to reach out through any of these channels</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid gap-8 md:grid-cols-2">
                {/* Contact Information */}
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-4"
                      variants={itemVariants}
                      whileHover={{ x: 5 }}
                    >
                      <motion.div
                        className="rounded-full bg-primary/10 p-3"
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(124, 58, 237, 0.2)" }}
                      >
                        <item.icon className="h-5 w-5 text-primary" />
                      </motion.div>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        {item.link ? (
                          <a
                            href={item.link}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                            target={item.link.startsWith("http") ? "_blank" : undefined}
                            rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm text-muted-foreground">{item.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Social Links and Quote */}
                <div className="space-y-6">
                  <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <social.icon className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium">{social.label}</span>
                      </motion.a>
                    ))}
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="p-4 bg-primary/5 rounded-lg border border-primary/10"
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="text-sm text-muted-foreground italic">
                      "I'm always open to discussing new projects, creative ideas or opportunities to be part of your
                      vision."
                    </p>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </section>
  )
}
