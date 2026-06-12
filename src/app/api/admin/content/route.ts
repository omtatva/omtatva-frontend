import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { getCms, writeCms, verifyAdminKey, CMS_CACHE_TAG } from "@/lib/cms";
import { adminCorsHeaders } from "@/lib/cms/cors";
import type { CmsData } from "@/lib/cms/types";

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

function databaseError(request: Request, err: unknown) {
  const detail = err instanceof Error ? err.message.split("\n").find(Boolean) : "";
  return withCors(
    request,
    NextResponse.json(
      {
        error:
          "Could not reach the database. Verify DATABASE_URL and that the Cloud SQL instance allows connections from this server's IP (Authorized networks) or that the Cloud SQL Auth Proxy is running.",
        detail,
      },
      { status: 503 }
    )
  );
}

export async function GET(request: Request) {
  if (!verifyAdminKey(request)) return unauthorized(request);
  try {
    const cms = await getCms();
    return withCors(request, NextResponse.json(cms));
  } catch (err) {
    return databaseError(request, err);
  }
}

export async function PUT(request: Request) {
  if (!verifyAdminKey(request)) return unauthorized(request);

  let body: CmsData;
  try {
    body = (await request.json()) as CmsData;
  } catch {
    return withCors(
      request,
      NextResponse.json({ error: "Invalid CMS payload" }, { status: 400 })
    );
  }

  try {
    const saved = await writeCms(body);
    revalidateTag(CMS_CACHE_TAG, "max");
    return withCors(request, NextResponse.json(saved));
  } catch (err) {
    return databaseError(request, err);
  }
}
