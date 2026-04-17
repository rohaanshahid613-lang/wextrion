'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import { useTheme } from '@/components/ThemeProvider'

const riskyKeywords: any = {
  US: [
    { word: 'cure', alternatives: ['support', 'help maintain', 'promote'] },
    { word: 'cures', alternatives: ['supports', 'helps maintain', 'promotes'] },
    { word: 'treat', alternatives: ['support', 'help with', 'assist'] },
    { word: 'treats', alternatives: ['supports', 'helps with', 'assists'] },
    { word: 'treatment', alternatives: ['support', 'care', 'relief'] },
    { word: 'heal', alternatives: ['soothe', 'support recovery', 'assist'] },
    { word: 'heals', alternatives: ['soothes', 'supports recovery', 'assists'] },
    { word: 'healing', alternatives: ['soothing', 'supporting recovery', 'assisting'] },
    { word: 'prevent', alternatives: ['help reduce the risk of', 'support against', 'protect'] },
    { word: 'prevents', alternatives: ['helps reduce the risk of', 'supports against', 'protects'] },
    { word: 'disease', alternatives: ['condition', 'concern', 'issue'] },
    { word: 'disorder', alternatives: ['condition', 'concern', 'imbalance'] },
    { word: 'cancer', alternatives: ['cellular health', 'cell support', 'wellness'] },
    { word: 'diabetes', alternatives: ['blood sugar management', 'glucose support', 'metabolic health'] },
    { word: 'arthritis', alternatives: ['joint comfort', 'joint support', 'mobility support'] },
    { word: 'depression', alternatives: ['mood support', 'emotional wellness', 'mental balance'] },
    { word: 'anxiety', alternatives: ['stress relief', 'calm support', 'relaxation'] },
    { word: 'fda approved', alternatives: ['quality tested', 'third-party tested', 'quality assured'] },
    { word: 'clinically proven', alternatives: ['studied', 'research-backed', 'quality tested'] },
    { word: 'guaranteed', alternatives: ['designed to', 'formulated to', 'intended to'] },
    { word: 'miracle', alternatives: ['effective', 'powerful', 'advanced'] },
    { word: 'pain relief', alternatives: ['comfort support', 'soothing support', 'comfort care'] },
    { word: 'weight loss', alternatives: ['weight management', 'body composition support', 'fitness support'] },
    { word: 'fat burning', alternatives: ['metabolism support', 'energy support', 'active lifestyle support'] },
    { word: 'anti-inflammatory', alternatives: ['comfort support', 'soothing', 'recovery support'] },
  ],
  UK: [
    { word: 'cure', alternatives: ['support', 'help maintain', 'promote'] },
    { word: 'treat', alternatives: ['support', 'help with', 'assist'] },
    { word: 'disease', alternatives: ['condition', 'concern', 'issue'] },
    { word: 'mhra approved', alternatives: ['quality tested', 'third-party tested', 'quality assured'] },
    { word: 'clinically proven', alternatives: ['studied', 'research-backed', 'quality tested'] },
    { word: 'pain relief', alternatives: ['comfort support', 'soothing support', 'comfort care'] },
    { word: 'weight loss', alternatives: ['weight management', 'body composition support', 'fitness support'] },
  ],
  CA: [
    { word: 'cure', alternatives: ['support', 'help maintain', 'promote'] },
    { word: 'treat', alternatives: ['support', 'help with', 'assist'] },
    { word: 'disease', alternatives: ['condition', 'concern', 'issue'] },
    { word: 'clinically proven', alternatives: ['studied', 'research-backed', 'quality tested'] },
    { word: 'pain relief', alternatives: ['comfort support', 'soothing support', 'comfort care'] },
    { word: 'weight loss', alternatives: ['weight management', 'body composition support', 'fitness support'] },
  ],
}

interface RiskyWord {
  word: string
  index: number
  length: number
  alternatives: string[]
}

function analyzeContent(content: string, marketplace: string): RiskyWord[] {
  const keywords = riskyKeywords[marketplace] || riskyKeywords.US
  const found: RiskyWord[] = []
  const lowerContent = content.toLowerCase()
  keywords.forEach(({ word, alternatives }: any) => {
    let startIndex = 0
    while (true) {
      const index = lowerContent.indexOf(word.toLowerCase(), startIndex)
      if (index === -1) break
      const before = index === 0 ? ' ' : lowerContent[index - 1]
      const after = index + word.length >= lowerContent.length ? ' ' : lowerContent[index + word.length]
      if (!/[a-z]/.test(before) && !/[a-z]/.test(after)) {
        found.push({ word: content.substring(index, index + word.length), index, length: word.length, alternatives })
      }
      startIndex = index + 1
    }
  })
  return found.sort((a, b) => a.index - b.index)
}

