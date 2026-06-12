"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import type { BTSItem } from "@/types";
import type { SectionMeta } from "@/lib/cms/types";

interface BehindTheScenesProps {
  section: SectionMeta;
  items: BTSItem[];
}

export default function BehindTheScenes({ section, items }: BehindTheScenesProps) {
  if (!section.enabled) return null;

  return (
    <section className="section-padding relative bg-navy-light/50 film-grain">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label={section.label}
          title={section.title}
          subtitle={section.subtitle}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <motion.article
              key={item.id}
              className="group relative aspect-[4/5] overflow-hidden rounded-sm cursor-pointer"
              whileHover={{ scale: 1.02 }}
              data-gsap-reveal
              suppressHydrationWarning
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="300px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md">
                  <svg className="ml-1 h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="absolute right-0 bottom-0 left-0 p-5">
                <span className="text-[10px] tracking-wider text-neon">{item.duration}</span>
                <h3 className="mt-1 font-display text-lg text-white">{item.title}</h3>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
