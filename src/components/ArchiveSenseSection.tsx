import { FadeUp } from './FadeUp'

const features = [
  { icon: '◈', title: 'AI 문서 요약', desc: '방대한 기록물을 핵심 정보 위주로 자동 요약' },
  { icon: '◉', title: '지능형 내용 검색', desc: 'OCR 텍스트 기반의 정밀한 내용 검색 지원' },
  { icon: '◎', title: '열람 승인 자동화', desc: '온라인 열람 신청 및 관리자 승인 프로세스' },
  { icon: '◍', title: '멀티모달 OCR', desc: '이미지 속 정보를 데이터로 정밀 추출' },
]

export default function ArchiveSenseSection() {
  return (
    <section id="archivesense" style={{ background: '#0a0a0a', padding: '100px 32px', position: 'relative', zIndex: 2 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="archive-grid">

          {/* Left: AI card */}
          <FadeUp delay={0.1}>
            <div style={{
              background: '#111', borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.07)',
              overflow: 'hidden',
            }}>
              {/* Header bar */}
              <div style={{
                padding: '16px 24px', background: '#181818',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em' }}>GS Grade 1 Certified</span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {['OCR Processing', 'AI Analyzing', 'Indexing'].map(tag => (
                    <span key={tag} style={{
                      fontSize: '10px', padding: '3px 8px', borderRadius: '100px',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: 'rgba(255,255,255,0.5)',
                    }}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* Card body */}
              <div style={{ padding: '28px 24px' }}>
                <div style={{ fontSize: '11px', color: '#FF0000', fontWeight: 600, letterSpacing: '0.12em', marginBottom: '8px' }}>
                  AI Document Summary
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}>2026.01.21</div>
                <div style={{
                  padding: '16px', background: '#1a1a1a',
                  borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)',
                  fontSize: '13px', color: 'rgba(255,255,255,0.65)',
                  lineHeight: 1.7,
                }}>
                  "본 기록물은 2024년도 영구 지적문서 전산화 사업의 결과물로서, AI 분석 결과 총 4,200페이지의 내용 중 핵심 변동 사항 3건이 감지되었습니다..."
                </div>

                {/* Progress bars */}
                <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { label: 'OCR 인식률', val: 98 },
                    { label: '분류 정확도', val: 95 },
                    { label: '요약 품질', val: 91 },
                  ].map(p => (
                    <div key={p.label}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{p.label}</span>
                        <span style={{ fontSize: '11px', color: '#FF0000' }}>{p.val}%</span>
                      </div>
                      <div style={{ height: '3px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px' }}>
                        <div style={{ width: `${p.val}%`, height: '100%', background: '#FF0000', borderRadius: '2px' }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{
                  marginTop: '20px', padding: '10px 16px',
                  background: 'rgba(34,197,94,0.1)', borderRadius: '6px',
                  display: 'flex', alignItems: 'center', gap: '8px',
                }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
                  <span style={{ fontSize: '12px', color: '#22c55e', fontWeight: 600 }}>GS 1 Quality Pass</span>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Right: content */}
          <FadeUp>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#FF0000', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Next-Gen AI Platform
            </span>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 700, color: '#fff', marginTop: '16px', lineHeight: 1.1, marginBottom: '8px' }}>
              Archive Sense
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', marginBottom: '12px', lineHeight: 1.6 }}>
              지능형 기록관리의 완성
            </p>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, marginBottom: '40px', maxWidth: '440px' }}>
              단순 관리를 넘어 '이해'하는 시스템. OCR 인식부터 AI 문서 요약, 비대면 승인 체계까지 기록관리의 전 과정을 지능화합니다.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '36px' }}>
              {features.map((f, i) => (
                <div key={i} style={{
                  padding: '20px', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '8px', background: '#111',
                }}>
                  <div style={{ fontSize: '20px', marginBottom: '10px', color: '#FF0000' }}>{f.icon}</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff', marginBottom: '6px' }}>{f.title}</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{f.desc}</div>
                </div>
              ))}
            </div>

            <a href="#contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: '#FF0000', color: '#fff',
              padding: '14px 28px', borderRadius: '4px',
              fontSize: '14px', fontWeight: 600,
              textDecoration: 'none', letterSpacing: '0.04em',
            }}>
              플랫폼 상세 보기 →
            </a>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
