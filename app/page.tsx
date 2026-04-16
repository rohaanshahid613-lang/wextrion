'use client'
import Link from 'next/link'

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: '#0b0c10', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-100px', left: '-80px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(94,158,244,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '50px', right: '-60px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(124,94,244,0.10) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '0', left: '30%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(78,244,176,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* NAVBAR */}
      <nav style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 40px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #5e9ef4, #7c5ef4)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>⚡</div>
          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 800, color: '#e8eaf2' }}>Wextrion</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Link href="/auth/login" style={{ padding: '8px 20px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', color: '#e8eaf2', textDecoration: 'none', fontSize: '14px' }}>Login</Link>
          <Link href="/auth/signup" style={{ padding: '8px 20px', borderRadius: '8px', background: 'linear-gradient(135deg, #5e9ef4, #7c5ef4)', color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>Sign Up Free</Link>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ position: 'relative', zIndex: 5, textAlign: 'center', padding: '80px 20px 60px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(94,158,244,0.08)', border: '1px solid rgba(94,158,244,0.2)', color: '#5e9ef4', fontSize: '12px', padding: '6px 16px', borderRadius: '20px', marginBottom: '24px' }}>
          <span style={{ width: '6px', height: '6px', background: '#5e9ef4', borderRadius: '50%', display: 'inline-block' }}></span>
          Amazon Sellers · US, UK, CA & More · Always Free
        </div>

        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '58px', fontWeight: 800, lineHeight: 1.1, marginBottom: '20px', background: 'linear-gradient(135deg, #e8eaf2 0%, #5e9ef4 55%, #7c5ef4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Get Your Amazon<br />Issues Resolved.
        </h1>

        <p style={{ fontSize: '18px', color: '#7c8099', maxWidth: '580px', margin: '0 auto 40px', fontWeight: 300, lineHeight: 1.7, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Generate professional Plans of Action, compliance-safe listing content, and SEO-optimized copy for every Amazon issue — instantly. No signup required.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/tools/compliance" style={{ display: 'inline-block', padding: '14px 40px', background: 'linear-gradient(135deg, #5e9ef4, #7c5ef4)', color: 'white', textDecoration: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '16px' }}>
            Start For Free →
          </Link>
          <Link href="/auth/signup" style={{ display: 'inline-block', padding: '14px 32px', background: 'transparent', color: '#e8eaf2', textDecoration: 'none', borderRadius: '10px', fontWeight: 600, fontSize: '15px', border: '1px solid rgba(255,255,255,0.15)' }}>
            Create Free Account
          </Link>
        </div>

        {/* STATS */}
        <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', marginTop: '52px', flexWrap: 'wrap' }}>
          {[
            { num: '10+', label: 'Appeal Types' },
            { num: '7', label: 'Marketplaces' },
            { num: '3', label: 'Powerful Tools' },
            { num: '100%', label: 'Free Forever' },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '30px', fontWeight: 800, color: '#5e9ef4' }}>{stat.num}</div>
              <div style={{ fontSize: '13px', color: '#7c8099', fontFamily: 'Plus Jakarta Sans, sans-serif', marginTop: '2px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 3 TOOLS SECTION */}
      <div style={{ position: 'relative', zIndex: 5, maxWidth: '1100px', margin: '0 auto', padding: '20px 40px 60px' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 700, color: '#e8eaf2', textAlign: 'center', marginBottom: '8px' }}>3 Powerful Amazon Tools</h2>
        <p style={{ textAlign: 'center', color: '#7c8099', fontSize: '14px', marginBottom: '32px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Everything you need to protect, optimize, and grow your Amazon business</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '60px' }}>
          {[
            {
              icon: '📋',
              name: 'Appeal & POA Writer',
              desc: 'Generate professional Plans of Action for Andon Cord, Account Suspension, Listing Reinstatement, IP Complaints, FDA Violations, Safety Violations, Medical Device Appeals, and more.',
              color: '#5e9ef4',
              href: '/tools/compliance',
              badge: '10 Appeal Types'
            },
            {
              icon: '🔍',
              name: 'Compliant Content Checker',
              desc: 'Paste your listing content and instantly detect risky claims, prohibited words, and non-compliant language. Get safe alternative suggestions with one-click replacement.',
              color: '#f4c45e',
              href: '/tools/content-checker',
              badge: 'US · UK · CA'
            },
            {
              icon: '✨',
              name: 'Content Optimizer',
              desc: 'Generate SEO-optimized Amazon listing titles, bullet points, product descriptions, and backend search terms that attract customers and convert — in minutes.',
              color: '#4ef4b0',
              href: '/tools/content-optimizer',
              badge: '7 Marketplaces'
            },
          ].map((tool) => (
            <Link key={tool.name} href={tool.href} style={{ textDecoration: 'none' }}>
              <div style={{ background: 'rgba(19,21,28,0.8)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '28px', cursor: 'pointer', position: 'relative', overflow: 'hidden', transition: 'all 0.2s', height: '100%' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `rgba(94,158,244,0.3)`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${tool.color}, transparent)` }} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ fontSize: '32px' }}>{tool.icon}</div>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: tool.color, background: `rgba(${tool.color === '#5e9ef4' ? '94,158,244' : tool.color === '#f4c45e' ? '244,196,94' : '78,244,176'},0.1)`, padding: '3px 10px', borderRadius: '20px', border: `1px solid ${tool.color}33` }}>{tool.badge}</span>
                </div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: 700, color: '#e8eaf2', marginBottom: '10px' }}>{tool.name}</div>
                <div style={{ fontSize: '13px', color: '#7c8099', lineHeight: 1.7, marginBottom: '20px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{tool.desc}</div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: tool.color }}>Open tool →</div>
              </div>
            </Link>
          ))}
        </div>

        {/* APPEAL TYPES GRID */}
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '26px', fontWeight: 700, color: '#e8eaf2', textAlign: 'center', marginBottom: '8px' }}>Every Amazon Appeal Type Covered</h2>
        <p style={{ textAlign: 'center', color: '#7c8099', fontSize: '14px', marginBottom: '28px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Click any appeal type to get started instantly — no signup required</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
          {[
            { icon: '🔴', name: 'Andon Cord POA', desc: 'Fire, smoke, safety complaints', type: 'andon' },
            { icon: '🚫', name: 'Account Suspension', desc: 'Performance & policy violations', type: 'suspension' },
            { icon: '📦', name: 'Listing Reinstatement', desc: 'Suppressed or removed listings', type: 'listing' },
            { icon: '⚖️', name: 'IP / Counterfeit', desc: 'Trademark & IP complaints', type: 'ip' },
            { icon: '🏥', name: 'FDA Violations', desc: 'Medical & health claim issues', type: 'fda' },
            { icon: '↩️', name: 'High Return Rate', desc: 'Return rate defense', type: 'return' },
            { icon: '🚚', name: 'Late Shipment', desc: 'Fulfillment & dispatch issues', type: 'shipment' },
            { icon: '⭐', name: 'Negative Feedback', desc: 'Feedback removal appeals', type: 'feedback' },
            { icon: '🛡️', name: 'Safety Violation', desc: 'Product safety compliance', type: 'safety' },
            { icon: '🏷️', name: 'Medical Device', desc: 'Misclassification appeals', type: 'medical' },
          ].map((item) => (
            <Link key={item.type} href={`/tools/compliance?type=${item.type}`} style={{ textDecoration: 'none' }}>
              <div style={{ background: 'rgba(19,21,28,0.8)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '18px', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(94,158,244,0.3)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}>
                <div style={{ fontSize: '22px', marginBottom: '8px' }}>{item.icon}</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '13px', fontWeight: 700, color: '#e8eaf2', marginBottom: '4px' }}>{item.name}</div>
                <div style={{ fontSize: '11px', color: '#7c8099', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{item.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA SECTION */}
      <div style={{ position: 'relative', zIndex: 5, background: 'rgba(19,21,28,0.5)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '60px 40px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '32px', fontWeight: 800, color: '#e8eaf2', marginBottom: '12px' }}>
          Ready to resolve your Amazon issues?
        </h2>
        <p style={{ color: '#7c8099', fontSize: '16px', marginBottom: '12px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Generate your first appeal, check your content, or optimize your listing — all free, no signup required.
        </p>
        <p style={{ color: '#404357', fontSize: '13px', marginBottom: '28px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Sign up free for unlimited access and to save your history.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/tools/compliance" style={{ display: 'inline-block', padding: '14px 40px', background: 'linear-gradient(135deg, #5e9ef4, #7c5ef4)', color: 'white', textDecoration: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '16px' }}>
            Generate Appeal Free →
          </Link>
          <Link href="/auth/signup" style={{ display: 'inline-block', padding: '14px 32px', background: 'transparent', color: '#e8eaf2', textDecoration: 'none', borderRadius: '10px', fontWeight: 600, fontSize: '15px', border: '1px solid rgba(255,255,255,0.15)' }}>
            Create Free Account
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ position: 'relative', zIndex: 5, borderTop: '1px solid rgba(255,255,255,0.06)', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '20px', height: '20px', background: 'linear-gradient(135deg, #5e9ef4, #7c5ef4)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>⚡</div>
          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '14px', fontWeight: 700, color: '#e8eaf2' }}>Wextrion</span>
        </div>
        <p style={{ fontSize: '12px', color: '#404357', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>© 2026 Wextrion. Built for Amazon Sellers. All rights reserved.</p>
      </div>
    </div>
  )
}