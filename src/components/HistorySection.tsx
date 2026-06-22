import { useEffect, useState } from 'react'
import { FadeUp } from './FadeUp'
import { supabase, type HistoryEvent } from '../lib/supabase'

type HistoryYear = { year: string; era: string; events: HistoryEvent[] }

const eraColor: Record<string, string> = {
  'Innovation ERA': '#FF0000',
  'Growth ERA': '#f59e0b',
  'Foundation ERA': '#6366f1',
}

const tagColors: Record<string, { bg: string; text: string }> = {
  GS: { bg: 'rgba(34,197,94,0.15)', text: '#22c55e' },
  ISO: { bg: 'rgba(99,102,241,0.15)', text: '#818cf8' },
  Honor: { bg: 'rgba(251,191,36,0.15)', text: '#fbbf24' },
  Innovation: { bg: 'rgba(255,0,0,0.15)', text: '#FF0000' },
  Future: { bg: 'rgba(6,182,212,0.15)', text: '#06b6d4' },
  IP: { bg: 'rgba(168,85,247,0.15)', text: '#c084fc' },
  Culture: { bg: 'rgba(244,114,182,0.15)', text: '#f472b6' },
  Business: { bg: 'rgba(251,146,60,0.15)', text: '#fb923c' },
  Certification: { bg: 'rgba(148,163,184,0.1)', text: '#94a3b8' },
  Service: { bg: 'rgba(20,184,166,0.15)', text: '#14b8a6' },
  Procurement: { bg: 'rgba(148,163,184,0.1)', text: '#94a3b8' },
  Quality: { bg: 'rgba(99,102,241,0.15)', text: '#818cf8' },
  MOU: { bg: 'rgba(234,179,8,0.15)', text: '#eab308' },
  Founding: { bg: 'rgba(255,0,0,0.2)', text: '#FF0000' },
  'R&D': { bg: 'rgba(6,182,212,0.15)', text: '#06b6d4' },
}

const FALLBACK: HistoryEvent[] = [
  { id: 'h1', year: '2026', month: '01', era: 'Innovation ERA', title: '아카이브 센스(Archive Sense) AI 엔진 v2.0 고도화 완료', tag: 'Innovation', sort_order: 0, published: true, created_at: '', updated_at: '' },
  { id: 'h2', year: '2026', month: '01', era: 'Innovation ERA', title: '디지털 엔지니어링 2026 비전 선포', tag: 'Future', sort_order: 1, published: true, created_at: '', updated_at: '' },
  { id: 'h3', year: '2025', month: '10', era: 'Innovation ERA', title: '소프트웨어 품질 인증(GS 1등급) 획득 - 아카이브 센스(Archive Sense)', tag: 'GS', sort_order: 0, published: true, created_at: '', updated_at: '' },
  { id: 'h4', year: '2025', month: '08', era: 'Innovation ERA', title: '소프트웨어 품질 인증(GS인증) 획득 - 기록물DB구축 공정관리 및 서고관리시스템', tag: 'GS', sort_order: 1, published: true, created_at: '', updated_at: '' },
  { id: 'h5', year: '2025', month: '02', era: 'Innovation ERA', title: '유망중소기업 인증 (대전광역시)', tag: 'Honor', sort_order: 2, published: true, created_at: '', updated_at: '' },
  { id: 'h6', year: '2024', month: '12', era: 'Innovation ERA', title: '소프트웨어 품질 인증(GS인증) 획득 - 비전자문서 목록관리 소프트웨어', tag: 'GS', sort_order: 0, published: true, created_at: '', updated_at: '' },
  { id: 'h7', year: '2023', month: '09', era: 'Growth ERA', title: '기록관리경영시스템인증(ISO 15489) 획득', tag: 'ISO', sort_order: 0, published: true, created_at: '', updated_at: '' },
  { id: 'h8', year: '2014', month: '10', era: 'Foundation ERA', title: '주식회사 코이션 법인 설립', tag: 'Founding', sort_order: 0, published: true, created_at: '', updated_at: '' },
]

