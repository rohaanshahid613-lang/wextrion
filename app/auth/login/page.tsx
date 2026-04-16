'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.push('/dashboard')
    })
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) router.push('/dashboard')
    })
  }, [])

  const handleLogin = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    else router.push('/dashboard')
    setLoading(false)
  }

  const handleGoogleLogin = async () => {
    setGoogleLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: 'https://wextrion.vercel.app/auth/callback' }
    })
    if (error) setError(error.message)
    setGoogleLoading(false)
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
        <p style={{ color: '#7c8099', fontSize: '15px', lineHeight: 1.7, marginBottom: '40px', maxWidth: '360px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Sign in to access all three powerful tools built exclusively for Amazon sellers.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { icon: '📋', name: 'Appeal & POA Writer', desc: '10 appeal types — professional quality responses', color: '#5e9ef4' },
            { icon: '🔍', name: 'Compliant Content Checker', desc: 'Detect risky claims and get safe alternatives', color: '#f4c45e' },
            { icon: '✨', name: 'Content Optimizer', desc: 'SEO-optimized titles, bullets and descriptions', color: '#4ef4b0' },
          ].map(tool => (
            <div key={tool.name} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', background: 'rgba(19,21,28,0.6)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px' }}>
              <div style={{ fontSize: '22px', flexShrink: 0 }}>{tool.icon}</div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: tool.color, marginBottom: '2px' }}>{tool.name}</div>
                <div style={{ fontSize: '12px', color: '#7c8099', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{tool.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 800, color: '#e8eaf2', marginBottom: '8px' }}>Welcome back</h1>
            <p style={{ color: '#7c8099', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Sign in to your Wextrion account</p>
          </div>

          {/* Google Button */}
          <button onClick={handleGoogleLogin} disabled={googleLoading}
            style={{ width: '100%', padding: '13px', background: 'white', color: '#1a1a1a', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {googleLoading ? 'Signing in...' : 'Continue with Google'}
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
            <span style={{ fontSize: '12px', color: '#404357', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>or sign in with email</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
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

          <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#7c8099', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            No account?{' '}
            <Link href="/auth/signup" style={{ color: '#5e9ef4', textDecoration: 'none', fontWeight: 600 }}>Sign up free</Link>
          </p>

          <div style={{ marginTop: '24px', padding: '14px 16px', background: 'rgba(78,244,176,0.06)', border: '1px solid rgba(78,244,176,0.15)', borderRadius: '8px', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', color: '#4ef4b0', margin: 0, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>✓ No credit card required · Always free</p>
          </div>
        </div>
      </div>
    </div>
  )
}