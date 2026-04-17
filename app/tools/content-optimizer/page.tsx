'use client'
import { useState } from 'react'
import Link from 'next/link'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import { useTheme } from '@/components/ThemeProvider'

function generateOptimizedContent(
  currentTitle: string,
  marketplace: string,
  keywords: string,
  features: string,
  notes: string
): any {
  const kws = keywords.split('\n').filter(k => k.trim()).slice(0, 10)
  const featureList = features.split('\n').filter(f => f.trim())
  const topKws = kws.slice(0, 5).map(k => k.trim()).join(', ')
  const productName = currentTitle || 'Product'

  const title = `${productName} — ${kws[0] || 'Premium Quality'} | ${kws[1] || 'Best Value'} | ${marketplace === 'UK' ? 'UK' : marketplace === 'CA' ? 'Canada' : 'USA'} ${new Date().getFullYear()}`

  const bullets = [
    `✅ ${featureList[0] || `PREMIUM QUALITY — Our ${productName} is crafted with the highest quality materials, designed to exceed your expectations and deliver outstanding results every time.`}`,
    `✅ ${featureList[1] || `PERFECT FOR EVERYDAY USE — Whether at home, work, or on the go, this ${productName} fits seamlessly into your lifestyle and delivers consistent performance.`}`,
    `✅ ${featureList[2] || `EASY TO USE — Designed with simplicity in mind, our ${productName} requires no complicated setup. Simply use it straight out of the box for immediate results.`}`,
    `✅ ${featureList[3] || `GREAT VALUE — Get more for your money with our ${productName}. We believe everyone deserves access to quality products at an affordable price.`}`,
    `✅ 100% SATISFACTION GUARANTEED — We stand behind every ${productName} we sell. If you are not completely satisfied, we will make it right. Your satisfaction is our priority.`,
  ]

  const description = `Introducing the ${productName} — the perfect solution for those who demand quality, reliability, and value.

${notes ? `${notes}\n\n` : ''}Designed with our customers in mind, the ${productName} combines exceptional craftsmanship with practical functionality. Whether you are a first-time buyer or a long-time fan of quality products, you will immediately notice the difference.

KEY BENEFITS:
${featureList.map(f => `• ${f}`).join('\n') || `• Premium quality construction\n• Designed for everyday use\n• Easy to use right out of the box\n• Exceptional value for money`}

WHY CHOOSE US:
We are passionate about delivering products that make a real difference in your daily life. Every ${productName} goes through strict quality control before reaching your hands.

${topKws ? `PERFECT FOR: ${topKws}` : ''}

Order today and experience the ${productName} difference. We are confident you will love it — and if for any reason you do not, our customer service team is here to help.`

  const backendKeywords = kws.join(' ') + (notes ? ' ' + notes.toLowerCase().replace(/[^a-z0-9 ]/g, ' ') : '')

  return { title, bullets, description, backendKeywords }
}

