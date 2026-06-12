"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import type { ProcessStep } from "@/types";
import type { SectionMeta } from "@/lib/cms/types";

interface ProcessTimelineProps {
  section: SectionMeta;
  steps: ProcessStep[];
}

export default function ProcessTimeline({ section, steps }: ProcessTimelineProps) {
  if (!section.enabled) return null;

  return (
    <section id="process" className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-neon/[0.03] to-transparent" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          label={section.label}
          title={section.title}
          subtitle={section.subtitle}
          align="center"
        />

        {/* Mobile: compact vertical timeline */}
        <ol className="relative mt-10 space-y-4 lg:hidden">
          <div
            className="absolute top-4 bottom-4 left-[1.125rem] w-px bg-gradient-to-b from-neon/70 via-neon/30 to-neon/10"
            aria-hidden
          />
          {steps.map((step) => (
            <motion.li
              key={step.id}
              className="relative flex gap-4"
              data-gsap-reveal
              suppressHydrationWarning
            >
              <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neon/50 bg-navy-light font-display text-xs font-semibold text-neon shadow-[0_0_16px_rgba(74,144,226,0.25)]">
                {String(step.step).padStart(2, "0")}
              </div>
              <div className="glass min-w-0 flex-1 rounded-sm border-neon/10 p-4 transition-colors hover:border-neon/25">
                <h3 className="font-display text-lg font-semibold tracking-wide text-foreground">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.description}</p>
              </div>
            </motion.li>
          ))}
        </ol>

        {/* Desktop: alternating timeline */}
        <div className="relative mt-16 hidden lg:block">
          <div
            className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-neon/50 via-neon/20 to-transparent"
            aria-hidden
          />

          <div className="space-y-20">
            {steps.map((step, i) => (
              <motion.div
                key={step.id}
                className={`relative flex items-center gap-16 ${
                  i % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
                data-gsap-reveal
                suppressHydrationWarning
              >
                <div className={`flex-1 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                  <span className="font-display text-6xl font-semibold text-neon/20">
                    {String(step.step).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 font-display text-2xl font-semibold tracking-wide text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{step.description}</p>
                </div>

                <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center">
                  <div className="absolute h-8 w-8 animate-pulse rounded-full bg-neon/20" />
                  <div className="h-3 w-3 rounded-full bg-neon glow-neon" />
                </div>

                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
