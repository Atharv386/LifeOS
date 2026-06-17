"use client";

import React from "react";
import { motion } from "framer-motion";

interface Principle {
  num: string;
  title: string;
  desc: string;
}

const PRINCIPLES: Principle[] = [
  {
    num: "01",
    title: "Clarity over complexity.",
    desc: "If a system requires its own course to configure, it is creating friction, not alignment. LifeOS is ready instantly, removing clutter so you can think.",
  },
  {
    num: "02",
    title: "Sustainability over intensity.",
    desc: "Ambitious lives are marathons. We prioritize continuous, calm progress over hyper-optimized sprints that inevitably end in burnouts.",
  },
  {
    num: "03",
    title: "Reflection over reaction.",
    desc: "A life lived purely in notifications is reactive. We build systems that encourage intentional pauses, helping you choose where attention goes.",
  },
  {
    num: "04",
    title: "Systems that adapt to people.",
    desc: "You are a human being, not a processing unit. If you are exhausted, your calendar should tell you to recover, not demand more output.",
  }
];

export default function Philosophy() {
  return (
    <section id="philosophy" className="relative z-10 bg-brand-bg py-36 px-4 md:px-8">
      <div className="mx-auto max-w-5xl">
        
        {/* Large Editorial Headline */}
        <div className="max-w-3xl mb-24">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            The Philosophy
          </span>
          <h2 className="mt-6 font-serif text-5xl font-light leading-[1.15] text-white md:text-7xl">
            A system designed to respect the way <span className="italic">humans</span> actually live.
          </h2>
        </div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
          {PRINCIPLES.map((principle, idx) => (
            <motion.div
              key={principle.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col border-t border-white/[0.06] pt-8"
            >
              <span className="font-serif text-lg italic text-accent font-light">
                {principle.num}
              </span>
              <h3 className="mt-4 text-xl font-semibold tracking-tight text-white md:text-2xl">
                {principle.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-brand-textMuted md:text-base">
                {principle.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
