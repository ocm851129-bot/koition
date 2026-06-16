import { motion } from 'motion/react'
import { FadeUp } from './FadeUp'

const words = ['DIGITAL', 'ENGINEERING', 'FOR', 'THE', 'FUTURE.']

export default function VideoHeroSection() {
  return (
    <>
      <video
        autoPlay muted loop playsInline
        style={{
          position: 'fixed', top: 0, left: 0,
          width: '100%', height: '100vh',
          objectFit: 'cover', zIndex: 0,
        }}
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260514_135830_bb6491d1-9b66-4aec-9722-13b4dfe3fb46.mp4"
          type="video/mp4"
        />
      </video>

      <section
        className="video-hero-section"
        style={{
          position: 'relative', zIndex: 1,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center', height: '100vh',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: '760px' }}>
          {/* Eyebrow */}
          <FadeUp delay={0.05}>
            <span style={{
              fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em',
              color: '#FF0000', textTransform: 'uppercase', marginBottom: '20px',
              display: 'block',
            }}>
              2026 Innovation Standard
            </span>
          </FadeUp>

          {/* Word-by-word heading */}
          <h1 style={{
            display: 'flex', flexWrap: 'wrap', gap: '0.25em',
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 700, lineHeight: 1.05,
            letterSpacing: '-0.02em', textTransform: 'uppercase',
            color: '#fff', margin: 0,
          }}>
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subtext */}
          <FadeUp as="p" delay={0.7} y={24} style={{
            marginTop: '24px', fontSize: '15px',
            lineHeight: 1.7, color: 'rgba(255,255,255,0.75)',
            maxWidth: '380px',
          }}>
            데이터의 본질을 꿰뚫는 무결점 전산화 공정.<br />
            (주)코이션이 디지털 대전환의 기준을 다시 정의합니다.
          </FadeUp>

          {/* CTA Buttons */}
          <FadeUp delay={0.9} className="btn-group" style={{ marginTop: '40px', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <a href="#business" style={{
              background: '#FF0000', color: '#fff',
              padding: '14px 28px', borderRadius: '4px',
              fontSize: '14px', fontWeight: 600,
              textDecoration: 'none', letterSpacing: '0.04em',
            }}>
              사업 영역 탐색
            </a>
            <a href="#factory" style={{
              background: 'transparent', color: '#fff',
              padding: '14px 28px', borderRadius: '4px',
              fontSize: '14px', fontWeight: 600,
              textDecoration: 'none', letterSpacing: '0.04em',
              border: '1px solid rgba(255,255,255,0.35)',
            }}>
              디지털 공정 상세
            </a>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
