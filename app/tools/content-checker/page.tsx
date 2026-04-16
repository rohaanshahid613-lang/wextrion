'use client'
import { useState } from 'react'
import Link from 'next/link'

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
    { word: 'prevention', alternatives: ['risk reduction', 'protection', 'defense'] },
    { word: 'diagnose', alternatives: ['assess', 'evaluate', 'check'] },
    { word: 'diagnoses', alternatives: ['assesses', 'evaluates', 'checks'] },
    { word: 'diagnosis', alternatives: ['assessment', 'evaluation', 'check'] },
    { word: 'disease', alternatives: ['condition', 'concern', 'issue'] },
    { word: 'diseases', alternatives: ['conditions', 'concerns', 'issues'] },
    { word: 'disorder', alternatives: ['condition', 'concern', 'imbalance'] },
    { word: 'disorders', alternatives: ['conditions', 'concerns', 'imbalances'] },
    { word: 'cancer', alternatives: ['cellular health', 'cell support', 'wellness'] },
    { word: 'diabetes', alternatives: ['blood sugar management', 'glucose support', 'metabolic health'] },
    { word: 'covid', alternatives: ['immune support', 'respiratory wellness', 'health defense'] },
    { word: 'arthritis', alternatives: ['joint comfort', 'joint support', 'mobility support'] },
    { word: 'depression', alternatives: ['mood support', 'emotional wellness', 'mental balance'] },
    { word: 'anxiety', alternatives: ['stress relief', 'calm support', 'relaxation'] },
    { word: 'fda approved', alternatives: ['quality tested', 'third-party tested', 'quality assured'] },
    { word: 'fda-approved', alternatives: ['quality tested', 'third-party tested', 'quality assured'] },
    { word: 'clinically proven', alternatives: ['studied', 'research-backed', 'quality tested'] },
    { word: 'clinically tested', alternatives: ['tested', 'research-backed', 'quality assured'] },
    { word: 'guaranteed', alternatives: ['designed to', 'formulated to', 'intended to'] },
    { word: 'miracle', alternatives: ['effective', 'powerful', 'advanced'] },
    { word: 'instant', alternatives: ['fast-acting', 'quick', 'rapid'] },
    { word: 'permanent', alternatives: ['long-lasting', 'sustained', 'extended'] },
    { word: 'pain relief', alternatives: ['comfort support', 'soothing support', 'comfort care'] },
    { word: 'weight loss', alternatives: ['weight management', 'body composition support', 'fitness support'] },
    { word: 'fat burning', alternatives: ['metabolism support', 'energy support', 'active lifestyle support'] },
    { word: 'antibiotic', alternatives: ['cleansing', 'purifying', 'defense support'] },
    { word: 'antiviral', alternatives: ['immune support', 'wellness defense', 'health protection'] },
    { word: 'anti-inflammatory', alternatives: ['comfort support', 'soothing', 'recovery support'] },
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
    { word: 'miracle', alternatives: ['effective', 'powerful', 'advanced'] },
    { word: 'pain relief', alternatives: ['comfort support', 'soothing support', 'comfort care'] },
    { word: 'weight loss', alternatives: ['weight management', 'body composition support', 'fitness support'] },
  ],
  CA: [
    { word: 'cure', alternatives: ['support', 'help maintain', 'promote'] },
    { word: 'treat', alternatives: ['support', 'help with', 'assist'] },
    { word: 'disease', alternatives: ['condition', 'concern', 'issue'] },
    { word: 'health canada approved', alternatives: ['quality tested', 'third-party tested', 'quality assured'] },
    { word: 'clinically proven', alternatives: ['studied', 'research-backed', 'quality tested'] },
    { word: 'guaranteed', alternatives: ['designed to', 'formulated to', 'intended to'] },
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
  if (riskyWords.length === 0) {
    return <span style={{ color: '#c5c9d8', fontSize: '14px', lineHeight: 1.8 }}>{content}</span>
  }

  const parts = []
  let lastIndex = 0

  riskyWords.forEach((rw, i) => {
    if (rw.index > lastIndex) {
      parts.push(<span key={`text-${i}`} style={{ color: '#c5c9d8' }}>{content.substring(lastIndex, rw.index)}</span>)
    }
    parts.push(
      <span key={`risky-${i}`} style={{ background: 'rgba(244,94,94,0.2)', border: '1px solid rgba(244,94,94,0.4)', borderRadius: '3px', color: '#f45e5e', padding: '0 3px', fontWeight: 600, cursor: 'pointer' }}
        title={`Alternatives: ${rw.alternatives.join(', ')}`}>
        {rw.word}
      </span>
    )
    lastIndex = rw.index + rw.length
  })

  if (lastIndex < content.length) {
    parts.push(<span key="text-end" style={{ color: '#c5c9d8' }}>{content.substring(lastIndex)}</span>)
  }

  return <>{parts}</>
}

