import { ThemeProvider } from "@/components/theme-provider"
import GridBackground from "@/components/grid-background"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import SplashCursor from "@/components/splash-cursor"

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="relative min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white overflow-hidden">
        <GridBackground />
        <SplashCursor
          SPLAT_RADIUS={0.25}
          SPLAT_FORCE={6000}
          COLOR_UPDATE_SPEED={10}
          BACK_COLOR={{ r: 0.63, g: 0.0, b: 0.5 }}
          TRANSPARENT={true}
        />
        <div className="relative z-10">
          <Navbar />
          <main className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Hero />
            <About />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  )
}
