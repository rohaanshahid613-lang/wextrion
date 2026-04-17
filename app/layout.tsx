import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Wextrion — Amazon Appeal Writer & Compliance Tools',
  description: 'Generate professional Amazon Plans of Action, appeal letters and compliance documents for every Amazon violation instantly. Free POA writer for Amazon sellers.',
  keywords: 'Amazon appeal writer, Amazon POA, Plan of Action Amazon, Amazon suspension appeal, Andon cord POA, Amazon listing reinstatement, Amazon compliance tool',
  metadataBase: new URL('https://wextrion.vercel.app'),
  openGraph: {
    title: 'Wextrion — Amazon Appeal Writer',
    description: 'Generate professional Amazon Plans of Action and appeal letters instantly. Free for Amazon sellers.',
    url: 'https://wextrion.vercel.app',
    siteName: 'Wextrion',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wextrion — Amazon Appeal Writer',
    description: 'Generate professional Amazon Plans of Action and appeal letters instantly.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#0b0c10' }}>
        {children}
      </body>
    </html>
  )
}