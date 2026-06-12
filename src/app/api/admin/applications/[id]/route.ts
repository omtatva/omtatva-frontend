import { NextResponse } from "next/server";
import { verifyAdminKey } from "@/lib/cms";
import { adminCorsHeaders } from "@/lib/cms/cors";
import {
  deleteApplication,
  getApplication,
  updateApplicationStatus,
} from "@/lib/applications";
import { APPLICATION_STATUSES, type ApplicationStatus } from "@/lib/applications/types";

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

type RouteContext = { params: Promise<{ id: string }> };

export async function OPTIONS(request: Request) {
  return withCors(request, new NextResponse(null, { status: 204 }));
}

export async function GET(request: Request, context: RouteContext) {
  if (!verifyAdminKey(request)) return unauthorized(request);

  const { id } = await context.params;
  const application = await getApplication(decodeURIComponent(id));
  if (!application) {
    return withCors(request, NextResponse.json({ error: "Application not found" }, { status: 404 }));
  }

  return withCors(request, NextResponse.json({ application }));
}

export async function PATCH(request: Request, context: RouteContext) {
  if (!verifyAdminKey(request)) return unauthorized(request);

  const { id } = await context.params;
  const decodedId = decodeURIComponent(id);

  let body: { status?: string };
  try {
    body = (await request.json()) as { status?: string };
  } catch {
    return withCors(request, NextResponse.json({ error: "Invalid JSON body" }, { status: 400 }));
  }

  const status = body.status as ApplicationStatus | undefined;
  if (!status || !APPLICATION_STATUSES.includes(status)) {
    return withCors(
      request,
      NextResponse.json(
        { error: `status must be one of: ${APPLICATION_STATUSES.join(", ")}` },
        { status: 400 }
      )
    );
  }

  const application = await updateApplicationStatus(decodedId, status);
  if (!application) {
    return withCors(request, NextResponse.json({ error: "Application not found" }, { status: 404 }));
  }

  return withCors(request, NextResponse.json({ application }));
}

export async function DELETE(request: Request, context: RouteContext) {
  if (!verifyAdminKey(request)) return unauthorized(request);

  const { id } = await context.params;
  const deleted = await deleteApplication(decodeURIComponent(id));
  if (!deleted) {
    return withCors(request, NextResponse.json({ error: "Application not found" }, { status: 404 }));
  }

  return withCors(request, NextResponse.json({ ok: true }));
}
