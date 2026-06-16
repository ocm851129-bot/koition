import { FadeUp } from './FadeUp'

const research = [
  {
    icon: '◈',
    title: '지능형 DB 분석',
    desc: 'AI 기반 비정형 기록물 자동 분류 및 분석 기술을 연구합니다. NLP와 멀티모달 딥러닝을 결합해 공공 문서의 구조를 자동 추론합니다.',
    tags: ['NLP', 'Multimodal AI', 'Auto Classification'],
  },
  {
    icon: '◉',
    title: '특허 기술 확보',
    desc: 'RFID/Barcode 연계 자산 관리 독자 기술 개발. 비전자기록물 위치 추적 및 이력 관리의 특허 기반 기술을 지속 확장합니다.',
    tags: ['RFID Patent', 'Asset Tracking', 'IP Strategy'],
  },
  {
    icon: '◎',
    title: '융합 서비스 기획',
    desc: '사용자 경험 중심의 공공 데이터 플랫폼을 연구합니다. 시민과 기관이 함께 활용할 수 있는 개방형 기록 서비스를 설계합니다.',
    tags: ['UX Research', 'Open Data', 'Public Platform'],
  },
]

const milestones = [
  { year: '2014', label: '콘텐츠융합연구소 설립', sub: '기업부설연구소 한국산업기술진흥협회 승인' },
  { year: '2017', label: '1호 특허 등록', sub: 'RFID 통신 방법 및 시스템' },
  { year: '2018', label: '2호 특허 등록', sub: '순환 신경망 기록물 보존기간 추천 시스템' },
  { year: '2023', label: 'AI 엔진 R&D 착수', sub: 'LLM 기반 기록물 요약·분류 엔진 자체 개발' },
  { year: '2025', label: '세종 AI센터 개소', sub: '지능형 콘텐츠 융합 기술 R&D 전진기지' },
  { year: '2026', label: 'Archive Sense v2.0', sub: 'AI 엔진 고도화 완료 및 GS 1등급 인증' },
]

export default function ResearchLabSection() {
  return (
    <section id="research" style={{ background: '#111', padding: '100px 32px', position: 'relative', zIndex: 2 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <FadeUp style={{ marginBottom: '72px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#FF0000', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Research Lab · Since 2014
          </span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#fff', marginTop: '16px', lineHeight: 1.15 }}>
            데이터의 가치를 증명하는<br />전문 연구 조직
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', marginTop: '16px', maxWidth: '560px', lineHeight: 1.75 }}>
            (주)코이션 기업부설연구소인 <strong style={{ color: 'rgba(255,255,255,0.8)' }}>콘텐츠융합연구소</strong>는 축적된 디지털 전환 노하우를 바탕으로
            차세대 지식 기반 서비스를 연구합니다.
          </p>
        </FadeUp>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }} className="research-grid">

          {/* Left: research areas */}
          <div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '28px' }}>
              Core Research Areas
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {research.map((r, i) => (
                <FadeUp key={i} delay={i * 0.1}>
                  <div style={{
                    padding: '28px', background: '#0d0d0d',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '10px',
                    borderLeft: '3px solid #FF0000',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                      <span style={{ fontSize: '20px', color: '#FF0000' }}>{r.icon}</span>
                      <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#fff' }}>{r.title}</h3>
                    </div>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: '16px' }}>{r.desc}</p>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {r.tags.map(tag => (
                        <span key={tag} style={{
                          fontSize: '10px', fontWeight: 600, padding: '3px 10px',
                          borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)',
                          color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em',
                        }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          {/* Right: milestone timeline */}
          <FadeUp delay={0.15}>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '28px' }}>
              Innovation Hub Milestones
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '48px', top: 0, bottom: 0, width: '1px', background: 'rgba(255,255,255,0.06)' }} />
              {milestones.map((m, i) => (
                <div key={i} style={{ display: 'flex', gap: '0', marginBottom: '28px', alignItems: 'flex-start' }}>
                  <div style={{ width: '48px', flexShrink: 0 }}>
                    <div style={{
                      width: '8px', height: '8px', borderRadius: '50%',
                      background: i === milestones.length - 1 ? '#FF0000' : 'rgba(255,255,255,0.2)',
                      marginTop: '6px',
                      boxShadow: i === milestones.length - 1 ? '0 0 0 3px rgba(255,0,0,0.2)' : 'none',
                    }} />
                  </div>
                  <div style={{ paddingLeft: '16px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#FF0000', letterSpacing: '0.1em', marginBottom: '4px' }}>{m.year}</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff', marginBottom: '3px' }}>{m.label}</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{m.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stat box */}
            <div style={{
              marginTop: '32px', padding: '28px',
              background: 'linear-gradient(135deg, rgba(255,0,0,0.08), transparent)',
              border: '1px solid rgba(255,0,0,0.15)', borderRadius: '10px',
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {[
                  { val: '2건', label: '보유 특허' },
                  { val: '12년', label: '연구 경력' },
                  { val: '5+', label: 'GS 인증' },
                  { val: '세종', label: 'AI 센터' },
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: '#fff' }}>{s.val}</div>
                    <div style={{ fontSize: '11px', color: '#FF0000', letterSpacing: '0.08em', marginTop: '4px' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