function groupByYear(events: HistoryEvent[]): HistoryYear[] {
  const map = new Map<string, HistoryYear>()
  for (const ev of events) {
    if (!map.has(ev.year)) map.set(ev.year, { year: ev.year, era: ev.era, events: [] })
    map.get(ev.year)!.events.push(ev)
  }
  return Array.from(map.values()).sort((a, b) => +b.year - +a.year)
}

export default function HistorySection() {
  const [events, setEvents] = useState<HistoryEvent[]>(FALLBACK)

  useEffect(() => {
    supabase
      .from('history')
      .select('*')
      .eq('published', true)
      .order('year', { ascending: false })
      .order('month', { ascending: false })
      .then(({ data }) => {
        if (data && data.length > 0) setEvents(data as HistoryEvent[])
      })
  }, [])

  const history = groupByYear(events)

  return (
    <section id="history" style={{ background: '#111', padding: '100px 32px', position: 'relative', zIndex: 2 }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

        <FadeUp style={{ marginBottom: '72px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#FF0000', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Company Heritage
          </span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#fff', marginTop: '16px', lineHeight: 1.15 }}>
            The Timeline of Intelligence
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', marginTop: '16px', lineHeight: 1.75 }}>
            (주)코이션이 걸어온 혁신의 발자취를 연도별로 정리했습니다.<br />
            데이터의 가치를 증명해온 12년의 기록입니다.
          </p>
        </FadeUp>

        <div style={{ position: 'relative' }}>
          <div className="history-line" style={{
            position: 'absolute', left: '120px', top: 0, bottom: 0,
            width: '1px', background: 'rgba(255,255,255,0.06)',
          }} />

          {history.map((yr, yi) => {
            const color = eraColor[yr.era] ?? '#fff'
            return (
              <FadeUp key={yr.year} delay={yi * 0.04} className="history-row" style={{ display: 'flex', gap: '0', marginBottom: '48px' }}>
                <div className="history-year" style={{ width: '120px', flexShrink: 0, paddingRight: '28px', paddingTop: '4px' }}>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#fff', lineHeight: 1 }}>{yr.year}</div>
                  <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', color, marginTop: '6px', textTransform: 'uppercase' }}>
                    {yr.era}
                  </div>
                </div>

                <div className="history-dot" style={{ flexShrink: 0, position: 'relative', marginRight: '28px' }}>
                  <div style={{
                    width: '10px', height: '10px', borderRadius: '50%',
                    background: color, marginTop: '8px',
                    boxShadow: `0 0 0 3px rgba(${color === '#FF0000' ? '255,0,0' : color === '#f59e0b' ? '245,158,11' : '99,102,241'},0.2)`,
                  }} />
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {yr.events.map((ev, ei) => {
                    const tc = tagColors[ev.tag] ?? { bg: 'rgba(255,255,255,0.08)', text: 'rgba(255,255,255,0.5)' }
                    return (
                      <div key={ev.id} style={{
                        display: 'flex', alignItems: 'flex-start', gap: '14px',
                        padding: '14px 18px', borderRadius: '8px',
                        background: yi === 0 && ei === 0 ? 'rgba(255,0,0,0.05)' : '#0f0f0f',
                        border: `1px solid ${yi === 0 && ei === 0 ? 'rgba(255,0,0,0.15)' : 'rgba(255,255,255,0.04)'}`,
                      }}>
                        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontWeight: 600, flexShrink: 0, marginTop: '2px', minWidth: '24px' }}>
                          {ev.month}
                        </span>
                        <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.55, flex: 1 }}>
                          {ev.title}
                        </span>
                        <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', padding: '3px 9px', borderRadius: '100px', flexShrink: 0, background: tc.bg, color: tc.text }}>
                          {ev.tag}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </FadeUp>
            )
          })}
        </div>
      </div>
    </section>
  )
}
