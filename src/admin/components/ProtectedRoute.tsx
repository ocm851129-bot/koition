import { useEffect, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) navigate('/admin', { replace: true })
      else setChecking(false)
    })
  }, [navigate])

  if (checking) {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a' }}>
        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>Loading…</div>
      </div>
    )
  }

  return <>{children}</>
}
