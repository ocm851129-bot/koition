-- ============================================================
-- Koition CMS -- Supabase Schema
-- Supabase SQL Editor에서 실행하세요
-- ============================================================

-- 뉴스 / 보도자료
CREATE TABLE IF NOT EXISTS news (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title       text NOT NULL,
  date        text NOT NULL,
  tag         text NOT NULL DEFAULT 'News',
  category    text NOT NULL DEFAULT '뉴스',
  description text,
  link_url    text,
  published   boolean DEFAULT true,
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now()
);

-- 회사연혁
CREATE TABLE IF NOT EXISTS history (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  year        text NOT NULL,
  month       text NOT NULL,
  era         text NOT NULL DEFAULT 'Innovation ERA',
  title       text NOT NULL,
  tag         text NOT NULL DEFAULT 'General',
  sort_order  int DEFAULT 0,
  published   boolean DEFAULT true,
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now()
);

-- 솔루션
CREATE TABLE IF NOT EXISTS solutions (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name          text NOT NULL,
  name_en       text NOT NULL,
  badge         text,
  description   text,
  features      text[] DEFAULT '{}',
  featured      boolean DEFAULT false,
  cta_primary   text DEFAULT '솔루션 상세 보기',
  cta_secondary text,
  sort_order    int DEFAULT 0,
  published     boolean DEFAULT true,
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now()
);

-- 포트폴리오
CREATE TABLE IF NOT EXISTS portfolio (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title       text NOT NULL,
  client      text,
  category    text NOT NULL DEFAULT '공공기관',
  description text,
  image_url   text,
  year        text,
  tags        text[] DEFAULT '{}',
  link_url    text,
  sort_order  int DEFAULT 0,
  published   boolean DEFAULT true,
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now()
);

-- 파트너
CREATE TABLE IF NOT EXISTS partners (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name        text NOT NULL,
  logo_url    text,
  category    text DEFAULT '기술 파트너',
  website_url text,
  sort_order  int DEFAULT 0,
  published   boolean DEFAULT true,
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now()
);

-- Row Level Security
ALTER TABLE news      ENABLE ROW LEVEL SECURITY;
ALTER TABLE history   ENABLE ROW LEVEL SECURITY;
ALTER TABLE solutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners  ENABLE ROW LEVEL SECURITY;

-- 읽기: 모두 허용
CREATE POLICY "Public read news"      ON news      FOR SELECT USING (true);
CREATE POLICY "Public read history"   ON history   FOR SELECT USING (true);
CREATE POLICY "Public read solutions" ON solutions FOR SELECT USING (true);
CREATE POLICY "Public read portfolio" ON portfolio FOR SELECT USING (true);
CREATE POLICY "Public read partners"  ON partners  FOR SELECT USING (true);

-- 쓰기: 로그인 사용자만
CREATE POLICY "Auth write news"      ON news      FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write history"   ON history   FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write solutions" ON solutions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write portfolio" ON portfolio FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write partners"  ON partners  FOR ALL USING (auth.role() = 'authenticated');
