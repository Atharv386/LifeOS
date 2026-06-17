"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import MagneticButton from "./ui/MagneticButton";

const NAV_ITEMS = [
  { label: "Focus", href: "#focus" },
  { label: "Decisions", href: "#decisions" },
  { label: "Energy", href: "#energy" },
  { label: "Reflection", href: "#reflection" },
  { label: "Philosophy", href: "#philosophy" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [joined, setJoined] = useState(false);

  const handleJoinClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setJoined(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-40 flex justify-center px-4 transition-all duration-500">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`flex w-full items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled
              ? "mt-4 max-w-xl md:max-w-2xl rounded-full border border-white/[0.08] bg-[#0b0b0d]/70 px-4 py-2 shadow-2xl backdrop-blur-xl md:px-6"
              : "mt-6 max-w-4xl rounded-2xl border border-white/[0.03] bg-transparent px-6 py-4"
          }`}
        >
          {/* Logo */}
          <a
            href="#"
            className="text-lg font-bold tracking-tight text-white transition-opacity hover:opacity-80"
          >
            LifeOS
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item, idx) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="relative rounded-full px-3 py-1.5 text-sm font-medium tracking-tight text-[#8e8e93] transition-colors duration-200 hover:text-white"
              >
                {hoveredIdx === idx && (
                  <motion.span
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white/[0.06] border border-white/[0.02]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </a>
            ))}
          </div>

          {/* Action Button */}
          <div className="hidden items-center md:flex">
            <MagneticButton 
              onClick={handleJoinClick}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20"
            >
              <motion.span
                key={joined ? "joined" : "join"}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {joined ? "Joined ✓" : "Join the waitlist"}
              </motion.span>
            </MagneticButton>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white md:hidden"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </motion.nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-[72px] z-30 mx-4 rounded-3xl border border-white/[0.08] bg-[#0b0b0d]/95 p-6 shadow-2xl backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="text-lg font-medium text-[#8e8e93] transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-2 h-px w-full bg-white/10" />
              <button
                onClick={(e) => {
                  handleJoinClick(e);
                  setTimeout(() => setMobileMenuOpen(false), 800);
                }}
                className="w-full rounded-xl bg-white px-4 py-3 text-center text-sm font-semibold text-black hover:bg-white/90"
              >
                {joined ? "Added to waitlist ✓" : "Join the waitlist"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
