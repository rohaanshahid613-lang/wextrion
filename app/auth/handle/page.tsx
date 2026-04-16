'use client'
import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Handle() {
  const router = useRouter()

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) router.push('/dashboard')
    })

    const hash = window.location.hash
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')

    if (code) {
      supabase.auth.exchangeCodeForSession(code).then(() => {
        router.push('/dashboard')
      })
    } else if (hash) {
      router.push('/dashboard')
    }
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#0b0c10', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #5e9ef4, #7c5ef4)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', margin: '0 auto 16px' }}>⚡</div>
        <p style={{ color: '#7c8099', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Signing you in...</p>
      </div>
    </div>
  )
}