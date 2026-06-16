import { FadeUp } from './FadeUp'

const videos = [
  {
    id: '5FExlHMKW48',
    title: 'Tech Vision 2026',
    sub: 'Digital Transformation for Records',
    desc: '(주)코이션의 디지털 전환 기술 비전과 2026년 혁신 로드맵을 영상으로 확인하십시오.',
    tags: ['Vision 2026', 'Data Engineering', 'AI Archive'],
  },
  {
    id: '_bS56fOxDhU',
    title: 'Koition Innovation in Motion',
    sub: 'The Future of Intelligent Records Management',
    desc: 'Archive Sense, Zerotrack, AI Masking 등 코이션 핵심 솔루션의 실제 작동 화면을 담았습니다.',
    tags: ['Archive Sense', 'Zero Track', 'Live Demo'],
  },
]

export default function MediaSection() {
  return (
    <section id="media" style={{ background: '#0d0d0d', padding: '100px 32px', position: 'relative', zIndex: 2 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <FadeUp style={{ textAlign: 'center', marginBottom: '72px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#FF0000', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Koition Media Insight
          </span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#fff', marginTop: '16px', lineHeight: 1.15 }}>
            Innovation in Motion
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', marginTop: '16px', maxWidth: '500px', margin: '16px auto 0', lineHeight: 1.75 }}>
            (주)코이션이 그리는 데이터의 미래, 영상으로 직접 확인하십시오.
          </p>
        </FadeUp>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }} className="media-grid">
          {videos.map((v, i) => (
            <FadeUp key={i} delay={i * 0.12}>
              <div style={{
                background: '#111',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '16px',
                overflow: 'hidden',
              }}>
                {/* 16:9 YouTube iframe */}
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${v.id}?rel=0&modestbranding=1&color=white`}
                    title={v.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{
                      position: 'absolute', top: 0, left: 0,
                      width: '100%', height: '100%', border: 'none',
                    }}
                  />
                </div>

                {/* Info */}
                <div style={{ padding: '24px 28px 28px' }}>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    {v.tags.map(tag => (
                      <span key={tag} style={{
                        fontSize: '10px', fontWeight: 600, letterSpacing: '0.08em',
                        padding: '3px 10px', borderRadius: '100px',
                        border: '1px solid rgba(255,0,0,0.3)',
                        color: '#FF0000',
                      }}>{tag}</span>
                    ))}
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '6px', lineHeight: 1.3 }}>{v.title}</h3>
                  <p style={{ fontSize: '12px', color: '#FF0000', fontWeight: 600, marginBottom: '12px', letterSpacing: '0.04em' }}>{v.sub}</p>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{v.desc}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <FadeUp delay={0.2} style={{
          marginTop: '48px', padding: '28px 40px',
          background: 'linear-gradient(90deg, rgba(255,0,0,0.08) 0%, transparent 100%)',
          borderRadius: '12px', border: '1px solid rgba(255,0,0,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '16px',
        }}>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>
              코이션 솔루션을 직접 체험해보시겠습니까?
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>
              전문 컨설턴트가 맞춤형 데모를 제공합니다.
            </div>
          </div>
          <a href="#contact" style={{
            background: '#FF0000', color: '#fff',
            padding: '14px 28px', borderRadius: '4px',
            fontSize: '14px', fontWeight: 600,
            textDecoration: 'none', letterSpacing: '0.04em', flexShrink: 0,
          }}>
            무료 상담 신청 →
          </a>
        </FadeUp>
      </div>
    </section>
  )
}
