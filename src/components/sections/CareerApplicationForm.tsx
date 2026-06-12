"use client";

import { FormEvent, useRef, useState } from "react";
import MagneticButton from "@/components/ui/MagneticButton";

const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const PDF_MIME = "application/pdf";

interface CareerApplicationFormProps {
  careerId: string;
  careerTitle: string;
}

function validatePdfFile(file: File): string | null {
  if (file.type !== PDF_MIME) {
    return "Resume must be a PDF file.";
  }
  if (!file.name.toLowerCase().endsWith(".pdf")) {
    return "Resume filename must end with .pdf.";
  }
  if (file.size > MAX_RESUME_BYTES) {
    return "Resume must be 5 MB or smaller.";
  }
  if (file.size === 0) {
    return "Resume file is empty.";
  }
  return null;
}

export default function CareerApplicationForm({
  careerId,
  careerTitle,
}: CareerApplicationFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [resumeName, setResumeName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleFileChange = () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setResumeName(null);
      setError(null);
      return;
    }
    const validationError = validatePdfFile(file);
    setResumeName(file.name);
    setError(validationError);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setError("Please upload your resume as a PDF.");
      return;
    }

    const validationError = validatePdfFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    const formData = new FormData(form);
    formData.set("careerId", careerId);
    formData.set("resume", file);

    setSubmitting(true);
    try {
      const res = await fetch("/api/careers/apply", {
        method: "POST",
        body: formData,
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setSent(true);
      form.reset();
      setResumeName(null);
    } catch {
      setError("Unable to submit application. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="text-center">
        <p className="text-lg text-ice">
          Thank you for applying to <span className="text-neon">{careerTitle}</span>.
        </p>
        <p className="mt-3 text-sm text-muted">
          We received your resume and will be in touch if your profile is a match.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-sm border border-white/15 bg-white/5 px-4 py-3 font-semibold text-white focus:border-neon focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input type="hidden" name="careerId" value={careerId} />

      <div>
        <label htmlFor="name" className="mb-2 block text-xs tracking-[0.2em] text-muted uppercase">
          Full name
        </label>
        <input id="name" name="name" required autoComplete="name" className={inputClass} />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-xs tracking-[0.2em] text-muted uppercase">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="phone" className="mb-2 block text-xs tracking-[0.2em] text-muted uppercase">
          Phone <span className="text-muted/60">(optional)</span>
        </label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" className={inputClass} />
      </div>

      <div>
        <label
          htmlFor="coverLetter"
          className="mb-2 block text-xs tracking-[0.2em] text-muted uppercase"
        >
          Cover letter <span className="text-muted/60">(optional)</span>
        </label>
        <textarea
          id="coverLetter"
          name="coverLetter"
          rows={4}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div>
        <label htmlFor="resume" className="mb-2 block text-xs tracking-[0.2em] text-muted uppercase">
          Resume <span className="text-neon">(PDF only, max 5 MB)</span>
        </label>
        <input
          ref={fileInputRef}
          id="resume"
          name="resume"
          type="file"
          required
          accept="application/pdf,.pdf"
          onChange={handleFileChange}
          className="w-full cursor-pointer rounded-sm border border-dashed border-white/20 bg-white/5 px-4 py-4 text-sm text-ice file:mr-4 file:cursor-pointer file:rounded-sm file:border-0 file:bg-neon/20 file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-wider file:text-neon hover:border-neon/40"
        />
        {resumeName && !error && (
          <p className="mt-2 text-xs text-muted">Selected: {resumeName}</p>
        )}
      </div>

      {error && (
        <p className="rounded-sm border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </p>
      )}

      <MagneticButton type="submit" variant="primary" className="w-full">
        {submitting ? "Submitting…" : "Submit application"}
      </MagneticButton>
    </form>
  );
}
