'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

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
    { word: 'diagnose', alternatives: ['assess', 'evaluate', 'check'] },
    { word: 'diagnoses', alternatives: ['assesses', 'evaluates', 'checks'] },
    { word: 'antiviral', alternatives: ['immune support', 'wellness defense', 'health protection'] },
    { word: 'antibiotic', alternatives: ['cleansing', 'purifying', 'defense support'] },
  ],
  UK: [
    { word: 'cure', alternatives: ['support', 'help maintain', 'promote'] },
    { word: 'treat', alternatives: ['support', 'help with', 'assist'] },
    { word: 'treatment', alternatives: ['support', 'care', 'relief'] },
    { word: 'heal', alternatives: ['soothe', 'support recovery', 'assist'] },
    { word: 'prevent', alternatives: ['help reduce the risk of', 'support against', 'protect'] },
    { word: 'disease', alternatives: ['condition', 'concern', 'issue'] },
    { word: 'disorder', alternatives: ['condition', 'concern', 'imbalance'] },
    { word: 'mhra approved', alternatives: ['quality tested', 'third-party tested', 'quality assured'] },
    { word: 'clinically proven', alternatives: ['studied', 'research-backed', 'quality tested'] },
    { word: 'guaranteed', alternatives: ['designed to', 'formulated to', 'intended to'] },
    { word: 'pain relief', alternatives: ['comfort support', 'soothing support', 'comfort care'] },
    { word: 'weight loss', alternatives: ['weight management', 'body composition support', 'fitness support'] },
  ],
  CA: [
    { word: 'cure', alternatives: ['support', 'help maintain', 'promote'] },
    { word: 'treat', alternatives: ['support', 'help with', 'assist'] },
    { word: 'treatment', alternatives: ['support', 'care', 'relief'] },
    { word: 'disease', alternatives: ['condition', 'concern', 'issue'] },
    { word: 'disorder', alternatives: ['condition', 'concern', 'imbalance'] },
    { word: 'health canada approved', alternatives: ['quality tested', 'third-party tested', 'quality assured'] },
    { word: 'clinically proven', alternatives: ['studied', 'research-backed', 'quality tested'] },
    { word: 'guaranteed', alternatives: ['designed to', 'formulated to', 'intended to'] },
    { word: 'pain relief', alternatives: ['comfort support', 'soothing support', 'comfort care'] },
    { word: 'weight loss', alternatives: ['weight management', 'body composition support', 'fitness support'] },
    { word: 'relieves', alternatives: ['helps with', 'supports', 'soothes'] },
    { word: 'sleep aid', alternatives: ['relaxation support', 'calming routine', 'bedtime wellness'] },
    { word: 'acupressure', alternatives: ['targeted pressure massage', 'pressure-point inspired'] },
    { word: 'stress relief', alternatives: ['stress relaxation support', 'calming support'] },
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
  const [sessionSaved, setSessionSaved] = useState(false)
  const currentSessionId = useRef<string | null>(null)

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
    if (data) {
      setHistory(prev => [data, ...prev])
      setActiveId(data.id)
      currentSessionId.current = data.id
      setSessionSaved(true)
    }
  }

  const updateHistory = async (count: number) => {
    if (!user || !currentSessionId.current) return
    const preview = content.substring(0, 80) + (content.length > 80 ? '...' : '')
    await supabase.from('content_checks').update({ original_content: preview, risky_count: count }).eq('id', currentSessionId.current)
    setHistory(prev => prev.map(h => h.id === currentSessionId.current ? { ...h, original_content: preview, risky_count: count } : h))
  }

  const confirmDelete = (id: string) => setDeleteConfirm(id)

  const deleteItem = async () => {
    if (!deleteConfirm) return
    await supabase.from('content_checks').delete().eq('id', deleteConfirm)
    setHistory(prev => prev.filter(h => h.id !== deleteConfirm))
    if (activeId === deleteConfirm) {
      setAnalyzed(false)
      setRiskyWords([])
      setActiveId(null)
      currentSessionId.current = null
      setSessionSaved(false)
    }
    setDeleteConfirm(null)
  }

  const analyzeNow = () => {
    if (!content.trim()) return
    const found = analyzeContent(content, marketplace)
    setRiskyWords(found)
    setAnalyzed(true)
    if (user) {
      if (!sessionSaved) {
        saveToHistory(content, found.length)
      } else {
        updateHistory(found.length)
      }
    }
  }

  const startNew = () => {
    setContent('')
    setExtraExplain('')
    setRiskyWords([])
    setAnalyzed(false)
    setActiveId(null)
    setSessionSaved(false)
    currentSessionId.current = null
  }

  const loadFromHistory = (item: any) => {
    setActiveId(item.id)
    currentSessionId.current = item.id
    setSessionSaved(true)
    setAnalyzed(false)
    setRiskyWords([])
  }

  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

  return (
    <div style={{ minHeight: '100vh', background: '#0b0c10', display: 'flex', flexDirection: 'column' }}>

      {/* Delete Confirmation Popup */}
      {deleteConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#13151c', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '32px', maxWidth: '380px', width: '90%', textAlign: 'center' }}>
            <div style={{ fontSize: '36px', marginBottom: '16px' }}>🗑️</div>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 700, color: '#e8eaf2', marginBottom: '8px' }}>Delete this check?</h3>
            <p style={{ color: '#7c8099', fontSize: '14px', marginBottom: '24px', lineHeight: 1.6 }}>This action cannot be undone. The content check will be permanently removed from your history.</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setDeleteConfirm(null)} style={{ flex: 1, padding: '11px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#7c8099', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>Cancel</button>
              <button onClick={deleteItem} style={{ flex: 1, padding: '11px', background: 'linear-gradient(135deg, #f45e5e, #f4845e)', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '14px', fontWeight: 700 }}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'transparent', border: 'none', color: '#7c8099', cursor: 'pointer', fontSize: '18px' }}>☰</button>
          <div style={{ width: '26px', height: '26px', background: 'linear-gradient(135deg, #5e9ef4, #7c5ef4)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>⚡</div>
          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '16px', fontWeight: 800, color: '#e8eaf2' }}>Wextrion</span>
        </div>
        <Link href="/dashboard" style={{ fontSize: '13px', color: '#7c8099', textDecoration: 'none' }}>← Dashboard</Link>
      </nav>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* SIDEBAR */}
        {sidebarOpen && (
          <div style={{ width: '260px', minWidth: '260px', background: '#0f1117', borderRight: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 53px)', overflowY: 'auto' }}>
            <div style={{ padding: '12px' }}>
              <button onClick={startNew} style={{ width: '100%', padding: '10px', background: 'linear-gradient(135deg, #f4c45e, #f4845e)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                ✏️ New Check
              </button>
            </div>
            <div style={{ padding: '0 12px', flex: 1 }}>
              {!user ? (
                <div style={{ textAlign: 'center', padding: '24px 12px' }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔒</div>
                  <p style={{ fontSize: '12px', color: '#7c8099', marginBottom: '12px' }}>Sign up to save history</p>
                  <Link href="/auth/signup" style={{ display: 'block', padding: '8px', background: 'rgba(244,196,94,0.1)', border: '1px solid rgba(244,196,94,0.2)', borderRadius: '6px', color: '#f4c45e', textDecoration: 'none', fontSize: '12px', fontWeight: 600 }}>Create Free Account</Link>
                </div>
              ) : history.length === 0 ? (
                <p style={{ fontSize: '12px', color: '#404357', textAlign: 'center', padding: '24px 12px' }}>No checks yet.</p>
              ) : (
                <>
                  <p style={{ fontSize: '11px', color: '#404357', padding: '8px 4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>History</p>
                  {history.map((item) => (
                    <div key={item.id} style={{ padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', marginBottom: '4px', background: activeId === item.id ? 'rgba(244,196,94,0.1)' : 'transparent', border: activeId === item.id ? '1px solid rgba(244,196,94,0.2)' : '1px solid transparent', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}
                      onClick={() => loadFromHistory(item)}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: activeId === item.id ? '#f4c45e' : '#e8eaf2', marginBottom: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.original_content}</div>
                        <div style={{ fontSize: '11px', color: item.risky_count > 0 ? '#f45e5e' : '#4ef4b0' }}>
                          {item.risky_count > 0 ? `⚠️ ${item.risky_count} risky words` : '✅ Compliant'}
                        </div>
                        <div style={{ fontSize: '10px', color: '#404357', marginTop: '2px' }}>{formatDate(item.created_at)}</div>
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
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '26px', fontWeight: 800, color: '#e8eaf2', marginBottom: '6px' }}>🔍 Compliant Content Checker</h1>
          <p style={{ color: '#7c8099', fontSize: '14px', marginBottom: '28px' }}>
            Paste your listing content below. Edit and re-analyze as many times as needed — your session stays open until you click New Check.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: analyzed ? '1fr 1fr' : '1fr', gap: '24px' }}>

            {/* INPUT */}
            <div>
              <div style={{ background: 'rgba(19,21,28,0.8)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px' }}>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', color: '#7c8099', marginBottom: '6px' }}>Marketplace</label>
                  <select value={marketplace} onChange={e => { setMarketplace(e.target.value); setAnalyzed(false) }}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px 14px', color: '#e8eaf2', fontSize: '14px', outline: 'none' }}>
                    {['US', 'UK', 'CA'].map(m => <option key={m} value={m} style={{ background: '#13151c' }}>Amazon {m}</option>)}
                  </select>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label style={{ fontSize: '13px', color: '#7c8099' }}>Your Listing Content *</label>
                    {analyzed && (
                      <span style={{ fontSize: '11px', color: '#4ef4b0' }}>✓ Edit below and re-analyze anytime</span>
                    )}
                  </div>
                  <textarea
                    value={content}
                    onChange={e => { setContent(e.target.value); setAnalyzed(false) }}
                    placeholder="Paste your title, bullet points, or product description here. You can edit and re-analyze as many times as you need..."
                    rows={12}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '12px 14px', color: '#e8eaf2', fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.7 }}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '13px', color: '#7c8099', marginBottom: '6px' }}>Additional Context (Optional)</label>
                  <textarea
                    value={extraExplain}
                    onChange={e => setExtraExplain(e.target.value)}
                    placeholder="Product category, ingredients, intended use, marketplace-specific concerns..."
                    rows={3}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '12px 14px', color: '#e8eaf2', fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
                  />
                </div>

                <button onClick={analyzeNow} disabled={!content.trim()}
                  style={{ width: '100%', padding: '13px', background: content.trim() ? 'linear-gradient(135deg, #f4c45e, #f4845e)' : 'rgba(255,255,255,0.05)', color: content.trim() ? 'white' : '#7c8099', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '15px', cursor: content.trim() ? 'pointer' : 'not-allowed' }}>
                  {analyzed ? 'Re-Analyze Content →' : 'Analyze Content →'}
                </button>

                {analyzed && (
                  <p style={{ fontSize: '12px', color: '#404357', textAlign: 'center', marginTop: '10px' }}>
                    Make changes above and click Re-Analyze. Click "New Check" in the sidebar only when you want to start fresh.
                  </p>
                )}
              </div>
            </div>

            {/* RESULTS */}
            {analyzed && (
              <div>
                <div style={{ background: riskyWords.length === 0 ? 'rgba(78,244,176,0.06)' : 'rgba(244,94,94,0.06)', border: `1px solid ${riskyWords.length === 0 ? 'rgba(78,244,176,0.2)' : 'rgba(244,94,94,0.2)'}`, borderRadius: '12px', padding: '16px 20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ fontSize: '28px' }}>{riskyWords.length === 0 ? '✅' : '⚠️'}</div>
                  <div>
                    <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '16px', fontWeight: 700, color: riskyWords.length === 0 ? '#4ef4b0' : '#f45e5e', marginBottom: '2px' }}>
                      {riskyWords.length === 0 ? 'Content looks compliant!' : `${riskyWords.length} risky word${riskyWords.length > 1 ? 's' : ''} found`}
                    </div>
                    <div style={{ fontSize: '12px', color: '#7c8099' }}>
                      {riskyWords.length === 0 ? 'No risky claims detected. Your content appears compliant.' : 'Click any green alternative below to auto-replace in your content.'}
                    </div>
                  </div>
                </div>

                {/* Highlighted preview */}
                <div style={{ background: 'rgba(19,21,28,0.8)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '20px', marginBottom: '16px', lineHeight: 1.8, fontSize: '14px', whiteSpace: 'pre-wrap', maxHeight: '200px', overflowY: 'auto' }}>
                  <p style={{ fontSize: '11px', color: '#404357', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Content Preview</p>
                  <HighlightedContent content={content} riskyWords={riskyWords} />
                </div>

                {/* Alternatives */}
                {riskyWords.length > 0 && (
                  <div style={{ background: 'rgba(19,21,28,0.8)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '20px' }}>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '16px', fontWeight: 700, color: '#e8eaf2', marginBottom: '6px' }}>Safe Alternatives</h3>
                    <p style={{ fontSize: '12px', color: '#7c8099', marginBottom: '16px' }}>Click any green alternative to automatically replace it in your content above, then click Re-Analyze.</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {Array.from(new Map(riskyWords.map(rw => [rw.word.toLowerCase(), rw])).values()).map((rw, i) => (
                        <div key={i} style={{ background: 'rgba(244,94,94,0.05)', border: '1px solid rgba(244,94,94,0.15)', borderRadius: '8px', padding: '12px 16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <span style={{ background: 'rgba(244,94,94,0.15)', color: '#f45e5e', padding: '2px 10px', borderRadius: '4px', fontSize: '13px', fontWeight: 600 }}>❌ {rw.word}</span>
                            <span style={{ color: '#7c8099', fontSize: '12px' }}>→ replace with:</span>
                          </div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {rw.alternatives.map((alt: string, j: number) => (
                              <span key={j}
                                style={{ background: 'rgba(78,244,176,0.08)', border: '1px solid rgba(78,244,176,0.2)', color: '#4ef4b0', padding: '4px 14px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', fontWeight: 500 }}
                                onClick={() => {
                                  const newContent = content.replace(new RegExp(rw.word, 'gi'), alt)
                                  setContent(newContent)
                                  setAnalyzed(false)
                                }}>
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