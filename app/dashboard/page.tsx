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

  const appeals = [
    { icon: '🔴', name: 'Andon Cord POA', desc: 'Fire, smoke, safety or injury complaints', color: '#f45e5e', type: 'andon' },
    { icon: '🚫', name: 'Account Suspension', desc: 'Performance metrics or policy violations', color: '#5e9ef4', type: 'suspension' },
    { icon: '📦', name: 'Listing Reinstatement', desc: 'Suppressed, removed or blocked listings', color: '#7c5ef4', type: 'listing' },
    { icon: '⚖️', name: 'IP / Counterfeit', desc: 'Intellectual property and trademark claims', color: '#f4c45e', type: 'ip' },
    { icon: '🏥', name: 'FDA / Health Violations', desc: 'Medical device and health claim issues', color: '#4ef4b0', type: 'fda' },
    { icon: '↩️', name: 'High Return Rate', desc: 'Excessive returns and defect rate appeals', color: '#f4845e', type: 'return' },
    { icon: '🚚', name: 'Late Shipment', desc: 'Late dispatch rate and fulfillment issues', color: '#5ef4f4', type: 'shipment' },
    { icon: '⭐', name: 'Negative Feedback', desc: 'Feedback removal and rating appeals', color: '#c45ef4', type: 'feedback' },
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
          <button onClick={async () => { await supabase.auth.signOut(); router.push('/') }} style={{ padding: '8px 16px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#7c8099', cursor: 'pointer', fontSize: '13px' }}>
            Logout
          </button>
        </div>
      </nav>

      <div style={{ padding: '48px 40px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '32px', fontWeight: 800, color: '#e8eaf2', marginBottom: '8px' }}>
            Appeal Generator 📋
          </h1>
          <p style={{ color: '#7c8099', fontSize: '15px' }}>Select the type of appeal you need to generate</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          {appeals.map((appeal) => (
            <Link key={appeal.type} href={`/tools/compliance?type=${appeal.type}`} style={{ textDecoration: 'none' }}>
              <div style={{ background: 'rgba(19,21,28,0.8)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px', cursor: 'pointer', position: 'relative', overflow: 'hidden', transition: 'all 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(94,158,244,0.3)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${appeal.color}, transparent)` }} />
                <div style={{ fontSize: '28px', marginBottom: '12px' }}>{appeal.icon}</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '16px', fontWeight: 700, color: '#e8eaf2', marginBottom: '6px' }}>{appeal.name}</div>
                <div style={{ fontSize: '12px', color: '#7c8099', lineHeight: 1.5, marginBottom: '16px' }}>{appeal.desc}</div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: appeal.color }}>Generate Appeal →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}