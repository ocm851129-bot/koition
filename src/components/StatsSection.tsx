import { FadeUp } from './FadeUp'

const stats = [
  {
    value: '1,000만+',
    label: '데이터 처리',
    desc: '국가 주요기록물의 완벽한 디지털 아카이빙 성공 실적 보유',
    detail: '국가기록원, 대통령기록관, NRICH, 강원도청 등 국가 핵심 기관의 기록물을 포함합니다.',
  },
  {
    value: '99.9%',
    label: '데이터 무결성',
    desc: '자체 개발 PV² 엔진을 통한 엄격한 지능형 품질관리 시스템',
    detail: 'Pre-Verification & Post-Verification 이중 검증 구조로 오류율 0.01% 미만을 유지합니다.',
  },
  {
    value: 'TOP',
    label: 'R&D 그룹',
    desc: '콘텐츠융합연구소 주도의 차세대 지능형 기록관리 기술 개발',
    detail: '세종 AI 센터를 기반으로 LLM·OCR·RFID 융합 기술의 특허 확보를 지속 추진합니다.',
  },
]

const clients = [
  { abbr: 'N', name: 'National Archives', full: '국가기록원' },
  { abbr: 'P', name: 'Presidential Archives', full: '대통령기록관' },
  { abbr: 'N', name: 'NRICH', full: '국립문화재연구원' },
  { abbr: 'G', name: 'Gangwon State', full: '강원특별자치도' },
]

const kpis = [
  { val: '100%', sub: 'Data Integrity', desc: 'KOITION-PV² 방법론을 통한 무결점 데이터 아카이빙 실현', icon: '◈' },
  { val: 'Zero', sub: 'Track Loss', desc: '비전자기록물 Zerotrack 시스템 도입으로 관리 사각지대 해소', icon: '◉' },
  { val: 'Top', sub: 'R&D Group', desc: '세종 AI 센터 개소로 지능형 콘텐츠 융합 기술 선도', icon: '◎' },
]

export default function StatsSection() {
  return (
    <section style={{ background: '#0a0a0a', padding: '100px 32px', position: 'relative', zIndex: 2 }} id="business">
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Section label */}
        <FadeUp style={{ marginBottom: '48px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#FF0000', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            사업 역량
          </span>
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 700, color: '#fff', marginTop: '14px', lineHeight: 1.15 }}>
            국가가 신뢰하는 데이터 엔지니어링 파트너
          </h2>
        </FadeUp>

        {/* Client strip */}
        <FadeUp style={{ marginBottom: '72px' }}>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px' }}>
            주요 고객사
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {[...clients, ...clients, ...clients].map((b, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '8px 16px', borderRadius: '100px',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.5)', fontSize: '12px',
              }}>
                <span style={{
                  width: '22px', height: '22px', borderRadius: '50%',
                  background: '#FF0000', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '10px', fontWeight: 700, flexShrink: 0,
                }}>{b.abbr}</span>
                <span>{b.name}</span>
                <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '11px' }}>({b.full})</span>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Main stats */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px', background: 'rgba(255,255,255,0.06)',
          marginBottom: '24px',
        }} className="stats-grid">
          {stats.map((s, i) => (
            <FadeUp key={i} delay={i * 0.12} style={{ padding: '48px 40px', background: '#0a0a0a' }}>
              <div style={{ fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 700, color: '#fff', lineHeight: 1, marginBottom: '4px' }}>
                {s.value}
              </div>
              <div style={{ fontSize: '13px', color: '#FF0000', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '14px', textTransform: 'uppercase' }}>
                {s.label}
              </div>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, marginBottom: '14px' }}>
                {s.desc}
              </p>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.65, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '14px' }}>
                {s.detail}
              </p>
            </FadeUp>
          ))}
        </div>

        {/* KPI cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="kpi-grid">
          {kpis.map((k, i) => (
            <FadeUp key={i} delay={0.3 + i * 0.1} style={{
              padding: '28px 32px',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '10px', background: '#0e0e0e',
              display: 'flex', gap: '16px', alignItems: 'flex-start',
            }}>
              <span style={{ fontSize: '22px', color: '#FF0000', flexShrink: 0, marginTop: '2px' }}>{k.icon}</span>
              <div>
                <div style={{ fontSize: '26px', fontWeight: 700, color: '#fff', marginBottom: '2px' }}>{k.val}</div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#FF0000', letterSpacing: '0.1em', marginBottom: '10px' }}>{k.sub}</div>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{k.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
