import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function Login() {
  const navigate = useNavigate()
  const [id, setId]         = useState('')
  const [pw, setPw]         = useState('')
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const email = id === 'admin' ? 'admin@koition.co.kr' : id
    const { error: err } = await supabase.auth.signInWithPassword({ email, password: pw })

    setLoading(false)
    if (err) {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.')
    } else {
      navigate('/admin/dashboard', { replace: true })
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#0a0a0a',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Helvetica Now Var','Helvetica Neue',sans-serif",
    }}>
      <div style={{ width: '100%', maxWidth: '380px', padding: '0 20px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <img src="/logo.png" alt="Koition" style={{ width: 52, height: 52, objectFit: 'contain', marginBottom: '16px' }} />
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Koition Admin CMS
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', marginBottom: '8px' }}>
              아이디
            </label>
            <input
              type="text"
              value={id}
              onChange={e => setId(e.target.value)}
              placeholder="admin"
              required
              style={{
                width: '100%', padding: '12px 16px',
                background: '#181818', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '6px', color: '#fff', fontSize: '14px',
                outline: 'none', boxSizing: 'border-box',
              }}
              onFocus={e => (e.target.style.borderColor = 'rgba(255,0,0,0.5)')}
              onBlur={e  => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', marginBottom: '8px' }}>
              비밀번호
            </label>
            <input
              type="password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: '100%', padding: '12px 16px',
                background: '#181818', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '6px', color: '#fff', fontSize: '14px',
                outline: 'none', boxSizing: 'border-box',
              }}
              onFocus={e => (e.target.style.borderColor = 'rgba(255,0,0,0.5)')}
              onBlur={e  => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
            />
          </div>

          {error && (
            <div style={{ fontSize: '13px', color: '#ff6b6b', padding: '10px 14px', background: 'rgba(255,0,0,0.08)', borderRadius: '6px' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '13px', background: loading ? '#7a0000' : '#FF0000',
              color: '#fff', border: 'none', borderRadius: '6px',
              fontSize: '14px', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '4px', letterSpacing: '0.06em',
            }}
          >
            {loading ? '로그인 중…' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  )
}
