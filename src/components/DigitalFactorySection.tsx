import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { FadeUp } from './FadeUp'

const steps = [
  {
    phase: 'Pre-Analysis', ko: '요구사항 정밀 진단', category: 'Pre-Analysis',
    desc: '현행 기록물 관리 체계의 유실 지점 및 아카이빙 난이도를 전수 조사합니다.',
    tags: ['ERD 역공학 분석', '데이터 유실 탐지 알고리즘'],
    metric: '100.0%', metricLabel: '분석 정확도',
  },
  {
    phase: 'Architecture', ko: '지능형 거버넌스 설계', category: 'Architecture',
    desc: '국가 표준 기록관리 지침을 준수하는 최적의 데이터 구조화 전략을 수립합니다.',
    tags: ['ISO 15489 준수 설계', '보안 계층 구조화'],
    metric: '98.5%', metricLabel: '구조화 최적화',
  },
  {
    phase: 'Engineering', ko: 'AI 워크플로우 모델링', category: 'Engineering',
    desc: 'AI 자동 분류 및 기술 평가를 위해 코이션 전용 딥러닝 모델을 튜닝합니다.',
    tags: ['NLP 분류 엔진', '워크플로우 오케스트레이션'],
    metric: '92.0%', metricLabel: '자동화 커버리지',
  },
  {
    phase: 'Engineering', ko: 'PV² 정밀 엔진 설정', category: 'Engineering',
    desc: '실시간 품질 보증을 위한 PV² 엔진을 공정에 배포합니다.',
    tags: ['실시간 무결성 검사', '분산 처리 파이프라인'],
    metric: '99.9%', metricLabel: '실시간 감시율',
  },
  {
    phase: 'Production', ko: '고정밀 디지털 구축', category: 'Production',
    desc: '고해상도 비파괴 스캐닝 및 물리적 정비를 통해 기록물을 디지털 자산화합니다.',
    tags: ['600DPI 비파괴 스캔', '이미지 후처리 AI'],
    metric: '100.0%', metricLabel: '물리 보존율',
  },
  {
    phase: 'Production', ko: 'AI 메타데이터 추출', category: 'Production',
    desc: 'OCR 및 LLM 기반으로 문서 내 정보를 자동 추출하고 정제합니다.',
    tags: ['멀티모달 OCR', '개인정보 탐지 신경망'],
    metric: '97.2%', metricLabel: '추출 재현율',
  },
  {
    phase: 'Quality Assurance', ko: 'Hybrid 지능형 검수', category: 'Quality Assurance',
    desc: 'AI 전수 검수 후 전문가가 심층 검증하여 무결점 데이터를 완성합니다.',
    tags: ['AI-Human 협업 모델', '자동 오류 추적 시스템'],
    metric: '99.99%', metricLabel: '최종 무결성',
  },
  {
    phase: 'Integration', ko: '시스템 통합 및 가동', category: 'Integration',
    desc: '구축된 데이터를 표준 관리 시스템 및 서비스 플랫폼에 완벽 반입합니다.',
    tags: ['표준 연동 API', '대규모 데이터 고속 이관'],
    metric: '100.0%', metricLabel: '반입 성공률',
  },
]

const categoryColors: Record<string, string> = {
  'Pre-Analysis': '#6366f1',
  Architecture: '#8b5cf6',
  Engineering: '#FF0000',
  Production: '#f59e0b',
  'Quality Assurance': '#10b981',
  Integration: '#06b6d4',
}

export default function DigitalFactorySection() {
  const [active, setActive] = useState(0)
  const step = steps[active]

  return (
    <section id="factory" style={{ background: '#0a0a0a', padding: '100px 32px', position: 'relative', zIndex: 2 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <FadeUp style={{ marginBottom: '64px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#FF0000', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Intelligent Assembly Line
          </span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#fff', marginTop: '16px', lineHeight: 1.15 }}>
            The Digital Factory
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', marginTop: '16px', maxWidth: '560px', lineHeight: 1.75 }}>
            (주)코이션의 8단계 고정밀 공정은 데이터의 전주기를 자동화하고 무결성 99.9%를 실현합니다.
          </p>
          <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'pulse 2s infinite' }} />
            <span style={{ fontSize: '12px', color: '#22c55e', fontWeight: 600, letterSpacing: '0.08em' }}>PV² Engine Active</span>
          </div>
        </FadeUp>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '2px', background: 'rgba(255,255,255,0.05)' }} className="factory-grid">

          {/* Step list */}
          <div className="factory-step-list" style={{ background: '#0a0a0a' }}>
            {steps.map((s, i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                width: '100%', textAlign: 'left',
                padding: '20px 28px', border: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                background: active === i ? '#181818' : 'transparent',
                cursor: 'pointer', transition: 'background 0.2s',
                display: 'flex', alignItems: 'center', gap: '16px',
              }}>
                <span style={{
                  width: '24px', height: '24px', borderRadius: '50%',
                  background: active === i ? categoryColors[s.category] : 'rgba(255,255,255,0.08)',
                  color: active === i ? '#fff' : 'rgba(255,255,255,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', fontWeight: 700, flexShrink: 0,
                  transition: 'all 0.2s',
                }}>
                  {i + 1}
                </span>
                <div>
                  <div style={{ fontSize: '11px', color: active === i ? categoryColors[s.category] : 'rgba(255,255,255,0.3)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2px' }}>
                    {s.phase}
                  </div>
                  <div style={{ fontSize: '14px', color: active === i ? '#fff' : 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
                    {s.ko}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div className="factory-detail" style={{ background: '#0f0f0f', padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <span style={{
                  display: 'inline-block', padding: '4px 12px', borderRadius: '100px',
                  background: categoryColors[step.category] + '22',
                  color: categoryColors[step.category],
                  fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em',
                  textTransform: 'uppercase', marginBottom: '20px',
                }}>
                  {step.phase}
                </span>
                <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>{step.ko}</h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, marginBottom: '28px' }}>{step.desc}</p>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '36px' }}>
                  {step.tags.map((tag, i) => (
                    <span key={i} style={{
                      padding: '6px 14px', borderRadius: '4px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      fontSize: '12px', color: 'rgba(255,255,255,0.6)',
                    }}>{tag}</span>
                  ))}
                </div>

                <div style={{
                  padding: '20px 24px', background: '#1a1a1a',
                  borderRadius: '8px', borderLeft: `3px solid ${categoryColors[step.category]}`,
                }}>
                  <div style={{ fontSize: '32px', fontWeight: 700, color: '#fff', lineHeight: 1 }}>{step.metric}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', marginTop: '4px', letterSpacing: '0.06em' }}>{step.metricLabel}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom summary */}
        <FadeUp delay={0.2} style={{
          marginTop: '32px', padding: '24px 32px',
          background: '#111', borderRadius: '8px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '16px',
        }}>
          <div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '4px' }}>Real-time Monitoring</div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>PV² 원격 품질 관리 시스템에 의해 실시간 추적 및 검증됩니다.</div>
          </div>
          <div style={{ display: 'flex', gap: '32px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#fff' }}>99.99%</div>
              <div style={{ fontSize: '11px', color: '#FF0000', letterSpacing: '0.08em' }}>Total Integrity</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#fff' }}>Zero</div>
              <div style={{ fontSize: '11px', color: '#FF0000', letterSpacing: '0.08em' }}>Defect Aim</div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
