// @ts-nocheck
import { sendSms } from "@/lib/sms.functions";

/**
 * Sends a real SMS through the configured Sri Lankan gateway (Text.lk / Notify.lk).
 * Returns a human readable log line that is stored in the app records.
 */
export async function dispatchSms(phone: string, message: string): Promise<string> {
  if (!phone) return `SMS not sent: no parent phone number on record.`;
  try {
    const res = await sendSms({ data: { to: phone, message } });
    if (res?.ok) {
      return `SMS DELIVERED to ${phone} via ${res.provider}: ${message}`;
    }
    return `SMS FAILED for ${phone} (${res?.provider}): ${res?.error} — message: ${message}`;
  } catch (e) {
    return `SMS FAILED for ${phone}: ${e instanceof Error ? e.message : String(e)} — message: ${message}`;
  }
}
