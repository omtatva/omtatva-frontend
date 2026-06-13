"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Film } from "@/types";
import { cn } from "@/lib/utils";

interface FilmCardProps {
  film: Film;
  className?: string;
  variant?: "default" | "compact";
}

export default function FilmCard({
  film,
  className,
  variant = "default",
}: FilmCardProps) {
  const isCompact = variant === "compact";

  return (
    <motion.article
      className={cn(
        "group relative cursor-pointer",
        isCompact
          ? "w-full"
          : "w-[280px] flex-shrink-0 md:w-[320px]",
        className
      )}
      whileHover={{ scale: isCompact ? 1.04 : 1.03 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-sm border border-ice/5 transition-colors duration-500 group-hover:border-neon/25",
          isCompact ? "aspect-[2/3]" : "aspect-[2/3]"
        )}
      >
        <Image
          src={film.image}
          alt={film.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes={
            isCompact
              ? "(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 18vw"
              : "(max-width: 768px) 280px, 320px"
          }
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-90" />
        <div className="absolute inset-0 bg-neon/0 transition-colors duration-500 group-hover:bg-neon/10" />

        <div className={cn("absolute right-0 bottom-0 left-0", isCompact ? "p-3" : "p-5")}>
          <p
            className={cn(
              "mb-0.5 tracking-[0.2em] text-neon uppercase",
              isCompact ? "text-[8px]" : "text-[10px]"
            )}
          >
            {film.genre} · {film.year}
          </p>
          <h3
            className={cn(
              "font-display font-semibold tracking-wide text-white line-clamp-2",
              isCompact ? "text-sm leading-snug" : "text-xl"
            )}
          >
            {film.title}
          </h3>
        </div>
      </div>
    </motion.article>
  );
}
