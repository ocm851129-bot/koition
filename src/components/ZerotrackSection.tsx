import { FadeUp } from './FadeUp'

const features = [
  {
    cat: '기록관리 효율성',
    items: ['이관(예정), 검색, 폐기 정수조사 기능', '19가지 검색항목 제공으로 통계기능 제공', '부서별 사전등록 기능을 통해 이관업무 절차 개선'],
  },
  {
    cat: '기록물 안정성(보안)',
    items: ['연계시스템 및 DB 접근 시 모든 통신 암호화', '전자서명 및 워터마크 활용 가능', 'GS인증 획득을 통한 소프트웨어 품질 증명'],
  },
  {
    cat: '시스템 호환성',
    items: ['상용 프린터 및 바코드리더기 완벽 호환', '다수의 바코드리더기를 활용한 멀티 기능 구현'],
  },
]

const badges = [
  { label: 'GS 인증', sub: 'Standard' },
  { label: '통신 암호화', sub: 'Security' },
  { label: 'RFID/Barcode 연동', sub: 'Software Solution' },
]

export default function ZerotrackSection() {
  return (
    <section id="zerotrack" style={{ background: '#111', padding: '100px 32px', position: 'relative', zIndex: 2 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="zerotrack-grid">
          <FadeUp>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#FF0000', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Software Solution
            </span>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 700, color: '#fff', marginTop: '16px', marginBottom: '8px', lineHeight: 1.1 }}>
              ZEROTRACK!
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', marginBottom: '40px', lineHeight: 1.7 }}>
              비전자기록물 관리 시스템
            </p>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '40px', flexWrap: 'wrap' }}>
              {badges.map((b, i) => (
                <div key={i} style={{
                  padding: '8px 16px', borderRadius: '6px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.03)',
                }}>
                  <div style={{ fontSize: '12px', color: '#fff', fontWeight: 600 }}>{b.label}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{b.sub}</div>
                </div>
              ))}
            </div>

            {features.map((f, fi) => (
              <div key={fi} style={{ marginBottom: '28px' }}>
                <div style={{
                  fontSize: '12px', fontWeight: 600, color: '#FF0000',
                  letterSpacing: '0.08em', marginBottom: '12px',
                }}>
                  {f.cat}
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {f.items.map((item, i) => (
                    <li key={i} style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', display: 'flex', gap: '8px', lineHeight: 1.55 }}>
                      <span style={{ color: '#FF0000', flexShrink: 0, marginTop: '2px' }}>•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </FadeUp>

          {/* Dashboard mockup */}
          <FadeUp delay={0.2}>
            <div style={{
              background: '#0d0d0d', borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.08)',
              overflow: 'hidden',
            }}>
              {/* Titlebar */}
              <div style={{
                padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F57' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FEBC2E' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28C840' }} />
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginLeft: '8px' }}>ZEROTRACK! System Dashboard</span>
              </div>

              {/* Dashboard body */}
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                  {[
                    { label: '총 기록물', value: '1,284,923', color: '#FF0000' },
                    { label: '이관 완료', value: '1,189,847', color: '#22c55e' },
                    { label: '검수 진행중', value: '42,103', color: '#f59e0b' },
                    { label: '폐기 예정', value: '52,973', color: '#6366f1' },
                  ].map((item, i) => (
                    <div key={i} style={{ padding: '16px', background: '#181818', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginBottom: '6px' }}>{item.label}</div>
                      <div style={{ fontSize: '20px', fontWeight: 700, color: item.color }}>{item.value}</div>
                    </div>
                  ))}
                </div>

                {/* Bar chart mock */}
                <div style={{ padding: '16px', background: '#181818', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginBottom: '12px' }}>월별 이관 현황</div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '60px' }}>
                    {[40, 65, 50, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                      <div key={i} style={{
                        flex: 1, background: i === 11 ? '#FF0000' : 'rgba(255,255,255,0.12)',
                        borderRadius: '3px 3px 0 0',
                        height: `${h}%`,
                      }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
