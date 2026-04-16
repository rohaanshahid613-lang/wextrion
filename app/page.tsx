'use client'
import Link from 'next/link'

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: '#0b0c10', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-100px', left: '-80px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(94,158,244,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '50px', right: '-60px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(124,94,244,0.10) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '0', left: '30%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(78,244,176,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <nav style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 40px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #5e9ef4, #7c5ef4)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>⚡</div>
          <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '20px', fontWeight: 800, color: '#e8eaf2' }}>Wextrion</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Link href="/auth/login" style={{ padding: '8px 20px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', color: '#e8eaf2', textDecoration: 'none', fontSize: '14px' }}>Login</Link>
          <Link href="/auth/signup" style={{ padding: '8px 20px', borderRadius: '8px', background: 'linear-gradient(135deg, #5e9ef4, #7c5ef4)', color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>Sign Up Free</Link>
        </div>
      </nav>

      <div style={{ position: 'relative', zIndex: 5, textAlign: 'center', padding: '90px 20px 60px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(94,158,244,0.08)', border: '1px solid rgba(94,158,244,0.2)', color: '#5e9ef4', fontSize: '12px', padding: '6px 16px', borderRadius: '20px', marginBottom: '24px' }}>
          <span style={{ width: '6px', height: '6px', background: '#5e9ef4', borderRadius: '50%', display: 'inline-block' }}></span>
          Amazon Sellers · All Marketplaces · Always Free
        </div>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '58px', fontWeight: 800, lineHeight: 1.1, marginBottom: '20px', background: 'linear-gradient(135deg, #e8eaf2 0%, #5e9ef4 55%, #7c5ef4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Get Your Amazon<br />Account Reinstated.
        </h1>
        <p style={{ fontSize: '18px', color: '#7c8099', maxWidth: '520px', margin: '0 auto 40px', fontWeight: 300, lineHeight: 1.6 }}>
          Generate professional Plans of Action, appeal letters and compliance documents for every Amazon violation — instantly. No signup required.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/tools/compliance" style={{ display: 'inline-block', padding: '14px 40px', background: 'linear-gradient(135deg, #5e9ef4, #7c5ef4)', color: 'white', textDecoration: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '16px' }}>
            Generate Appeal Free →
          </Link>
          <Link href="/auth/signup" style={{ display: 'inline-block', padding: '14px 32px', background: 'transparent', color: '#e8eaf2', textDecoration: 'none', borderRadius: '10px', fontWeight: 600, fontSize: '15px', border: '1px solid rgba(255,255,255,0.15)' }}>
            Create Account
          </Link>
        </div>

        <div style={{ display: 'flex', gap: '32px', justifyContent: 'center', marginTop: '48px', flexWrap: 'wrap' }}>
          {[
            { num: '8+', label: 'Appeal Types' },
            { num: '7', label: 'Marketplaces' },
            { num: '100%', label: 'Free Forever' },
            { num: '3', label: 'Free Without Signup' },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '28px', fontWeight: 800, color: '#5e9ef4' }}>{stat.num}</div>
              <div style={{ fontSize: '13px', color: '#7c8099' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 5, maxWidth: '1100px', margin: '0 auto', padding: '0 40px 80px' }}>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '28px', fontWeight: 700, color: '#e8eaf2', textAlign: 'center', marginBottom: '32px' }}>Every Amazon Appeal Type Covered</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
          {[
            { icon: '🔴', name: 'Andon Cord POA', desc: 'Fire, smoke, safety complaints', type: 'andon' },
            { icon: '🚫', name: 'Account Suspension', desc: 'Performance & policy violations', type: 'suspension' },
            { icon: '📦', name: 'Listing Reinstatement', desc: 'Suppressed or removed listings', type: 'listing' },
            { icon: '⚖️', name: 'IP / Counterfeit', desc: 'Trademark & IP complaints', type: 'ip' },
            { icon: '🏥', name: 'FDA Violations', desc: 'Medical & health claim issues', type: 'fda' },
            { icon: '↩️', name: 'High Return Rate', desc: 'Return rate defense', type: 'return' },
            { icon: '🚚', name: 'Late Shipment', desc: 'Fulfillment & dispatch issues', type: 'shipment' },
            { icon: '⭐', name: 'Negative Feedback', desc: 'Feedback removal appeals', type: 'feedback' },
          ].map((item) => (
            <Link key={item.type} href={`/tools/compliance?type=${item.type}`} style={{ textDecoration: 'none' }}>
              <div style={{ background: 'rgba(19,21,28,0.8)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '20px', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(94,158,244,0.3)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>{item.icon}</div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '14px', fontWeight: 700, color: '#e8eaf2', marginBottom: '4px' }}>{item.name}</div>
                <div style={{ fontSize: '12px', color: '#7c8099' }}>{item.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 5, background: 'rgba(19,21,28,0.5)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '60px 40px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '32px', fontWeight: 800, color: '#e8eaf2', marginBottom: '12px' }}>
          Ready to get reinstated?
        </h2>
        <p style={{ color: '#7c8099', fontSize: '16px', marginBottom: '28px' }}>Generate your first appeal in under 2 minutes. No signup required.</p>
        <Link href="/tools/compliance" style={{ display: 'inline-block', padding: '14px 48px', background: 'linear-gradient(135deg, #5e9ef4, #7c5ef4)', color: 'white', textDecoration: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '16px' }}>
          Start For Free →
        </Link>
      </div>

      <div style={{ position: 'relative', zIndex: 5, borderTop: '1px solid rgba(255,255,255,0.06)', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '20px', height: '20px', background: 'linear-gradient(135deg, #5e9ef4, #7c5ef4)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>⚡</div>
          <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '14px', fontWeight: 700, color: '#e8eaf2' }}>Wextrion</span>
        </div>
        <p style={{ fontSize: '12px', color: '#404357' }}>© 2026 Wextrion. All rights reserved.</p>
      </div>
    </div>
  )
}