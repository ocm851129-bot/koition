import { useEffect, useState } from 'react'
import { FadeUp } from './FadeUp'
import { supabase, type Solution } from '../lib/supabase'

const FALLBACK: Solution[] = [
  {
    id: 's1', name: 'Archive Sense', name_en: 'AI 지능형 기록물 통합 관리 플랫폼',
    badge: 'Demo Available',
    description: '스캔 문서의 OCR 인식부터 AI 자동 요약, 지능형 검색 및 열람 승인 워크플로우를 하나로 통합한 코이션의 차세대 플래그십 솔루션입니다.',
    features: ['고정밀 멀티모달 OCR & 내용 검색', 'LLM 기반 방대 기록물 핵심 요약', 'RFID/QR 자동화 문서 등록 및 추적', '비대면 열람 신청 및 통합 승인 절차', '다운로드 없는 실시간 전체 미리보기', '메모/편집 및 행정박물 통계 관리'],
    featured: true, cta_primary: '솔루션 상세 보기', cta_secondary: '실시간 데모 체험',
    sort_order: 0, published: true, created_at: '', updated_at: '',
  },
  {
    id: 's2', name: 'Zero Track!', name_en: '비전자기록물 실시간 관리 시스템',
    badge: undefined,
    description: 'RFID 및 모바일 기술을 통해 서고 내 비전자기록물의 반입, 반출, 위치추적을 실시간으로 관리합니다.',
    features: ['RFID 기반 실시간 재고조사', '모바일 단말기 현장 연동', '기록물 무단 반출 차단 시스템', '자동 이관/폐기 프로세스'],
    featured: false, cta_primary: '솔루션 상세 보기', cta_secondary: undefined,
    sort_order: 1, published: true, created_at: '', updated_at: '',
  },
  {
    id: 's3', name: 'AI Masking', name_en: 'AI 개인정보 자동 검증/마스킹',
    badge: 'Demo Available',
    description: '기록물 및 공문서 내 성명, 주민번호, 주소 등 민감한 개인정보를 AI가 자동으로 탐지하여 마스킹 처리합니다.',
    features: ['딥러닝 기반 텍스트/영역 탐지', '주민등록번호/지문 자동 식별', '대량 문서 고속 일괄 처리', '마스킹 무결성 검증 리포트'],
    featured: false, cta_primary: '실시간 데모 체험', cta_secondary: undefined,
    sort_order: 2, published: true, created_at: '', updated_at: '',
  },
  {
    id: 's4', name: 'Vision Search', name_en: 'AI 유사 이미지 검색 엔진',
    badge: 'Demo Available',
    description: '수십만 건의 이미지 데이터 중 사용자가 찾는 이미지와 시각적으로 유사한 데이터를 벡터 임베딩 기술로 즉시 찾아냅니다.',
    features: ['특징점 기반 벡터 검색 엔진', '고문헌/유물 이미지 매칭', '유사 패턴 자동 분류 시스템', '멀티 모달 검색 인터페이스'],
    featured: false, cta_primary: '실시간 데모 체험', cta_secondary: undefined,
    sort_order: 3, published: true, created_at: '', updated_at: '',
  },
]

export default function SolutionsSection() {
  const [solutions, setSolutions] = useState<Solution[]>(FALLBACK)

  useEffect(() => {
    supabase
      .from('solutions')
      .select('*')
      .eq('published', true)
      .order('sort_order')
      .then(({ data }) => {
        if (data && data.length > 0) setSolutions(data as Solution[])
      })
  }, [])

  const featured = solutions.find(s => s.featured) ?? solutions[0]
  const rest = solutions.filter(s => s !== featured)

  return (
    <section id="solutions" style={{ background: '#0a0a0a', padding: '100px 32px', position: 'relative', zIndex: 2 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <FadeUp style={{ marginBottom: '64px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#FF0000', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Our Solutions
          </span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#fff', marginTop: '16px', lineHeight: 1.15 }}>
            지능형 기록관리와 데이터 가치 보존을 위한<br />코이션의 독자 기술 라인업입니다.
          </h2>
        </FadeUp>

        {/* Featured card */}
        {featured && (
          <FadeUp delay={0.05} style={{ marginBottom: '20px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #181818 60%, #1f0000 100%)',
              border: '1px solid rgba(255,0,0,0.2)',
              borderRadius: '16px', padding: '48px',
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start',
            }} className="sol-featured">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  {featured.badge && (
                    <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', color: '#22c55e', padding: '4px 10px', border: '1px solid rgba(34,197,94,0.4)', borderRadius: '100px' }}>
                      {featured.badge}
                    </span>
                  )}
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>Flagship Solution</span>
                </div>
                <h3 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>{featured.name}</h3>
                <p style={{ fontSize: '14px', color: '#FF0000', fontWeight: 600, marginBottom: '20px', letterSpacing: '0.04em' }}>{featured.name_en}</p>
                <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, marginBottom: '32px' }}>{featured.description}</p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {featured.cta_primary && (
                    <a href="#contact" style={{ padding: '12px 24px', borderRadius: '4px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', background: '#FF0000', color: '#fff' }}>
                      {featured.cta_primary}
                    </a>
                  )}
                  {featured.cta_secondary && (
                    <a href="#contact" style={{ padding: '12px 24px', borderRadius: '4px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }}>
                      {featured.cta_secondary}
                    </a>
                  )}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>Key Features</div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {(featured.features ?? []).map((f, i) => (
                    <li key={i} style={{ padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                      <span style={{ color: '#FF0000', fontSize: '18px', lineHeight: 1, flexShrink: 0 }}>›</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeUp>
        )}

        {/* Rest cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="sol-grid">
          {rest.map((sol, i) => (
            <FadeUp key={sol.id} delay={0.1 + i * 0.08}>
              <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '32px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '16px' }}>
                  {sol.badge ? (
                    <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', color: '#22c55e', padding: '3px 8px', border: '1px solid rgba(34,197,94,0.35)', borderRadius: '100px' }}>{sol.badge}</span>
                  ) : (
                    <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)', padding: '3px 8px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px' }}>Solution</span>
                  )}
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>{sol.name}</h3>
                <p style={{ fontSize: '12px', color: '#FF0000', fontWeight: 600, marginBottom: '14px', letterSpacing: '0.04em' }}>{sol.name_en}</p>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '24px', flex: 1 }}>{sol.description}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '28px' }}>
                  {(sol.features ?? []).map((f, fi) => (
                    <li key={fi} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', display: 'flex', gap: '8px', lineHeight: 1.5 }}>
                      <span style={{ color: '#FF0000', flexShrink: 0 }}>›</span>{f}
                    </li>
                  ))}
                </ul>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {sol.cta_primary && (
                    <a href="#contact" style={{ padding: '10px 18px', borderRadius: '4px', fontSize: '13px', fontWeight: 600, textDecoration: 'none', background: '#FF0000', color: '#fff' }}>
                      {sol.cta_primary}
                    </a>
                  )}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
