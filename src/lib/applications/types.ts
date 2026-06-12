export type ApplicationStatus = "new" | "reviewed" | "shortlisted" | "rejected";

export const APPLICATION_STATUSES: ApplicationStatus[] = [
  "new",
  "reviewed",
  "shortlisted",
  "rejected",
];

export interface CareerApplicationMeta {
  careerId: string;
  careerTitle: string;
  name: string;
  email: string;
  phone: string | null;
  coverLetter: string | null;
  resumeFilename: string;
  resumeObject: string;
  resumeUrl: string;
  submittedAt: string;
  status?: ApplicationStatus;
}

export interface CareerApplication extends CareerApplicationMeta {
  id: string;
  status: ApplicationStatus;
}

