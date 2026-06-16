import { useEffect, useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import { supabase, type NewsItem } from '../../lib/supabase'

const EMPTY: Omit<NewsItem, 'id' | 'created_at' | 'updated_at'> = {
  title: '', date: '', tag: 'News', description: '', published: true,
}

export default function NewsManager() {
  const [list, setList]       = useState<NewsItem[]>([])
  const [form, setForm]       = useState({ ...EMPTY })
  const [editId, setEditId]   = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg]         = useState('')
  const [showForm, setShowForm] = useState(false)

  const load = async () => {
    const { data } = await supabase.from('news').select('*').order('created_at', { ascending: false })
    setList(data ?? [])
  }

  useEffect(() => { load() }, [])

  const flash = (text: string) => { setMsg(text); setTimeout(() => setMsg(''), 3000) }

  const openCreate = () => { setForm({ ...EMPTY }); setEditId(null); setShowForm(true) }
  const openEdit   = (item: NewsItem) => {
    setForm({ title: item.title, date: item.date, tag: item.tag, description: item.description, published: item.published })
    setEditId(item.id)
    setShowForm(true)
  }

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    if (editId) {
      await supabase.from('news').update({ ...form, updated_at: new Date().toISOString() }).eq('id', editId)
      flash('수정됐습니다.')
    } else {
      await supabase.from('news').insert([form])
      flash('등록됐습니다.')
    }
    setShowForm(false)
    setLoading(false)
    load()
  }

  const del = async (id: string) => {
    if (!confirm('삭제하시겠습니까?')) return
    await supabase.from('news').delete().eq('id', id)
    flash('삭제됐습니다.')
    load()
  }

  const togglePublish = async (item: NewsItem) => {
    await supabase.from('news').update({ published: !item.published }).eq('id', item.id)
    load()
  }

  const inp: React.CSSProperties = {
    width: '100%', padding: '10px 14px',
    background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '6px', color: '#fff', fontSize: '14px', outline: 'none',
    boxSizing: 'border-box',
  }

  return (
    <AdminLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>뉴스 관리</h1>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>총 {list.length}건</p>
        </div>
        <button onClick={openCreate} style={{
          padding: '10px 22px', background: '#FF0000', color: '#fff',
          border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
        }}>
          + 뉴스 추가
        </button>
      </div>

      {msg && (
        <div style={{ padding: '12px 16px', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '6px', color: '#22c55e', fontSize: '13px', marginBottom: '20px' }}>
          {msg}
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '28px', marginBottom: '28px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#fff', marginBottom: '20px' }}>
            {editId ? '뉴스 수정' : '새 뉴스 작성'}
          </h2>
          <form onSubmit={save} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '6px' }}>제목 *</label>
                <input style={inp} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
              </div>
              <div>
                <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '6px' }}>날짜 * (예: 2025.12.03)</label>
                <input style={inp} value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required placeholder="YYYY.MM.DD" />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '6px' }}>태그</label>
                <select style={{ ...inp, cursor: 'pointer' }} value={form.tag} onChange={e => setForm(f => ({ ...f, tag: e.target.value }))}>
                  {['News', 'Notice', 'Award', 'Event', 'Press'].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '6px' }}>요약 내용</label>
                <input style={inp} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input type="checkbox" id="pub" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} />
              <label htmlFor="pub" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>공개</label>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
              <button type="submit" disabled={loading} style={{
                padding: '10px 24px', background: '#FF0000', color: '#fff',
                border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
              }}>
                {loading ? '저장 중…' : '저장'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} style={{
                padding: '10px 24px', background: 'transparent', color: 'rgba(255,255,255,0.5)',
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', fontSize: '13px', cursor: 'pointer',
              }}>
                취소
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(255,255,255,0.06)', borderRadius: '10px', overflow: 'hidden' }}>
        {list.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '14px', background: '#111' }}>
            등록된 뉴스가 없습니다.
          </div>
        )}
        {list.map(item => (
          <div key={item.id} style={{
            display: 'flex', alignItems: 'center', gap: '16px',
            padding: '16px 20px', background: '#111',
          }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff', marginBottom: '3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {item.title}
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', color: '#FF0000', padding: '2px 8px', border: '1px solid rgba(255,0,0,0.3)', borderRadius: '100px' }}>{item.tag}</span>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>{item.date}</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              <button onClick={() => togglePublish(item)} style={{
                padding: '5px 12px', borderRadius: '100px', fontSize: '11px', fontWeight: 600,
                border: 'none', cursor: 'pointer',
                background: item.published ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.05)',
                color: item.published ? '#22c55e' : 'rgba(255,255,255,0.3)',
              }}>
                {item.published ? '공개' : '비공개'}
              </button>
              <button onClick={() => openEdit(item)} style={{
                padding: '6px 14px', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)',
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', fontSize: '12px', cursor: 'pointer',
              }}>수정</button>
              <button onClick={() => del(item.id)} style={{
                padding: '6px 14px', background: 'rgba(255,0,0,0.08)', color: '#ff6b6b',
                border: '1px solid rgba(255,0,0,0.15)', borderRadius: '6px', fontSize: '12px', cursor: 'pointer',
              }}>삭제</button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  )
}
