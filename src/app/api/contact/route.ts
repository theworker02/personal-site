import { NextResponse } from "next/server";
import { z } from "zod";
import { promises as fs } from "fs";
import path from "path";
import { clientIp, readJsonLimited, jsonError } from "@/lib/security/request";
import { pruneRateLimits, rateLimit } from "@/lib/security/rate-limit";
import { webhookPayload } from "@/lib/security/contact-delivery";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  intent: z.enum([
    "General",
    "Engineering",
    "Research",
    "Collaboration",
    "Acquisition",
    "Employment",
  ]),
  body: z.string().trim().min(10).max(5000),
  website: z.string().max(200).optional(),
});

export async function POST(request: Request) {
  pruneRateLimits();
  const ip = clientIp(request);
  const limited = rateLimit(`contact:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!limited.ok) {
    return jsonError("Rate limit exceeded.", 429, limited.retryAfterSec);
  }

  const body = await readJsonLimited(request, 24_576);
  if (!body.ok) return body.response;

  const parsed = schema.safeParse(body.value);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed. Check fields and intent." },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  // Honeypot tripped — pretend success.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  }

  const { website: _honeypot, ...safeFields } = parsed.data;
  const record = {
    ...safeFields,
    receivedAt: new Date().toISOString(),
    ip,
  };

  if (process.env.CONTACT_WEBHOOK_URL) {
    try {
      const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(webhookPayload(webhookUrl, record)),
        signal: AbortSignal.timeout(8_000),
      });
      if (!res.ok) {
        return jsonError("Delivery failed. Try email.", 502);
      }
    } catch {
      return jsonError("Delivery failed. Try email.", 502);
    }
  } else {
    const dir = path.join(process.cwd(), "data", "cache");
    await fs.mkdir(dir, { recursive: true });
    await fs.appendFile(
      path.join(dir, "contact-log.jsonl"),
      `${JSON.stringify(record)}\n`,
      "utf8",
    );
  }

  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}

export async function GET() {
  return jsonError("Method not allowed.", 405);
}
