"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { MegaMenuConfig } from "@/lib/data/megaMenu";

interface NavMegaItemProps {
  menu: MegaMenuConfig;
  isActive: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export default function NavMegaItem({
  menu,
  isActive,
  isOpen,
  onOpen,
  onClose,
}: NavMegaItemProps) {
  return (
    <li
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <Link
        href={menu.href}
        className={cn(
          "relative flex items-center gap-1.5 px-3 py-2 text-xs font-semibold tracking-[0.15em] uppercase transition-all duration-300",
          isOpen || isActive
            ? "bg-neon/10 text-neon"
            : "text-ice/70 hover:bg-white/5 hover:text-white"
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {menu.label}
        <svg
          className={cn(
            "h-3 w-3 transition-transform duration-300",
            isOpen && "rotate-180"
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        {(isOpen || isActive) && (
          <span className="absolute bottom-0 left-3 right-3 h-px bg-neon" />
        )}
      </Link>
    </li>
  );
}
