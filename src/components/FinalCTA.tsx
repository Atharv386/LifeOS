"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import MagneticButton from "./ui/MagneticButton";
import { ArrowUpRight } from "lucide-react";

export default function FinalCTA() {
  const [joined, setJoined] = useState(false);

  const handleJoinClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setJoined(true);
  };

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative z-15 bg-brand-bg px-4 py-28 md:px-8 border-t border-white/[0.03]">
      {/* Background ambient lighting */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 -z-10 h-[500px] w-full max-w-[800px] bg-[radial-gradient(circle_at_bottom,rgba(255,93,34,0.06)_0%,transparent_70%)]" 
        aria-hidden="true"
      />

      <div className="mx-auto max-w-5xl flex flex-col items-center justify-between min-h-[50vh]">
        
        {/* Core CTA Block */}
        <div className="flex flex-col items-center text-center my-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl font-bold tracking-[-0.04em] text-white sm:text-7xl md:text-9xl"
          >
            Build deliberately.
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-8 max-w-xl text-sm leading-relaxed text-brand-textMuted md:text-base"
          >
            LifeOS is a concept exploring what happens when technology respects the way humans actually live. A study in focus, energy, and judgment.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-12"
          >
            <MagneticButton 
              onClick={handleJoinClick}
              className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black hover:bg-neutral-200 transition-colors shadow-[0_15px_40px_rgba(255,93,34,0.1)]"
            >
              <motion.span
                key={joined ? "joined" : "join"}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {joined ? "Added to waitlist ✓" : "Join the waitlist"}
              </motion.span>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Footer info */}
        <div className="w-full mt-24 border-t border-white/[0.04] pt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between text-xs text-neutral-500">
          <div>
            <span className="font-bold text-neutral-400">LifeOS</span>
            <span className="ml-2">2026. Made with absolute care.</span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="#philosophy" className="hover:text-white transition-colors">Philosophy</a>
            <a href="#focus" className="hover:text-white transition-colors">Focus</a>
            <a href="#decisions" className="hover:text-white transition-colors">Decisions</a>
            <a href="https://github.com/Atharv386/LifeOS" target="_blank" rel="noreferrer" className="flex items-center gap-0.5 hover:text-white transition-colors">
              Repository <ArrowUpRight className="h-3 w-3" />
            </a>
            <a href="#" onClick={handleScrollToTop} className="hover:text-white transition-colors">Back to top</a>
          </div>
        </div>

      </div>
    </section>
  );
}
