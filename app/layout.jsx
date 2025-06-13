import "./globals.css"

export const metadata = {
  title: "Portfolio Website",
  description: "Adi's modern portfolio website showcasing my work and skills",
    generator: 'Portofolio'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
