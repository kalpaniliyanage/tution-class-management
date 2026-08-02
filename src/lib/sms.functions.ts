import { createServerFn } from "@tanstack/react-start";
import { smsSchema, sendSmsViaGateway } from "./sms.server";

export const sendSms = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => smsSchema.parse(data))
  .handler(async ({ data }) => sendSmsViaGateway(data.to, data.message));
