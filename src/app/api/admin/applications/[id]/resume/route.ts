import { NextResponse } from "next/server";
import { verifyAdminKey } from "@/lib/cms";
import { adminCorsHeaders } from "@/lib/cms/cors";
import { getApplication } from "@/lib/applications";
import { downloadBuffer } from "@/lib/storage/gcs";

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
  const decodedId = decodeURIComponent(id);
  const application = await getApplication(decodedId);
  if (!application) {
    return withCors(request, NextResponse.json({ error: "Application not found" }, { status: 404 }));
  }

  let buffer: Buffer;
  try {
    buffer = await downloadBuffer(application.resumeObject);
  } catch {
    return withCors(request, NextResponse.json({ error: "Resume file not found" }, { status: 404 }));
  }

  const filename = application.resumeFilename || "resume.pdf";
  const response = new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
  return withCors(request, response);
}
