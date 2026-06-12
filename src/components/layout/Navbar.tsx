"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/ui/Logo";
import MagneticButton from "@/components/ui/MagneticButton";
import NavMegaItem from "@/components/layout/NavMegaItem";
import MegaMenu from "@/components/layout/MegaMenu";
import type { MegaMenuConfig } from "@/lib/data/megaMenu";
import type { NavigationSettings } from "@/lib/cms/types";
import { cn } from "@/lib/utils";

interface NavbarProps {
  navigation: NavigationSettings;
}

export default function Navbar({ navigation }: NavbarProps) {
  const navLinks = navigation.links;
  const megaMenus = navigation.megaMenus;
  const studiosMenu = megaMenus.find((m) => m.label === "Studios");
  const aboutMenu = megaMenus.find((m) => m.label === "About");
  const SIMPLE_LINKS = navLinks.filter(
    (link) => link.label !== "Studios" && link.label !== "About"
  );
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [expandedMega, setExpandedMega] = useState<string | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setExpandedMega(null);
    setOpenMega(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isMegaActive = (label: string) => {
    if (label === "Studios") return pathname.startsWith("/studios");
    if (label === "About") return pathname.startsWith("/about");
    return false;
  };

  const handleMegaOpen = (label: string) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setOpenMega(label);
  };

  const handleMegaClose = () => {
    closeTimeoutRef.current = setTimeout(() => setOpenMega(null), 150);
  };

  const activeMegaMenu: MegaMenuConfig | null =
    openMega === "Studios"
      ? (studiosMenu ?? null)
      : openMega === "About"
        ? (aboutMenu ?? null)
        : null;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-50 transition-all duration-700",
          scrolled
            ? "glass-strong shadow-lg shadow-black/50"
            : "bg-transparent"
        )}
        onMouseLeave={handleMegaClose}
      >
        <nav
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8 transition-all duration-700",
            scrolled ? "py-3" : "py-5"
          )}
        >
          <Logo size="sm" />

          <ul className="hidden items-center gap-1 lg:flex">
            {SIMPLE_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative px-3 py-2 text-xs font-semibold tracking-[0.15em] uppercase transition-colors duration-300",
                    pathname === link.href
                      ? "text-neon"
                      : "text-ice/70 hover:text-white"
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-3 right-3 h-px bg-neon"
                    />
                  )}
                </Link>
              </li>
            ))}

            {studiosMenu && (
            <NavMegaItem
              menu={studiosMenu}
              isActive={isMegaActive("Studios")}
              isOpen={openMega === "Studios"}
              onOpen={() => handleMegaOpen("Studios")}
              onClose={handleMegaClose}
            />
            )}
            {aboutMenu && (
            <NavMegaItem
              menu={aboutMenu}
              isActive={isMegaActive("About")}
              isOpen={openMega === "About"}
              onOpen={() => handleMegaOpen("About")}
              onClose={handleMegaClose}
            />
            )}
          </ul>

          <div className="hidden lg:block">
            <MagneticButton href="/contact" variant="primary">
              Work With Us
            </MagneticButton>
          </div>

          <button
            type="button"
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              className={cn(
                "h-px w-6 bg-white transition-all duration-300",
                menuOpen && "translate-y-[7px] rotate-45"
              )}
            />
            <span
              className={cn(
                "h-px w-6 bg-white transition-all duration-300",
                menuOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "h-px w-6 bg-white transition-all duration-300",
                menuOpen && "-translate-y-[7px] -rotate-45"
              )}
            />
          </button>
        </nav>

        <AnimatePresence>
          {activeMegaMenu && (
            <div onMouseEnter={() => handleMegaOpen(activeMegaMenu.label)}>
              <MegaMenu menu={activeMegaMenu} isOpen />
            </div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto glass-strong pt-24 pb-12"
          >
            <ul className="mx-auto w-full max-w-lg px-6">
              {SIMPLE_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="border-b border-ice/10"
                >
                  <Link
                    href={link.href}
                    className="block py-4 font-display text-xl font-bold tracking-widest text-white uppercase hover:text-neon transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}

              {megaMenus.map((mega, mi) => (
                <motion.li
                  key={mega.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (SIMPLE_LINKS.length + mi) * 0.04 }}
                  className="border-b border-ice/10"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedMega(expandedMega === mega.label ? null : mega.label)
                    }
                    className="flex w-full items-center justify-between py-4 font-display text-xl font-bold tracking-widest text-white uppercase"
                    aria-expanded={expandedMega === mega.label}
                  >
                    {mega.label}
                    <svg
                      className={cn(
                        "h-4 w-4 text-neon transition-transform",
                        expandedMega === mega.label && "rotate-180"
                      )}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {expandedMega === mega.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pb-4"
                      >
                        <div className="grid gap-6 rounded-sm border border-white/10 bg-navy-light/80 p-4 sm:grid-cols-2">
                          {mega.columns.map((col, ci) => (
                            <ul key={ci} className="space-y-2">
                              {col.items.map((item) => (
                                <li key={item.href + item.label}>
                                  <Link
                                    href={item.href}
                                    className="flex items-center gap-2 text-sm text-ice/70 transition-colors hover:text-neon"
                                    onClick={() => setMenuOpen(false)}
                                  >
                                    <span className="text-[10px] text-neon/60">▸</span>
                                    {item.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          ))}
                        </div>
                        <Link
                          href={mega.href}
                          className="mt-3 inline-block text-xs tracking-[0.2em] text-neon uppercase"
                          onClick={() => setMenuOpen(false)}
                        >
                          View All {mega.label} →
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              ))}

              <motion.li
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: (SIMPLE_LINKS.length + megaMenus.length) * 0.04,
                }}
                className="pt-8"
              >
                <MagneticButton href="/contact" variant="primary">
                  Work With Us
                </MagneticButton>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
