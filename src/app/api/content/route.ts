import { NextResponse } from "next/server";
import { getCms } from "@/lib/cms";

export const dynamic = "force-dynamic";

export async function GET() {
  const cms = await getCms();
  return NextResponse.json(cms, {
    headers: {
      "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
    },
  });
}
