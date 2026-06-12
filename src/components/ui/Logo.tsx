"use client";

import Image from "next/image";
import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  siteName?: string;
}

export default function Logo({ size = "md", siteName = SITE_NAME }: LogoProps) {
  const sizes = {
    sm: { w: 36, h: 36, text: "text-sm" },
    md: { w: 44, h: 44, text: "text-base" },
    lg: { w: 56, h: 56, text: "text-lg" },
  };

  const s = sizes[size];

  return (
    <Link href="/" className="group flex items-center gap-3">
      <Image
        src="/logo.svg"
        alt={siteName}
        width={s.w}
        height={s.h}
        className="rounded-sm object-contain transition-transform duration-500 group-hover:scale-105"
        priority
      />
      <div className="hidden flex-col sm:flex">
        <span
          className={`font-display font-bold tracking-[0.18em] text-white uppercase ${s.text}`}
        >
          Om Tatva
        </span>
        <span className="text-[10px] tracking-[0.35em] text-ice/60 uppercase">
          Digitals
        </span>
      </div>
    </Link>
  );
}
