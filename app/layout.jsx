import "./globals.css"

export const metadata = {
  title: "Adi's Portfolio",
  description: "Adi's modern portfolio website showcasing my work and skills",
  generator: 'Portofolio',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
