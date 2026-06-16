import { useEffect, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase, isSupabaseReady } from '../../lib/supabase'

const LOCAL_KEY = 'koition_admin_auth'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (!isSupabaseReady) {
      // Fallback: check localStorage
      if (localStorage.getItem(LOCAL_KEY) !== '1') {
        navigate('/admin', { replace: true })
      } else {
        setChecking(false)
      }
      return
    }

    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) navigate('/admin', { replace: true })
      else setChecking(false)
    })
  }, [navigate])

  if (checking) {
    return (
      <div style={{
        display: 'flex', height: '100vh',
        alignItems: 'center', justifyContent: 'center',
        background: '#0a0a0a',
      }}>
        <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '14px' }}>Loading…</div>
      </div>
    )
  }

  return <>{children}</>
}
