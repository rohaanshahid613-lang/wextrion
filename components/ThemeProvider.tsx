'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { themes, getTheme } from '@/lib/themes'

const ThemeContext = createContext<any>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeId] = useState(1)
  const [theme, setTheme] = useState(themes[1])

  useEffect(() => {
    const saved = localStorage.getItem('wextrion_theme')
    if (saved) {
      const id = parseInt(saved)
      setThemeId(id)
      setTheme(getTheme(id))
    }
  }, [])

  const changeTheme = (id: number) => {
    setThemeId(id)
    setTheme(getTheme(id))
    localStorage.setItem('wextrion_theme', id.toString())
  }

  return (
    <ThemeContext.Provider value={{ theme, themeId, changeTheme, themes }}>
      <div style={{ background: theme.bg, minHeight: '100vh' }}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) return { theme: themes[1], themeId: 1, changeTheme: () => {}, themes }
  return ctx
}