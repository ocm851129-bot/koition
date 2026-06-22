import { useEffect, useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import { supabase, type Partner } from '../../lib/supabase'

const CATEGORIES = ['기술 파트너', '사업 파트너', 'MOU 기관', '고객사', '협력사', '기타']

type Blank = Omit<Partner, 'id' | 'created_at' | 'updated_at'>
const EMPTY: Blank = { name: '', logo_url: '', category: '기술 파트너', website_url: '', sort_order: 0, published: true }

const inp: React.CSSProperties = {
  width: '100%', padding: '10px 14px',
  background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '6px', color: '#fff', fontSize: '14px', outline: 'none',
  boxSizing: 'border-box',
}

export default function PartnersManager() {
  const [list, setList]         = useState<Partner[]>([])
  const [form, setForm]         = useState<Blank>({ ...EMPTY })
  const [editId, setEditId]     = useState<string | null>(null)
  const [loading, setLoading]   = useState(false)
  const [msg, setMsg]           = useState('')
  const [showForm, setShowForm] = useState(false)
  const [filterCat, setFilterCat] = useState('전체')

  const load = async () => {
    const { data } = await supabase.from('partners').select('*').order('sort_order').order('name')
    setList(data ?? [])
  }

  useEffect(() => { load() }, [])

  const flash = (t: string) => { setMsg(t); setTimeout(() => setMsg(''), 3000) }
  const openCreate = () => { setForm({ ...EMPTY }); setEditId(null); setShowForm(true) }
  const openEdit = (item: Partner) => {
    setForm({ name: item.name, logo_url: item.logo_url ?? '', category: item.category, website_url: item.website_url ?? '', sort_order: item.sort_order, published: item.published })
    setEditId(item.id); setShowForm(true)
  }

  const save = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true)
    const payload = { ...form, logo_url: form.logo_url || null, website_url: form.website_url || null }
    if (editId) {
      await supabase.from('partners').update({ ...payload, updated_at: new Date().toISOString() }).eq('id', editId)
      flash('수정됐습니다.')
    } else {
      await supabase.from('partners').insert([payload])
      flash('등록됐습니다.')
    }
    setShowForm(false); setLoading(false); load()
  }

  const del = async (id: string) => {
    if (!confirm('삭제하시겠습니까?')) return
    await supabase.from('partners').delete().eq('id', id)
    flash('삭제됐습니다.'); load()
  }

  const togglePublish = async (item: Partner) => {
    await supabase.from('partners').update({ published: !item.published }).eq('id', item.id)
    load()
  }

  const allCats = ['전체', ...CATEGORIES]
  const filtered = filterCat === '전체' ? list : list.filter(i => i.category === filterCat)

  return (
    <AdminLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>파트너 관리</h1>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>총 {list.length}건</p>
        </div>
        <button onClick={openCreate} style={{ padding: '10px 22px', background: '#FF0000', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
          + 파트너 추가
        </button>
      </div>

      {msg && <div style={{ padding: '12px 16px', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '6px', color: '#22c55e', fontSize: '13px', marginBottom: '20px' }}>{msg}</div>}

      {showForm && (
        <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '28px', marginBottom: '28px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#fff', marginBottom: '20px' }}>{editId ? '파트너 수정' : '새 파트너 추가'}</h2>
          <form onSubmit={save} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '6px' }}>파트너명 *</label>
                <input style={inp} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
              </div>
              <div>
                <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '6px' }}>카테고리</label>
                <select style={{ ...inp, cursor: 'pointer' }} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '6px' }}>로고 이미지 URL <span style={{ color: 'rgba(255,255,255,0.25)' }}>(선택)</span></label>
                <input style={inp} value={form.logo_url ?? ''} onChange={e => setForm(f => ({ ...f, logo_url: e.target.value }))} placeholder="https://..." />
              </div>
              <div>
                <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '6px' }}>웹사이트 URL <span style={{ color: 'rgba(255,255,255,0.25)' }}>(선택)</span></label>
                <input style={inp} value={form.website_url ?? ''} onChange={e => setForm(f => ({ ...f, website_url: e.target.value }))} placeholder="https://..." />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '14px', alignItems: 'end' }}>
              <div>
                <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '6px' }}>정렬 순서</label>
                <input type="number" style={inp} value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: +e.target.value }))} />
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', paddingBottom: '2px' }}>
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
          }}>
            {cat} {cat === '전체' ? '' : `(${list.filter(i => i.category === cat).length})`}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.06)', borderRadius: '10px', overflow: 'hidden' }}>
        {filtered.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '14px', background: '#111', gridColumn: '1 / -1' }}>
            등록된 파트너가 없습니다.
          </div>
        )}
        {filtered.map(item => (
          <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px', background: '#111' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {item.logo_url ? (
                <img src={item.logo_url} alt={item.name} style={{ width: '40px', height: '40px', objectFit: 'contain', background: '#fff', borderRadius: '6px', padding: '4px', flexShrink: 0 }} />
              ) : (
                <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: 'rgba(255,255,255,0.2)', flexShrink: 0 }}>◈</div>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff', marginBottom: '3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</div>
                <div style={{ fontSize: '11px', color: '#FF0000' }}>{item.category}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button onClick={() => togglePublish(item)} style={{ flex: 1, padding: '5px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, border: 'none', cursor: 'pointer', background: item.published ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.05)', color: item.published ? '#22c55e' : 'rgba(255,255,255,0.3)' }}>
                {item.published ? '공개' : '비공개'}
              </button>
              <button onClick={() => openEdit(item)} style={{ flex: 1, padding: '5px', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', fontSize: '11px', cursor: 'pointer' }}>수정</button>
              <button onClick={() => del(item.id)} style={{ flex: 1, padding: '5px', background: 'rgba(255,0,0,0.08)', color: '#ff6b6b', border: '1px solid rgba(255,0,0,0.15)', borderRadius: '6px', fontSize: '11px', cursor: 'pointer' }}>삭제</button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  )
}
