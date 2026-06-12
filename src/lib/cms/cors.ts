const DEFAULT_ADMIN_ORIGIN = "http://localhost:3001";

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]"]);

function hostsEquivalent(a: string, b: string): boolean {
  if (a === b) return true;
  return LOCAL_HOSTS.has(a) && LOCAL_HOSTS.has(b);
}

/** Treat localhost and 127.0.0.1 as equivalent (common dev mismatch). */
function originMatchesAllowed(requestOrigin: string, allowed: string): boolean {
  if (requestOrigin === allowed) return true;
  try {
    const req = new URL(requestOrigin);
    const allow = new URL(allowed);
    return (
      req.protocol === allow.protocol &&
      req.port === allow.port &&
      hostsEquivalent(req.hostname, allow.hostname)
    );
  } catch {
    return false;
  }
}

export function adminCorsHeaders(request: Request): HeadersInit {
  const origin = request.headers.get("origin");
  const allowedList = process.env.ADMIN_ORIGINS
    ? process.env.ADMIN_ORIGINS.split(",").map((s) => s.trim())
    : [process.env.ADMIN_ORIGIN ?? DEFAULT_ADMIN_ORIGIN];

  if (origin && allowedList.some((allowed) => originMatchesAllowed(origin, allowed))) {
    return {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, PUT, PATCH, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Authorization, Content-Type, X-Admin-Key",
    };
  }
  return {};
}
