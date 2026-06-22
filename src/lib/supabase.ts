import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export type NewsItem = {
  id: string
  title: string
  date: string
  tag: string
  category: '뉴스' | '보도자료'
  description: string
  link_url?: string
  published: boolean
  created_at: string
  updated_at: string
}

export type HistoryEvent = {
  id: string
  year: string
  month: string
  era: string
  title: string
  tag: string
  sort_order: number
  published: boolean
  created_at: string
  updated_at: string
}

export type Solution = {
  id: string
  name: string
  name_en: string
  badge?: string
  description: string
  features: string[]
  featured: boolean
  cta_primary?: string
  cta_secondary?: string
  sort_order: number
  published: boolean
  created_at: string
  updated_at: string
}

export type Portfolio = {
  id: string
  title: string
  client?: string
  category: string
  description: string
  image_url?: string
  year?: string
  tags: string[]
  link_url?: string
  sort_order: number
  published: boolean
  created_at: string
  updated_at: string
}

export type Partner = {
  id: string
  name: string
  logo_url?: string
  category: string
  website_url?: string
  sort_order: number
  published: boolean
  created_at: string
  updated_at: string
}

export type SiteConfig = {
  key: string
  value: Record<string, string>
}

const url = import.meta.env.VITE_SUPABASE_URL as string
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const isSupabaseReady = !!(url && key && url.startsWith('https://'))

// localStorage-backed client — fully functional CRUD without Supabase
function makeLocalClient() {
  const P = 'koition_cms_'

  const getRows = (table: string): Record<string, unknown>[] => {
    try { return JSON.parse(localStorage.getItem(P + table) ?? '[]') } catch { return [] }
  }
  const setRows = (table: string, rows: Record<string, unknown>[]) =>
    localStorage.setItem(P + table, JSON.stringify(rows))

  const cmp = (a: unknown, b: unknown) => {
    if (typeof a === 'number' && typeof b === 'number') return a < b ? -1 : a > b ? 1 : 0
    const as = String(a ?? ''), bs = String(b ?? '')
    return as < bs ? -1 : as > bs ? 1 : 0
  }

  const from = (table: string) => {
    type Op = 'select' | 'insert' | 'update' | 'delete'
    const state: {
      op: Op
      filters: { col: string; val: unknown }[]
      orders: { col: string; asc: boolean }[]
      payload: unknown
    } = { op: 'select', filters: [], orders: [], payload: null }

    const match = (row: Record<string, unknown>) =>
      state.filters.every(f => row[f.col] === f.val)

    const execute = () => {
      const rows = getRows(table)

      if (state.op === 'select') {
        let result = rows.filter(match)
        for (const ord of [...state.orders].reverse()) {
          result = result.sort((a, b) => (ord.asc ? 1 : -1) * cmp(a[ord.col], b[ord.col]))
        }
        return { data: result, error: null }
      }

      if (state.op === 'insert') {
        const items = (Array.isArray(state.payload) ? state.payload : [state.payload]) as Record<string, unknown>[]
        const now = new Date().toISOString()
        const newRows = items.map(item => ({
          id: crypto.randomUUID(), created_at: now, updated_at: now, ...item,
        }))
        setRows(table, [...rows, ...newRows])
        return { data: newRows, error: null }
      }

      if (state.op === 'update') {
        const updated = rows.map(r => match(r) ? { ...r, ...(state.payload as Record<string, unknown>) } : r)
        setRows(table, updated)
        return { data: updated.filter(match), error: null }
      }

      if (state.op === 'delete') {
        setRows(table, rows.filter(r => !match(r)))
        return { data: [], error: null }
      }

      return { data: [], error: null }
    }

    const chain: Record<string, unknown> = {
      select:      ()                    => { state.op = 'select';                          return chain },
      eq:          (col: string, val: unknown) => { state.filters.push({ col, val });       return chain },
      neq:         ()                    =>                                                         chain,
      order:       (col: string, opts?: { ascending?: boolean }) => {
        state.orders.push({ col, asc: opts?.ascending ?? true }); return chain
      },
      limit:       ()                    =>                                                         chain,
      insert:      (d: unknown)          => { state.op = 'insert';  state.payload = d;      return chain },
      update:      (d: unknown)          => { state.op = 'update';  state.payload = d;      return chain },
      delete:      ()                    => { state.op = 'delete';                          return chain },
      upsert:      (d: unknown)          => { state.op = 'insert';  state.payload = Array.isArray(d) ? d : [d]; return chain },
      single:      ()                    =>                                                         chain,
      maybeSingle: ()                    =>                                                         chain,
      then:    (res: unknown, rej: unknown) => Promise.resolve(execute()).then(res as never, rej as never),
      catch:   (fn: unknown)               => Promise.resolve(execute()).catch(fn as never),
      finally: (fn: unknown)               => Promise.resolve(execute()).finally(fn as never),
    }
    return chain
  }

  return {
    from,
    auth: {
      getSession:         () => Promise.resolve({ data: { session: null }, error: null }),
      signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'local mode' } }),
      signOut:            () => Promise.resolve({ error: null }),
      onAuthStateChange:  (_e: unknown, _cb: unknown) => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
  } as unknown as SupabaseClient
}

let _supabase: SupabaseClient

try {
  _supabase = isSupabaseReady ? createClient(url, key) : makeLocalClient()
} catch {
  _supabase = makeLocalClient()
}

export const supabase = _supabase
