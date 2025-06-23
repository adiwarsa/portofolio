import { ThemeProvider } from "@/components/theme-provider"
import GridBackground from "@/components/grid-background"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import SkillsMarquee from "@/components/skills-marquee"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import SparklerEffect from "@/components/sparkler-effect"

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
        <GridBackground />
        <SparklerEffect />
        <div className="relative z-10">
          <Navbar />
          <main>
            <Hero />
            <SkillsMarquee />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  )
}
