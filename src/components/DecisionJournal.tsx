"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronRight } from "lucide-react";
import Card from "./ui/Card";
import RadialProgress from "./ui/RadialProgress";

interface Decision {
  id: string;
  date: string;
  title: string;
  category: string;
  confidence: number;
  context: string;
  expected: string;
  actual: string;
  lessons: string;
}

const DECISIONS: Decision[] = [
  {
    id: "d1",
    date: "January 2026",
    title: "Career Pivot: Building LifeOS",
    category: "Career",
    confidence: 92,
    context: "Felt burnt out by standard hyper-efficiency software. Wanted to build tools prioritizing attention and sanity over pure output.",
    expected: "Create a showcase of organic computing that resonates with creators and thinkers.",
    actual: "A profound sense of design ownership and deep creative satisfaction. Massive positive response from early builders.",
    lessons: "Follow curiosity and aesthetic alignment. When you build with deep restraint, the right people find you."
  },
  {
    id: "d2",
    date: "March 2026",
    title: "Relocation to the Quiet Coast",
    category: "Environment",
    confidence: 78,
    context: "City noise was fragmenting attention spans. Needed environment aligned with deep creative focus.",
    expected: "Fewer distractions, slower rhythms, increased capacity for reading and writing.",
    actual: "Improved focus windows, stress levels down 40%, but occasional feeling of isolation from local peer circles.",
    lessons: "Isolation is a double-edged sword. Leverage the quiet for deep work, but schedule intentional travels."
  },
  {
    id: "d3",
    date: "May 2026",
    title: "Hiring a Dedicated Design Lead",
    category: "Operations",
    confidence: 85,
    context: "The showcase design required pixel-perfect, sensory micro-interactions that exceeded my time capacity.",
    expected: "Elevated frontend artistry and cohesive brand storytelling.",
    actual: "A breathtaking product film feel, allowing me to focus on performant engineering and core details.",
    lessons: "Hire for taste first, then speed. Collaborative chemistry on visual details cannot be micromanaged."
  }
];

export default function DecisionJournal() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="decisions" className="relative z-10 bg-brand-bg py-32 px-4 md:px-8">
      {/* Glow highlight */}
      <div 
        className="absolute top-1/2 left-1/4 -z-10 h-96 w-96 rounded-full bg-accent/5 blur-[120px] pointer-events-none" 
        aria-hidden="true"
      />

      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            The Decision Journal
          </span>
          <h2 className="mt-4 font-serif text-4xl font-light italic tracking-tight text-white md:text-6xl">
            {"\"Good judgment isn't born. It's remembered.\""}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-brand-textMuted md:text-base">
            LifeOS treats decisions as experiments. By tracking confidence, expectations, and outcomes, you build an archive of your own judgment.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l border-white/[0.06] pl-6 md:pl-10 md:ml-12 space-y-12">
          
          {DECISIONS.map((dec, idx) => {
            const isExpanded = expandedId === dec.id;
            return (
              <motion.div 
                key={dec.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative"
              >
                {/* Timeline node dot */}
                <div className="absolute -left-[31px] md:-left-[47px] top-4 flex h-4 w-4 items-center justify-center rounded-full bg-brand-bg border border-accent">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                </div>

                {/* Date stamp */}
                <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-neutral-500 mb-2">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{dec.date}</span>
                  <span className="h-1 w-1 rounded-full bg-neutral-800" />
                  <span className="text-accent">{dec.category}</span>
                </div>

                {/* Expandable Decision Card */}
                <Card 
                  onClick={() => toggleExpand(dec.id)}
                  className={`cursor-pointer border-white/[0.04] p-6 transition-all duration-300 hover:border-white/[0.1] ${
                    isExpanded ? "border-accent/30 bg-brand-card/60 shadow-[0_15px_40px_rgba(0,0,0,0.4)]" : ""
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight text-white md:text-xl">
                        {dec.title}
                      </h3>
                      <p className="mt-1.5 text-xs text-brand-textMuted line-clamp-1">
                        {dec.context}
                      </p>
                    </div>
                    
                    {/* Confidence Radial Progress */}
                    <div className="shrink-0 flex items-center gap-4">
                      <div className="text-right hidden sm:block">
                        <span className="text-[10px] uppercase tracking-wider text-neutral-500 block">
                          Confidence
                        </span>
                        <span className="text-[10px] text-neutral-400">At Decision</span>
                      </div>
                      <RadialProgress value={dec.confidence} />
                    </div>
                  </div>

                  {/* Expanded detail section using Framer Motion */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-6 border-t border-white/5 pt-6 space-y-4">
                          
                          {/* Context info */}
                          <div>
                            <span className="text-[10px] uppercase tracking-widest text-neutral-500 block font-medium mb-1">
                              Context & Motivation
                            </span>
                            <p className="text-xs text-neutral-300 leading-relaxed">
                              {dec.context}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {/* Expected */}
                            <div className="rounded-xl border border-white/[0.02] bg-black/20 p-3.5">
                              <span className="text-[10px] uppercase tracking-widest text-amber-400/80 block font-medium mb-1">
                                Expected Outcome
                              </span>
                              <p className="text-xs text-neutral-300 leading-relaxed">
                                {dec.expected}
                              </p>
                            </div>

                            {/* Actual */}
                            <div className="rounded-xl border border-white/[0.02] bg-black/20 p-3.5">
                              <span className="text-[10px] uppercase tracking-widest text-emerald-400/80 block font-medium mb-1">
                                Actual Outcome
                              </span>
                              <p className="text-xs text-neutral-300 leading-relaxed">
                                {dec.actual}
                              </p>
                            </div>
                          </div>

                          {/* Lessons */}
                          <div className="rounded-xl border border-accent/10 bg-accent/5 p-4">
                            <span className="text-[10px] uppercase tracking-widest text-accent block font-medium mb-1">
                              Lessons Learned
                            </span>
                            <p className="text-xs italic text-neutral-200 leading-relaxed">
                              {"\""}{dec.lessons}{"\""}
                            </p>
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Card bottom toggle indicator */}
                  <div className="mt-4 flex items-center justify-between border-t border-white/[0.02] pt-4 text-[10px] text-neutral-500 font-medium">
                    <span>Click card to {isExpanded ? "collapse" : "expand details"}</span>
                    <motion.div
                      animate={{ rotate: isExpanded ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="h-3 w-3" />
                    </motion.div>
                  </div>

                </Card>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
