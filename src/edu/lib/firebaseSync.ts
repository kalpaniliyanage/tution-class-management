// @ts-nocheck
// Shared cloud sync (Lovable Cloud). Keeps the same API the app already used.
import { supabase } from '@/integrations/supabase/client';

const lastPushed: Record<string, string> = {};
const seeded: Record<string, boolean> = {};

const stringify = (v: unknown) => {
  try {
    return JSON.stringify(v ?? null);
  } catch {
    return '';
  }
};

/** Push local data up only when it differs from what the cloud last gave us. */
export async function bulkSyncToFirestore<T>(collection: string, items: T) {
  if (typeof window === 'undefined') return;
  if (!seeded[collection]) return; // wait until the first cloud read finished
  const payload = stringify(items);
  if (lastPushed[collection] === payload) return;
  lastPushed[collection] = payload;
  const { error } = await supabase
    .from('app_data')
    .upsert({ collection, data: items as never, updated_at: new Date().toISOString() }, { onConflict: 'collection' });
  if (error) console.error('[cloud sync] push failed', collection, error.message);
}

/** First read: use cloud data when present, otherwise seed the cloud with local data. */
export async function seedCollectionToFirestore<T>(collection: string, items: T, onRemote?: (d: T) => void) {
  if (typeof window === 'undefined') return;
  const { data, error } = await supabase
    .from('app_data')
    .select('data')
    .eq('collection', collection)
    .maybeSingle();

  if (error) {
    console.error('[cloud sync] read failed', collection, error.message);
    seeded[collection] = true;
    return;
  }

  if (data && data.data !== null && data.data !== undefined) {
    lastPushed[collection] = stringify(data.data);
    seeded[collection] = true;
    onRemote?.(data.data as T);
    return;
  }

  lastPushed[collection] = stringify(items);
  seeded[collection] = true;
  await supabase.from('app_data').upsert({ collection, data: items as never }, { onConflict: 'collection' });
}

/** Live updates from other phones / accounts. */
export function subscribeToCollection<T>(collection: string, onChange: (items: T) => void) {
  if (typeof window === 'undefined') return () => {};
  const channel = supabase
    .channel(`app_data:${collection}`)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'app_data', filter: `collection=eq.${collection}` },
      (payload) => {
        const next = (payload.new as { data?: unknown } | null)?.data;
        if (next === undefined || next === null) return;
        const s = stringify(next);
        if (s === lastPushed[collection]) return; // our own write echoing back
        lastPushed[collection] = s;
        onChange(next as T);
      },
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

export async function saveItemToFirestore() {
  /* handled by bulkSyncToFirestore */
}
