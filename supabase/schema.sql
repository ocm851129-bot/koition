-- ================================================
-- KOITION CMS Schema
-- Run this in Supabase SQL Editor
-- ================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- News table
CREATE TABLE IF NOT EXISTS public.news (
  id          UUID        DEFAULT uuid_generate_v4() PRIMARY KEY,
  title       TEXT        NOT NULL,
  date        TEXT        NOT NULL,
  tag         TEXT        DEFAULT 'News',
  description TEXT,
  published   BOOLEAN     DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Editable site content
CREATE TABLE IF NOT EXISTS public.site_config (
  key        TEXT    PRIMARY KEY,
  value      JSONB   NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed default content
INSERT INTO public.site_config (key, value) VALUES
  ('contact', '{"phone":"042-334-4167","fax":"042-334-4165","email":"mail@koition.co.kr","hq":"대전 유성구 반석로 15 (반석동) 하이클래스 8층","rnd":"세종특별자치시 집현중앙7로 6, 지식산업센터 B304","rep":"정일영 / 최재교"}'),
  ('hero',    '{"eyebrow":"2026 Innovation Standard","words":["DIGITAL","ENGINEERING","FOR","THE","FUTURE."],"sub1":"데이터의 본질을 꿰뚫는 무결점 전산화 공정.","sub2":"(주)코이션이 디지털 대전환의 기준을 다시 정의합니다."}'),
  ('stats',   '{"stat1_val":"1,000만+","stat1_label":"데이터 처리","stat2_val":"99.9%","stat2_label":"데이터 무결성","stat3_val":"TOP","stat3_label":"R&D 그룹"}')
ON CONFLICT (key) DO NOTHING;

-- Seed news
INSERT INTO public.news (title, date, tag, description, published) VALUES
  ('2025년 유망중소기업 인증',             '2025.12.03', 'News', '경제도시 대전을 이끌어갈 유망 중소기업으로 (주)코이션이 선정되어 2030년 12월 2일까지 인증과 함께 대전광역시로부터 다양한 지원 수혜.', true),
  ('주식회사 코이션 지역 버스 광고 진행',   '2023.06.30', 'News', '대전광역시 소재 전문 기업으로서 지역사회에 코이션의 이름을 알리고 기술력을 홍보하고자 대전광역시 주요 시내버스에 대대적인 코이션 홍보를 진행.', true),
  ('대전광역시 "좋은 일터" 우수기업 선정', '2023.05.31', 'News', '코이션은 2023 좋은 일터 조성사업 선포식에서 근로환경 개선 성과로 우수기업으로 선정되어 수상 및 인증을 받았습니다.', true),
  ('대전 LoRa기반 돌보 알리미 서비스 오픈','2022.11.01', 'News', '(주)코이션은 대전시 지원사업으로 AI, 데이터 기반 대전시 하천 내 시설물 정보 서비스를 개발하고 시민 편의 서비스를 제공합니다.', true)
ON CONFLICT DO NOTHING;

-- RLS
ALTER TABLE public.news        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

-- Anyone can read
CREATE POLICY "public_read_news"   ON public.news        FOR SELECT USING (published = true);
CREATE POLICY "public_read_config" ON public.site_config FOR SELECT USING (true);

-- Authenticated (admin) can do everything
CREATE POLICY "auth_all_news"   ON public.news        FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "auth_all_config" ON public.site_config FOR ALL USING (auth.role() = 'authenticated');
