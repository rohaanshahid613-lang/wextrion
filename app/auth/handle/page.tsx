'use client'
import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Handle() {
  const router = useRouter()

  useEffect(() => {
    const handleAuth = async () => {
      const params = new URLSearchParams(window.location.search)
      const code = params.get('code')

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) {
          router.push('/dashboard')
          return
        }
      }

      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        router.push('/dashboard')
        return
      }

      supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' && session) {
          router.push('/dashboard')
        }
      })

      setTimeout(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
          if (session) router.push('/dashboard')
          else router.push('/auth/login')
        })
      }, 3000)
    }

    handleAuth()
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#0b0c10', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '56px', height: '56px', background: 'linear-gradient(135deg, #5e9ef4, #7c5ef4)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', margin: '0 auto 20px' }}>⚡</div>
        <p style={{ color: '#e8eaf2', fontSize: '16px', fontWeight: 600, fontFamily: 'Playfair Display, serif', marginBottom: '8px' }}>Signing you in...</p>
        <p style={{ color: '#7c8099', fontSize: '13px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Please wait a moment</p>
      </div>
    </div>
  )
}