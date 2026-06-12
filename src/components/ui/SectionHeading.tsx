import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeadingProps) {
  // ScrollEffects' GSAP reveal writes inline transform/opacity onto [data-gsap-reveal]
  // nodes, which can fire before lazily-hydrated sections mount. suppressHydrationWarning
  // keeps that out-of-React DOM mutation from tripping a style hydration mismatch.
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center mx-auto max-w-3xl",
        className
      )}
      data-gsap-reveal
      suppressHydrationWarning
    >
      {label && (
        <p className="mb-3 text-xs font-bold tracking-[0.3em] uppercase text-neon">
          {label}
        </p>
      )}
      <h2 className="font-display text-3xl font-bold tracking-wide text-white md:text-5xl glow-text">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base font-medium leading-relaxed text-muted md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
