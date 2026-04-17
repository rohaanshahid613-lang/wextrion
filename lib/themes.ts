export const themes: any = {
  1: { name: 'Midnight Blue & Cyan', bg: '#050d1a', surface: '#0a1628', accent: '#00d4ff', accent2: '#0066ff', text: '#e8eaf2', muted: '#4a7a9b' },
  2: { name: 'Dark Navy & Gold', bg: '#080a14', surface: '#0f1220', accent: '#f5c842', accent2: '#f09a1a', text: '#e8eaf2', muted: '#8a7a50' },
  3: { name: 'Pure Black & White', bg: '#000000', surface: '#111111', accent: '#ffffff', accent2: '#cccccc', text: '#ffffff', muted: '#888888' },
  4: { name: 'Deep Emerald', bg: '#030f08', surface: '#0a1f10', accent: '#00e676', accent2: '#00bfa5', text: '#e8eaf2', muted: '#2d6b4a' },
  5: { name: 'Crimson & Rose', bg: '#0f0508', surface: '#1a0810', accent: '#ff4d6d', accent2: '#ff758c', text: '#e8eaf2', muted: '#7a3040' },
  6: { name: 'Purple & Pink Neon', bg: '#0a0514', surface: '#130a1e', accent: '#d946ef', accent2: '#a855f7', text: '#e8eaf2', muted: '#7a4d8a' },
  7: { name: 'Orange & Amber Fire', bg: '#0f0800', surface: '#1a1000', accent: '#ff8c00', accent2: '#ff4500', text: '#e8eaf2', muted: '#7a5020' },
  8: { name: 'Ice White & Blue', bg: '#f0f4ff', surface: '#e0e8ff', accent: '#1a56db', accent2: '#0ea5e9', text: '#1a1a2e', muted: '#4b6cb7' },
  9: { name: 'Slate & Violet', bg: '#0e0e18', surface: '#161622', accent: '#818cf8', accent2: '#6366f1', text: '#e8eaf2', muted: '#4c4f70' },
  10: { name: 'Arctic Teal', bg: '#050e10', surface: '#0a1a1e', accent: '#2dd4bf', accent2: '#06b6d4', text: '#e8eaf2', muted: '#1d5e5e' },
  11: { name: 'Rose Gold Luxury', bg: '#0f0808', surface: '#1a0f0f', accent: '#f9a8d4', accent2: '#ec4899', text: '#e8eaf2', muted: '#7a4060' },
  12: { name: 'Aurora Multi-Gradient', bg: '#080510', surface: '#100a1e', accent: '#a78bfa', accent2: '#ec4899', text: '#e8eaf2', muted: '#5a4a7a' },
}

export const defaultTheme = themes[1]

export function getTheme(id: number) {
  return themes[id] || themes[1]
}