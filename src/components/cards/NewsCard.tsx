"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { NewsItem } from "@/types";

interface NewsCardProps {
  item: NewsItem;
  featured?: boolean;
}

export default function NewsCard({ item, featured = false }: NewsCardProps) {
  return (
    <motion.article
      className={`group glass overflow-hidden rounded-sm cursor-pointer ${
        featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4 }}
      data-gsap-reveal
    >
      <div className={`relative overflow-hidden ${featured ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes={featured ? "800px" : "400px"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <span className="absolute top-4 left-4 rounded-sm bg-neon/20 px-3 py-1 text-[10px] tracking-[0.2em] text-neon uppercase backdrop-blur-sm">
          {item.category}
        </span>
      </div>
      <div className="p-6">
        <time className="text-xs tracking-wider text-muted">{item.date}</time>
        <h3
          className={`mt-2 font-display font-semibold tracking-wide text-white group-hover:text-ice transition-colors ${
            featured ? "text-2xl" : "text-lg"
          }`}
        >
          {item.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-2">
          {item.excerpt}
        </p>
      </div>
    </motion.article>
  );
}
