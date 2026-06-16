import { useState } from 'react'
import { FadeUp } from './FadeUp'

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section id="contact" style={{ background: '#111', padding: '100px 32px', position: 'relative', zIndex: 2 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }} className="contact-grid">

          {/* Left: info */}
          <FadeUp>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#FF0000', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              전문가의 Strategic Consulting
            </span>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 700, color: '#fff', marginTop: '16px', lineHeight: 1.1, marginBottom: '16px' }}>
              DB 구축 계획부터<br />유지보수까지,
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, marginBottom: '48px' }}>
              코이션의 최고 전문가 그룹이 함께합니다.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <div style={{ fontSize: '11px', color: '#FF0000', fontWeight: 600, letterSpacing: '0.12em', marginBottom: '6px' }}>Representative</div>
                <div style={{ fontSize: '15px', color: '#fff' }}>정일영 / 최재교</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#FF0000', fontWeight: 600, letterSpacing: '0.12em', marginBottom: '6px' }}>Email</div>
                <a href="mailto:mail@koition.co.kr" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>
                  mail@koition.co.kr
                </a>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#FF0000', fontWeight: 600, letterSpacing: '0.12em', marginBottom: '6px' }}>Call Representative</div>
                <a href="tel:042-334-4167" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>
                  042-334-4167
                </a>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#FF0000', fontWeight: 600, letterSpacing: '0.12em', marginBottom: '6px' }}>HQ Office</div>
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>
                  대전 유성구 반석로 15 (반석동)<br />하이클래스 8층
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Right: form */}
          <FadeUp delay={0.15}>
            {submitted ? (
              <div style={{
                padding: '48px', background: '#0d0d0d',
                borderRadius: '12px', textAlign: 'center',
                border: '1px solid rgba(255,255,255,0.06)',
              }}>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>✓</div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#fff', marginBottom: '8px' }}>신청 완료</div>
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>빠른 시일 내에 연락드리겠습니다.</div>
              </div>
            ) : (
              <form
                onSubmit={e => { e.preventDefault(); setSubmitted(true) }}
                style={{
                  padding: '40px', background: '#0d0d0d',
                  borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex', flexDirection: 'column', gap: '20px',
                }}
              >
                {[
                  { label: '성함', placeholder: 'Name', type: 'text' },
                  { label: '소속/기관', placeholder: 'Organization', type: 'text' },
                ].map(field => (
                  <div key={field.label}>
                    <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '8px', letterSpacing: '0.06em' }}>
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      required
                      style={{
                        width: '100%', padding: '12px 16px',
                        background: '#181818', border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '6px', color: '#fff', fontSize: '14px',
                        outline: 'none', boxSizing: 'border-box',
                      }}
                      onFocus={e => (e.target.style.borderColor = 'rgba(255,0,0,0.5)')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                    />
                  </div>
                ))}

                <div>
                  <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '8px', letterSpacing: '0.06em' }}>
                    문의 내용
                  </label>
                  <select required style={{
                    width: '100%', padding: '12px 16px',
                    background: '#181818', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '6px', color: 'rgba(255,255,255,0.7)', fontSize: '14px',
                    outline: 'none', boxSizing: 'border-box', cursor: 'pointer',
                  }}>
                    <option value="">어떤 분야의 상담이 필요하신가요?</option>
                    <option value="archiving">기록물 전산화 (DB 구축)</option>
                    <option value="platform">지능형 플랫폼 개발</option>
                    <option value="consulting">IT 컨설팅</option>
                    <option value="zerotrack">ZEROTRACK! 도입</option>
                    <option value="archivesense">Archive Sense 도입</option>
                    <option value="other">기타</option>
                  </select>
                </div>

                <button type="submit" style={{
                  background: '#FF0000', color: '#fff',
                  padding: '14px', borderRadius: '6px',
                  fontSize: '14px', fontWeight: 600,
                  border: 'none', cursor: 'pointer',
                  letterSpacing: '0.06em', marginTop: '4px',
                  transition: 'opacity 0.2s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  상담 신청하기
                </button>
              </form>
            )}
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
