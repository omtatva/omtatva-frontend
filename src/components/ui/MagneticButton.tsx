"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: (event: MouseEvent) => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "outline" | "ghost";
}

export default function MagneticButton({
  children,
  className,
  href,
  onClick,
  type = "button",
  variant = "primary",
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0, 0)";
  };

  const variants = {
    primary:
      "bg-neon/90 text-white hover:bg-neon glow-neon border border-neon/30",
    outline:
      "border border-ice/30 text-ice hover:border-neon hover:text-white bg-transparent",
    ghost: "text-ice/80 hover:text-white bg-transparent",
  };

  const baseClass = cn(
    "relative inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold tracking-widest uppercase transition-all duration-500 rounded-sm",
    variants[variant],
    className
  );

  const content = (
  <>
      <span className="relative z-10">{children}</span>
      {variant === "primary" && (
        <span className="absolute inset-0 rounded-sm bg-gradient-to-r from-neon/0 via-white/10 to-neon/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      )}
    </>
  );

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={cn(baseClass, "group")}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileTap={{ scale: 0.97 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      className={cn(baseClass, "group")}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
    >
      {content}
    </motion.button>
  );
}
