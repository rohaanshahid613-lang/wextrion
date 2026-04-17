'use client'
import { useState } from 'react'
import { useTheme } from './ThemeProvider'

export default function ThemeSwitcher() {
  const { theme, themeId, changeTheme, themes } = useTheme()
  const [open, setOpen] = useState(false)

  const themeList = [
    { id: 1, name: 'Midnight Blue & Cyan', color1: '#00d4ff', color2: '#0066ff', bg: '#050d1a' },
    { id: 2, name: 'Dark Navy & Gold', color1: '#f5c842', color2: '#f09a1a', bg: '#080a14' },
    { id: 3, name: 'Pure Black & White', color1: '#ffffff', color2: '#cccccc', bg: '#000000' },
    { id: 4, name: 'Deep Emerald', color1: '#00e676', color2: '#00bfa5', bg: '#030f08' },
    { id: 5, name: 'Crimson & Rose', color1: '#ff4d6d', color2: '#ff758c', bg: '#0f0508' },
    { id: 6, name: 'Purple & Pink Neon', color1: '#d946ef', color2: '#a855f7', bg: '#0a0514' },
    { id: 7, name: 'Orange & Amber Fire', color1: '#ff8c00', color2: '#ff4500', bg: '#0f0800' },
    { id: 8, name: 'Ice White & Blue', color1: '#1a56db', color2: '#0ea5e9', bg: '#f0f4ff' },
    { id: 9, name: 'Slate & Violet', color1: '#818cf8', color2: '#6366f1', bg: '#0e0e18' },
    { id: 10, name: 'Arctic Teal', color1: '#2dd4bf', color2: '#06b6d4', bg: '#050e10' },
    { id: 11, name: 'Rose Gold Luxury', color1: '#f9a8d4', color2: '#ec4899', bg: '#0f0808' },
    { id: 12, name: 'Aurora Multi-Gradient', color1: '#a78bfa', color2: '#ec4899', bg: '#080510' },
  ]

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        title="Change Theme"
        style={{ width: '36px', height: '36px', borderRadius: '8px', border: `1px solid rgba(255,255,255,0.1)`, background: 'rgba(255,255,255,0.05)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
        🎨
      </button>

      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 98 }} />
          <div style={{ position: 'absolute', right: 0, top: '44px', width: '280px', background: '#13151c', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '16px', zIndex: 99, boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
            <p style={{ fontSize: '12px', color: '#7c8099', marginBottom: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Choose Theme</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {themeList.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { changeTheme(t.id); setOpen(false) }}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', background: themeId === t.id ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)', border: themeId === t.id ? `1px solid ${t.color1}44` : '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', width: '100%' }}>
                  <div style={{ width: '28px', height: '20px', borderRadius: '4px', background: t.bg, border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '8px', background: `linear-gradient(90deg, ${t.color1}, ${t.color2})` }} />
                  </div>
                  <span style={{ fontSize: '10px', color: themeId === t.id ? t.color1 : '#7c8099', fontWeight: themeId === t.id ? 700 : 400, lineHeight: 1.3 }}>{t.name}</span>
                  {themeId === t.id && <span style={{ marginLeft: 'auto', color: t.color1, fontSize: '10px' }}>✓</span>}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}