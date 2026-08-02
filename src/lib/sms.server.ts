import { z } from "zod";

export const smsSchema = z.object({
  to: z.string().min(9).max(20),
  message: z.string().min(1).max(600),
});

/** Normalise a Sri Lankan number to 947XXXXXXXX */
export function normalizeLK(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("94")) return digits;
  if (digits.startsWith("0")) return `94${digits.slice(1)}`;
  if (digits.length === 9) return `94${digits}`;
  return digits;
}

export type SmsResult = {
  ok: boolean;
  provider: string;
  error?: string;
  detail?: string;
};

/** Sends one SMS through Text.lk (preferred) or Notify.lk. */
export async function sendSmsViaGateway(rawTo: string, message: string): Promise<SmsResult> {
  const to = normalizeLK(rawTo);

  const textlkKey = process.env["TEXTLK_API_TOKEN"];
  const textlkSender = process.env["TEXTLK_SENDER_ID"] || "TextLKDemo";
  const notifyUser = process.env["NOTIFYLK_USER_ID"];
  const notifyKey = process.env["NOTIFYLK_API_KEY"];
  const notifySender = process.env["NOTIFYLK_SENDER_ID"] || "NotifyDEMO";

  try {
    if (textlkKey) {
      const res = await fetch("https://app.text.lk/api/v3/sms/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${textlkKey}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          recipient: to,
          sender_id: textlkSender,
          type: "plain",
          message,
        }),
      });
      const body = await res.text();
      if (!res.ok) {
        console.error(`Text.lk send failed [${res.status}]: ${body}`);
        return { ok: false, provider: "text.lk", error: `[${res.status}] ${body}` };
      }
      return { ok: true, provider: "text.lk", detail: body.slice(0, 300) };
    }

    if (notifyUser && notifyKey) {
      const url = new URL("https://app.notify.lk/api/v1/send");
      url.searchParams.set("user_id", notifyUser);
      url.searchParams.set("api_key", notifyKey);
      url.searchParams.set("sender_id", notifySender);
      url.searchParams.set("to", to);
      url.searchParams.set("message", message);
      const res = await fetch(url.toString());
      const body = await res.text();
      if (!res.ok) {
        console.error(`Notify.lk send failed [${res.status}]: ${body}`);
        return { ok: false, provider: "notify.lk", error: `[${res.status}] ${body}` };
      }
      return { ok: true, provider: "notify.lk", detail: body.slice(0, 300) };
    }

    return {
      ok: false,
      provider: "none",
      error: "No SMS gateway configured. Add TEXTLK_API_TOKEN (or NOTIFYLK_USER_ID + NOTIFYLK_API_KEY).",
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("SMS send error:", msg);
    return { ok: false, provider: "unknown", error: msg };
  }
}
