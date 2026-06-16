type Props = {
  size?: 'sm' | 'md' | 'lg'
}

const scale = {
  sm: { icon: 20, top: 9,  brand: 14, bottom: 9,  topSpacing: 1, bottomSpacing: 1, gap: 3  },
  md: { icon: 28, top: 11, brand: 18, bottom: 11, topSpacing: 2, bottomSpacing: 2, gap: 4  },
  lg: { icon: 40, top: 13, brand: 26, bottom: 12, topSpacing: 3, bottomSpacing: 3, gap: 6  },
}

export default function KoitionLogo({ size = 'md' }: Props) {
  const s = scale[size]

  return (
    <a href="#" style={{ display: 'flex', alignItems: 'center', gap: s.gap * 2.5, textDecoration: 'none' }}>
      {/* Icon */}
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 120 120"
        fill="none"
        style={{ flexShrink: 0 }}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M60 120C26.8629 120 0 93.1371 0 60V0C22.5654 0 42.2213 12.4569 52.4662 30.8691C38.4788 34.2089 28.0787 46.7902 28.0787 61.8006V63.1443C28.0787 79.9648 41.7146 93.6006 58.5353 93.6006H59.8789L59.8785 61.8006C59.8785 79.3633 74.1159 93.6006 91.6787 93.6006L91.6787 61.8006C91.6787 44.2783 77.5071 30.0661 60 30.0008L60 0H62.5352C94.2722 0 120 25.7279 120 57.4648V60C120 93.1371 93.1371 120 60 120Z"
          fill="white"
        />
      </svg>

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
