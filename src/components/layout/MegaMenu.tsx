"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { MegaMenuConfig } from "@/lib/data/megaMenu";
import { cn } from "@/lib/utils";

interface MegaMenuProps {
  menu: MegaMenuConfig;
  isOpen: boolean;
}

function MegaMenuLink({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 py-2.5 text-sm font-semibold tracking-wide text-ice/80 transition-colors duration-300 hover:text-white"
    >
      <span
        className="text-[10px] text-neon/60 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-neon"
        aria-hidden
      >
        ▸
      </span>
      <span className="relative">
        {label}
        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-neon transition-all duration-300 group-hover:w-full" />
      </span>
    </Link>
  );
}

export default function MegaMenu({ menu, isOpen }: MegaMenuProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative w-full border-t border-ice/10",
        "bg-gradient-to-b from-black/98 via-navy-light/98 to-black/95",
        "backdrop-blur-2xl shadow-2xl shadow-black/60"
      )}
    >
      <div className="absolute inset-0 cinematic-gradient pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(74,144,226,0.1),transparent_60%)] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-12">
        <div className="grid gap-10 md:grid-cols-2 md:gap-0">
          {menu.columns.map((column, colIndex) => (
            <div
              key={colIndex}
              className={cn(
                "md:px-10",
                colIndex === 0 && "md:border-r md:border-ice/15"
              )}
            >
              <ul className="space-y-0.5">
                {column.items.map((item) => (
                  <li key={item.href + item.label}>
                    <MegaMenuLink label={item.label} href={item.href} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end border-t border-ice/10 pt-6">
          <Link
            href={menu.href}
            className="text-xs font-semibold tracking-[0.2em] text-neon uppercase transition-colors hover:text-white"
          >
            View All {menu.label} →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
