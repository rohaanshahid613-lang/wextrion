'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [showWelcome, setShowWelcome] = useState(false)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push('/auth/login')
      else {
        setUser(session.user)
        const key = `wextrion_welcomed_${session.user.id}`
        if (!localStorage.getItem(key)) {
          setShowWelcome(true)
          localStorage.setItem(key, 'true')
        }
      }
    })
  }, [])

  const getName = (email: string) => {
    if (!email) return 'there'
    const prefix = email.split('@')[0]
    return prefix.charAt(0).toUpperCase() + prefix.slice(1)
  }

  const tools = [
    { icon: '📋', name: 'Appeal & POA Writer', desc: 'Generate professional Plans of Action for Andon Cord, Suspension, Listing, IP, FDA, Safety Violations and more', color: '#5e9ef4', href: '/tools/compliance', badge: '10 Appeal Types' },
    { icon: '🔍', name: 'Compliant Content Checker', desc: 'Detect risky claims in your listings and get safe alternatives instantly', color: '#f4c45e', href: '/tools/content-checker', badge: 'US · UK · CA' },
    { icon: '✨', name: 'Content Optimizer', desc: 'Generate SEO-optimized titles, bullet points, descriptions and backend keywords that convert', color: '#4ef4b0', href: '/tools/content-optimizer', badge: '7 Marketplaces' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#0b0c10' }}>

      {/* Welcome Popup */}
      {showWelcome && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#13151c', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '40px', maxWidth: '480px', width: '100%', textAlign: 'center', position: 'relative' }}>

            {/* Top glow */}
            <div style={{ position: 'absolute', top: '-40px', left: '50%', transform: 'translateX(-50%)', width: '200px', height: '80px', background: 'radial-gradient(circle, rgba(94,158,244,0.3) 0%, transparent 70%)', pointerEvents: 'none' }} />

            {/* Logo */}
            <div style={{ width: '56px', height: '56px', background: 'linear-gradient(135deg, #5e9ef4, #7c5ef4)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', margin: '0 auto 20px' }}>⚡</div>

            {/* Headline */}
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '26px', fontWeight: 800, color: '#e8eaf2', marginBottom: '8px' }}>
              Welcome to Wextrion,<br />
              <span style={{ background: 'linear-gradient(135deg, #5e9ef4, #7c5ef4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {user ? getName(user.email) : 'there'}!
              </span>
            </h2>

            <p style={{ color: '#7c8099', fontSize: '14px', marginBottom: '28px', lineHeight: 1.6, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Your Amazon toolkit is ready. You now have full access to all 3 powerful tools — completely free, no limits, no credit card ever.
            </p>

            {/* 3 Tools */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px', textAlign: 'left' }}>
              {[
                { icon: '📋', name: 'Appeal & POA Writer', desc: 'Professional Plans of Action for any Amazon violation in seconds', color: '#5e9ef4' },
                { icon: '🔍', name: 'Compliant Content Checker', desc: 'Detect risky claims and get safe alternatives instantly', color: '#f4c45e' },
                { icon: '✨', name: 'Content Optimizer', desc: 'SEO-optimized titles, bullets, descriptions and backend keywords', color: '#4ef4b0' },
              ].map(tool => (
                <div key={tool.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px' }}>
                  <span style={{ fontSize: '20px', flexShrink: 0 }}>{tool.icon}</span>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: tool.color, marginBottom: '2px' }}>{tool.name}</div>
                    <div style={{ fontSize: '11px', color: '#7c8099', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{tool.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(78,244,176,0.08)', border: '1px solid rgba(78,244,176,0.2)', color: '#4ef4b0', fontSize: '12px', padding: '6px 16px', borderRadius: '20px', marginBottom: '24px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              ✓ No limits · No credit card · Always free
            </div>

            {/* CTA Button */}
            <button
              onClick={() => setShowWelcome(false)}
              style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #5e9ef4, #7c5ef4)', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '16px', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Let's Get Started →
            </button>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 40px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #5e9ef4, #7c5ef4)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>⚡</div>
          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 800, color: '#e8eaf2' }}>Wextrion</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '13px', color: '#7c8099', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            {user ? `👋 ${getName(user.email)}` : ''}
          </span>
          <button onClick={async () => { await supabase.auth.signOut(); router.push('/') }}
            style={{ padding: '8px 16px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#7c8099', cursor: 'pointer', fontSize: '13px' }}>
            Logout
          </button>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div style={{ padding: '48px 40px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '32px', fontWeight: 800, color: '#e8eaf2', marginBottom: '8px' }}>
            Your Amazon Toolkit 🚀
          </h1>
          <p style={{ color: '#7c8099', fontSize: '15px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Choose a tool to get started — all tools are free, no limits
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {tools.map((tool) => (
            <Link key={tool.name} href={tool.href} style={{ textDecoration: 'none' }}>
              <div style={{ background: 'rgba(19,21,28,0.8)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '32px', cursor: 'pointer', position: 'relative', overflow: 'hidden', transition: 'all 0.2s', height: '100%' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(94,158,244,0.3)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${tool.color}, transparent)` }} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ fontSize: '36px' }}>{tool.icon}</div>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: tool.color, background: `rgba(${tool.color === '#5e9ef4' ? '94,158,244' : tool.color === '#f4c45e' ? '244,196,94' : '78,244,176'},0.1)`, padding: '3px 10px', borderRadius: '20px', border: `1px solid ${tool.color}33` }}>{tool.badge}</span>
                </div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 700, color: '#e8eaf2', marginBottom: '8px' }}>{tool.name}</div>
                <div style={{ fontSize: '14px', color: '#7c8099', lineHeight: 1.6, marginBottom: '20px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{tool.desc}</div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: tool.color }}>Open tool →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}