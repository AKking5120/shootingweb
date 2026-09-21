"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { navLinks } from "@/data/site";
import { cn } from "@/lib/utils";

interface NavbarProps {
  solid?: boolean;
}

export function Navbar({ solid = false }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isSolid = solid || pathname !== "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
      document.body.dataset.scrollY = String(scrollY);
    } else {
      const scrollY = Number(document.body.dataset.scrollY || 0);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      delete document.body.dataset.scrollY;
      window.scrollTo(0, scrollY);
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const showSolid = isSolid || scrolled;

  const closeMenu = () => setMobileOpen(false);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          showSolid || mobileOpen
            ? "border-b border-border bg-background/95 py-3 backdrop-blur-xl"
            : "bg-transparent py-5"
        )}
      >
        <div className="mx-auto flex max-w-content items-center justify-between px-6 lg:px-8">
          <Logo />

          <nav
            className="hidden items-center gap-6 lg:flex xl:gap-8"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-white",
                  pathname === link.href ? "text-white" : "text-muted"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button
              href="/#contact"
              variant="outline"
              className="!px-5 !py-2.5 !text-sm"
            >
              Get Started →
            </Button>
          </div>

          <button
            type="button"
            className="relative z-[110] flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-white lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span className="relative flex h-4 w-5 flex-col items-center justify-between">
              <span
                className={cn(
                  "block h-[2px] w-full rounded-full bg-white transition-all duration-300",
                  mobileOpen && "translate-y-[7px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "block h-[2px] w-full rounded-full bg-white transition-all duration-300",
                  mobileOpen && "opacity-0 scale-x-0"
                )}
              />
              <span
                className={cn(
                  "block h-[2px] w-full rounded-full bg-white transition-all duration-300",
                  mobileOpen && "-translate-y-[7px] -rotate-45"
                )}
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-background lg:hidden"
            onClick={closeMenu}
          >
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute inset-0 flex h-full flex-col overflow-y-auto overscroll-contain bg-background px-8 pb-10 pt-24"
              aria-label="Mobile navigation"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 -mx-8 mb-4 flex items-center justify-end bg-background px-8 pb-4 pt-2">
                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close menu"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface-elevated text-white transition-colors hover:border-accent-blue hover:bg-accent-blue/10"
                >
                  <X size={22} strokeWidth={2} />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className="block py-1 text-2xl font-semibold text-white"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <Link
                href="/#contact"
                onClick={closeMenu}
                className="mt-10 inline-flex w-fit items-center justify-center rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-semibold text-white shadow-[0_4px_24px_rgba(59,130,246,0.35)]"
              >
                Get Started →
              </Link>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
