import { createFileRoute } from '@tanstack/react-router';

type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string };

const SYSTEM_PROMPT = `You are "EduMaster Helper", a friendly bilingual (English / Sinhala) assistant inside a Sri Lankan tuition-institute management system.
You help students, parents, teachers and admins understand and use the system:
- Portals: Admin, Teacher, Student, Parent + public site (classes, timetable, Wall of Fame, notices).
- Payments: monthly payment cards, Paid / Pending / Overdue status, income reports and CSV export for admins.
- Attendance: gate scanning with the student QR / ID number, and WhatsApp or SMS notification to the parent (present or absent).
- ID cards: double sided, printable on one A4 sheet, with a scannable QR that opens a verification page.
- Every student has ONE unique identity number used across all the classes they join.
Answer briefly (under 120 words unless asked for detail), in the language the user writes in, and use simple markdown. If a question is outside the institute system, answer helpfully but keep it short.`;

export const Route = createFileRoute('/api/chat')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as { messages?: ChatMessage[] };
        const messages = Array.isArray(body.messages) ? body.messages.slice(-20) : [];
        if (!messages.length) return new Response('Messages are required', { status: 400 });

        const key = process.env['LOVABLE_API_KEY'];
        if (!key) return new Response('AI is not configured', { status: 500 });

        const upstream = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
          method: 'POST',
          headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'google/gemini-3.6-flash',
            stream: true,
            messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
          }),
        });

        if (!upstream.ok || !upstream.body) {
          const text = await upstream.text().catch(() => '');
          const status = upstream.status === 429 || upstream.status === 402 ? upstream.status : 500;
          console.error('AI gateway error', upstream.status, text);
          return new Response(
            status === 429
              ? 'Too many requests right now — please try again in a moment.'
              : status === 402
                ? 'AI credits are exhausted for this workspace.'
                : 'The assistant is unavailable right now.',
            { status },
          );
        }

        return new Response(upstream.body, {
          headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
          },
        });
      },
    },
  },
});