export default function ContentOptimizer() {
  const { theme } = useTheme()
  const [marketplace, setMarketplace] = useState('US')
  const [currentTitle, setCurrentTitle] = useState('')
  const [keywords, setKeywords] = useState('')
  const [features, setFeatures] = useState('')
  const [notes, setNotes] = useState('')
  const [result, setResult] = useState<any>(null)
  const [copied, setCopied] = useState('')
  const [activeTab, setActiveTab] = useState('title')

  const generate = () => {
    if (!currentTitle.trim()) return
    const output = generateOptimizedContent(currentTitle, marketplace, keywords, features, notes)
    setResult(output)
    setActiveTab('title')
  }

  const reset = () => {
    setCurrentTitle('')
    setKeywords('')
    setFeatures('')
    setNotes('')
    setResult(null)
    setCopied('')
  }

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(''), 2000)
  }

  const tabs = [
    { key: 'title', label: 'Title' },
    { key: 'bullets', label: 'Bullet Points' },
    { key: 'description', label: 'Description' },
    { key: 'backend', label: 'Backend Keywords' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, display: 'flex', flexDirection: 'column' }}>

      {/* Navbar */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 28px', borderBottom: `1px solid ${theme.accent}18` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '28px', height: '28px', background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})`, borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>⚡</div>
          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: 800, color: theme.text }}>Wextrion</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ThemeSwitcher />
          <Link href="/dashboard" style={{ fontSize: '13px', color: theme.muted, textDecoration: 'none' }}>← Dashboard</Link>
        </div>
      </nav>

      <div style={{ flex: 1, maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '32px 40px' }}>

        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '26px', fontWeight: 800, color: theme.text, marginBottom: '6px' }}>✨ Content Optimizer</h1>
          <p style={{ color: theme.muted, fontSize: '14px' }}>Generate SEO-optimized Amazon listing content that attracts customers and converts.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: result ? '1fr 1fr' : '1fr', gap: '24px' }}>

          {/* INPUT */}
          <div>
            <div style={{ background: `${theme.surface}cc`, border: `1px solid ${theme.accent}18`, borderRadius: '16px', padding: '24px' }}>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: theme.muted, marginBottom: '6px' }}>Marketplace</label>
                <select value={marketplace} onChange={e => setMarketplace(e.target.value)}
                  style={{ width: '100%', background: `${theme.accent}08`, border: `1px solid ${theme.accent}22`, borderRadius: '8px', padding: '10px 14px', color: theme.text, fontSize: '14px', outline: 'none' }}>
                  {['US', 'UK', 'CA', 'DE', 'FR', 'IT', 'ES'].map(m => (
                    <option key={m} value={m} style={{ background: theme.surface }}>Amazon {m}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: theme.muted, marginBottom: '6px' }}>Current Product Title *</label>
                <input value={currentTitle} onChange={e => setCurrentTitle(e.target.value)}
                  placeholder="e.g. LifePro Vibration Plate Machine"
                  style={{ width: '100%', background: `${theme.accent}08`, border: `1px solid ${theme.accent}22`, borderRadius: '8px', padding: '11px 14px', color: theme.text, fontSize: '14px', outline: 'none' }} />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: theme.muted, marginBottom: '6px' }}>
                  Keywords (one per line)
                  <span style={{ color: theme.muted, marginLeft: '8px', fontSize: '11px', opacity: 0.6 }}>Paste from your keyword sheet</span>
                </label>
                <textarea value={keywords} onChange={e => setKeywords(e.target.value)}
                  placeholder="vibration plate&#10;whole body vibration machine&#10;vibration platform&#10;exercise vibration plate"
                  rows={6}
                  style={{ width: '100%', background: `${theme.accent}08`, border: `1px solid ${theme.accent}22`, borderRadius: '8px', padding: '11px 14px', color: theme.text, fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }} />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: theme.muted, marginBottom: '6px' }}>
                  Product Features (one per line)
                  <span style={{ color: theme.muted, marginLeft: '8px', fontSize: '11px', opacity: 0.6 }}>Key selling points</span>
                </label>
                <textarea value={features} onChange={e => setFeatures(e.target.value)}
                  placeholder="99 speed levels for customized intensity&#10;Bluetooth remote control included&#10;Ultra quiet motor under 40dB"
                  rows={6}
                  style={{ width: '100%', background: `${theme.accent}08`, border: `1px solid ${theme.accent}22`, borderRadius: '8px', padding: '11px 14px', color: theme.text, fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }} />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: theme.muted, marginBottom: '6px' }}>
                  Additional Notes (Optional)
                  <span style={{ color: theme.muted, marginLeft: '8px', fontSize: '11px', opacity: 0.6 }}>Target audience, tone, anything extra</span>
                </label>
                <textarea value={notes} onChange={e => setNotes(e.target.value)}
                  placeholder="Target audience: fitness enthusiasts aged 30-60. Tone: professional but friendly..."
                  rows={3}
                  style={{ width: '100%', background: `${theme.accent}08`, border: `1px solid ${theme.accent}22`, borderRadius: '8px', padding: '11px 14px', color: theme.text, fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }} />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={generate} disabled={!currentTitle.trim()}
                  style={{ flex: 1, padding: '13px', background: currentTitle.trim() ? `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})` : `${theme.accent}18`, color: currentTitle.trim() ? theme.bg : theme.muted, border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '15px', cursor: currentTitle.trim() ? 'pointer' : 'not-allowed' }}>
                  Generate Optimized Content →
                </button>
                {result && (
                  <button onClick={reset} style={{ padding: '13px 20px', background: 'transparent', border: `1px solid ${theme.accent}33`, borderRadius: '10px', color: theme.muted, cursor: 'pointer', fontSize: '14px' }}>
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* OUTPUT */}
          {result && (
            <div>
              {/* Tabs */}
              <div style={{ display: 'flex', gap: '4px', marginBottom: '16px', background: `${theme.surface}cc`, border: `1px solid ${theme.accent}18`, borderRadius: '10px', padding: '4px' }}>
                {tabs.map(tab => (
                  <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                    style={{ flex: 1, padding: '8px', background: activeTab === tab.key ? `${theme.accent}22` : 'transparent', border: activeTab === tab.key ? `1px solid ${theme.accent}44` : '1px solid transparent', borderRadius: '7px', color: activeTab === tab.key ? theme.accent : theme.muted, cursor: 'pointer', fontSize: '12px', fontWeight: activeTab === tab.key ? 700 : 400 }}>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Title Tab */}
              {activeTab === 'title' && (
                <div style={{ background: `${theme.surface}cc`, border: `1px solid ${theme.accent}18`, borderRadius: '12px', padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '16px', fontWeight: 700, color: theme.text }}>Optimized Title</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '11px', color: result.title.length > 200 ? '#f45e5e' : '#4ef4b0' }}>{result.title.length}/200 chars</span>
                      <button onClick={() => copyText(result.title, 'title')}
                        style={{ padding: '6px 14px', background: copied === 'title' ? 'rgba(78,244,176,0.1)' : `${theme.accent}18`, border: `1px solid ${copied === 'title' ? 'rgba(78,244,176,0.3)' : theme.accent + '33'}`, borderRadius: '6px', color: copied === 'title' ? '#4ef4b0' : theme.accent, cursor: 'pointer', fontSize: '12px' }}>
                        {copied === 'title' ? '✓ Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>
                  <p style={{ color: theme.text, fontSize: '14px', lineHeight: 1.7, background: `${theme.accent}08`, padding: '14px', borderRadius: '8px', border: `1px solid ${theme.accent}18` }}>
                    {result.title}
                  </p>
                </div>
              )}

              {/* Bullets Tab */}
              {activeTab === 'bullets' && (
                <div style={{ background: `${theme.surface}cc`, border: `1px solid ${theme.accent}18`, borderRadius: '12px', padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '16px', fontWeight: 700, color: theme.text }}>Bullet Points</h3>
                    <button onClick={() => copyText(result.bullets.join('\n\n'), 'bullets')}
                      style={{ padding: '6px 14px', background: copied === 'bullets' ? 'rgba(78,244,176,0.1)' : `${theme.accent}18`, border: `1px solid ${copied === 'bullets' ? 'rgba(78,244,176,0.3)' : theme.accent + '33'}`, borderRadius: '6px', color: copied === 'bullets' ? '#4ef4b0' : theme.accent, cursor: 'pointer', fontSize: '12px' }}>
                      {copied === 'bullets' ? '✓ Copied!' : 'Copy All'}
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {result.bullets.map((bullet: string, i: number) => (
                      <div key={i} style={{ background: `${theme.accent}08`, padding: '12px 14px', borderRadius: '8px', border: `1px solid ${theme.accent}18`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                        <p style={{ color: theme.text, fontSize: '13px', lineHeight: 1.7, margin: 0, flex: 1 }}>{bullet}</p>
                        <button onClick={() => copyText(bullet, `bullet-${i}`)}
                          style={{ padding: '4px 10px', background: 'transparent', border: `1px solid ${theme.accent}33`, borderRadius: '5px', color: theme.muted, cursor: 'pointer', fontSize: '11px', flexShrink: 0 }}>
                          {copied === `bullet-${i}` ? '✓' : 'Copy'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description Tab */}
              {activeTab === 'description' && (
                <div style={{ background: `${theme.surface}cc`, border: `1px solid ${theme.accent}18`, borderRadius: '12px', padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '16px', fontWeight: 700, color: theme.text }}>Product Description</h3>
                    <button onClick={() => copyText(result.description, 'description')}
                      style={{ padding: '6px 14px', background: copied === 'description' ? 'rgba(78,244,176,0.1)' : `${theme.accent}18`, border: `1px solid ${copied === 'description' ? 'rgba(78,244,176,0.3)' : theme.accent + '33'}`, borderRadius: '6px', color: copied === 'description' ? '#4ef4b0' : theme.accent, cursor: 'pointer', fontSize: '12px' }}>
                      {copied === 'description' ? '✓ Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre style={{ color: theme.text, fontSize: '13px', lineHeight: 1.8, whiteSpace: 'pre-wrap', fontFamily: 'inherit', background: `${theme.accent}08`, padding: '14px', borderRadius: '8px', border: `1px solid ${theme.accent}18`, maxHeight: '500px', overflowY: 'auto' }}>
                    {result.description}
                  </pre>
                </div>
              )}

              {/* Backend Tab */}
              {activeTab === 'backend' && (
                <div style={{ background: `${theme.surface}cc`, border: `1px solid ${theme.accent}18`, borderRadius: '12px', padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '16px', fontWeight: 700, color: theme.text }}>Backend Search Terms</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '11px', color: result.backendKeywords.length > 250 ? '#f45e5e' : '#4ef4b0' }}>{result.backendKeywords.length}/250 bytes</span>
                      <button onClick={() => copyText(result.backendKeywords, 'backend')}
                        style={{ padding: '6px 14px', background: copied === 'backend' ? 'rgba(78,244,176,0.1)' : `${theme.accent}18`, border: `1px solid ${copied === 'backend' ? 'rgba(78,244,176,0.3)' : theme.accent + '33'}`, borderRadius: '6px', color: copied === 'backend' ? '#4ef4b0' : theme.accent, cursor: 'pointer', fontSize: '12px' }}>
                        {copied === 'backend' ? '✓ Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>
                  <p style={{ color: theme.text, fontSize: '13px', lineHeight: 1.7, background: `${theme.accent}08`, padding: '14px', borderRadius: '8px', border: `1px solid ${theme.accent}18`, wordBreak: 'break-all' }}>
                    {result.backendKeywords}
                  </p>
                  <div style={{ marginTop: '12px', padding: '10px 14px', background: `${theme.accent}08`, border: `1px solid ${theme.accent}22`, borderRadius: '8px' }}>
                    <p style={{ fontSize: '12px', color: