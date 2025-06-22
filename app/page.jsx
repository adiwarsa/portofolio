import { ThemeProvider } from "@/components/theme-provider"
import GridBackground from "@/components/grid-background"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import SkillsBadges from "@/components/skill-badges"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import SplashCursor from "@/components/splash-cursor"

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
        <GridBackground />
        <SplashCursor
          SPLAT_RADIUS={0.25}
          SPLAT_FORCE={6000}
          COLOR_UPDATE_SPEED={10}
          BACK_COLOR={{ r: 1.0, g: 0.55, b: 0.0 }}
          TRANSPARENT={true}
        />
        <div className="relative z-10">
          <Navbar />
          <main>
            <Hero />
            <SkillsBadges />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  )
}
