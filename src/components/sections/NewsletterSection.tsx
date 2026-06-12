"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import type { CmsData } from "@/lib/cms/types";

interface NewsletterSectionProps {
  section: CmsData["sections"]["newsletter"];
}

export default function NewsletterSection({ section }: NewsletterSectionProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!section.enabled) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="section-padding relative">
      <div className="mx-auto max-w-3xl text-center" data-gsap-reveal suppressHydrationWarning>
        <p className="mb-3 text-xs tracking-[0.3em] text-neon uppercase">{section.label}</p>
        <h2 className="font-display text-3xl md:text-5xl text-foreground glow-text">
          {section.title}
        </h2>
        <p className="mt-4 text-muted">{section.subtitle}</p>

        {submitted ? (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-ice"
          >
            {section.successMessage}
          </motion.p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-stretch"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={section.placeholder}
              required
              aria-label="Email address"
              className="flex-1 rounded-sm border border-white/15 bg-white/5 px-6 py-4 font-semibold text-white placeholder:text-muted backdrop-blur-md transition-all duration-300 focus:border-neon focus:outline-none focus:ring-1 focus:ring-neon/50"
            />
            <MagneticButton type="submit" variant="primary" className="shrink-0">
              {section.buttonLabel}
            </MagneticButton>
          </form>
        )}
      </div>
    </section>
  );
}
