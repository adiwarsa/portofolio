"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Skills() {
  const [activeTab, setActiveTab] = useState("frontend")

  const skillCategories = {
    frontend: [
      { name: "React.js", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "HTML/CSS", level: 95 },
      { name: "Tailwind CSS", level: 80 },
      { name: "Next.js", level: 75 },
    ],
    backend: [
      { name: "Node.js", level: 80 },
      { name: "Express", level: 75 },
      { name: "MongoDB", level: 70 },
      { name: "SQL", level: 65 },
      { name: "GraphQL", level: 60 },
    ],
    tools: [
      { name: "Git", level: 85 },
      { name: "Docker", level: 70 },
      { name: "Figma", level: 75 },
      { name: "VS Code", level: 90 },
      { name: "Jest", level: 65 },
    ],
  }

  return (
    <section id="skills" className="py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">My Skills</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">Technologies and tools I work with</p>
          </div>

          <div className="w-full max-w-3xl mt-8">
            <Tabs defaultValue="frontend" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="frontend">Frontend</TabsTrigger>
                <TabsTrigger value="backend">Backend</TabsTrigger>
                <TabsTrigger value="tools">Tools</TabsTrigger>
              </TabsList>

              {Object.entries(skillCategories).map(([category, skills]) => (
                <TabsContent key={category} value={category} className="mt-6">
                  <div className="grid gap-4">
                    {skills.map((skill) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-primary transition-all duration-500 ease-in-out"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 mt-12">
            {["React", "JavaScript", "HTML5", "CSS3", "Node.js", "MongoDB", "Git", "Figma"].map((tech) => (
              <Card key={tech} className="flex items-center justify-center p-6 h-24">
                <CardContent className="p-0 flex items-center justify-center">
                  <span className="font-medium">{tech}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
