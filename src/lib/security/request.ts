import "server-only";
import { NextResponse } from "next/server";

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const real = request.headers.get("x-real-ip")?.trim();
  const netlify = request.headers.get("x-nf-client-connection-ip")?.trim();
  return forwarded || real || netlify || "unknown";
}

export function isProduction() {
  return process.env.NODE_ENV === "production" || process.env.CONTEXT === "production";
}

/** Reject oversized JSON bodies before parse (bytes). */
export async function readJsonLimited(
  request: Request,
  maxBytes = 32_768,
): Promise<{ ok: true; value: unknown } | { ok: false; response: NextResponse }> {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return {
      ok: false,
      response: NextResponse.json({ ok: false, error: "Unsupported media type." }, { status: 415 }),
    };
  }

  const length = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(length) && length > maxBytes) {
    return {
      ok: false,
      response: NextResponse.json({ ok: false, error: "Payload too large." }, { status: 413 }),
    };
  }

  const buf = await request.arrayBuffer();
  if (buf.byteLength > maxBytes) {
    return {
      ok: false,
      response: NextResponse.json({ ok: false, error: "Payload too large." }, { status: 413 }),
    };
  }

  try {
    const text = new TextDecoder("utf-8", { fatal: true }).decode(buf);
    return { ok: true, value: JSON.parse(text) as unknown };
  } catch {
    return {
      ok: false,
      response: NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 }),
    };
  }
}

/**
 * GitHub sync burns API quota / token. In production the secret is mandatory.
 * Locally, allow without secret for developer convenience.
 */
export function authorizeGithubSync(request: Request): NextResponse | null {
  const secret = process.env.GITHUB_SYNC_SECRET?.trim();
  const provided =
    request.headers.get("x-sync-secret")?.trim() ||
    new URL(request.url).searchParams.get("secret")?.trim() ||
    "";

  if (isProduction()) {
    if (!secret) {
      return NextResponse.json(
        { ok: false, error: "Sync locked: GITHUB_SYNC_SECRET is not configured." },
        { status: 503 },
      );
    }
    if (provided !== secret) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
    return null;
  }

  // Non-production: if a secret is set, still enforce it.
  if (secret && provided !== secret) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export function jsonError(message: string, status: number, retryAfterSec?: number) {
  const headers = new Headers({ "Cache-Control": "no-store" });
  if (retryAfterSec) headers.set("Retry-After", String(retryAfterSec));
  return NextResponse.json({ ok: false, error: message }, { status, headers });
}

export function noStoreJson(data: unknown, init?: { status?: number }) {
  return NextResponse.json(data, {
    status: init?.status ?? 200,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
