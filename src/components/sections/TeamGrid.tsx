"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { TeamMember } from "@/types";
import TeamMemberCard from "@/components/cards/TeamMemberCard";

interface TeamGridProps {
  members: TeamMember[];
}

export default function TeamGrid({ members }: TeamGridProps) {
  const departments = useMemo(() => {
    const unique = [...new Set(members.map((m) => m.department))];
    return ["All", ...unique];
  }, [members]);

  const [active, setActive] = useState("All");

  const featured = members.filter((m) => m.featured);
  const filtered = members.filter(
    (m) => !m.featured && (active === "All" || m.department === active)
  );

  return (
    <div className="space-y-16 md:space-y-24">
      {featured.length > 0 && (
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.015] px-6 py-10 md:px-10 md:py-12">
          <p className="mb-8 text-center text-xs font-bold tracking-[0.3em] text-neon uppercase" data-gsap-reveal>
            Leadership
          </p>
          <div className="flex flex-wrap items-start justify-center gap-x-10 gap-y-8 sm:gap-x-12">
            {featured.map((member) => (
              <TeamMemberCard key={member.id} member={member} featured />
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="mb-10 flex flex-wrap gap-3" data-gsap-reveal>
          {departments.map((dept) => (
            <button
              key={dept}
              type="button"
              onClick={() => setActive(dept)}
              className={`relative rounded-full px-5 py-2 text-xs font-bold tracking-[0.15em] uppercase transition-colors duration-300 ${
                active === dept
                  ? "text-foreground"
                  : "text-muted hover:text-ice"
              }`}
            >
              {active === dept && (
                <motion.span
                  layoutId="team-filter-pill"
                  className="absolute inset-0 rounded-full border border-neon/40 bg-neon/[0.08]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{dept}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((member) => (
              <motion.div
                key={member.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <TeamMemberCard member={member} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="py-12 text-center text-muted">No team members in this department.</p>
        )}
      </div>
    </div>
  );
}
