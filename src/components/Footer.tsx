import KoitionLogo from './KoitionLogo'

export default function Footer() {
  return (
    <footer style={{ background: '#080808', padding: '64px 32px 40px', position: 'relative', zIndex: 2, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '48px', marginBottom: '56px' }} className="footer-grid">

          {/* Brand */}
          <div>
            <div style={{ marginBottom: '24px' }}>
              <KoitionLogo size="md" />
            </div>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.75, maxWidth: '280px', marginBottom: '24px' }}>
              (주)코이션은 데이터 엔지니어링 리더로서 기록물 DB 구축 및 지능형 플랫폼을 통해 국가 데이터 가치를 보존합니다.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>사업자등록번호: 314-86-58536</span>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>대표이사: 정일영 / 최재교</span>
            </div>
          </div>

          {/* Major Biz */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#FF0000', letterSpacing: '0.12em', marginBottom: '20px', textTransform: 'uppercase' }}>
              Major Biz
            </div>
            {['Public DB Archiving', 'Expert Consulting', 'System Dev', 'AI Service'].map(item => (
              <a key={item} href="#" style={{
                display: 'block', fontSize: '13px', color: 'rgba(255,255,255,0.45)',
                textDecoration: 'none', marginBottom: '10px',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Company */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#FF0000', letterSpacing: '0.12em', marginBottom: '20px', textTransform: 'uppercase' }}>
              Company
            </div>
            {['History', 'Zerotrack', 'Certification', 'Contact', 'Community'].map(item => (
              <a key={item} href="#" style={{
                display: 'block', fontSize: '13px', color: 'rgba(255,255,255,0.45)',
                textDecoration: 'none', marginBottom: '10px',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Location & Connect */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#FF0000', letterSpacing: '0.12em', marginBottom: '20px', textTransform: 'uppercase' }}>
              Location
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.75, marginBottom: '24px' }}>
              <div style={{ marginBottom: '8px' }}>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>본사</span><br />
                대전 유성구 반석로 15 하이클래스 8층
              </div>
              <div>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>R&D 연구소</span><br />
                세종특별자치시 집현중앙7로 6<br />지식산업센터 B304
              </div>
            </div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#FF0000', letterSpacing: '0.12em', marginBottom: '12px', textTransform: 'uppercase' }}>
              Connect
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.75 }}>
              <div>P. 042-334-4167</div>
              <div>F. 042-334-4165</div>
              <a href="mailto:mail@koition.co.kr" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>
                mail@koition.co.kr
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop: '28px', borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '12px',
        }}>
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>
            © 2026 KOITION Co., Ltd. Engineering Next Standards.
          </span>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)', textDecoration: 'none' }}>Admin Access</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
