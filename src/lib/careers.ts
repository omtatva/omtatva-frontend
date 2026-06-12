import type { Career } from "@/types";

export function getCareerById(careers: Career[], id: string): Career | undefined {
  return careers.find((c) => c.id === id);
}

export function careerApplyPath(careerId: string): string {
  return `/careers/${careerId}`;
}
