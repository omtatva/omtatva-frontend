"use client";

import { motion } from "framer-motion";
import type { Career } from "@/types";
import { careerApplyPath } from "@/lib/careers";
import MagneticButton from "@/components/ui/MagneticButton";

interface CareerCardProps {
  career: Career;
}

export default function CareerCard({ career }: CareerCardProps) {
  return (
    <motion.div
      className="group glass flex flex-col justify-between rounded-sm p-6 md:p-8 transition-all duration-500 hover:border-neon/30 md:flex-row md:items-center"
      whileHover={{ x: 4 }}
      data-gsap-reveal
    >
      <div>
        <p className="mb-1 text-[10px] tracking-[0.2em] text-neon uppercase">
          {career.department}
        </p>
        <h3 className="font-display text-xl tracking-wide text-foreground">
          {career.title}
        </h3>
        <p className="mt-2 text-sm text-muted">
          {career.location} · {career.type}
        </p>
      </div>
      <MagneticButton
        href={careerApplyPath(career.id)}
        variant="outline"
        className="mt-4 md:mt-0 shrink-0"
      >
        Apply
      </MagneticButton>
    </motion.div>
  );
}
