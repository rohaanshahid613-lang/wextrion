'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push('/auth/login')
      else setUser(session.user)
    })
  }, [])

  const tools = [
    { icon: '📋', name: 'Appeal & POA Writer', desc: 'Andon Cord, Suspension, Listing, IP, FDA and more', color: '#5e9ef4', href: '/tools/compliance' },
    { icon: '🔍', name: 'Compliant Content Checker', desc: 'Highlight risky claims and get safe alternatives instantly', color: '#f4c45e', href: '/tools/content-checker' },
    { icon: '✨', name: 'Content Optimizer', desc: 'Generate SEO optimized titles, bullets and descriptions', color: '#4ef4b0', href: '/tools/content-optimizer' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#0b0c10' }}>
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 40px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #5e9ef4, #7c5ef4)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>⚡</div>
          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 800, color: '#e8eaf2' }}>Wextrion</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '13px', color: '#7c8099' }}>{user?.email}</span>
          <button onClick={async () => { await supabase.auth.signOut(); router.push('/') }}
            style={{ padding: '8px 16px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#7c8099', cursor: 'pointer', fontSize: '13px' }}>
            Logout
          </button>
        </div>
      </nav>

      <div style={{ padding: '48px 40px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '32px', fontWeight: 800, color: '#e8eaf2', marginBottom: '8px' }}>
            Welcome to Wextrion 👋
          </h1>
          <p style={{ color: '#7c8099', fontSize: '15px' }}>Your Amazon toolkit — choose a tool to get started</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {tools.map((tool) => (
            <Link key={tool.name} href={tool.href} style={{ textDecoration: 'none' }}>
              <div style={{ background: 'rgba(19,21,28,0.8)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '32px', cursor: 'pointer', position: 'relative', overflow: 'hidden', transition: 'all 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(94,158,244,0.3)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${tool.color}, transparent)` }} />
                <div style={{ fontSize: '36px', marginBottom: '16px' }}>{tool.icon}</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 700, color: '#e8eaf2', marginBottom: '8px' }}>{tool.name}</div>
                <div style={{ fontSize: '14px', color: '#7c8099', lineHeight: 1.6, marginBottom: '20px' }}>{tool.desc}</div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: tool.color }}>Open tool →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}