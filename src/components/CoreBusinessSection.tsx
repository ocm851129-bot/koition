import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { FadeUp } from './FadeUp'

const tabs = ['Overall View', 'Digital Archiving', 'Platform Dev', 'IT Consulting']

const content = {
  'Overall View': null,
  'Digital Archiving': {
    en: 'Public DB Archiving',
    ko: '국가 중요기록물의 완벽한 디지털 보존을 위한 무결점 DB 구축 서비스.',
    items: ['영구 지적문서/건축물대장 DB', '국가기록원 주요 기록물 전산화'],
  },
  'Platform Dev': {
    en: 'Smart Solution Dev',
    ko: '기록관리 업무의 효율성을 극대화하는 지능형 소프트웨어 공급.',
    items: ['지능형 아카이브 플랫폼 (Archive Sense)', '비전자기록물 관리시스템 (ZEROTRACK!)'],
  },
  'IT Consulting': {
    en: 'Archives Consulting',
    ko: '기록관리 체계 수립 및 프로세스 혁신을 위한 전문 컨설팅.',
    items: ['대통령기록물 관리 체계 연구', '비공개 기록물 공개재분류 컨설팅'],
  },
}

export default function CoreBusinessSection() {
  const [active, setActive] = useState('Digital Archiving')

  const data = content[active as keyof typeof content]

  return (
    <section style={{ background: '#111', padding: '100px 32px', position: 'relative', zIndex: 2 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <FadeUp style={{ marginBottom: '64px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#FF0000', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Core Business Sectors
          </span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#fff', marginTop: '16px', lineHeight: 1.15 }}>
            세상의 데이터를<br />가치 있는 지능으로.
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', marginTop: '16px', maxWidth: '520px', lineHeight: 1.75 }}>
            코이션은 기록물 전산화부터 지능형 플랫폼 개발, 미래 기술 연구 및 전략 컨설팅까지 데이터의 전 생애주기를 선도합니다.
          </p>
        </FadeUp>

        {/* Tab bar */}
        <FadeUp delay={0.1} style={{ display: 'flex', gap: '4px', marginBottom: '48px', flexWrap: 'wrap' }}>
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActive(tab)} style={{
              padding: '10px 22px', borderRadius: '100px',
              fontSize: '13px', fontWeight: 600, cursor: 'pointer',
              border: '1px solid',
              transition: 'all 0.2s',
              background: active === tab ? '#FF0000' : 'transparent',
              color: active === tab ? '#fff' : 'rgba(255,255,255,0.5)',
              borderColor: active === tab ? '#FF0000' : 'rgba(255,255,255,0.12)',
            }}>
              {tab}
            </button>
          ))}
        </FadeUp>

        {/* Content panel */}
        <AnimatePresence mode="wait">
          {data && (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px',
                padding: '48px', background: '#181818', borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
              className="business-panel"
            >
              <div>
                <p style={{ fontSize: '11px', fontWeight: 600, color: '#FF0000', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px' }}>
                  {data.en}
                </p>
                <p style={{ fontSize: '18px', color: '#fff', lineHeight: 1.65, marginBottom: '32px' }}>
                  {data.ko}
                </p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {data.items.map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.65)', fontSize: '14px' }}>
                      <span style={{ width: '6px', height: '6px', background: '#FF0000', borderRadius: '50%', flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <a href="#contact" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  color: '#fff', fontSize: '14px', fontWeight: 600,
                  textDecoration: 'none', letterSpacing: '0.04em',
                  borderBottom: '1px solid rgba(255,255,255,0.3)',
                  paddingBottom: '4px',
                }}>
                  View Deep Detail →
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
