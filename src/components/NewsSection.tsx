import { useEffect, useState } from 'react'
import { FadeUp } from './FadeUp'
import { supabase, type NewsItem } from '../lib/supabase'

const FALLBACK: NewsItem[] = [
  { id: '1', date: '2025.12.03', tag: 'News', category: '뉴스', title: '2025년 유망중소기업 인증', description: '경제도시 대전을 이끌어갈 유망 중소기업으로 (주)코이션이 선정되어 2030년 12월 2일까지 인증과 함께 대전광역시로부터 다양한 지원 수혜.', published: true, created_at: '', updated_at: '' },
  { id: '2', date: '2023.06.30', tag: 'News', category: '뉴스', title: '주식회사 코이션 지역 버스 광고 진행', description: '대전광역시 소재 전문 기업으로서 지역사회에 코이션의 이름을 알리고 기술력을 홍보하고자 대전광역시 주요 시내버스에 홍보를 진행.', published: true, created_at: '', updated_at: '' },
  { id: '3', date: '2023.05.31', tag: 'News', category: '뉴스', title: '대전광역시 "좋은 일터" 우수기업 선정', description: '코이션은 근로환경 개선 성과로 우수기업으로 선정되어 수상 및 인증을 받았습니다.', published: true, created_at: '', updated_at: '' },
  { id: '4', date: '2022.11.01', tag: 'News', category: '뉴스', title: '대전 LoRa기반 돌보 알리미 서비스 오픈', description: '(주)코이션은 대전시 지원사업으로 AI, 데이터 기반 대전시 하천 내 시설물 정보 서비스를 개발하고 시민 편의 서비스를 제공합니다.', published: true, created_at: '', updated_at: '' },
]

type Tab = '전체' | '뉴스' | '보도자료'

export default function NewsSection() {
  const [news, setNews]   = useState<NewsItem[]>(FALLBACK)
  const [tab, setTab]     = useState<Tab>('전체')

  useEffect(() => {
    supabase
      .from('news')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data && data.length > 0) setNews(data as NewsItem[])
      })
  }, [])

  const filtered = tab === '전체' ? news : news.filter(i => (i.category ?? '뉴스') === tab)

  return (
    <section id="news" style={{ background: '#0a0a0a', padding: '100px 32px', position: 'relative', zIndex: 2 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <FadeUp style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#FF0000', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                Corporate News
              </span>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#fff', marginTop: '16px', lineHeight: 1.1 }}>
                KOITION<br />Insight & Activities
              </h2>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {(['전체', '뉴스', '보도자료'] as Tab[]).map(t => (
              <button
                key={t} onClick={() => setTab(t)}
                style={{
                  padding: '8px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 600,
                  cursor: 'pointer', border: 'none', transition: 'all 0.2s',
                  background: tab === t ? '#FF0000' : 'rgba(255,255,255,0.06)',
                  color: tab === t ? '#fff' : 'rgba(255,255,255,0.45)',
                }}
              >{t}</button>
            ))}
          </div>
        </FadeUp>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.06)' }} className="news-grid">
          {filtered.map((item, i) => (
            <FadeUp key={item.id} delay={i * 0.08}>
              {item.link_url ? (
                <a href={item.link_url} target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '36px', background: '#0a0a0a', textDecoration: 'none' }}>
                  <NewsCard item={item} />
                </a>
              ) : (
                <div style={{ padding: '36px', background: '#0a0a0a', cursor: 'default' }}>
                  <NewsCard item={item} />
                </div>
              )}
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span style={{
            fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px',
            background: (item.category ?? '뉴스') === '보도자료' ? 'rgba(59,130,246,0.15)' : 'rgba(255,0,0,0.12)',
            color: (item.category ?? '뉴스') === '보도자료' ? '#60a5fa' : '#FF0000',
          }}>
            {item.category ?? '뉴스'}
          </span>
          <span style={{
            fontSize: '11px', fontWeight: 600, color: '#FF0000',
            padding: '4px 10px', border: '1px solid rgba(255,0,0,0.3)',
            borderRadius: '100px', letterSpacing: '0.08em',
          }}>
            {item.tag}
          </span>
        </div>
        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>{item.date}</span>
      </div>
      <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#fff', marginBottom: '12px', lineHeight: 1.4 }}>
        {item.title}
      </h3>
      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: '24px' }}>
        {item.description}
      </p>
      <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em' }}>
        {item.link_url ? '기사 원문 보기 →' : '자세히 보기 →'}
      </span>
    </>
  )
}
