import { createClient } from '@supabase/supabase-js'

const url  = import.meta.env.VITE_SUPABASE_URL  ?? ''
const key  = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''

export const supabase = createClient(url, key)

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
