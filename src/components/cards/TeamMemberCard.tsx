"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { TeamMember } from "@/types";

interface TeamMemberCardProps {
  member: TeamMember;
  featured?: boolean;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function TeamMemberCard({ member, featured = false }: TeamMemberCardProps) {
  if (featured) {
    return (
      <motion.article
        className="group relative mx-auto w-full max-w-[220px] sm:max-w-[240px]"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        data-gsap-reveal
      >
        <div className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02] transition-all duration-500 group-hover:border-neon/35 group-hover:shadow-[0_8px_40px_rgba(74,144,226,0.15)]">
          <div className="absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-neon/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="relative aspect-[3/4] overflow-hidden">
            {member.image ? (
              <Image
                src={member.image}
                alt={member.name}
                fill
                loading="lazy"
                className="object-cover transition-all duration-700 group-hover:scale-105 grayscale-[20%] group-hover:grayscale-0"
                sizes="(max-width: 640px) 45vw, 240px"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-white/[0.03]">
                <span className="font-display text-4xl text-ice/30">{getInitials(member.name)}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            <div className="absolute inset-0 bg-neon/0 transition-colors duration-500 group-hover:bg-neon/[0.06]" />
          </div>

          <div className="relative -mt-10 px-4 pb-4 pt-0">
            <div className="rounded-lg border border-white/[0.06] bg-background/80 px-3.5 py-3 backdrop-blur-md transition-colors duration-500 group-hover:border-neon/20 group-hover:bg-background/90">
              <span className="inline-block rounded-full border border-neon/20 bg-neon/[0.08] px-2 py-0.5 text-[9px] font-bold tracking-[0.2em] text-neon uppercase">
                {member.department}
              </span>
              <h3 className="mt-2 font-display text-lg leading-tight tracking-wide text-foreground">
                {member.name}
              </h3>
              <p className="mt-0.5 text-xs text-ice/70">{member.role}</p>

              <p className="mt-2 max-h-0 overflow-hidden text-[11px] leading-relaxed text-muted opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                {member.bio}
              </p>

              {member.socialLinks && member.socialLinks.length > 0 && (
                <div className="mt-2 flex gap-2 border-t border-white/[0.06] pt-2 opacity-0 transition-all duration-500 group-hover:opacity-100">
                  {member.socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-medium tracking-wider text-muted uppercase transition-colors hover:text-neon"
                      aria-label={`${member.name} on ${link.label}`}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      className="group relative overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.02] transition-all duration-500 hover:border-neon/25 hover:shadow-[0_6px_32px_rgba(74,144,226,0.12)]"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      data-gsap-reveal
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-white/[0.03]">
            <span className="font-display text-5xl text-ice/30">{getInitials(member.name)}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95" />
        <div className="absolute inset-0 bg-neon/0 transition-colors duration-500 group-hover:bg-neon/[0.05]" />

        <div className="absolute inset-x-0 bottom-0 p-4">
          <span className="inline-block text-[9px] font-bold tracking-[0.2em] text-neon uppercase">
            {member.department}
          </span>
          <h3 className="mt-1 font-display text-lg tracking-wide text-foreground">{member.name}</h3>
          <p className="mt-0.5 text-xs text-ice/75">{member.role}</p>

          <p className="mt-2 max-h-0 overflow-hidden text-xs leading-relaxed text-muted opacity-0 transition-all duration-500 group-hover:max-h-20 group-hover:opacity-100">
            {member.bio}
          </p>

          {member.socialLinks && member.socialLinks.length > 0 && (
            <div className="mt-2 flex gap-2 opacity-0 transition-all duration-500 group-hover:opacity-100">
              {member.socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] tracking-wider text-muted uppercase transition-colors hover:text-neon"
                  aria-label={`${member.name} on ${link.label}`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
