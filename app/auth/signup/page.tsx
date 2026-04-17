'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSignup = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signUp({ email, password })
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
          Join Thousands of<br />Amazon Sellers.
        </h2>
        <p style={{ color: '#7c8099', fontSize: '15px', lineHeight: 1.7, marginBottom: '40px', maxWidth: '360px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Create your free account and get unlimited access to all three powerful Amazon tools.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            '✓ Unlimited appeal generations — all 10 types',
            '✓ Save and manage your full appeal history',
            '✓ Compliant content checker — US, UK, CA',
            '✓ SEO content optimizer — 7 marketplaces',
            '✓ Delete confirmation and history management',
            '✓ Always free — no credit card ever needed',
          ].map(item => (
            <div key={item} style={{ fontSize: '14px', color: '#4ef4b0', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{item}</div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px' }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div style={{ width: '56px', height: '56px', background: 'linear-gradient(135deg, #5e9ef4, #7c5ef4)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', margin: '0 auto 16px' }}>⚡</div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 800, color: '#e8eaf2', marginBottom: '8px' }}>Create free account</h1>
            <p style={{ color: '#7c8099', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Join Wextrion today — always free</p>
          </div>

          <form onSubmit={handleSignup}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#7c8099', marginBottom: '6px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com" required
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '14px 16px', color: '#e8eaf2', fontSize: '15px', outline: 'none', fontFamily: 'Plus Jakarta Sans, sans-serif' }} />
            </div>
            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#7c8099', marginBottom: '6px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Create a password" required
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '14px 16px', color: '#e8eaf2', fontSize: '15px', outline: 'none', fontFamily: 'Plus Jakarta Sans, sans-serif' }} />
            </div>
            {error && (
              <div style={{ background: 'rgba(244,94,94,0.08)', border: '1px solid rgba(244,94,94,0.2)', borderRadius: '8px', padding: '10px 14px', marginBottom: '16px' }}>
                <p style={{ color: '#f45e5e', fontSize: '13px', margin: 0 }}>{error}</p>
              </div>
            )}
            <button type="submit" disabled={loading}
              style={{ width: '100%', padding: '15px', background: 'linear-gradient(135deg, #5e9ef4, #7c5ef4)', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '16px', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {loading ? 'Creating account...' : 'Create Free Account →'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#7c8099', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Already have an account?{' '}
            <Link href="/auth/login" style={{ color: '#5e9ef4', textDecoration: 'none', fontWeight: 600 }}>Sign in</Link>
          </p>

          <div style={{ marginTop: '28px', padding: '14px 16px', background: 'rgba(78,244,176,0.06)', border: '1px solid rgba(78,244,176,0.15)', borderRadius: '10px', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', color: '#4ef4b0', margin: 0, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              ✓ No credit card required · Always free · Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}