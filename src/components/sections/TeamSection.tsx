import Link from "next/link";
import TeamMemberCard from "@/components/cards/TeamMemberCard";
import SectionHeading from "@/components/ui/SectionHeading";
import MagneticButton from "@/components/ui/MagneticButton";
import type { TeamMember } from "@/types";
import type { TeamSectionConfig } from "@/lib/cms/types";

interface TeamSectionProps {
  section: TeamSectionConfig;
  members: TeamMember[];
}

export default function TeamSection({ section, members }: TeamSectionProps) {
  if (!section.enabled) return null;

  return (
    <section id="team" className="section-padding relative border-t border-white/10">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon/[0.015] to-transparent pointer-events-none" />
      <div className="mx-auto max-w-7xl relative">
        <SectionHeading
          label={section.label}
          title={section.title}
          subtitle={section.subtitle}
          align="center"
        />
        <div className="flex flex-wrap items-start justify-center gap-x-10 gap-y-8 sm:gap-x-12">
          {members.map((member) => (
            <TeamMemberCard key={member.id} member={member} featured />
          ))}
        </div>
        <div className="mt-12 text-center">
          <MagneticButton href={section.linkHref ?? "/team"} variant="outline">
            {section.buttonLabel}
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
