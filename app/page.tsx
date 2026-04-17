'use client'
import Link from 'next/link'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import { useTheme } from '@/components/ThemeProvider'

export default function Home() {
  const { theme } = useTheme()

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-100px', left: '-80px', width: '500px', height: '500px', background: `radial-gradient(circle, ${theme.accent}18 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '50px', right: '-60px', width: '400px', height: '400px', background: `radial-gradient(circle, ${theme.accent2}14 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '0', left: '30%', width: '400px', height: '400px', background: `radial-gradient(circle, ${theme.accent}08 0%, transparent 70%)`, pointerEvents: 'none' }} />

      {/* NAVBAR */}
      <nav style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 40px', borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})`, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>⚡</div>
          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 800, color: theme.text }}>Wextrion</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <ThemeSwitcher />
          <Link href="/auth/login" style={{ padding: '8px 20px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', color: theme.text, textDecoration: 'none', fontSize: '14px' }}>Login</Link>
          <Link href="/auth/signup" style={{ padding: '8px 20px', borderRadius: '8px', background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})`, color: theme.bg, textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>Sign Up Free</Link>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ position: 'relative', zIndex: 5, textAlign: 'center', padding: '80px 20px 60px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: `${theme.accent}14`, border: `1px solid ${theme.accent}33`, color: theme.accent, fontSize: '12px', padding: '6px 16px', borderRadius: '20px', marginBottom: '24px' }}>
          <span style={{ width: '6px', height: '6px', background: theme.accent, borderRadius: '50%', display: 'inline-block' }}></span>
          Amazon Sellers · US, UK, CA & More · Always Free
        </div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '58px', fontWeight: 800, lineHeight: 1.1, marginBottom: '20px', background: `linear-gradient(135deg, ${theme.text} 0%, ${theme.accent} 55%, ${theme.accent2} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Get Your Amazon<br />Issues Resolved.
        </h1>
        <p style={{ fontSize: '18px', color: theme.muted, maxWidth: '580px', margin: '0 auto 40px', fontWeight: 300, lineHeight: 1.7, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Generate professional Plans of Action, compliance-safe listing content, and SEO-optimized copy for every Amazon issue — instantly. No signup required.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/tools/compliance" style={{ display: 'inline-block', padding: '14px 40px', background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})`, color: theme.bg, textDecoration: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '16px' }}>
            Start For Free →
          </Link>
          <Link href="/auth/signup" style={{ display: 'inline-block', padding: '14px 32px', background: 'transparent', color: theme.text, textDecoration: 'none', borderRadius: '10px', fontWeight: 600, fontSize: '15px', border: '1px solid rgba(255,255,255,0.15)' }}>
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
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '30px', fontWeight: 800, color: theme.accent }}>{stat.num}</div>
              <div style={{ fontSize: '13px', color: theme.muted, fontFamily: 'Plus Jakarta Sans, sans-serif', marginTop: '2px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 3 TOOLS */}
      <div style={{ position: 'relative', zIndex: 5, maxWidth: '1100px', margin: '0 auto', padding: '20px 40px 60px' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 700, color: theme.text, textAlign: 'center', marginBottom: '8px' }}>3 Powerful Amazon Tools</h2>
        <p style={{ textAlign: 'center', color: theme.muted, fontSize: '14px', marginBottom: '32px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Everything you need to protect, optimize, and grow your Amazon business</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '60px' }}>
          {[
            { icon: '📋', name: 'Appeal & POA Writer', desc: 'Generate professional Plans of Action for Andon Cord, Account Suspension, Listing Reinstatement, IP Complaints, FDA Violations, Safety Violations, Medical Device Appeals, and more.', href: '/tools/compliance', badge: '10 Appeal Types' },
            { icon: '🔍', name: 'Compliant Content Checker', desc: 'Paste your listing content and instantly detect risky claims, prohibited words, and non-compliant language. Get safe alternative suggestions with one-click replacement.', href: '/tools/content-checker', badge: 'US · UK · CA' },
            { icon: '✨', name: 'Content Optimizer', desc: 'Generate SEO-optimized Amazon listing titles, bullet points, product descriptions, and backend search terms that attract customers and convert — in minutes.', href: '/tools/content-optimizer', badge: '7 Marketplaces' },
          ].map((tool) => (
            <Link key={tool.name} href={tool.href} style={{ textDecoration: 'none' }}>
              <div style={{ background: `${theme.surface}cc`, border: `1px solid rgba(255,255,255,0.06)`, borderRadius: '16px', padding: '28px', cursor: 'pointer', position: 'relative', overflow: 'hidden', transition: 'all 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${theme.accent}44`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${theme.accent}, transparent)` }} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ fontSize: '32px' }}>{tool.icon}</div>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: theme.accent, background: `${theme.accent}18`, padding: '3px 10px', borderRadius: '20px', border: `1px solid ${theme.accent}33` }}>{tool.badge}</span>
                </div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: 700, color: theme.text, marginBottom: '10px' }}>{tool.name}</div>
                <div style={{ fontSize: '13px', color: theme.muted, lineHeight: 1.7, marginBottom: '20px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{tool.desc}</div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: theme.accent }}>Open tool →</div>
              </div>
            </Link>
          ))}
        </div>

        {/* APPEAL TYPES */}
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '26px', fontWeight: 700, color: theme.text, textAlign: 'center', marginBottom: '8px' }}>Every Amazon Appeal Type Covered</h2>
        <p style={{ textAlign: 'center', color: theme.muted, fontSize: '14px', marginBottom: '28px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Click any appeal type to get started instantly</p>
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
              <div style={{ background: `${theme.surface}cc`, border: `1px solid rgba(255,255,255,0.06)`, borderRadius: '12px', padding: '18px', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${theme.accent}44`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}>
                <div style={{ fontSize: '22px', marginBottom: '8px' }}>{item.icon}</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '13px', fontWeight: 700, color: theme.text, marginBottom: '4px' }}>{item.name}</div>
                <div style={{ fontSize: '11px', color: theme.muted, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{item.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ position: 'relative', zIndex: 5, background: `${theme.surface}80`, borderTop: '1px solid rgba(255,255,255,0.06)', padding: '60px 40px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '32px', fontWeight: 800, color: theme.text, marginBottom: '12px' }}>Ready to resolve your Amazon issues?</h2>
        <p style={{ color: theme.muted, fontSize: '16px', marginBottom: '28px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Generate your first appeal free — no signup required.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/tools/compliance" style={{ display: 'inline-block', padding: '14px 40px', background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})`, color: theme.bg, textDecoration: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '16px' }}>
            Generate Appeal Free →
          </Link>
          <Link href="/auth/signup" style={{ display: 'inline-block', padding: '14px 32px', background: 'transparent', color: theme.text, textDecoration: 'none', borderRadius: '10px', fontWeight: 600, fontSize: '15px', border: '1px solid rgba(255,255,255,0.15)' }}>
            Create Free Account
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ position: 'relative', zIndex: 5, borderTop: '1px solid rgba(255,255,255,0.06)', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '20px', height: '20px', background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})`, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>⚡</div>
          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '14px', fontWeight: 700, color: theme.text }}>Wextrion</span>
        </div>
        <p style={{ fontSize: '12px', color: theme.muted, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>© 2026 Wextrion. Built for Amazon Sellers. All rights reserved.</p>
      </div>
    </div>
  )
}