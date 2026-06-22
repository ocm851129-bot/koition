import { useEffect, useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import { supabase, type Solution } from '../../lib/supabase'

type Blank = Omit<Solution, 'id' | 'created_at' | 'updated_at'>
const EMPTY: Blank = {
  name: '', name_en: '', badge: '', description: '',
  features: [], featured: false,
  cta_primary: '솔루션 상세 보기', cta_secondary: '',
  sort_order: 0, published: true,
}

const inp: React.CSSProperties = {
  width: '100%', padding: '10px 14px',
  background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '6px', color: '#fff', fontSize: '14px', outline: 'none',
  boxSizing: 'border-box',
}

export default function SolutionsManager() {
  const [list, setList]         = useState<Solution[]>([])
  const [form, setForm]         = useState<Blank>({ ...EMPTY })
  const [featuresText, setFeaturesText] = useState('')
  const [editId, setEditId]     = useState<string | null>(null)
  const [loading, setLoading]   = useState(false)
  const [msg, setMsg]           = useState('')
  const [showForm, setShowForm] = useState(false)

  const load = async () => {
    const { data } = await supabase.from('solutions').select('*').order('sort_order').order('created_at')
    setList(data ?? [])
  }

  useEffect(() => { load() }, [])

  const flash = (t: string) => { setMsg(t); setTimeout(() => setMsg(''), 3000) }

  const openCreate = () => {
    setForm({ ...EMPTY }); setFeaturesText(''); setEditId(null); setShowForm(true)
  }
  const openEdit = (item: Solution) => {
    setForm({
      name: item.name, name_en: item.name_en, badge: item.badge ?? '',
      description: item.description, features: item.features,
      featured: item.featured, cta_primary: item.cta_primary ?? '',
      cta_secondary: item.cta_secondary ?? '', sort_order: item.sort_order,
      published: item.published,
    })
    setFeaturesText((item.features ?? []).join('\n'))
    setEditId(item.id); setShowForm(true)
  }

  const save = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true)
    const features = featuresText.split('\n').map(s => s.trim()).filter(Boolean)
    const payload = { ...form, features, badge: form.badge || null, cta_secondary: form.cta_secondary || null }
    if (editId) {
      await supabase.from('solutions').update({ ...payload, updated_at: new Date().toISOString() }).eq('id', editId)
      flash('수정됐습니다.')
    } else {
      await supabase.from('solutions').insert([payload])
      flash('등록됐습니다.')
    }
    setShowForm(false); setLoading(false); load()
  }

  const del = async (id: string) => {
    if (!confirm('삭제하시겠습니까?')) return
    await supabase.from('solutions').delete().eq('id', id)
    flash('삭제됐습니다.'); load()
  }

  const togglePublish = async (item: Solution) => {
    await supabase.from('solutions').update({ published: !item.published }).eq('id', item.id)
    load()
  }

  const toggleFeatured = async (item: Solution) => {
    await supabase.from('solutions').update({ featured: !item.featured }).eq('id', item.id)
    load()
  }

  return (
    <AdminLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>솔루션 관리</h1>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>총 {list.length}건</p>
        </div>
        <button onClick={openCreate} style={{ padding: '10px 22px', background: '#FF0000', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
          + 솔루션 추가
        </button>
      </div>

      {msg && <div style={{ padding: '12px 16px', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '6px', color: '#22c55e', fontSize: '13px', marginBottom: '20px' }}>{msg}</div>}

      {showForm && (
        <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '28px', marginBottom: '28px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#fff', marginBottom: '20px' }}>{editId ? '솔루션 수정' : '새 솔루션 추가'}</h2>
          <form onSubmit={save} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '6px' }}>솔루션명 *</label>
                <input style={inp} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
              </div>
              <div>
                <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '6px' }}>부제 (한국어) *</label>
                <input style={inp} value={form.name_en} onChange={e => setForm(f => ({ ...f, name_en: e.target.value }))} required />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '6px' }}>뱃지 텍스트 <span style={{ color: 'rgba(255,255,255,0.25)' }}>(선택, 예: Demo Available)</span></label>
                <input style={inp} value={form.badge ?? ''} onChange={e => setForm(f => ({ ...f, badge: e.target.value }))} placeholder="Demo Available" />
              </div>
              <div>
                <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '6px' }}>정렬 순서</label>
                <input type="number" style={inp} value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: +e.target.value }))} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '6px' }}>설명 *</label>
              <textarea style={{ ...inp, height: '80px', resize: 'vertical' }} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required />
            </div>
            <div>
              <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '6px' }}>
                주요 기능 <span style={{ color: 'rgba(255,255,255,0.25)' }}>(한 줄에 하나씩)</span>
              </label>
              <textarea
                style={{ ...inp, height: '120px', resize: 'vertical' }}
                value={featuresText}
                onChange={e => setFeaturesText(e.target.value)}
                placeholder={"고정밀 멀티모달 OCR & 내용 검색\nLLM 기반 방대 기록물 핵심 요약"}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '6px' }}>CTA 버튼 1 (주)</label>
                <input style={inp} value={form.cta_primary ?? ''} onChange={e => setForm(f => ({ ...f, cta_primary: e.target.value }))} />
              </div>
              <div>
                <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '6px' }}>CTA 버튼 2 (선택)</label>
                <input style={inp} value={form.cta_secondary ?? ''} onChange={e => setForm(f => ({ ...f, cta_secondary: e.target.value }))} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
                <input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} />
                플래그십(대형 카드)
              </label>
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(255,255,255,0.06)', borderRadius: '10px', overflow: 'hidden' }}>
        {list.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '14px', background: '#111' }}>
            등록된 솔루션이 없습니다.
          </div>
        )}
        {list.map(item => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', background: '#111' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                {item.featured && <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 7px', borderRadius: '4px', background: 'rgba(251,191,36,0.15)', color: '#fbbf24' }}>FLAGSHIP</span>}
                {item.badge && <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 7px', borderRadius: '4px', background: 'rgba(34,197,94,0.12)', color: '#22c55e' }}>{item.badge}</span>}
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>{item.name}</span>
              </div>
              <div style={{ fontSize: '12px', color: '#FF0000', marginBottom: '2px' }}>{item.name_en}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>기능 {(item.features ?? []).length}개 · 정렬 {item.sort_order}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              <button onClick={() => toggleFeatured(item)} style={{ padding: '5px 12px', borderRadius: '100px', fontSize: '11px', fontWeight: 600, border: 'none', cursor: 'pointer', background: item.featured ? 'rgba(251,191,36,0.15)' : 'rgba(255,255,255,0.05)', color: item.featured ? '#fbbf24' : 'rgba(255,255,255,0.3)' }}>
                {item.featured ? '플래그십' : '일반'}
              </button>
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
