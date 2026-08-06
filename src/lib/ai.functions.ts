import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000),
});

const InputSchema = z.object({
  portal: z.string().max(40).default("guest"),
  context: z.string().max(6000).default(""),
  messages: z.array(MessageSchema).min(1).max(30),
});

export const askAssistant = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }) => {
    const { chatComplete } = await import("./ai.server");

    const system = [
      "You are EduMaster Assistant, a friendly helper inside a Sri Lankan tuition institute management system.",
      `The person talking to you is using the "${data.portal}" portal.`,
      "Answer in simple, clear English (short sentences). Be concise and practical.",
      "Help with: classes and timetable, fees and payments, attendance and SMS alerts, ID cards and QR gate security, tutes/papers, exam marks, free cards for top A/L achievers, and how to use each portal.",
      "Only use the live data given below when answering data questions. If the data is not there, say you do not have it and suggest where to find it in the app.",
      "Never reveal passwords, PINs or access codes of other users.",
      data.context ? `LIVE APP DATA:\n${data.context}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const reply = await chatComplete([
        { role: "system", content: system },
        ...data.messages,
      ]);
      return { reply, error: null as string | null };
    } catch (error) {
      return {
        reply: "",
        error: error instanceof Error ? error.message : "AI request failed.",
      };
    }
  });
