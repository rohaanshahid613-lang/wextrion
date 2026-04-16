import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Wextrion - Your AI Toolkit',
  description: 'Powered by Gemini, FLUX, and Claude',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, background: '#0b0c10' }}>
        {children}
      </body>
    </html>
  )
}