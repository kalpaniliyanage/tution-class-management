// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { Bot, Send, X, Sparkles, Loader2, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

type Msg = { id?: string; role: 'user' | 'assistant'; content: string };

const CLIENT_KEY = 'edumaster_chat_client_id';

function getClientId() {
  let id = localStorage.getItem(CLIENT_KEY);
  if (!id) {
    id = `visitor-${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
    localStorage.setItem(CLIENT_KEY, id);
  }
  return id;
}

const SUGGESTIONS = [
  'How do I mark a student as paid?',
  'How does the gate QR attendance work?',
  'How do I print the double-sided ID card?',
];

export const AIChatWidget: React.FC<{ darkMode?: boolean }> = ({ darkMode = true }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [clientId, setClientId] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = getClientId();
    setClientId(id);
    supabase
      .from('chat_messages')
      .select('id, role, parts')
      .eq('client_id', id)
      .order('created_at', { ascending: true })
      .then(({ data }) => {
        if (data?.length) {
          setMessages(data.map(r => ({ id: r.id, role: r.role, content: r.parts?.text || '' })));
        }
      });
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, busy, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
  }, [open, busy]);

  const persist = async (role: string, content: string) => {
    if (!clientId) return;
    await supabase.from('chat_messages').insert({ client_id: clientId, role, parts: { text: content } });
  };

  const clearChat = async () => {
    setMessages([]);
    if (clientId) await supabase.from('chat_messages').delete().eq('client_id', clientId);
  };

  const send = async (text: string) => {
    const question = text.trim();
    if (!question || busy) return;
    setInput('');
    const history = [...messages, { role: 'user', content: question } as Msg];
    setMessages(history);
    setBusy(true);
    persist('user', question);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history.map(m => ({ role: m.role, content: m.content })) }),
      });
      if (!res.ok || !res.body) {
        const err = await res.text().catch(() => '');
        setMessages(prev => [...prev, { role: 'assistant', content: err || 'Sorry, I could not answer right now.' }]);
        setBusy(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let answer = '';
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const payload = line.slice(6).trim();
          if (!payload || payload === '[DONE]') continue;
          try {
            const delta = JSON.parse(payload)?.choices?.[0]?.delta?.content;
            if (delta) {
              answer += delta;
              setMessages(prev => {
                const next = [...prev];
                next[next.length - 1] = { role: 'assistant', content: answer };
                return next;
              });
            }
          } catch {
            /* partial chunk */
          }
        }
      }
      if (answer) persist('assistant', answer);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Network problem — please try again.' }]);
    } finally {
      setBusy(false);
    }
  };

  const panelBg = darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200';
  const bubbleBot = darkMode ? 'bg-slate-800 text-slate-100' : 'bg-slate-100 text-slate-800';

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 text-white font-black px-4 py-3 shadow-2xl hover:scale-105 transition"
          aria-label="Open AI help assistant"
        >
          <Bot className="w-5 h-5" />
          <span className="text-xs hidden sm:inline">Ask EduMaster AI</span>
        </button>
      )}

      {open && (
        <div className={`fixed bottom-4 right-4 z-50 w-[min(94vw,380px)] h-[min(78vh,560px)] flex flex-col rounded-3xl border shadow-2xl overflow-hidden ${panelBg}`}>
          <div className="flex items-center justify-between gap-2 px-4 py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 text-white">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center"><Sparkles className="w-4 h-4" /></div>
              <div className="leading-tight min-w-0">
                <p className="font-black text-sm truncate">EduMaster Helper</p>
                <p className="text-[10px] opacity-90">AI guide • සිංහල / English</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={clearChat} className="p-1.5 rounded-lg hover:bg-white/20" aria-label="Clear conversation"><Trash2 className="w-4 h-4" /></button>
              <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-white/20" aria-label="Close assistant"><X className="w-4 h-4" /></button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5">
            {messages.length === 0 && (
              <div className="space-y-2">
                <p className={`text-xs font-bold ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  Hi! Ask me anything about classes, payments, attendance or printing cards.
                </p>
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className={`block w-full text-left text-[11px] font-bold px-3 py-2 rounded-xl border transition ${darkMode ? 'border-slate-700 hover:bg-slate-800 text-slate-300' : 'border-slate-200 hover:bg-slate-50 text-slate-700'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {messages.map((m, i) => (
              <div key={m.id || i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] whitespace-pre-wrap text-[12px] leading-relaxed font-medium px-3 py-2 rounded-2xl ${
                  m.role === 'user' ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-br-sm' : `${bubbleBot} rounded-bl-sm`
                }`}>
                  {m.content || '…'}
                </div>
              </div>
            ))}

            {busy && messages[messages.length - 1]?.role !== 'assistant' && (
              <div className={`inline-flex items-center gap-2 text-[11px] font-bold px-3 py-2 rounded-2xl ${bubbleBot}`}>
                <Loader2 className="w-3 h-3 animate-spin" /> thinking…
              </div>
            )}
          </div>

          <form
            onSubmit={e => { e.preventDefault(); send(input); }}
            className={`p-2.5 border-t flex items-end gap-2 ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}
          >
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); } }}
              placeholder="Type your question…"
              className={`flex-1 resize-none max-h-24 px-3 py-2 rounded-2xl text-xs font-semibold outline-none border ${
                darkMode ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="shrink-0 p-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-600 text-white disabled:opacity-40"
              aria-label="Send message"
            >
              {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </form>
        </div>
      )}
    </>
  );
};
