import { useEffect, useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import { supabase } from '../../lib/supabase'

type Section = { key: string; label: string; fields: { k: string; label: string; multiline?: boolean }[] }

const SECTIONS: Section[] = [
  {
    key: 'hero', label: '히어로 섹션',
    fields: [
      { k: 'eyebrow',     label: '상단 레이블 (예: 2026 Innovation Standard)' },
      { k: 'sub1',        label: '부제목 1' },
      { k: 'sub2',        label: '부제목 2' },
    ],
  },
  {
    key: 'contact', label: '연락처 / 주소',
    fields: [
      { k: 'rep',   label: '대표이사' },
      { k: 'phone', label: '전화번호' },
      { k: 'fax',   label: '팩스' },
      { k: 'email', label: '이메일' },
      { k: 'hq',    label: '본사 주소', multiline: true },
      { k: 'rnd',   label: 'R&D 연구소 주소', multiline: true },
    ],
  },
  {
    key: 'stats', label: '주요 성과 수치',
    fields: [
      { k: 'stat1_val',   label: '수치 1 (예: 1,000만+)' },
      { k: 'stat1_label', label: '수치 1 레이블' },
      { k: 'stat2_val',   label: '수치 2 (예: 99.9%)' },
      { k: 'stat2_label', label: '수치 2 레이블' },
      { k: 'stat3_val',   label: '수치 3 (예: TOP)' },
      { k: 'stat3_label', label: '수치 3 레이블' },
    ],
  },
]

export default function ContentManager() {
  const [data, setData] = useState<Record<string, Record<string, string>>>({})
  const [saving, setSaving] = useState<string | null>(null)
  const [msg, setMsg] = useState('')

  const load = async () => {
    const { data: rows } = await supabase.from('site_config').select('*')
    const map: Record<string, Record<string, string>> = {}
    rows?.forEach(r => { map[r.key] = r.value as Record<string, string> })
    setData(map)
  }

  useEffect(() => { load() }, [])

  const set = (sectionKey: string, fieldKey: string, value: string) => {
    setData(prev => ({
      ...prev,
      [sectionKey]: { ...prev[sectionKey], [fieldKey]: value },
    }))
  }

  const save = async (sectionKey: string) => {
    setSaving(sectionKey)
    await supabase.from('site_config').upsert({ key: sectionKey, value: data[sectionKey], updated_at: new Date().toISOString() })
    setSaving(null)
    setMsg(`'${SECTIONS.find(s => s.key === sectionKey)?.label}' 저장됐습니다.`)
    setTimeout(() => setMsg(''), 3000)
  }

  const inp: React.CSSProperties = {
    width: '100%', padding: '10px 14px',
    background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '6px', color: '#fff', fontSize: '14px', outline: 'none',
    boxSizing: 'border-box', resize: 'vertical',
  }

  return (
    <AdminLayout>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>콘텐츠 편집</h1>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>사이트 텍스트와 설정을 수정합니다. 저장 후 즉시 반영됩니다.</p>
      </div>

      {msg && (
        <div style={{ padding: '12px 16px', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '6px', color: '#22c55e', fontSize: '13px', marginBottom: '20px' }}>
          ✓ {msg}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {SECTIONS.map(section => (
          <div key={section.key} style={{
            background: '#111', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '10px', padding: '28px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#fff' }}>{section.label}</h2>
              <button
                onClick={() => save(section.key)}
                disabled={saving === section.key}
                style={{
                  padding: '8px 20px', background: saving === section.key ? '#7a0000' : '#FF0000',
                  color: '#fff', border: 'none', borderRadius: '6px',
                  fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                }}
              >
                {saving === section.key ? '저장 중…' : '저장'}
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {section.fields.map(f => (
                <div key={f.k}>
                  <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '6px', letterSpacing: '0.05em' }}>
                    {f.label}
                  </label>
                  {f.multiline ? (
                    <textarea
                      rows={2}
                      style={inp}
                      value={data[section.key]?.[f.k] ?? ''}
                      onChange={e => set(section.key, f.k, e.target.value)}
                    />
                  ) : (
                    <input
                      style={inp}
                      value={data[section.key]?.[f.k] ?? ''}
                      onChange={e => set(section.key, f.k, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  )
}
