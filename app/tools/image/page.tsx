'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('')
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generateImage = async () => {
    if (!prompt.trim()) return
    setLoading(true)
    setError('')
    setImage('')

    try {
      const res = await fetch('/api/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      })
      const data = await res.json()
      if (data.image) setImage(data.image)
      else setError('Failed to generate image. Please try again.')
    } catch {
      setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0b0c10', display: 'flex', flexDirection: 'column' }}>
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 32px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '28px', height: '28px', background: 'linear-gradient(135deg, #5e9ef4, #7c5ef4)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>⚡</div>
          <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '18px', fontWeight: 800, color: '#e8eaf2' }}>Wextrion</span>
        </div>
        <Link href="/dashboard" style={{ fontSize: '13px', color: '#7c8099', textDecoration: 'none' }}>← Back to Dashboard</Link>
      </nav>

      <div style={{ flex: 1, maxWidth: '800px', width: '100%', margin: '0 auto', padding: '24px 20px' }}>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '24px', fontWeight: 800, color: '#e8eaf2', marginBottom: '8px' }}>🎨 Image Designer</h1>
        <p style={{ color: '#7c8099', fontSize: '14px', marginBottom: '32px' }}>Generate stunning images from text descriptions</p>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
          <input
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && generateImage()}
            placeholder="A futuristic city at sunset, ultra HD, photorealistic..."
            style={{ flex: 1, background: 'rgba(19,21,28,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '14px 18px', color: '#e8eaf2', fontSize: '14px', outline: 'none' }}
          />
          <button onClick={generateImage} disabled={loading} style={{ padding: '14px 24px', background: 'linear-gradient(135deg, #5e9ef4, #7c5ef4)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '80px 20px', background: 'rgba(19,21,28,0.6)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎨</div>
            <p style={{ color: '#7c8099', fontSize: '16px' }}>Creating your image...</p>
            <p style={{ color: '#7c8099', fontSize: '13px', marginTop: '8px' }}>This takes about 10-20 seconds</p>
          </div>
        )}

        {error && (
          <div style={{ padding: '16px', background: 'rgba(244,94,94,0.08)', border: '1px solid rgba(244,94,94,0.2)', borderRadius: '12px', color: '#f45e5e', fontSize: '14px' }}>
            {error}
          </div>
        )}

        {image && (
          <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
            <img src={image} alt={prompt} style={{ width: '100%', display: 'block' }} />
            <div style={{ padding: '16px', background: 'rgba(19,21,28,0.8)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#7c8099' }}>{prompt}</span>
              <a href={image} download="wextrion-image.png" style={{ padding: '8px 16px', background: 'linear-gradient(135deg, #5e9ef4, #7c5ef4)', color: 'white', borderRadius: '8px', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}>
                Download
              </a>
            </div>
          </div>
        )}

        {!loading && !image && !error && (
          <div style={{ textAlign: 'center', padding: '80px 20px', background: 'rgba(19,21,28,0.6)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎨</div>
            <p style={{ color: '#7c8099', fontSize: '16px' }}>Enter a prompt above to generate an image</p>
          </div>
        )}
      </div>
    </div>
  )
}