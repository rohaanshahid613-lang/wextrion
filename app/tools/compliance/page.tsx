'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Compliance() {
  const [issueType, setIssueType] = useState('andon')
  const [productName, setProductName] = useState('')
  const [issueDetails, setIssueDetails] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const generatePOA = async () => {
    if (!productName.trim() || !issueDetails.trim()) return
    setLoading(true)
    setResult('')

    try {
      const res = await fetch('/api/compliance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ issueType, productName, issueDetails })
      })
      const data = await res.json()
      setResult(data.result)
    } catch {
      setResult('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0b0c10', display: 'flex', flexDirection: 'column' }}>
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 32px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '28px', height: '28px', background: 'linear-gradient(135deg, #5e9ef4, #7c5ef4)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>⚡</div>
          <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '18px', fontWeight: 800, color: '#e8eaf2' }}>Wextrion</span>
        </div>
        <Link href="/dashboard" style={{ fontSize: '13px', color: '#7c8099', textDecoration: 'none' }}>← Back to Dashboard</Link>
      </nav>

      <div style={{ flex: 1, maxWidth: '800px', width: '100%', margin: '0 auto', padding: '24px 20px' }}>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '24px', fontWeight: 800, color: '#e8eaf2', marginBottom: '8px' }}>📋 Compliance & POA Writer</h1>
        <p style={{ color: '#7c8099', fontSize: '14px', marginBottom: '32px' }}>Generate Amazon appeals, POAs, and compliance documents</p>

        <div style={{ background: 'rgba(19,21,28,0.8)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '28px', marginBottom: '24px' }}>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: '#7c8099', marginBottom: '8px' }}>Document Type</label>
            <select
              value={issueType}
              onChange={e => setIssueType(e.target.value)}
              style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '12px 16px', color: '#e8eaf2', fontSize: '14px', outline: 'none' }}
            >
              <option value="andon">Andon Cord POA</option>
              <option value="suspension">Account Suspension Appeal</option>
              <option value="listing">Listing Reinstatement</option>
              <option value="compliance">Compliance Audit</option>
              <option value="return">Return Rate Appeal</option>
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: '#7c8099', marginBottom: '8px' }}>Product Name / ASIN</label>
            <input
              value={productName}
              onChange={e => setProductName(e.target.value)}
              placeholder="e.g. LifePro Vibration Plate B09Y9G5QPS"
              style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '12px 16px', color: '#e8eaf2', fontSize: '14px', outline: 'none' }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: '#7c8099', marginBottom: '8px' }}>Issue Details</label>
            <textarea
              value={issueDetails}
              onChange={e => setIssueDetails(e.target.value)}
              placeholder="Describe the issue, what Amazon said, and any relevant details..."
              rows={5}
              style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '12px 16px', color: '#e8eaf2', fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
            />
          </div>

          <button onClick={generatePOA} disabled={loading} style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #f4c45e, #f4845e)', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '15px', cursor: 'pointer' }}>
            {loading ? 'Generating document...' : 'Generate Document →'}
          </button>
        </div>

        {result && (
          <div style={{ background: 'rgba(19,21,28,0.8)', border: '1px solid rgba(244,196,94,0.2)', borderRadius: '16px', padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '16px', fontWeight: 700, color: '#e8eaf2' }}>Generated Document</h3>
              <button
                onClick={() => navigator.clipboard.writeText(result)}
                style={{ padding: '6px 14px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#7c8099', cursor: 'pointer', fontSize: '12px' }}>
                Copy
              </button>
            </div>
            <pre style={{ color: '#c5c9d8', fontSize: '13px', lineHeight: 1.7, whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{result}</pre>
          </div>
        )}
      </div>
    </div>
  )
}