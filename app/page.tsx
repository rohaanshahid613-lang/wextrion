'use client'
import Link from 'next/link'

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: '#0b0c10', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-100px', left: '-80px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(94,158,244,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '50px', right: '-60px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(124,94,244,0.10) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <nav style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 40px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #5e9ef4, #7c5ef4)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>⚡</div>
          <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '20px', fontWeight: 800, color: '#e8eaf2' }}>Wextrion</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Link href="/auth/login" style={{ padding: '8px 20px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', color: '#e8eaf2', textDecoration: 'none', fontSize: '14px' }}>Login</Link>
          <Link href="/auth/signup" style={{ padding: '8px 20px', borderRadius: '8px', background: 'linear-gradient(135deg, #5e9ef4, #7c5ef4)', color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>Get Started Free</Link>
        </div>
      </nav>

      <div style={{ position: 'relative', zIndex: 5, textAlign: 'center', padding: '80px 20px 60px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(94,158,244,0.08)', border: '1px solid rgba(94,158,244,0.2)', color: '#5e9ef4', fontSize: '12px', padding: '6px 16px', borderRadius: '20px', marginBottom: '24px' }}>
          <span style={{ width: '6px', height: '6px', background: '#5e9ef4', borderRadius: '50%', display: 'inline-block' }}></span>
          Amazon Sellers · All Marketplaces · Always Free
        </div>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '56px', fontWeight: 800, lineHeight: 1.1, marginBottom: '20px', background: 'linear-gradient(135deg, #e8eaf2 0%, #5e9ef4 55%, #7c5ef4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Get Your Amazon<br />Account Reinstated.
        </h1>
        <p style={{ fontSize: '18px', color: '#7c8099', maxWidth: '500px', margin: '0 auto 40px', fontWeight: 300, lineHeight: 1.6 }}>
          Generate professional Plans of Action, appeal letters and compliance documents for every Amazon violation — instantly.
        </p>
        <Link href="/auth/signup" style={{ display: 'inline-block', padding: '14px 40px', background: 'linear-gradient(135deg, #5e9ef4, #7c5ef4)', color: 'white', textDecoration: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '16px', marginRight: '12px' }}>
          Generate Appeal Free →
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', padding: '60px 40px 0', maxWidth: '900px', margin: '0 auto' }}>
          {[
            { icon: '🔴', name: 'Andon Cord POA', desc: 'Fire, smoke, safety complaints' },
            { icon: '🚫', name: 'Account Suspension', desc: 'Performance & policy violations' },
            { icon: '📦', name: 'Listing Reinstatement', desc: 'Suppressed or removed listings' },
            { icon: '⚖️', name: 'IP Complaints', desc: 'Counterfeit & trademark claims' },
            { icon: '🏥', name: 'FDA Violations', desc: 'Medical device & health claims' },
            { icon: '↩️', name: 'Return Rate Appeals', desc: 'High return rate defense' },
          ].map((item) => (
            <div key={item.name} style={{ background: 'rgba(19,21,28,0.8)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '20px', textAlign: 'left' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{item.icon}</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '14px', fontWeight: 700, color: '#e8eaf2', marginBottom: '4px' }}>{item.name}</div>
              <div style={{ fontSize: '12px', color: '#7c8099' }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}