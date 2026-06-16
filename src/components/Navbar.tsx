import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const navLinks = [
  { label: '사업역량', href: '#business' },
  { label: '솔루션', href: '#solutions' },
  { label: '회사연혁', href: '#history' },
  { label: '디지털공정', href: '#factory' },
  { label: 'Zerotrack', href: '#zerotrack' },
  { label: 'ArchiveSense', href: '#archivesense' },
  { label: '보유인증', href: '#certifications' },
  { label: 'NEWS', href: '#news' },
]
// Section IDs: #business #solutions #history #factory #zerotrack #archivesense #certifications #news #contact

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'background 0.3s, backdrop-filter 0.3s',
        background: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      }}
    >
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 32px',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <svg width="28" height="28" viewBox="0 0 120 120" fill="none">
            <path fillRule="evenodd" clipRule="evenodd"
              d="M60 120C26.8629 120 0 93.1371 0 60V0C22.5654 0 42.2213 12.4569 52.4662 30.8691C38.4788 34.2089 28.0787 46.7902 28.0787 61.8006V63.1443C28.0787 79.9648 41.7146 93.6006 58.5353 93.6006H59.8789L59.8785 61.8006C59.8785 79.3633 74.1159 93.6006 91.6787 93.6006L91.6787 61.8006C91.6787 44.2783 77.5071 30.0661 60 30.0008L60 0H62.5352C94.2722 0 120 25.7279 120 57.4648V60C120 93.1371 93.1371 120 60 120Z"
              fill="white"
            />
          </svg>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: '16px', letterSpacing: '0.08em' }}>KOITION</span>
        </a>

        {/* Desktop nav */}
        <ul style={{
          display: 'flex', alignItems: 'center', gap: '32px',
          listStyle: 'none', margin: 0, padding: 0,
        }}
          className="hidden-mobile"
        >
          {navLinks.map(link => (
            <li key={link.label}>
              <a href={link.href} style={{
                color: 'rgba(255,255,255,0.75)',
                textDecoration: 'none',
                fontSize: '13px',
                letterSpacing: '0.04em',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="hidden-mobile">
          <a href="#" style={{
            color: 'rgba(255,255,255,0.6)', fontSize: '13px',
            textDecoration: 'none', letterSpacing: '0.04em',
          }}>CMS</a>
          <a href="#contact" style={{
            background: '#FF0000', color: '#fff',
            padding: '8px 18px', borderRadius: '4px',
            fontSize: '13px', textDecoration: 'none',
            fontWeight: 600, letterSpacing: '0.04em',
          }}>Inquiry</a>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          className="show-mobile"
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', gap: '5px', padding: '4px',
          }}
        >
          <span style={{ width: '22px', height: '2px', background: '#fff', display: 'block', transition: 'transform 0.2s', transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
          <span style={{ width: '22px', height: '2px', background: '#fff', display: 'block', opacity: menuOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
          <span style={{ width: '22px', height: '2px', background: '#fff', display: 'block', transition: 'transform 0.2s', transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            style={{
              background: 'rgba(10,10,10,0.97)',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              padding: '20px 32px 28px',
            }}
          >
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block', color: 'rgba(255,255,255,0.8)',
                  textDecoration: 'none', fontSize: '15px',
                  padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)} style={{
              display: 'inline-block', marginTop: '20px',
              background: '#FF0000', color: '#fff',
              padding: '10px 24px', borderRadius: '4px',
              fontSize: '14px', textDecoration: 'none', fontWeight: 600,
            }}>
              Inquiry
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
