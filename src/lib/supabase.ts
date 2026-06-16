import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export type NewsItem = {
  id: string
  title: string
  date: string
  tag: string
  description: string
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

// Fully thenable mock — used when Supabase env vars are not set
function makeMockClient() {
  const EMPTY = { data: [], error: null, count: 0 }

  function chain(): Record<string, unknown> {
    const p = Promise.resolve(EMPTY)
    const obj: Record<string, unknown> = {}
    const methods = ['select','eq','neq','order','limit','insert','update','delete','upsert','single','maybeSingle']
    methods.forEach(m => { obj[m] = () => chain() })
    obj['then']    = (res: unknown, rej: unknown) => p.then(res as never, rej as never)
    obj['catch']   = (fn: unknown) => p.catch(fn as never)
    obj['finally'] = (fn: unknown) => p.finally(fn as never)
    return obj
  }

  return {
    from: () => chain(),
    auth: {
      getSession:           () => Promise.resolve({ data: { session: null }, error: null }),
      signInWithPassword:   () => Promise.resolve({ data: null, error: { message: 'Supabase not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.' } }),
      signOut:              () => Promise.resolve({ error: null }),
      onAuthStateChange:    (_e: unknown, _cb: unknown) => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
  } as unknown as SupabaseClient
}

let _supabase: SupabaseClient

try {
  _supabase = isSupabaseReady ? createClient(url, key) : makeMockClient()
} catch {
  _supabase = makeMockClient()
}

export const supabase = _supabase
