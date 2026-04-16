'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Chatbot() {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return
    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] })
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong. Please try again.' }])
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

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', maxWidth: '800px', width: '100%', margin: '0 auto', padding: '24px 20px', gap: '16px' }}>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '24px', fontWeight: 800, color: '#e8eaf2', marginBottom: '8px' }}>🤖 AI Chatbot</h1>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '400px', maxHeight: '500px', overflowY: 'auto', padding: '16px', background: 'rgba(19,21,28,0.6)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
          {messages.length === 0 && (
            <div style={{ textAlign: 'center', color: '#7c8099', marginTop: '80px' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤖</div>
              <p style={{ fontSize: '16px' }}>Ask me anything!</p>
              <p style={{ fontSize: '13px', marginTop: '8px' }}>I can answer questions, help with research, draft documents and more.</p>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '75%',
                padding: '12px 16px',
                borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                background: msg.role === 'user' ? 'linear-gradient(135deg, #5e9ef4, #7c5ef4)' : 'rgba(28,31,43,0.9)',
                border: msg.role === 'user' ? 'none' : '1px solid rgba(255,255,255,0.06)',
                color: '#e8eaf2',
                fontSize: '14px',
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap'
              }}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{ padding: '12px 16px', borderRadius: '16px 16px 16px 4px', background: 'rgba(28,31,43,0.9)', border: '1px solid rgba(255,255,255,0.06)', color: '#7c8099', fontSize: '14px' }}>
                Thinking...
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            placeholder="Ask anything..."
            style={{ flex: 1, background: 'rgba(19,21,28,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '14px 18px', color: '#e8eaf2', fontSize: '14px', outline: 'none' }}
          />
          <button onClick={sendMessage} disabled={loading} style={{ padding: '14px 24px', background: 'linear-gradient(135deg, #5e9ef4, #7c5ef4)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>
            Send
          </button>
        </div>
      </div>
    </div>
  )
}