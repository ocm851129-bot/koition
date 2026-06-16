import { FadeUp } from './FadeUp'

const certs = [
  { title: 'GS인증 1등급 (Archive Sense)', org: '한국화학융합시험연구원(KTR)' },
  { title: 'GS인증 1등급 (DB구축공정관리)', org: '한국화학융합시험연구원(KTR)' },
  { title: 'ISO/IEC 27001:2013', org: '정보보호경영시스템인증' },
  { title: 'ISO 45001:2018', org: '안전보건경영시스템인증' },
  { title: 'ISO 9001:2015', org: '품질경영시스템인증' },
  { title: 'ISO 10004:2018', org: '고객만족경영시스템인증' },
  { title: '기술혁신형 중소기업(Inno-Biz)', org: '중소벤처기업부' },
  { title: '경영혁신형 중소기업(Main-Biz)', org: '중소벤처기업부' },
  { title: '좋은일터 우수기업', org: '대전광역시' },
  { title: '특허 (RFID 시스템 기술)', org: '특허청' },
  { title: '특허 (AI 기록물 분석 기술)', org: '특허청' },
  { title: '벤처기업확인서', org: '벤처기업확인기관' },
  { title: '강소기업 확인서', org: '고용노동부' },
  { title: '기업부설연구소 인정서', org: '한국산업기술진흥협회' },
  { title: '유망중소기업 인증서', org: '대전광역시' },
]

export default function CertificationsSection() {
  return (
    <section id="certifications" style={{ background: '#111', padding: '100px 32px', position: 'relative', zIndex: 2 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <FadeUp style={{ marginBottom: '64px', textAlign: 'center' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#FF0000', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Koition Trust Credentials
          </span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#fff', marginTop: '16px', lineHeight: 1.15 }}>
            보유기술인증
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', marginTop: '16px', maxWidth: '520px', margin: '16px auto 0', lineHeight: 1.75 }}>
            ISO 국제 표준부터 벤처기업, Inno-Biz, 특허 기술까지.<br />
            (주)코이션의 기술력은 국가 기관의 엄격한 검증을 통해 증명되었습니다.
          </p>
        </FadeUp>

        <div className="cert-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1px',
          background: 'rgba(255,255,255,0.05)',
        }}>
          {certs.map((cert, i) => (
            <FadeUp key={i} delay={Math.floor(i / 3) * 0.08} style={{
              padding: '28px 28px',
              background: '#111',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '6px',
                background: 'rgba(255,0,0,0.12)', border: '1px solid rgba(255,0,0,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '14px',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff', marginBottom: '6px', lineHeight: 1.4 }}>
                {cert.title}
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
                {cert.org}
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Summary bar */}
        <FadeUp delay={0.2} style={{
          marginTop: '40px', padding: '28px 40px',
          background: '#0d0d0d', borderRadius: '8px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '24px',
        }}>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', maxWidth: '500px', lineHeight: 1.65 }}>
            Quality is Our Heritage. 코이션은 단순한 인증 확보를 넘어, 전 공정의 표준화를 통해 글로벌 수준의 데이터 무결성을 실현합니다.
          </p>
          <div style={{ display: 'flex', gap: '40px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: 700, color: '#fff' }}>100%</div>
              <div style={{ fontSize: '11px', color: '#FF0000', letterSpacing: '0.08em' }}>Compliance</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: 700, color: '#fff' }}>Zero</div>
              <div style={{ fontSize: '11px', color: '#FF0000', letterSpacing: '0.08em' }}>Defect Aim</div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
