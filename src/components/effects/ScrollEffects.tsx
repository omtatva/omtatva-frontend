"use client";

import { useEffect } from "react";
import { onIdle, shouldUseLightMode } from "@/lib/performance";
import { setSmoothScroller } from "@/lib/scroll";

export default function ScrollEffects({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (shouldUseLightMode()) return;

    let cancelled = false;
    let cleanupLenis: (() => void) | null = null;
    let revertGsap: (() => void) | null = null;

    const cancelIdle = onIdle(async () => {
      if (cancelled) return;

      const [{ default: Lenis }, gsapModule] = await Promise.all([
        import("lenis"),
        import("gsap"),
      ]);

      if (cancelled) return;

      const gsap = gsapModule.default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.1,
        smoothWheel: true,
        touchMultiplier: 1.5,
      });

      lenis.on("scroll", ScrollTrigger.update);

      const onTick = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);

      document.documentElement.classList.add("lenis-ready");
      setSmoothScroller(lenis);

      const ctx = gsap.context(() => {
        ScrollTrigger.batch("[data-gsap-reveal]", {
          start: "top 88%",
          once: true,
          onEnter: (batch) =>
            gsap.fromTo(
              batch,
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                duration: 0.85,
                stagger: 0.06,
                ease: "power3.out",
                overwrite: "auto",
              }
            ),
        });
      });

      revertGsap = () => ctx.revert();
      ScrollTrigger.refresh();

      cleanupLenis = () => {
        gsap.ticker.remove(onTick);
        setSmoothScroller(null);
        lenis.destroy();
        document.documentElement.classList.remove("lenis-ready");
      };

      if (cancelled) {
        revertGsap?.();
        cleanupLenis?.();
      }
    }, 1200);

    return () => {
      cancelled = true;
      cancelIdle();
      revertGsap?.();
      cleanupLenis?.();
    };
  }, []);

  return <>{children}</>;
}
