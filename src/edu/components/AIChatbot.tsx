// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { Bot, X, Send, Loader2, Sparkles } from 'lucide-react';
import { askAssistant } from '../../lib/ai.functions';

type Msg = { role: 'user' | 'assistant'; content: string };

interface Props {
  portal: string;
  context?: string;
  darkMode?: boolean;
}

const GREETINGS: Record<string, string> = {
  admin: 'Hello Admin! Ask me about students, fees, attendance, free cards or how any tool works.',
  teacher: 'Hello Teacher! Ask me about your classes, attendance marking, tutes and papers, or exam marks.',
  student: 'Hi! Ask me about your classes, payments, attendance, tutes or your ID card.',
  parent: 'Hello! Ask me about your child\'s attendance, payments, marks or SMS alerts.',
  guest: 'Hi! I am the EduMaster Assistant. Ask me about our classes, timetable or how to join.',
};

const SUGGESTIONS: Record<string, string[]> = {
  admin: ['How do I add a new student?', 'Who has not paid this month?', 'How does the free card work?'],
  teacher: ['How do I upload a tute PDF?', 'How do I mark attendance?', 'Show my class list'],
  student: ['What are my class times?', 'Are my payments up to date?', 'Where can I get my papers?'],
  parent: ['Is my child attending classes?', 'What is the fee for this month?', 'How do SMS alerts work?'],
  guest: ['What classes do you offer?', 'What are the class times?', 'How do I register?'],
};

export const AIChatbot: React.FC<Props> = ({ portal, context = '', darkMode = true }) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMessages([]);
  }, [portal]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, busy, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open, busy]);

  const send = async (text: string) => {
    const clean = text.trim();
    if (!clean || busy) return;
    const next: Msg[] = [...messages, { role: 'user', content: clean }];
    setMessages(next);
    setInput('');
    setBusy(true);
    try {
      const res = await askAssistant({ data: { portal, context, messages: next.slice(-12) } });
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: res.error ? `⚠️ ${res.error}` : res.reply },
      ]);
    } catch (e: any) {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: `⚠️ ${e?.message || 'Could not reach the assistant.'}` },
      ]);
    } finally {
      setBusy(false);
    }
  };

  const panelBg = darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200';
  const subText = darkMode ? 'text-slate-400' : 'text-slate-500';

  return (
    <>
      {/* Floating launcher */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Open AI assistant"
        className="fixed bottom-5 right-5 z-[60] h-14 w-14 rounded-full grid place-items-center text-white shadow-2xl bg-gradient-to-br from-amber-500 via-rose-600 to-indigo-600 hover:scale-105 active:scale-95 transition-transform"
      >
        {open ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
        {!open && (
          <span className="absolute inset-0 rounded-full ring-2 ring-amber-400/40 animate-ping" />
        )}
      </button>

      {open && (
        <div
          className={`fixed bottom-24 right-4 z-[60] w-[calc(100vw-2rem)] max-w-sm h-[70vh] max-h-[560px] flex flex-col rounded-3xl border shadow-2xl overflow-hidden ${panelBg}`}
        >
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-indigo-500/15 border-b border-white/10 flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl grid place-items-center bg-gradient-to-br from-amber-500 to-rose-600 text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-black leading-tight">EduMaster Assistant</p>
              <p className={`text-[11px] capitalize ${subText}`}>{portal} portal helper</p>
            </div>
            <button onClick={() => setOpen(false)} className={`p-1.5 rounded-lg hover:bg-white/10 ${subText}`}>
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.length === 0 && (
              <div className="space-y-3">
                <p className={`text-sm ${subText}`}>{GREETINGS[portal] || GREETINGS.guest}</p>
                <div className="flex flex-wrap gap-2">
                  {(SUGGESTIONS[portal] || SUGGESTIONS.guest).map(s => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className={`text-[11px] px-3 py-1.5 rounded-full border transition-colors ${
                        darkMode
                          ? 'border-slate-700 hover:border-amber-500/60 text-slate-300'
                          : 'border-slate-200 hover:border-amber-500/60 text-slate-600'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) =>
              m.role === 'user' ? (
                <div key={i} className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-indigo-600 text-white px-3.5 py-2 text-sm whitespace-pre-wrap">
                    {m.content}
                  </div>
                </div>
              ) : (
                <div key={i} className="flex gap-2">
                  <div className="h-7 w-7 shrink-0 rounded-lg grid place-items-center bg-gradient-to-br from-amber-500 to-rose-600 text-white">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                  <div className="text-sm leading-relaxed whitespace-pre-wrap max-w-[85%]">{m.content}</div>
                </div>
              )
            )}

            {busy && (
              <div className={`flex items-center gap-2 text-sm ${subText}`}>
                <Loader2 className="h-4 w-4 animate-spin" /> Thinking...
              </div>
            )}
          </div>

          {/* Composer */}
          <div className="p-3 border-t border-white/10">
            <div
              className={`flex items-end gap-2 rounded-2xl border px-3 py-2 ${
                darkMode ? 'border-slate-700 bg-slate-800/60' : 'border-slate-200 bg-slate-50'
              }`}
            >
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                placeholder="Ask anything about the institute..."
                className="flex-1 bg-transparent outline-none resize-none text-sm max-h-24"
              />
              <button
                onClick={() => send(input)}
                disabled={busy || !input.trim()}
                className="h-8 w-8 shrink-0 grid place-items-center rounded-xl bg-gradient-to-br from-amber-500 to-rose-600 text-white disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
