import { FadeUp } from './FadeUp'

type HistoryEvent = { month: string; title: string; tag: string }
type HistoryYear = { year: string; era: string; events: HistoryEvent[] }

const eraColor: Record<string, string> = {
  'Innovation ERA': '#FF0000',
  'Growth ERA': '#f59e0b',
  'Foundation ERA': '#6366f1',
}

const history: HistoryYear[] = [
  {
    year: '2026', era: 'Innovation ERA',
    events: [
      { month: '01', title: '아카이브 센스(Archive Sense) AI 엔진 v2.0 고도화 완료', tag: 'Innovation' },
      { month: '01', title: '디지털 엔지니어링 2026 비전 선포', tag: 'Future' },
    ],
  },
  {
    year: '2025', era: 'Innovation ERA',
    events: [
      { month: '10', title: '소프트웨어 품질 인증(GS 1등급) 획득 - 아카이브 센스(Archive Sense)', tag: 'GS' },
      { month: '08', title: '소프트웨어 품질 인증(GS인증) 획득 - 기록물DB구축 공정관리 및 서고관리시스템', tag: 'GS' },
      { month: '02', title: '유망중소기업 인증 (대전광역시)', tag: 'Honor' },
    ],
  },
  {
    year: '2024', era: 'Innovation ERA',
    events: [
      { month: '12', title: '소프트웨어 품질 인증(GS인증) 획득 - 비전자문서 목록관리 소프트웨어', tag: 'GS' },
      { month: '10', title: '가족친화인증 (여성가족부) 갱신', tag: 'Culture' },
      { month: '03', title: '벤처기업 인증 갱신', tag: 'Business' },
    ],
  },
  {
    year: '2023', era: 'Growth ERA',
    events: [
      { month: '11', title: '소프트웨어 품질 인증(GS인증) 획득 - DB구축공정관리시스템(건축물대장)', tag: 'GS' },
      { month: '09', title: '기록관리경영시스템인증(ISO 15489) 획득', tag: 'ISO' },
      { month: '05', title: '고객만족경영시스템인증(ISO 10004) 획득', tag: 'ISO' },
      { month: '02', title: '대전광역시 좋은일터 우수기업 선정', tag: 'Honor' },
    ],
  },
  {
    year: '2022', era: 'Growth ERA',
    events: [
      { month: '10', title: '안전보건경영시스템인증(ISO 45001:2018) 획득', tag: 'ISO' },
      { month: '04', title: '정보보호경영시스템인증(ISO/IEC 27001:2013) 획득', tag: 'ISO' },
    ],
  },
  {
    year: '2021', era: 'Growth ERA',
    events: [
      { month: '09', title: '강소기업 확인서 (고용노동부) 획득', tag: 'Honor' },
      { month: '01', title: '벤처기업 인증 갱신', tag: 'Business' },
    ],
  },
  {
    year: '2020', era: 'Growth ERA',
    events: [
      { month: '11', title: '직업정보제공사업자 인증', tag: 'Service' },
      { month: '04', title: '기술혁신형 중소기업(INNOBIZ) 갱신', tag: 'Certification' },
    ],
  },
  {
    year: '2019', era: 'Growth ERA',
    events: [
      { month: '08', title: '벤처기업 인증 갱신', tag: 'Business' },
      { month: '03', title: '경영혁신형 중소기업(MAINBIZ) 확인', tag: 'Certification' },
    ],
  },
  {
    year: '2018', era: 'Growth ERA',
    events: [
      { month: '12', title: '품질경영시스템인증(ISO 9001) 획득', tag: 'ISO' },
      { month: '10', title: '가족친화인증 (여성가족부) 획득', tag: 'Culture' },
      { month: '06', title: '유망중소기업 인증 (대전광역시)', tag: 'Honor' },
      { month: '02', title: '특허등록 - 순환 인공 신경망 기술을 이용한 기록물 보존기간 추천 시스템', tag: 'IP' },
    ],
  },
  {
    year: '2017', era: 'Foundation ERA',
    events: [
      { month: '11', title: '특허등록 - 직렬통신 프로토콜을 이용한 RFID 통신 방법 및 시스템', tag: 'IP' },
      { month: '05', title: '기술혁신형 중소기업(INNOBIZ) 확인', tag: 'Certification' },
      { month: '01', title: '벤처기업인증 획득', tag: 'Certification' },
    ],
  },
  {
    year: '2016', era: 'Foundation ERA',
    events: [
      { month: '05', title: '제로트렉(기록관 서고관리 및 비전자기록물 DB구축 공정관리 시스템) 상용화', tag: 'Service' },
      { month: '04', title: '제로트렉 조달청 조달물품 등록', tag: 'Procurement' },
    ],
  },
  {
    year: '2015', era: 'Foundation ERA',
    events: [
      { month: '09', title: '한국정보화진흥원 국가 DB 사업 품질관리 참여', tag: 'Quality' },
      { month: '03', title: '전주대학교 학술정보 Glocal Master 양성 사업단 산학협력', tag: 'MOU' },
    ],
  },
  {
    year: '2014', era: 'Foundation ERA',
    events: [
      { month: '10', title: '주식회사 코이션 법인 설립', tag: 'Founding' },
      { month: '08', title: 'AD-VIEW(이미지뷰어) 프로그램 저작권 등록', tag: 'IP' },
      { month: '07', title: 'DBPMS(DB구축관리시스템) 프로그램 저작권 등록', tag: 'IP' },
      { month: '06', title: '기술보증기금 기술인증 및 보증', tag: 'Certification' },
      { month: '05', title: '기업부설연구소 승인(콘텐츠 융합연구소)', tag: 'R&D' },
    ],
  },
]

