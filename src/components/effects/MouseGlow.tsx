"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function MouseGlow() {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);

    const onMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    document.body.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.body.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  if (!mounted || !visible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed z-[1] h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        left: position.x,
        top: position.y,
        background:
          "radial-gradient(circle, rgba(74,144,226,0.08) 0%, transparent 70%)",
      }}
      animate={{ left: position.x, top: position.y }}
      transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5 }}
      aria-hidden
    />
  );
}
