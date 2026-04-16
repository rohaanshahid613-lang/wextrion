'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    else router.push('/dashboard')
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0b0c10', display: 'flex', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-100px', left: '-80px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(94,158,244,0.10) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '0', right: '-60px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(124,94,244,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* LEFT SIDE */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '48px' }}>
          <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #5e9ef4, #7c5ef4)', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>⚡</div>
          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', fontWeight: 800, color: '#e8eaf2' }}>Wextrion</span>
        </div>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '36px', fontWeight: 800, color: '#e8eaf2', lineHeight: 1.2, marginBottom: '16px' }}>
          Your Amazon<br />Toolkit Awaits.
        </h2>
        <p style={{ color: '#7c8099', fontSize: '15px', lineHeight: 1.7, marginBottom: '40px', maxWidth: '360px' }}>
          Sign in to access all three powerful tools built exclusively for Amazon sellers.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { icon: '📋', name: 'Appeal & POA Writer', desc: 'Generate professional Amazon appeals instantly', color: '#5e9ef4' },
            { icon: '🔍', name: 'Compliant Content Checker', desc: 'Detect risky claims and get safe alternatives', color: '#f4c45e' },
            { icon: '✨', name: 'Content Optimizer', desc: 'Create SEO-optimized titles, bullets and descriptions', color: '#4ef4b0' },
          ].map(tool => (
            <div key={tool.name} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', background: 'rgba(19,21,28,0.6)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px' }}>
              <div style={{ fontSize: '22px', flexShrink: 0 }}>{tool.icon}</div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: tool.color, marginBottom: '2px' }}>{tool.name}</div>
                <div style={{ fontSize: '12px', color: '#7c8099' }}>{tool.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 800, color: '#e8eaf2', marginBottom: '8px' }}>Welcome back</h1>
            <p style={{ color: '#7c8099', fontSize: '14px' }}>Sign in to your Wextrion account</p>
          </div>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#7c8099', marginBottom: '6px' }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com" required
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '12px 16px', color: '#e8eaf2', fontSize: '14px', outline: 'none' }} />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#7c8099', marginBottom: '6px' }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" required
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '12px 16px', color: '#e8eaf2', fontSize: '14px', outline: 'none' }} />
            </div>
            {error && <p style={{ color: '#f45e5e', fontSize: '13px', marginBottom: '16px' }}>{error}</p>}
            <button type="submit" disabled={loading}
              style={{ width: '100%', padding: '13px', background: 'linear-gradient(135deg, #5e9ef4, #7c5ef4)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '15px', cursor: 'pointer' }}>
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>
          <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#7c8099' }}>
            No account?{' '}
            <Link href="/auth/signup" style={{ color: '#5e9ef4', textDecoration: 'none', fontWeight: 600 }}>Sign up free</Link>
          </p>
          <div style={{ marginTop: '32px', padding: '14px 16px', background: 'rgba(78,244,176,0.06)', border: '1px solid rgba(78,244,176,0.15)', borderRadius: '8px', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', color: '#4ef4b0', margin: 0 }}>✓ No credit card required · Always free</p>
          </div>
        </div>
      </div>
    </div>
  )
}