const tagColors: Record<string, { bg: string; text: string }> = {
  GS: { bg: 'rgba(34,197,94,0.15)', text: '#22c55e' },
  ISO: { bg: 'rgba(99,102,241,0.15)', text: '#818cf8' },
  Honor: { bg: 'rgba(251,191,36,0.15)', text: '#fbbf24' },
  Innovation: { bg: 'rgba(255,0,0,0.15)', text: '#FF0000' },
  Future: { bg: 'rgba(6,182,212,0.15)', text: '#06b6d4' },
  IP: { bg: 'rgba(168,85,247,0.15)', text: '#c084fc' },
  Culture: { bg: 'rgba(244,114,182,0.15)', text: '#f472b6' },
  Business: { bg: 'rgba(251,146,60,0.15)', text: '#fb923c' },
  Certification: { bg: 'rgba(148,163,184,0.1)', text: '#94a3b8' },
  Service: { bg: 'rgba(20,184,166,0.15)', text: '#14b8a6' },
  Procurement: { bg: 'rgba(148,163,184,0.1)', text: '#94a3b8' },
  Quality: { bg: 'rgba(99,102,241,0.15)', text: '#818cf8' },
  MOU: { bg: 'rgba(234,179,8,0.15)', text: '#eab308' },
  Founding: { bg: 'rgba(255,0,0,0.2)', text: '#FF0000' },
  'R&D': { bg: 'rgba(6,182,212,0.15)', text: '#06b6d4' },
}

export default function HistorySection() {
  return (
    <section id="history" style={{ background: '#111', padding: '100px 32px', position: 'relative', zIndex: 2 }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

        {/* Header */}
        <FadeUp style={{ marginBottom: '72px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#FF0000', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Company Heritage
          </span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#fff', marginTop: '16px', lineHeight: 1.15 }}>
            The Timeline of Intelligence
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', marginTop: '16px', lineHeight: 1.75 }}>
            (주)코이션이 걸어온 혁신의 발자취를 연도별로 정리했습니다.<br />
            데이터의 가치를 증명해온 12년의 기록입니다.
          </p>
        </FadeUp>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div className="history-line" style={{
            position: 'absolute', left: '120px', top: 0, bottom: 0,
            width: '1px', background: 'rgba(255,255,255,0.06)',
          }} />

          {history.map((yr, yi) => {
            const color = eraColor[yr.era] ?? '#fff'
            return (
              <FadeUp key={yr.year} delay={yi * 0.04} className="history-row" style={{ display: 'flex', gap: '0', marginBottom: '48px' }}>
                {/* Year column */}
                <div className="history-year" style={{ width: '120px', flexShrink: 0, paddingRight: '28px', paddingTop: '4px' }}>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#fff', lineHeight: 1 }}>{yr.year}</div>
                  <div style={{
                    fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em',
                    color, marginTop: '6px', textTransform: 'uppercase',
                  }}>
                    {yr.era}
                  </div>
                </div>

                {/* Dot */}
                <div className="history-dot" style={{ flexShrink: 0, position: 'relative', marginRight: '28px' }}>
                  <div style={{
                    width: '10px', height: '10px', borderRadius: '50%',
                    background: color, marginTop: '8px',
                    boxShadow: `0 0 0 3px rgba(${color === '#FF0000' ? '255,0,0' : color === '#f59e0b' ? '245,158,11' : '99,102,241'},0.2)`,
                  }} />
                </div>

                {/* Events */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {yr.events.map((ev, ei) => {
                    const tc = tagColors[ev.tag] ?? { bg: 'rgba(255,255,255,0.08)', text: 'rgba(255,255,255,0.5)' }
                    return (
                      <div key={ei} style={{
                        display: 'flex', alignItems: 'flex-start', gap: '14px',
                        padding: '14px 18px', borderRadius: '8px',
                        background: yi === 0 && ei === 0 ? 'rgba(255,0,0,0.05)' : '#0f0f0f',
                        border: `1px solid ${yi === 0 && ei === 0 ? 'rgba(255,0,0,0.15)' : 'rgba(255,255,255,0.04)'}`,
                      }}>
                        <span style={{
                          fontSize: '11px', color: 'rgba(255,255,255,0.3)',
                          fontWeight: 600, flexShrink: 0, marginTop: '2px', minWidth: '24px',
                        }}>
                          {ev.month}
                        </span>
                        <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.55, flex: 1 }}>
                          {ev.title}
                        </span>
                        <span style={{
                          fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em',
                          padding: '3px 9px', borderRadius: '100px', flexShrink: 0,
                          background: tc.bg, color: tc.text,
                        }}>
                          {ev.tag}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </FadeUp>
            )
          })}
        </div>
      </div>
    </section>
  )
}
