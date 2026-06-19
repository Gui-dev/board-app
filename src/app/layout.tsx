import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

const interFont = Inter({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Product Roadmap',
    template: '%s | Product Roadmap',
  },
  description: 'Follow the development progress of our entire platform',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${interFont.className} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-navy-950 text-navy-50">
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  )
}
