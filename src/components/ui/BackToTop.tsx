"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { getScrollY, scrollToTop, subscribeScroll } from "@/lib/scroll";

const SHOW_AFTER_PX = 480;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(getScrollY() > SHOW_AFTER_PX);
    onScroll();
    const unsubLenis = subscribeScroll(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      unsubLenis();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={scrollToTop}
      className={cn(
        "fixed right-4 bottom-4 z-40 flex h-11 w-11 items-center justify-center rounded-sm border border-ice/20 bg-black/70 text-ice backdrop-blur-md transition-all duration-500 hover:border-neon/50 hover:text-white hover:shadow-[0_0_24px_var(--neon-glow)] md:right-6 md:bottom-6",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      )}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M12 19V5" />
        <path d="m5 12 7-7 7 7" />
      </svg>
    </button>
  );
}
