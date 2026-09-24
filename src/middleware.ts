import { NextResponse, type NextRequest } from "next/server";

const BLOCKED_PREFIXES = [
  "/.env",
  "/.git",
  "/wp-admin",
  "/wp-login",
  "/xmlrpc.php",
  "/phpmyadmin",
  "/.aws",
  "/server-status",
  "/actuator",
];

const securityHeaders: Record<string, string> = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-site",
  "X-DNS-Prefetch-Control": "off",
  "X-Permitted-Cross-Domain-Policies": "none",
};

function applySecurityHeaders(response: NextResponse) {
  for (const [k, v] of Object.entries(securityHeaders)) {
    response.headers.set(k, v);
  }
  // HSTS only meaningful over HTTPS (Netlify terminates TLS).
  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload",
    );
  }
  return response;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (BLOCKED_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return applySecurityHeaders(new NextResponse(null, { status: 404 }));
  }

  // Never expose source maps publicly if somehow emitted.
  if (pathname.endsWith(".map")) {
    return applySecurityHeaders(new NextResponse(null, { status: 404 }));
  }

  const response = NextResponse.next();
  return applySecurityHeaders(response);
}

export const config = {
  matcher: [
    /*
     * Apply to all paths except Next static internals we should not delay.
     * Still covers pages + API + probes.
     */
    "/((?!_next/static|_next/image|favicon.svg|favicon.ico).*)",
  ],
};
