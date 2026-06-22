import { useEffect, useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import { supabase, type Portfolio } from '../../lib/supabase'

const CATEGORIES = ['공공기관', '기업', '연구기관', '의료', '교육', '기타']

type Blank = Omit<Portfolio, 'id' | 'created_at' | 'updated_at'>
const EMPTY: Blank = {
  title: '', client: '', category: '공공기관', description: '',
  image_url: '', year: '', tags: [], link_url: '',
  sort_order: 0, published: true,
}

const inp: React.CSSProperties = {
  width: '100%', padding: '10px 14px',
  background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '6px', color: '#fff', fontSize: '14px', outline: 'none',
  boxSizing: 'border-box',
}

export default function PortfolioManager() {
  const [list, setList]         = useState<Portfolio[]>([])
  const [form, setForm]         = useState<Blank>({ ...EMPTY })
  const [tagsText, setTagsText] = useState('')
  const [editId, setEditId]     = useState<string | null>(null)
  const [loading, setLoading]   = useState(false)
  const [msg, setMsg]           = useState('')
  const [showForm, setShowForm] = useState(false)
  const [filterCat, setFilterCat] = useState('전체')

  const load = async () => {
    const { data } = await supabase.from('portfolio').select('*').order('sort_order').order('created_at', { ascending: false })
    setList(data ?? [])
  }

  useEffect(() => { load() }, [])

  const flash = (t: string) => { setMsg(t); setTimeout(() => setMsg(''), 3000) }

  const openCreate = () => {
    setForm({ ...EMPTY }); setTagsText(''); setEditId(null); setShowForm(true)
  }
  const openEdit = (item: Portfolio) => {
    setForm({
      title: item.title, client: item.client ?? '', category: item.category,
      description: item.description, image_url: item.image_url ?? '',
      year: item.year ?? '', tags: item.tags, link_url: item.link_url ?? '',
      sort_order: item.sort_order, published: item.published,
    })
    setTagsText((item.tags ?? []).join(', '))
    setEditId(item.id); setShowForm(true)
  }

  const save = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true)
    const tags = tagsText.split(',').map(s => s.trim()).filter(Boolean)
    const payload = {
      ...form, tags,
      client: form.client || null, image_url: form.image_url || null,
      link_url: form.link_url || null, year: form.year || null,
    }
    if (editId) {
      await supabase.from('portfolio').update({ ...payload, updated_at: new Date().toISOString() }).eq('id', editId)
      flash('수정됐습니다.')
    } else {
      await supabase.from('portfolio').insert([payload])
      flash('등록됐습니다.')
    }
    setShowForm(false); setLoading(false); load()
  }

  const del = async (id: string) => {
    if (!confirm('삭제하시겠습니까?')) return
    await supabase.from('portfolio').delete().eq('id', id)
    flash('삭제됐습니다.'); load()
  }

  const togglePublish = async (item: Portfolio) => {
    await supabase.from('portfolio').update({ published: !item.published }).eq('id', item.id)
    load()
  }

  const allCats = ['전체', ...CATEGORIES]
  const filtered = filterCat === '전체' ? list : list.filter(i => i.category === filterCat)

  return (
    <AdminLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>포트폴리오 관리</h1>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>총 {list.length}건</p>
        </div>
        <button onClick={openCreate} style={{ padding: '10px 22px', background: '#FF0000', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
          + 포트폴리오 추가
        </button>
      </div>

      {msg && <div style={{ padding: '12px 16px', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '6px', color: '#22c55e', fontSize: '13px', marginBottom: '20px' }}>{msg}</div>}

      {showForm && (
        <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '28px', marginBottom: '28px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#fff', marginBottom: '20px' }}>{editId ? '포트폴리오 수정' : '새 포트폴리오 추가'}</h2>
          <form onSubmit={save} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '6px' }}>프로젝트명 *</label>
                <input style={inp} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
              </div>
              <div>
                <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '6px' }}>고객사</label>
                <input style={inp} value={form.client ?? ''} onChange={e => setForm(f => ({ ...f, client: e.target.value }))} />
              </div>
              <div>
                <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '6px' }}>연도 (예: 2025)</label>
                <input style={inp} value={form.year ?? ''} onChange={e => setForm(f => ({ ...f, year: e.target.value }))} placeholder="YYYY" />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '6px' }}>카테고리 *</label>
                <select style={{ ...inp, cursor: 'pointer' }} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '6px' }}>
                  태그 <span style={{ color: 'rgba(255,255,255,0.25)' }}>(쉼표로 구분, 예: RFID, AI, 기록관리)</span>
                </label>
                <input style={inp} value={tagsText} onChange={e => setTagsText(e.target.value)} placeholder="RFID, AI, 기록관리" />
              </div>
            </div>
            <div>
              <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '6px' }}>설명 *</label>
              <textarea style={{ ...inp, height: '80px', resize: 'vertical' }} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '6px' }}>이미지 URL <span style={{ color: 'rgba(255,255,255,0.25)' }}>(선택)</span></label>
                <input style={inp} value={form.image_url ?? ''} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} placeholder="https://..." />
              </div>
              <div>
                <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '6px' }}>링크 URL <span style={{ color: 'rgba(255,255,255,0.25)' }}>(선택)</span></label>
                <input style={inp} value={form.link_url ?? ''} onChange={e => setForm(f => ({ ...f, link_url: e.target.value }))} placeholder="https://..." />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
                <input type="checkbox" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} />
                공개
              </label>
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

      {/* Category filter */}
      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '16px' }}>
        {allCats.map(cat => (
          <button key={cat} onClick={() => setFilterCat(cat)} style={{
            padding: '6px 16px', borderRadius: '100px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', border: 'none',
            background: filterCat === cat ? '#FF0000' : 'rgba(255,255,255,0.06)',
            color: filterCat === cat ? '#fff' : 'rgba(255,255,255,0.45)',
          }}>{cat}</button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(255,255,255,0.06)', borderRadius: '10px', overflow: 'hidden' }}>
        {filtered.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '14px', background: '#111' }}>
            등록된 포트폴리오가 없습니다.
          </div>
        )}
        {filtered.map(item => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', background: '#111' }}>
            {item.image_url && (
              <img src={item.image_url} alt="" style={{ width: '52px', height: '52px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }} />
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>{item.title}</div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '11px', color: '#FF0000', padding: '2px 8px', border: '1px solid rgba(255,0,0,0.3)', borderRadius: '100px' }}>{item.category}</span>
                {item.client && <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>{item.client}</span>}
                {item.year && <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>{item.year}</span>}
                {(item.tags ?? []).map(t => (
                  <span key={t} style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', padding: '2px 7px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>{t}</span>
                ))}
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
