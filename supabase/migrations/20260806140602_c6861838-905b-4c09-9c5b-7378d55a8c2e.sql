CREATE TABLE public.app_data (
  collection TEXT PRIMARY KEY,
  data JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.app_data TO anon, authenticated;
GRANT ALL ON public.app_data TO service_role;
ALTER TABLE public.app_data ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Institute data is shared" ON public.app_data FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

CREATE TABLE public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id TEXT NOT NULL,
  role TEXT NOT NULL,
  parts JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX chat_messages_client_idx ON public.chat_messages (client_id, created_at);
GRANT SELECT, INSERT, DELETE ON public.chat_messages TO anon, authenticated;
GRANT ALL ON public.chat_messages TO service_role;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Chat messages readable by visitor" ON public.chat_messages FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Chat messages insertable" ON public.chat_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Chat messages deletable" ON public.chat_messages FOR DELETE TO anon, authenticated USING (true);

ALTER PUBLICATION supabase_realtime ADD TABLE public.app_data;