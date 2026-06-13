"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { videoMimeType } from "@/lib/media";
import { startScroll, stopScroll } from "@/lib/scroll";
import type { BTSItem } from "@/types";
import type { SectionMeta } from "@/lib/cms/types";

interface BehindTheScenesProps {
  section: SectionMeta;
  items: BTSItem[];
}

export default function BehindTheScenes({ section, items }: BehindTheScenesProps) {
  const [activeItem, setActiveItem] = useState<BTSItem | null>(null);

  const closeModal = useCallback(() => setActiveItem(null), []);

  useEffect(() => {
    if (!activeItem) return;

    stopScroll();
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      startScroll();
    };
  }, [activeItem, closeModal]);

  if (!section.enabled) return null;

  return (
    <section
      id="showreel"
      className="section-padding relative scroll-mt-24 bg-navy-light/50 film-grain"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label={section.label}
          title={section.title}
          subtitle={section.subtitle}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const hasVideo = Boolean(item.video);
            return (
              <motion.article
                key={item.id}
                className="group relative aspect-[4/5] overflow-hidden rounded-sm cursor-pointer"
                whileHover={{ scale: 1.02 }}
                data-gsap-reveal
                suppressHydrationWarning
                onClick={() => hasVideo && setActiveItem(item)}
                role={hasVideo ? "button" : undefined}
                tabIndex={hasVideo ? 0 : undefined}
                aria-label={hasVideo ? `Play ${item.title}` : undefined}
                onKeyDown={(e) => {
                  if (hasVideo && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    setActiveItem(item);
                  }
                }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="300px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                {hasVideo && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md">
                      <svg className="ml-1 h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
                <div className="absolute right-0 bottom-0 left-0 p-5">
                  <span className="text-[10px] tracking-wider text-neon">{item.duration}</span>
                  <h3 className="mt-1 font-display text-lg text-white">{item.title}</h3>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeItem?.video && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-label={activeItem.title}
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close"
              className="absolute top-5 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:border-neon hover:text-neon"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <motion.div
              className="relative w-full max-w-5xl overflow-hidden rounded-sm bg-black shadow-[0_0_60px_rgba(0,0,0,0.6)]"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <video
                key={activeItem.id}
                className="aspect-video w-full bg-black"
                controls
                autoPlay
                playsInline
                poster={activeItem.image}
              >
                <source src={activeItem.video} type={videoMimeType(activeItem.video)} />
              </video>
              <div className="flex items-baseline gap-3 px-5 py-4">
                <span className="text-[10px] tracking-wider text-neon">{activeItem.duration}</span>
                <h3 className="font-display text-lg text-white">{activeItem.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
