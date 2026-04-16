import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Wextrion - Amazon Appeal Generator',
  description: 'Generate professional Amazon Plans of Action and appeal letters instantly',
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
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#0b0c10' }}>
        {children}
      </body>
    </html>
  )
}