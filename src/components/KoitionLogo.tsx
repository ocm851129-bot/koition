type Props = {
  size?: 'sm' | 'md' | 'lg'
}

const scale = {
  sm: { icon: 36, top: 9,  brand: 15, bottom: 9,  topSpacing: 1, bottomSpacing: 1, gap: 3  },
  md: { icon: 48, top: 11, brand: 20, bottom: 11, topSpacing: 2, bottomSpacing: 2, gap: 4  },
  lg: { icon: 64, top: 13, brand: 28, bottom: 12, topSpacing: 3, bottomSpacing: 3, gap: 6  },
}

export default function KoitionLogo({ size = 'md' }: Props) {
  const s = scale[size]

  return (
    <a href="#" style={{ display: 'flex', alignItems: 'center', gap: s.gap * 2.5, textDecoration: 'none' }}>
      {/* Icon */}
      <img
        src="/logo.png"
        alt="Koition"
        style={{ width: s.icon, height: s.icon, objectFit: 'contain', flexShrink: 0 }}
      />

      {/* Stacked wordmark */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: s.gap, lineHeight: 1 }}>
        {/* Korea */}
        <span style={{
          fontSize: s.top,
          fontWeight: 400,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.45)',
          marginBottom: s.topSpacing,
        }}>
          Korea
        </span>

        {/* Koition */}
        <span style={{
          fontSize: s.brand,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#ffffff',
          lineHeight: 1,
        }}>
          Koition
        </span>

        {/* Innovation */}
        <span style={{
          fontSize: s.bottom,
          fontWeight: 400,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#FF0000',
          marginTop: s.bottomSpacing,
        }}>
          Innovation
        </span>
      </div>
    </a>
  )
}
