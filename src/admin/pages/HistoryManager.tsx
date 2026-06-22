import { useEffect, useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import { supabase, type HistoryEvent } from '../../lib/supabase'

const ERAS = ['Innovation ERA', 'Growth ERA', 'Foundation ERA']
const TAGS = ['GS', 'ISO', 'Honor', 'Innovation', 'Future', 'IP', 'Culture', 'Business',
              'Certification', 'Service', 'Procurement', 'Quality', 'MOU', 'Founding', 'R&D', 'General']

type Blank = Omit<HistoryEvent, 'id' | 'created_at' | 'updated_at'>
const EMPTY: Blank = { year: '', month: '', era: 'Innovation ERA', title: '', tag: 'General', sort_order: 0, published: true }

const inp: React.CSSProperties = {
  width: '100%', padding: '10px 14px',
  background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '6px', color: '#fff', fontSize: '14px', outline: 'none',
  boxSizing: 'border-box',
}

export default function HistoryManager() {
  const [list, setList]         = useState<HistoryEvent[]>([])
  const [form, setForm]         = useState<Blank>({ ...EMPTY })
  const [editId, setEditId]     = useState<string | null>(null)
  const [loading, setLoading]   = useState(false)
  const [msg, setMsg]           = useState('')
  const [showForm, setShowForm] = useState(false)
  const [filterYear, setFilterYear] = useState<string>('전체')

  const load = async () => {
    const { data } = await supabase.from('history').select('*').order('year', { ascending: false }).order('month', { ascending: false })
    setList(data ?? [])
  }

  useEffect(() => { load() }, [])

  const flash = (t: string) => { setMsg(t); setTimeout(() => setMsg(''), 3000) }
  const openCreate = () => { setForm({ ...EMPTY }); setEditId(null); setShowForm(true) }
  const openEdit = (item: HistoryEvent) => {
    setForm({ year: item.year, month: item.month, era: item.era, title: item.title, tag: item.tag, sort_order: item.sort_order, published: item.published })
    setEditId(item.id); setShowForm(true)
  }

  const save = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true)
    if (editId) {
      await supabase.from('history').update({ ...form, updated_at: new Date().toISOString() }).eq('id', editId)
      flash('수정됐습니다.')
    } else {
      await supabase.from('history').insert([form])
      flash('등록됐습니다.')
    }
    setShowForm(false); setLoading(false); load()
  }

  const del = async (id: string) => {
    if (!confirm('삭제하시겠습니까?')) return
    await supabase.from('history').delete().eq('id', id)
    flash('삭제됐습니다.'); load()
  }

  const togglePublish = async (item: HistoryEvent) => {
    await supabase.from('history').update({ published: !item.published }).eq('id', item.id)
    load()
  }

  const years = ['전체', ...Array.from(new Set(list.map(i => i.year))).sort((a, b) => +b - +a)]
  const filtered = filterYear === '전체' ? list : list.filter(i => i.year === filterYear)

  return (
    <AdminLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>회사연혁 관리</h1>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>총 {list.length}건</p>
        </div>
        <button onClick={openCreate} style={{ padding: '10px 22px', background: '#FF0000', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
          + 연혁 추가
        </button>
      </div>

      {msg && <div style={{ padding: '12px 16px', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '6px', color: '#22c55e', fontSize: '13px', marginBottom: '20px' }}>{msg}</div>}

      {showForm && (
        <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '28px', marginBottom: '28px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#fff', marginBottom: '20px' }}>{editId ? '연혁 수정' : '새 연혁 추가'}</h2>
          <form onSubmit={save} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '6px' }}>연도 * (예: 2026)</label>
                <input style={inp} value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))} required placeholder="YYYY" />
              </div>
              <div>
                <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '6px' }}>월 * (예: 03)</label>
                <input style={inp} value={form.month} onChange={e => setForm(f => ({ ...f, month: e.target.value }))} required placeholder="MM" />
              </div>
              <div>
                <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '6px' }}>시대 구분</label>
                <select style={{ ...inp, cursor: 'pointer' }} value={form.era} onChange={e => setForm(f => ({ ...f, era: e.target.value }))}>
                  {ERAS.map(e => <option key={e} value={e}>{e}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '6px' }}>내용 *</label>
              <input style={inp} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '6px' }}>태그</label>
                <select style={{ ...inp, cursor: 'pointer' }} value={form.tag} onChange={e => setForm(f => ({ ...f, tag: e.target.value }))}>
                  {TAGS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '6px' }}>정렬 순서 (낮을수록 먼저)</label>
                <input type="number" style={inp} value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: +e.target.value }))} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input type="checkbox" id="pub" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} />
              <label htmlFor="pub" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>공개</label>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
              <button type="submit" disabled={loading} style={{ padding: '10px 24px', background: '#FF0000', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                {loading ? '저장 중…' : '저장'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} style={{ padding: '10px 24px', background: 'transparent', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', fontSize: '13px', cursor: 'pointer' }}>
                취소
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Year filter */}
      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '16px' }}>
        {years.map(y => (
          <button key={y} onClick={() => setFilterYear(y)} style={{
            padding: '6px 16px', borderRadius: '100px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', border: 'none',
            background: filterYear === y ? '#FF0000' : 'rgba(255,255,255,0.06)',
            color: filterYear === y ? '#fff' : 'rgba(255,255,255,0.45)',
          }}>{y}</button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(255,255,255,0.06)', borderRadius: '10px', overflow: 'hidden' }}>
        {filtered.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '14px', background: '#111' }}>
            등록된 연혁이 없습니다.
          </div>
        )}
        {filtered.map(item => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 20px', background: '#111' }}>
            <div style={{ flexShrink: 0, width: '60px', textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>{item.year}</div>
              <div style={{ fontSize: '13px', color: '#FF0000', fontWeight: 600 }}>{item.month}월</div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '14px', color: '#fff', marginBottom: '4px' }}>{item.title}</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ fontSize: '11px', color: '#FF0000', padding: '2px 8px', border: '1px solid rgba(255,0,0,0.3)', borderRadius: '100px' }}>{item.tag}</span>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>{item.era}</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              <button onClick={() => togglePublish(item)} style={{ padding: '5px 12px', borderRadius: '100px', fontSize: '11px', fontWeight: 600, border: 'none', cursor: 'pointer', background: item.published ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.05)', color: item.published ? '#22c55e' : 'rgba(255,255,255,0.3)' }}>
                {item.published ? '공개' : '비공개'}
              </button>
              <button onClick={() => openEdit(item)} style={{ padding: '6px 14px', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>수정</button>
              <button onClick={() => del(item.id)} style={{ padding: '6px 14px', background: 'rgba(255,0,0,0.08)', color: '#ff6b6b', border: '1px solid rgba(255,0,0,0.15)', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>삭제</button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  )
}
