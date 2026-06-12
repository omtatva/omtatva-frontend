import { prisma } from "@/lib/db";
import { deleteObject } from "@/lib/storage/gcs";
import type { ApplicationStatus, CareerApplication } from "./types";
import { APPLICATION_STATUSES } from "./types";

function normalizeStatus(value: unknown): ApplicationStatus {
  if (
    typeof value === "string" &&
    APPLICATION_STATUSES.includes(value as ApplicationStatus)
  ) {
    return value as ApplicationStatus;
  }
  return "new";
}

type ApplicationRow = {
  id: string;
  careerId: string;
  careerTitle: string;
  name: string;
  email: string;
  phone: string | null;
  coverLetter: string | null;
  resumeFilename: string;
  resumeObject: string;
  resumeUrl: string;
  status: string;
  submittedAt: Date;
};

function toApplication(row: ApplicationRow): CareerApplication {
  return {
    id: row.id,
    careerId: row.careerId,
    careerTitle: row.careerTitle,
    name: row.name,
    email: row.email,
    phone: row.phone,
    coverLetter: row.coverLetter,
    resumeFilename: row.resumeFilename,
    resumeObject: row.resumeObject,
    resumeUrl: row.resumeUrl,
    submittedAt: row.submittedAt.toISOString(),
    status: normalizeStatus(row.status),
  };
}

export interface CreateApplicationInput {
  careerId: string;
  careerTitle: string;
  name: string;
  email: string;
  phone: string | null;
  coverLetter: string | null;
  resumeFilename: string;
  resumeObject: string;
  resumeUrl: string;
}

export async function createApplication(
  input: CreateApplicationInput
): Promise<CareerApplication> {
  const row = await prisma.application.create({ data: input });
  return toApplication(row);
}

export async function listApplications(
  careerId?: string
): Promise<CareerApplication[]> {
  const rows = await prisma.application.findMany({
    where: careerId ? { careerId } : undefined,
    orderBy: { submittedAt: "desc" },
  });
  return rows.map(toApplication);
}

export async function getApplication(
  id: string
): Promise<CareerApplication | null> {
  const row = await prisma.application.findUnique({ where: { id } });
  return row ? toApplication(row) : null;
}

export async function updateApplicationStatus(
  id: string,
  status: ApplicationStatus
): Promise<CareerApplication | null> {
  try {
    const row = await prisma.application.update({
      where: { id },
      data: { status },
    });
    return toApplication(row);
  } catch {
    return null;
  }
}

export async function deleteApplication(id: string): Promise<boolean> {
  const row = await prisma.application.findUnique({ where: { id } });
  if (!row) return false;

  await deleteObject(row.resumeObject).catch(() => {});
  await prisma.application.delete({ where: { id } });
  return true;
}
