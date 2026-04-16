import { supabase } from './supabase'

export async function getUserTier() {
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) return { tier: 'anon', isAdmin: false }
  
  const email = session.user.email
  
  if (email === process.env.ADMIN_EMAIL) {
    return { tier: 'admin', isAdmin: true, userId: session.user.id }
  }
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_status')
    .eq('id', session.user.id)
    .single()
  
  return {
    tier: profile?.subscription_status ?? 'free',
    isAdmin: false,
    userId: session.user.id
  }
}