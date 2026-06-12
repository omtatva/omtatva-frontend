"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import MagneticButton from "@/components/ui/MagneticButton";
import HeroLiquidTitle from "@/components/sections/HeroLiquidTitle";
import { videoMimeType } from "@/lib/media";
import { shouldPlayHeroVideo, shouldUseLightMode } from "@/lib/performance";
import type { HeroSection } from "@/lib/cms/types";

interface HeroCinemaProps {
  hero: HeroSection;
}

export default function HeroCinema({ hero }: HeroCinemaProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playVideo, setPlayVideo] = useState(Boolean(hero.video));
  const [useLiquidTitle, setUseLiquidTitle] = useState(false);
  const [overlayStyle, setOverlayStyle] = useState<CSSProperties | null>(null);

  const onOverlayStyle = useCallback((style: CSSProperties | null) => {
    setOverlayStyle(style);
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia("(max-width: 768px)");

    const onChange = () => {
      const hasVideo = Boolean(hero.video);
      const canPlay = hasVideo && shouldPlayHeroVideo();
      setPlayVideo(canPlay);
      setUseLiquidTitle(canPlay && !shouldUseLightMode());
    };

    onChange();
    reduceMotion.addEventListener("change", onChange);
    narrow.addEventListener("change", onChange);
    return () => {
      reduceMotion.removeEventListener("change", onChange);
      narrow.removeEventListener("change", onChange);
    };
  }, [hero.video]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !playVideo) return;

    const tryPlay = () => {
      void el.play().catch(() => {});
    };

    tryPlay();
    el.addEventListener("canplay", tryPlay);
    return () => el.removeEventListener("canplay", tryPlay);
  }, [playVideo, hero.video]);

  const showVideo = playVideo && Boolean(hero.video);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-svh min-h-[520px] w-full items-center justify-center overflow-hidden film-grain"
    >
      <div className="absolute inset-0 z-0" data-hero-bg>
        {showVideo ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={hero.image}
          >
            <source src={hero.video} type={videoMimeType(hero.video!)} />
          </video>
        ) : (
          <Image
            src={hero.image}
            alt=""
            fill
            priority
            fetchPriority="high"
            className="object-cover"
            sizes="100vw"
          />
        )}
        {!useLiquidTitle && <div className="absolute inset-0 hero-overlay opacity-90" />}
        {useLiquidTitle && overlayStyle !== null && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 hero-overlay opacity-90"
            style={overlayStyle}
          />
        )}
        <div className="absolute inset-0 cinematic-gradient" />
        <div className="absolute inset-0 cinematic-vignette" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pt-32 pb-24 text-center">
        <p className="hero-fade-in mb-6 text-xs font-semibold tracking-[0.4em] text-neon uppercase">
          {hero.eyebrow}
        </p>

        {useLiquidTitle ? (
          <HeroLiquidTitle
            title={hero.title}
            sectionRef={sectionRef}
            onOverlayStyle={onOverlayStyle}
            className="hero-fade-in-delay-1"
          />
        ) : (
          <h1 className="hero-fade-in-delay-1 font-display text-4xl font-bold leading-[1.1] tracking-wide text-white glow-text sm:text-5xl md:text-7xl lg:text-8xl">
            {hero.title}
          </h1>
        )}

        <p className="hero-fade-in-delay-2 mx-auto mt-8 max-w-2xl text-base font-semibold leading-relaxed text-ice/80 md:text-lg">
          {hero.subtitle}
        </p>

        <div className="hero-fade-in-delay-3 mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <MagneticButton href={hero.primaryCta.href} variant="primary">
            {hero.primaryCta.label}
          </MagneticButton>
          <MagneticButton href={hero.secondaryCta.href} variant="outline">
            {hero.secondaryCta.label}
          </MagneticButton>
        </div>
      </div>

      <div
        className="hero-fade-in-delay-4 absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
        aria-hidden
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.3em] text-muted uppercase">
            {hero.scrollLabel}
          </span>
          <span className="hero-scroll-line h-10 w-px bg-gradient-to-b from-neon to-transparent" />
        </div>
      </div>
    </section>
  );
}
