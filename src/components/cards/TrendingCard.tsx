"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Film } from "@/types";
import { cn } from "@/lib/utils";

interface TrendingCardProps {
  film: Film;
  rank?: number;
  compact?: boolean;
}

export default function TrendingCard({
  film,
  rank,
  compact = false,
}: TrendingCardProps) {
  return (
    <motion.article
      className={cn(
        "group relative overflow-hidden rounded-sm cursor-pointer",
        compact ? "aspect-[16/10]" : "aspect-[16/9]"
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4 }}
    >
      <Image
        src={film.image}
        alt={film.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes={compact ? "400px" : "600px"}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      <div className="absolute inset-0 border border-transparent transition-colors duration-500 group-hover:border-neon/30" />

      {rank !== undefined && (
        <span className="absolute top-4 left-4 font-display text-4xl font-semibold text-neon/40">
          {String(rank).padStart(2, "0")}
        </span>
      )}

      <div className="absolute right-0 bottom-0 left-0 p-4 md:p-6">
        <p className="mb-1 text-[10px] tracking-[0.2em] text-neon uppercase">
          {film.genre}
        </p>
        <h3
          className={cn(
            "font-display font-semibold tracking-wide text-white",
            compact ? "text-lg" : "text-2xl"
          )}
        >
          {film.title}
        </h3>
      </div>
    </motion.article>
  );
}
