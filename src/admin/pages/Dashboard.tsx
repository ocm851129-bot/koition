import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'
import { supabase } from '../../lib/supabase'

export default function Dashboard() {
  const [newsCount, setNewsCount] = useState(0)
  const [lastUpdated, setLastUpdated] = useState('')

  useEffect(() => {
    supabase.from('news').select('id, updated_at', { count: 'exact' }).then(({ count, data }) => {
      setNewsCount(count ?? 0)
      if (data && data.length > 0) {
        const latest = data.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())[0]
        setLastUpdated(new Date(latest.updated_at).toLocaleDateString('ko-KR'))
      }
    })
  }, [])

  const cards = [
    { label: '등록된 뉴스',  value: newsCount, unit: '건',  link: '/admin/news',    color: '#FF0000' },
    { label: '마지막 업데이트', value: lastUpdated || '-', unit: '', link: '/admin/news', color: '#f59e0b' },
    { label: '사이트 설정',  value: '편집 가능', unit: '',  link: '/admin/content', color: '#22c55e' },
  ]

  return (
    <AdminLayout>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>대시보드</h1>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>koition.co.kr 사이트 콘텐츠를 관리합니다.</p>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '40px' }}>
        {cards.map((c, i) => (
          <Link key={i} to={c.link} style={{ textDecoration: 'none' }}>
            <div style={{
              padding: '24px', background: '#111',
              border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px',
              borderLeft: `3px solid ${c.color}`, transition: 'background 0.15s',
            }}
              onMouseEnter={e => (e.currentTarget.style.background = '#181818')}
              onMouseLeave={e => (e.currentTarget.style.background = '#111')}
            >
              <div style={{ fontSize: '26px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
                {c.value}{c.unit}
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em' }}>{c.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
          빠른 작업
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link to="/admin/news" style={{
            padding: '10px 20px', background: '#FF0000', color: '#fff',
            borderRadius: '6px', fontSize: '13px', fontWeight: 600, textDecoration: 'none',
          }}>
            + 뉴스 작성
          </Link>
          <Link to="/admin/content" style={{
            padding: '10px 20px', background: 'transparent', color: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(255,255,255,0.12)', borderRadius: '6px', fontSize: '13px', textDecoration: 'none',
          }}>
            사이트 내용 편집
          </Link>
          <a href="/" target="_blank" rel="noreferrer" style={{
            padding: '10px 20px', background: 'transparent', color: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(255,255,255,0.12)', borderRadius: '6px', fontSize: '13px', textDecoration: 'none',
          }}>
            ↗ 사이트 보기
          </a>
        </div>
      </div>
    </AdminLayout>
  )
}
