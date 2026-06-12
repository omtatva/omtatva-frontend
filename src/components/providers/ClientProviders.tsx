"use client";

import AmbientEffects from "@/components/effects/AmbientEffects";
import ScrollEffects from "@/components/effects/ScrollEffects";
import BackToTop from "@/components/ui/BackToTop";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScrollEffects>
      <AmbientEffects />
      {children}
      <BackToTop />
    </ScrollEffects>
  );
}
