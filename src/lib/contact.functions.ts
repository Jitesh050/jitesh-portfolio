import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const TO = "jitesh0510@gmail.com";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_mail/gmail/v1";

const b64 = (s: string) =>
  btoa(Array.from(new TextEncoder().encode(s), (b) => String.fromCharCode(b)).join(""));
const header = (v: string) => (/^[\x00-\x7F]*$/.test(v) ? v : `=?UTF-8?B?${b64(v)}?=`);

function createRawEmail(to: string, subject: string, body: string): string {
  const email = [
    `To: ${to}`,
    `Subject: ${header(subject)}`,
    "MIME-Version: 1.0",
    'Content-Type: text/plain; charset="UTF-8"',
    "",
    body,
  ].join("\r\n");
  return b64(email).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

const inputSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  message: z.string().min(1).max(5000),
});

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    const subject = `Portfolio contact from ${data.name}`;
    const text = `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`;

    // Option 1 (any host): Resend — set RESEND_API_KEY (and optionally RESEND_FROM).
    const resendKey = process.env["RESEND_API_KEY"];
    if (resendKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env["RESEND_FROM"] || "Portfolio <onboarding@resend.dev>",
          to: [TO],
          reply_to: data.email,
          subject,
          text,
        }),
      });
      if (!res.ok) {
        console.error(`Resend failed [${res.status}]: ${await res.text()}`);
        throw new Error("Could not send the message right now.");
      }
      return { ok: true };
    }

    // Option 2 (Lovable hosting): Gmail connector.
    const lovableKey = process.env["LOVABLE_API_KEY"];
    const gmailKey = process.env["GOOGLE_MAIL_API_KEY"];
    if (!lovableKey || !gmailKey) {
      // Client falls back to opening the visitor's mail app.
      throw new Error("Email service is not configured.");
    }
    const res = await fetch(`${GATEWAY_URL}/users/me/messages/send`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": gmailKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ raw: createRawEmail(TO, subject, text) }),
    });
    if (!res.ok) {
      console.error(`Gmail send failed [${res.status}]: ${await res.text()}`);
      throw new Error("Could not send the message right now.");
    }
    return { ok: true };
  });
