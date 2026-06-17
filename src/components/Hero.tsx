"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import MagneticButton from "./ui/MagneticButton";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  // Split the headline into chunks for staggered reveals
  const words = [
    { text: "The", serif: false },
    { text: "operating", serif: false },
    { text: "system", serif: false },
    { text: "for", serif: false },
    { text: "ambitious", serif: true },
    { text: "lives.", serif: true },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const customEase = [0.16, 1, 0.3, 1] as any;

  const wordVariants = {
    hidden: { y: 40, opacity: 0, filter: "blur(8px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: customEase,
      },
    },
  };

  const subVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 1.0,
        ease: customEase,
      },
    },
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 1.2,
        ease: customEase,
      },
    },
  };

  const scrollIndicatorVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.4,
      transition: {
        delay: 1.6,
        duration: 1,
      },
    },
  };

  const [joined, setJoined] = useState(false);

  const handleJoinClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setJoined(true);
  };

  return (
    <section className="relative flex h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-brand-bg px-4">
      {/* Cinematic Glowing Background */}
      <div 
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_800px_at_50%_50%,rgba(255,93,34,0.06)_0%,transparent_85%)]" 
        aria-hidden="true"
      />
      <div 
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_1200px_at_50%_-20%,rgba(255,255,255,0.025)_0%,transparent_70%)]" 
        aria-hidden="true"
      />

      <div className="z-10 flex max-w-5xl flex-col items-center text-center">
        {/* Animated Headline */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl font-bold tracking-[-0.04em] text-white sm:text-6xl md:text-8xl"
        >
          <span className="flex flex-wrap justify-center gap-x-[0.2em] gap-y-[0.1em]">
            {words.map((word, index) => (
              <motion.span
                key={index}
                variants={wordVariants}
                className={
                  word.serif
                    ? "font-serif font-normal italic tracking-wide text-neutral-100"
                    : "font-sans font-medium text-neutral-300"
                }
              >
                {word.text}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={subVariants}
          initial="hidden"
          animate="visible"
          className="mt-8 max-w-xl text-base tracking-tight text-brand-textMuted sm:text-lg md:text-xl"
        >
          Goals. Focus. Energy. Reflection. Decisions.
          <br className="sm:hidden" />
          <span className="text-neutral-400"> Finally working together.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={ctaVariants}
          initial="hidden"
          animate="visible"
          className="mt-12 flex flex-col items-center gap-6 sm:flex-row sm:gap-8"
        >
          <MagneticButton
            onClick={handleJoinClick}
            className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black shadow-[0_10px_30px_rgba(255,255,255,0.05)] hover:bg-neutral-200 transition-colors"
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
          <a
            href="#philosophy"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#philosophy")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group flex items-center gap-1.5 text-sm font-semibold text-brand-textMuted transition-colors hover:text-white"
          >
            See the philosophy
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        variants={scrollIndicatorVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-10 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
          Scroll
        </span>
        <div className="relative h-12 w-[1px] bg-neutral-800 overflow-hidden">
          <motion.div
            animate={{
              y: ["-100%", "100%"],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-0 left-0 h-1/2 w-full bg-accent"
          />
        </div>
      </motion.div>
    </section>
  );
}
