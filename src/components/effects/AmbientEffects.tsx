"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { onIdle, shouldUseLightMode } from "@/lib/performance";

const ParticleBackground = dynamic(() => import("@/components/effects/ParticleBackground"), {
  ssr: false,
});

const MouseGlow = dynamic(() => import("@/components/effects/MouseGlow"), {
  ssr: false,
});

export default function AmbientEffects() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (shouldUseLightMode()) return;

    const cancel = onIdle(() => setEnabled(true), 2500);
    return cancel;
  }, []);

  if (!enabled) return null;

  return (
    <>
      <ParticleBackground />
      <MouseGlow />
    </>
  );
}
