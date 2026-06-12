import { NextResponse } from "next/server";
import { verifyAdminKey } from "@/lib/cms";
import { adminCorsHeaders } from "@/lib/cms/cors";
import { listApplications } from "@/lib/applications";

export const dynamic = "force-dynamic";

function withCors(request: Request, response: NextResponse) {
  const cors = adminCorsHeaders(request);
  Object.entries(cors).forEach(([k, v]) => response.headers.set(k, v));
  return response;
}

function unauthorized(request: Request) {
  const message = process.env.ADMIN_API_KEY
    ? "Unauthorized"
    : "ADMIN_API_KEY is not set on the main site. Add it to .env.local.";
  return withCors(request, NextResponse.json({ error: message }, { status: 401 }));
}

export async function OPTIONS(request: Request) {
  return withCors(request, new NextResponse(null, { status: 204 }));
}

export async function GET(request: Request) {
  if (!verifyAdminKey(request)) return unauthorized(request);

  const { searchParams } = new URL(request.url);
  const careerId = searchParams.get("careerId")?.trim() || undefined;
  const applications = await listApplications(careerId);

  return withCors(request, NextResponse.json({ applications }));
}