export default function ContentChecker() {
  const [marketplace, setMarketplace] = useState('US')
  const [content, setContent] = useState('')
  const [extraExplain, setExtraExplain] = useState('')
  const [riskyWords, setRiskyWords] = useState<RiskyWord[]>([])
  const [analyzed, setAnalyzed] = useState(false)
  const [selectedWord, setSelectedWord] = useState<RiskyWord | null>(null)

  const analyzeNow = () => {
    if (!content.trim()) return
    const found = analyzeContent(content, marketplace)
    setRiskyWords(found)
    setAnalyzed(true)
    setSelectedWord(null)
  }

  const reset = () => {
    setContent('')
    setExtraExplain('')
    setRiskyWords([])
    setAnalyzed(false)
    setSelectedWord(null)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0b0c10', display: 'flex', flexDirection: 'column' }}>

      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 28px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '28px', height: '28px', background: 'linear-gradient(135deg, #5e9ef4, #7c5ef4)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>⚡</div>
          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: 800, color: '#e8eaf2' }}>Wextrion</span>
        </div>
        <Link href="/dashboard" style={{ fontSize: '13px', color: '#7c8099', textDecoration: 'none' }}>← Back to Dashboard</Link>
      </nav>

      <div style={{ flex: 1, maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '32px 40px' }}>

        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '26px', fontWeight: 800, color: '#e8eaf2', marginBottom: '6px' }}>🔍 Compliant Content Checker</h1>
          <p style={{ color: '#7c8099', fontSize: '14px' }}>Paste your listing content below. Risky words will be highlighted in red with safe alternatives.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: analyzed ? '1fr 1fr' : '1fr', gap: '24px' }}>

          {/* INPUT SIDE */}
          <div>
            <div style={{ background: 'rgba(19,21,28,0.8)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px', marginBottom: '16px' }}>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: '#7c8099', marginBottom: '6px' }}>Marketplace</label>
                <select value={marketplace} onChange={e => setMarketplace(e.target.value)}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px 14px', color: '#e8eaf2', fontSize: '14px', outline: 'none' }}>
                  {['US', 'UK', 'CA'].map(m => (
                    <option key={m} value={m} style={{ background: '#13151c' }}>Amazon {m}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: '#7c8099', marginBottom: '6px' }}>Your Listing Content *</label>
                <textarea
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="Paste your title, bullet points, or product description here..."
                  rows={10}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '12px 14px', color: '#e8eaf2', fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.7 }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: '#7c8099', marginBottom: '6px' }}>Additional Context (Optional)</label>
                <textarea
                  value={extraExplain}
                  onChange={e => setExtraExplain(e.target.value)}
                  placeholder="Tell us more about your product — category, ingredients, intended use, etc. This helps us give better alternatives..."
                  rows={3}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '12px 14px', color: '#e8eaf2', fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={analyzeNow} disabled={!content.trim()}
                  style={{ flex: 1, padding: '13px', background: content.trim() ? 'linear-gradient(135deg, #f4c45e, #f4845e)' : 'rgba(255,255,255,0.05)', color: content.trim() ? 'white' : '#7c8099', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '15px', cursor: content.trim() ? 'pointer' : 'not-allowed' }}>
                  Analyze Content →
                </button>
                {analyzed && (
                  <button onClick={reset}
                    style={{ padding: '13px 20px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#7c8099', cursor: 'pointer', fontSize: '14px' }}>
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* RESULTS SIDE */}
          {analyzed && (
            <div>
              {/* Risk Summary */}
              <div style={{ background: riskyWords.length === 0 ? 'rgba(78,244,176,0.06)' : 'rgba(244,94,94,0.06)', border: `1px solid ${riskyWords.length === 0 ? 'rgba(78,244,176,0.2)' : 'rgba(244,94,94,0.2)'}`, borderRadius: '12px', padding: '16px 20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ fontSize: '28px' }}>{riskyWords.length === 0 ? '✅' : '⚠️'}</div>
                <div>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '16px', fontWeight: 700, color: riskyWords.length === 0 ? '#4ef4b0' : '#f45e5e', marginBottom: '2px' }}>
                    {riskyWords.length === 0 ? 'Content looks compliant!' : `${riskyWords.length} risky word${riskyWords.length > 1 ? 's' : ''} found`}
                  </div>
                  <div style={{ fontSize: '12px', color: '#7c8099' }}>
                    {riskyWords.length === 0 ? 'No risky claims detected in your content.' : 'Click on any highlighted word to see alternatives.'}
                  </div>
                </div>
              </div>

              {/* Highlighted Content */}
              <div style={{ background: 'rgba(19,21,28,0.8)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '20px', marginBottom: '16px', lineHeight: 1.8, fontSize: '14px', whiteSpace: 'pre-wrap' }}>
                <HighlightedContent content={content} riskyWords={riskyWords} />
              </div>

              {/* Risky Words List */}
              {riskyWords.length > 0 && (
                <div style={{ background: 'rgba(19,21,28,0.8)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '20px' }}>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '16px', fontWeight: 700, color: '#e8eaf2', marginBottom: '16px' }}>
                    Safe Alternatives
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {Array.from(new Map(riskyWords.map(rw => [rw.word.toLowerCase(), rw])).values()).map((rw, i) => (
                      <div key={i} style={{ background: 'rgba(244,94,94,0.05)', border: '1px solid rgba(244,94,94,0.15)', borderRadius: '8px', padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                          <span style={{ background: 'rgba(244,94,94,0.15)', color: '#f45e5e', padding: '2px 10px', borderRadius: '4px', fontSize: '13px', fontWeight: 600 }}>
                            ❌ {rw.word}
                          </span>
                          <span style={{ color: '#7c8099', fontSize: '12px' }}>replace with:</span>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {rw.alternatives.map((alt: string, j: number) => (
                            <span key={j} style={{ background: 'rgba(78,244,176,0.08)', border: '1px solid rgba(78,244,176,0.2)', color: '#4ef4b0', padding: '3px 12px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}
                              onClick={() => {
                                const newContent = content.replace(new RegExp(rw.word, 'gi'), alt)
                                setContent(newContent)
                                setAnalyzed(false)
                                setRiskyWords([])
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
  )
}