function HighlightedContent({ content, riskyWords }: { content: string, riskyWords: RiskyWord[] }) {
  if (riskyWords.length === 0) return <span style={{ color: '#c5c9d8', fontSize: '14px', lineHeight: 1.8 }}>{content}</span>
  const parts: any[] = []
  let lastIndex = 0
  riskyWords.forEach((rw, i) => {
    if (rw.index > lastIndex) parts.push(<span key={`t${i}`} style={{ color: '#c5c9d8' }}>{content.substring(lastIndex, rw.index)}</span>)
    parts.push(
      <span key={`r${i}`} style={{ background: 'rgba(244,94,94,0.2)', border: '1px solid rgba(244,94,94,0.4)', borderRadius: '3px', color: '#f45e5e', padding: '0 3px', fontWeight: 600 }}
        title={`Alternatives: ${rw.alternatives.join(', ')}`}>
        {rw.word}
      </span>
    )
    lastIndex = rw.index + rw.length
  })
  if (lastIndex < content.length) parts.push(<span key="end" style={{ color: '#c5c9d8' }}>{content.substring(lastIndex)}</span>)
  return <>{parts}</>
}

export default function ContentChecker() {
  const { theme } = useTheme()
  const [marketplace, setMarketplace] = useState('US')
  const [content, setContent] = useState('')
  const [extraExplain, setExtraExplain] = useState('')
  const [riskyWords, setRiskyWords] = useState<RiskyWord[]>([])
  const [analyzed, setAnalyzed] = useState(false)
  const [history, setHistory] = useState<any[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) { setUser(session.user); loadHistory(session.user.id) }
    })
  }, [])

  const loadHistory = async (userId: string) => {
    const { data } = await supabase.from('content_checks').select('*').eq('user_id', userId).order('created_at', { ascending: false })
    if (data) setHistory(data)
  }

  const saveToHistory = async (content: string, count: number) => {
    if (!user) return
    const preview = content.substring(0, 80) + (content.length > 80 ? '...' : '')
    const { data } = await supabase.from('content_checks').insert({
      user_id: user.id, marketplace, original_content: preview, risky_count: count, created_at: new Date().toISOString()
    }).select().single()
    if (data) { setHistory(prev => [data, ...prev]); setActiveId(data.id) }
  }

  const confirmDelete = (id: string) => setDeleteConfirm(id)

  const deleteItem = async () => {
    if (!deleteConfirm) return
    await supabase.from('content_checks').delete().eq('id', deleteConfirm)
    setHistory(prev => prev.filter(h => h.id !== deleteConfirm))
    if (activeId === deleteConfirm) { setAnalyzed(false); setRiskyWords([]) }
    setDeleteConfirm(null)
  }

  const analyzeNow = () => {
    if (!content.trim()) return
    const found = analyzeContent(content, marketplace)
    setRiskyWords(found)
    setAnalyzed(true)
    if (user) saveToHistory(content, found.length)
  }

  const reset = () => { setContent(''); setExtraExplain(''); setRiskyWords([]); setAnalyzed(false); setActiveId(null) }
  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, display: 'flex', flexDirection: 'column' }}>

      {/* Delete Popup */}
      {deleteConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: theme.surface, border: `1px solid ${theme.accent}22`, borderRadius: '16px', padding: '32px', maxWidth: '380px', width: '90%', textAlign: 'center' }}>
            <div style={{ fontSize: '36px', marginBottom: '16px' }}>🗑️</div>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 700, color: theme.text, marginBottom: '8px' }}>Delete this check?</h3>
            <p style={{ color: theme.muted, fontSize: '14px', marginBottom: '24px', lineHeight: 1.6 }}>This action cannot be undone.</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setDeleteConfirm(null)} style={{ flex: 1, padding: '11px', background: 'transparent', border: `1px solid ${theme.accent}33`, borderRadius: '8px', color: theme.muted, cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>Cancel</button>
              <button onClick={deleteItem} style={{ flex: 1, padding: '11px', background: 'linear-gradient(135deg, #f45e5e, #f4845e)', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '14px', fontWeight: 700 }}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', borderBottom: `1px solid ${theme.accent}18`, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'transparent', border: 'none', color: theme.muted, cursor: 'pointer', fontSize: '18px' }}>☰</button>
          <div style={{ width: '26px', height: '26px', background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})`, borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>⚡</div>
          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '16px', fontWeight: 800, color: theme.text }}>Wextrion</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ThemeSwitcher />
          <Link href="/dashboard" style={{ fontSize: '13px', color: theme.muted, textDecoration: 'none' }}>← Dashboard</Link>
        </div>
      </nav>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* SIDEBAR */}
        {sidebarOpen && (
          <div style={{ width: '260px', minWidth: '260px', background: theme.surface, borderRight: `1px solid ${theme.accent}18`, display: 'flex', flexDirection: 'column', height: 'calc(100vh - 53px)', overflowY: 'auto' }}>
            <div style={{ padding: '12px' }}>
              <button onClick={reset} style={{ width: '100%', padding: '10px', background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})`, color: theme.bg, border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
                ✏️ New Check
              </button>
            </div>
            <div style={{ padding: '0 12px', flex: 1 }}>
              {!user ? (
                <div style={{ textAlign: 'center', padding: '24px 12px' }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔒</div>
                  <p style={{ fontSize: '12px', color: theme.muted, marginBottom: '12px' }}>Sign up to save history</p>
                  <Link href="/auth/signup" style={{ display: 'block', padding: '8px', background: `${theme.accent}18`, border: `1px solid ${theme.accent}33`, borderRadius: '6px', color: theme.accent, textDecoration: 'none', fontSize: '12px', fontWeight: 600 }}>
                    Create Free Account
                  </Link>
                </div>
              ) : history.length === 0 ? (
                <p style={{ fontSize: '12px', color: theme.muted, textAlign: 'center', padding: '24px 12px' }}>No checks yet.</p>
              ) : (
                <>
                  <p style={{ fontSize: '11px', color: theme.muted, padding: '8px 4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>History</p>
                  {history.map((item) => (
                    <div key={item.id} style={{ padding: '10px 12px', borderRadius: '8px', marginBottom: '4px', background: activeId === item.id ? `${theme.accent}18` : 'transparent', border: activeId === item.id ? `1px solid ${theme.accent}33` : '1px solid transparent', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: activeId === item.id ? theme.accent : theme.text, marginBottom: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.original_content}
                        </div>
                        <div style={{ fontSize: '11px', color: item.risky_count > 0 ? '#f45e5e' : '#4ef4b0' }}>
                          {item.risky_count > 0 ? `⚠️ ${item.risky_count} risky words` : '✅ Compliant'}
                        </div>
                        <div style={{ fontSize: '10px', color: theme.muted, marginTop: '2px' }}>{formatDate(item.created_at)}</div>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); confirmDelete(item.id) }}
                        style={{ background: 'rgba(244,94,94,0.08)', border: '1px solid rgba(244,94,94,0.15)', borderRadius: '4px', color: '#f45e5e', cursor: 'pointer', fontSize: '11px', padding: '3px 7px', flexShrink: 0 }}>
                        ✕
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        )}

        {/* MAIN */}
        <div style={{ flex: 1, overflow: 'auto', padding: '32px 40px' }}>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '26px', fontWeight: 800, color: theme.text, marginBottom: '6px' }}>🔍 Compliant Content Checker</h1>
          <p style={{ color: theme.muted, fontSize: '14px', marginBottom: '28px' }}>Paste your listing content. Risky words will be highlighted in red with safe alternatives.</p>

          <div style={{ display: 'grid', gridTemplateColumns: analyzed ? '1fr 1fr' : '1fr', gap: '24px' }}>
            <div>
              <div style={{ background: `${theme.surface}cc`, border: `1px solid ${theme.accent}18`, borderRadius: '16px', padding: '24px' }}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', color: theme.muted, marginBottom: '6px' }}>Marketplace</label>
                  <select value={marketplace} onChange={e => setMarketplace(e.target.value)}
                    style={{ width: '100%', background: `${theme.accent}08`, border: `1px solid ${theme.accent}22`, borderRadius: '8px', padding: '10px 14px', color: theme.text, fontSize: '14px', outline: 'none' }}>
                    {['US', 'UK', 'CA'].map(m => <option key={m} value={m} style={{ background: theme.surface }}>Amazon {m}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', color: theme.muted, marginBottom: '6px' }}>Your Listing Content *</label>
                  <textarea value={content} onChange={e => setContent(e.target.value)}
                    placeholder="Paste your title, bullet points, or product description here..."
                    rows={10}
                    style={{ width: '100%', background: `${theme.accent}08`, border: `1px solid ${theme.accent}22`, borderRadius: '8px', padding: '12px 14px', color: theme.text, fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.7 }} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '13px', color: theme.muted, marginBottom: '6px' }}>Additional Context (Optional)</label>
                  <textarea value={extraExplain} onChange={e => setExtraExplain(e.target.value)}
                    placeholder="Tell us more about your product..."
                    rows={3}
                    style={{ width: '100%', background: `${theme.accent}08`, border: `1px solid ${theme.accent}22`, borderRadius: '8px', padding: '12px 14px', color: theme.text, fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }} />
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={analyzeNow} disabled={!content.trim()}
                    style={{ flex: 1, padding: '13px', background: content.trim() ? `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})` : `${theme.accent}18`, color: content.trim() ? theme.bg : theme.muted, border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '15px', cursor: content.trim() ? 'pointer' : 'not-allowed' }}>
                    Analyze Content →
                  </button>
                  {analyzed && (
                    <button onClick={reset} style={{ padding: '13px 20px', background: 'transparent', border: `1px solid ${theme.accent}33`, borderRadius: '10px', color: theme.muted, cursor: 'pointer', fontSize: '14px' }}>
                      Reset
                    </button>
                  )}
                </div>
              </div>
            </div>

            {analyzed && (
              <div>
                <div style={{ background: riskyWords.length === 0 ? 'rgba(78,244,176,0.06)' : 'rgba(244,94,94,0.06)', border: `1px solid ${riskyWords.length === 0 ? 'rgba(78,244,176,0.2)' : 'rgba(244,94,94,0.2)'}`, borderRadius: '12px', padding: '16px 20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ fontSize: '28px' }}>{riskyWords.length === 0 ? '✅' : '⚠️'}</div>
                  <div>
                    <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '16px', fontWeight: 700, color: riskyWords.length === 0 ? '#4ef4b0' : '#f45e5e', marginBottom: '2px' }}>
                      {riskyWords.length === 0 ? 'Content looks compliant!' : `${riskyWords.length} risky word${riskyWords.length > 1 ? 's' : ''} found`}
                    </div>
                    <div style={{ fontSize: '12px', color: theme.muted }}>
                      {riskyWords.length === 0 ? 'No risky claims detected.' : 'Replace highlighted words below.'}
                    </div>
                  </div>
                </div>

                <div style={{ background: `${theme.surface}cc`, border: `1px solid ${theme.accent}18`, borderRadius: '12px', padding: '20px', marginBottom: '16px', lineHeight: 1.8, fontSize: '14px', whiteSpace: 'pre-wrap' }}>
                  <HighlightedContent content={content} riskyWords={riskyWords} />
                </div>

                {riskyWords.length > 0 && (
                  <div style={{ background: `${theme.surface}cc`, border: `1px solid ${theme.accent}18`, borderRadius: '12px', padding: '20px' }}>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '16px', fontWeight: 700, color: theme.text, marginBottom: '16px' }}>Safe Alternatives</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {Array.from(new Map(riskyWords.map(rw => [rw.word.toLowerCase(), rw])).values()).map((rw, i) => (
                        <div key={i} style={{ background: 'rgba(244,94,94,0.05)', border: '1px solid rgba(244,94,94,0.15)', borderRadius: '8px', padding: '12px 16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <span style={{ background: 'rgba(244,94,94,0.15)', color: '#f45e5e', padding: '2px 10px', borderRadius: '4px', fontSize: '13px', fontWeight: 600 }}>❌ {rw.word}</span>
                            <span style={{ color: theme.muted, fontSize: '12px' }}>replace with:</span>
                          </div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {rw.alternatives.map((alt: string, j: number) => (
                              <span key={j} style={{ background: 'rgba(78,244,176,0.08)', border: '1px solid rgba(78,244,176,0.2)', color: '#4ef4b0', padding: '3px 12px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}
                                onClick={() => { setContent(content.replace(new RegExp(rw.word, 'gi'), alt)); setAnalyzed(false); setRiskyWords([]) }}>
                                ✓ {alt}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}