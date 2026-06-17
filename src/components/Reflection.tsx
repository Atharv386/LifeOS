"use client";

import React, { useState } from "react";
import Card from "./ui/Card";
import { Sparkles, RefreshCw, AlertCircle } from "lucide-react";

interface Prompt {
  id: string;
  icon: React.ReactNode;
  question: string;
  answer: string;
  iconColor: string;
}

const PROMPTS: Prompt[] = [
  {
    id: "p1",
    icon: <Sparkles className="h-4 w-4" />,
    iconColor: "text-amber-400",
    question: "What mattered this week?",
    answer: "Seeing the design take physical shape without rushing. The long walk on Tuesday afternoon when the code structure finally clicked. Realizing that rest is not a reward, but a prerequisite.",
  },
  {
    id: "p2",
    icon: <RefreshCw className="h-4 w-4" />,
    iconColor: "text-accent-green",
    question: "What would you repeat?",
    answer: "Closing the browser tabs by 9 PM and picking up a physical book. Single-tasking on complex systems during the morning. Leaving my phone in another room during creative windows.",
  },
  {
    id: "p3",
    icon: <AlertCircle className="h-4 w-4" />,
    iconColor: "text-accent",
    question: "Where was focus lost?",
    answer: "Letting notifications dictate my priorities in the early afternoon energy slumps. Resolving low-priority emails first, which drained my decision-making batteries before writing core systems.",
  }
];

export default function Reflection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="reflection" className="relative z-10 bg-brand-bg py-32 px-4 md:px-8">
      {/* Subtle ambient light */}
      <div 
        className="absolute bottom-1/4 left-1/3 -z-10 h-80 w-80 rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" 
        aria-hidden="true"
      />

      <div className="mx-auto max-w-5xl">
        
        {/* Section Header */}
        <div className="mb-20 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Introspective Reflection
          </span>
          <h2 className="mt-4 font-serif text-4xl font-light italic tracking-tight text-white md:text-6xl">
            {"\"The unexamined week quietly repeats itself.\""}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-brand-textMuted md:text-base">
            Reflection is not an administrative chore. It is a moment of pause to look back on what worked, what drained you, and how to reset.
          </p>
        </div>

        {/* Interaction grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PROMPTS.map((prompt) => {
            const isHovered = hoveredId === prompt.id;
            return (
              <div
                key={prompt.id}
                onMouseEnter={() => setHoveredId(prompt.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative h-full"
              >
                <Card 
                  className={`flex h-[320px] flex-col justify-between p-6 border-white/[0.03] transition-all duration-500 bg-brand-card/30 ${
                    hoveredId && !isHovered ? "opacity-30 scale-[0.98] blur-[1px]" : "opacity-100 scale-100"
                  }`}
                  glowColor="rgba(255,255,255,0.02)"
                >
                  <div>
                    {/* Icon and tag */}
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 border border-white/5 ${prompt.iconColor}`}>
                      {prompt.icon}
                    </div>

                    <h3 className="mt-6 text-lg font-semibold tracking-tight text-white md:text-xl">
                      {prompt.question}
                    </h3>
                  </div>

                  {/* Sample answer placeholder - fades in detail on hover/focus */}
                  <div className="mt-6 border-t border-white/[0.04] pt-4">
                    <p className={`text-xs leading-relaxed text-brand-textMuted italic transition-colors duration-300 ${
                      isHovered ? "text-neutral-200" : "text-neutral-500"
                    }`}>
                      {"\""}{prompt.answer}{"\""}
                    </p>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Micro-hint */}
        <div className="mt-12 text-center text-[10px] uppercase tracking-[0.15em] text-neutral-600">
          Hover over prompts to read reflections
        </div>

      </div>
    </section>
  );
}
