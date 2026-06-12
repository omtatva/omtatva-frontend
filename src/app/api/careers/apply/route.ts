import { NextResponse } from "next/server";
import { getCms } from "@/lib/cms";
import { getCareerById } from "@/lib/careers";
import { createApplication } from "@/lib/applications";
import { uploadBuffer } from "@/lib/storage/gcs";

export const dynamic = "force-dynamic";

const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const PDF_MIME = "application/pdf";

function sanitizeFilePart(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

function isPdfBuffer(buffer: Buffer): boolean {
  return buffer.length >= 4 && buffer.subarray(0, 4).toString("ascii") === "%PDF";
}

function validatePdfFile(file: File, buffer: Buffer): string | null {
  if (file.type !== PDF_MIME) {
    return "Resume must be a PDF file.";
  }
  if (!file.name.toLowerCase().endsWith(".pdf")) {
    return "Resume filename must end with .pdf.";
  }
  if (file.size > MAX_RESUME_BYTES) {
    return "Resume must be 5 MB or smaller.";
  }
  if (file.size === 0 || buffer.length === 0) {
    return "Resume file is empty.";
  }
  if (!isPdfBuffer(buffer)) {
    return "Invalid PDF file.";
  }
  return null;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const careerId = String(formData.get("careerId") ?? "").trim();
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const coverLetter = String(formData.get("coverLetter") ?? "").trim();
    const resume = formData.get("resume");

    if (!careerId || !name || !email) {
      return NextResponse.json({ error: "Name, email, and position are required." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (!(resume instanceof File)) {
      return NextResponse.json({ error: "Please upload your resume as a PDF." }, { status: 400 });
    }

    const cms = await getCms();
    const career = getCareerById(cms.careers, careerId);
    if (!career) {
      return NextResponse.json({ error: "This position is no longer available." }, { status: 404 });
    }

    const buffer = Buffer.from(await resume.arrayBuffer());
    const pdfError = validatePdfFile(resume, buffer);
    if (pdfError) {
      return NextResponse.json({ error: pdfError }, { status: 400 });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const applicantSlug = sanitizeFilePart(name) || "applicant";
    const resumeFilename = `${timestamp}-${applicantSlug}.pdf`;
    const resumeObject = `applications/${careerId}/${resumeFilename}`;

    const resumeUrl = await uploadBuffer(resumeObject, buffer, PDF_MIME);

    await createApplication({
      careerId,
      careerTitle: career.title,
      name,
      email,
      phone: phone || null,
      coverLetter: coverLetter || null,
      resumeFilename,
      resumeObject,
      resumeUrl,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[careers/apply] failed:", error);
    return NextResponse.json(
      { error: "Unable to save your application. Please try again later." },
      { status: 500 }
    );
  }
}
