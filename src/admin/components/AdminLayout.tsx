import { type ReactNode } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

const navItems = [
  { to: '/admin/dashboard', label: '대시보드',    icon: '▤' },
  { to: '/admin/news',      label: '뉴스 관리',   icon: '◈' },
  { to: '/admin/content',   label: '콘텐츠 편집', icon: '◉' },
]

export default function AdminLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate()

  const logout = async () => {
    await supabase.auth.signOut()
    navigate('/admin', { replace: true })
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a0a', fontFamily: "'Helvetica Now Var','Helvetica Neue',sans-serif" }}>

      {/* Sidebar */}
      <aside style={{
        width: '220px', flexShrink: 0,
        background: '#111', borderRight: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, left: 0, bottom: 0,
      }}>
        {/* Logo */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <img src="/logo.png" alt="" style={{ width: 28, height: 28, objectFit: 'contain', marginBottom: '10px' }} />
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>KOITION</div>
          <div style={{ fontSize: '10px', color: '#FF0000', letterSpacing: '0.12em' }}>ADMIN CMS</div>
        </div>

        {/* Nav */}
        <nav style={{ padding: '16px 10px', flex: 1 }}>
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to} style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 12px', borderRadius: '6px',
              marginBottom: '4px', textDecoration: 'none',
              fontSize: '13px', fontWeight: 500,
              background: isActive ? 'rgba(255,0,0,0.12)' : 'transparent',
              color: isActive ? '#FF0000' : 'rgba(255,255,255,0.55)',
              transition: 'all 0.15s',
            })}>
              <span style={{ fontSize: '16px', lineHeight: 1 }}>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding: '16px 10px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <button onClick={logout} style={{
            width: '100%', padding: '10px 12px', borderRadius: '6px',
            background: 'transparent', border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.45)', fontSize: '13px', cursor: 'pointer',
            textAlign: 'left', display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            ⎋ 로그아웃
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ marginLeft: '220px', flex: 1, padding: '32px 40px', minHeight: '100vh' }}>
        {children}
      </main>
    </div>
  )
}
