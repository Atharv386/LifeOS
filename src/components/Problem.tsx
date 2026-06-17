"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, CheckSquare, Edit3, Heart, Brain, Smile, CheckCircle } from "lucide-react";
import Card from "./ui/Card";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Problem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const card1 = useRef<HTMLDivElement>(null);
  const card2 = useRef<HTMLDivElement>(null);
  const card3 = useRef<HTMLDivElement>(null);
  const card4 = useRef<HTMLDivElement>(null);
  const card5 = useRef<HTMLDivElement>(null);
  const card6 = useRef<HTMLDivElement>(null);
  const unifiedCard = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = [card1.current, card2.current, card3.current, card4.current, card5.current, card6.current];
      
      // Initial state offsets for scattered cards
      const offsets = [
        { x: -160, y: -180, rotate: -8 },  // Calendar
        { x: 180, y: -150, rotate: 6 },   // Notes
        { x: -220, y: 30, rotate: -5 },    // To-Do
        { x: 220, y: 60, rotate: 8 },     // Journal
        { x: -120, y: 200, rotate: 12 },   // Habits
        { x: 120, y: 190, rotate: -10 },   // Mental Clutter
      ];

      // Set initial positions
      cards.forEach((card, idx) => {
        if (card) {
          gsap.set(card, {
            x: offsets[idx].x,
            y: offsets[idx].y,
            rotation: offsets[idx].rotate,
            opacity: 1,
            scale: 0.95,
          });
        }
      });

      gsap.set(unifiedCard.current, {
        scale: 0.85,
        opacity: 0,
        y: 50,
        filter: "blur(10px)",
      });

      // Master Scroll Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=180%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // 1. Staged parallax drift outwards
      tl.to(cards, {
        x: (i) => offsets[i].x * 1.35,
        y: (i) => offsets[i].y * 1.35,
        rotation: (i) => offsets[i].rotate * 1.5,
        duration: 1,
        ease: "power1.out",
      })
      // 2. Converge in center and fade out
      .to(cards, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 0.8,
        opacity: 0,
        filter: "blur(8px)",
        duration: 1.2,
        ease: "power2.inOut",
      }, "+=0.2")
      // 3. Reveal Unified LifeOS Card
      .to(unifiedCard.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.out",
      }, "-=0.6");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative z-10 bg-brand-bg">
      <div ref={triggerRef} className="flex h-screen w-full flex-col justify-center overflow-hidden py-20 px-4 md:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-12 md:flex-row">
          
          {/* Text Description */}
          <div className="max-w-md text-left md:sticky">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              The Fragmentation Problem
            </span>
            <h2 
              ref={headlineRef} 
              className="mt-4 text-3xl font-bold tracking-tight text-white md:text-5xl"
            >
              Your life was never meant to live in separate tabs.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-brand-textMuted md:text-base">
              We split our minds across a dozen tools. Notes in one app, deadlines in another, reflections scattered, energy ignored. 
            </p>
            <p className="mt-4 text-sm leading-relaxed text-brand-textMuted md:text-base">
              LifeOS brings these dimensions into a single ecosystem. It is not about doing more. It is about feeling unified.
            </p>
          </div>

          {/* Interactive Cards Container */}
          <div className="relative flex h-[480px] w-full max-w-[500px] items-center justify-center">
            
            {/* 1. Calendar Card */}
            <div ref={card1} className="absolute z-10 w-[210px]">
              <Card className="border-blue-500/10 p-4" glowColor="rgba(59, 130, 246, 0.05)">
                <div className="flex items-center gap-2 text-blue-400">
                  <Calendar className="h-4 w-4" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Calendar</span>
                </div>
                <p className="mt-2 text-xs font-semibold text-white">Project Sync</p>
                <p className="text-[10px] text-neutral-500">14:00 - 15:30</p>
              </Card>
            </div>

            {/* 2. Notes Card */}
            <div ref={card2} className="absolute z-10 w-[180px]">
              <Card className="border-amber-500/10 p-4" glowColor="rgba(245, 158, 11, 0.05)">
                <div className="flex items-center gap-2 text-amber-400">
                  <Edit3 className="h-4 w-4" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Scratchpad</span>
                </div>
                <p className="mt-2 text-[10px] italic text-neutral-400">
                  {"\"Idea: Write essay on digital sustainability...\""}
                </p>
              </Card>
            </div>

            {/* 3. To-Do Card */}
            <div ref={card3} className="absolute z-10 w-[190px]">
              <Card className="border-red-500/10 p-4" glowColor="rgba(239, 68, 68, 0.05)">
                <div className="flex items-center gap-2 text-red-400">
                  <CheckSquare className="h-4 w-4" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Tasks</span>
                </div>
                <ul className="mt-2 space-y-1 text-[10px]">
                  <li className="flex items-center gap-1.5 text-neutral-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-neutral-600" />
                    Review contract
                  </li>
                  <li className="flex items-center gap-1.5 text-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    Deploy build v1
                  </li>
                </ul>
              </Card>
            </div>

            {/* 4. Journal Card */}
            <div ref={card4} className="absolute z-10 w-[200px]">
              <Card className="border-purple-500/10 p-4" glowColor="rgba(168, 85, 247, 0.05)">
                <div className="flex items-center gap-2 text-purple-400">
                  <Brain className="h-4 w-4" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Reflections</span>
                </div>
                <p className="mt-1 text-[10px] leading-tight text-neutral-400">
                  What did I repeat? Acting out of impulse. Focus on pauses next week.
                </p>
              </Card>
            </div>

            {/* 5. Habits Card */}
            <div ref={card5} className="absolute z-10 w-[170px]">
              <Card className="border-emerald-500/10 p-4" glowColor="rgba(16, 185, 129, 0.05)">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Heart className="h-4 w-4" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Rhythms</span>
                </div>
                <div className="mt-2 flex gap-1">
                  <span className="h-3 w-3 rounded-sm bg-emerald-500/50" />
                  <span className="h-3 w-3 rounded-sm bg-emerald-500" />
                  <span className="h-3 w-3 rounded-sm bg-emerald-500" />
                  <span className="h-3 w-3 rounded-sm bg-neutral-800" />
                </div>
              </Card>
            </div>

            {/* 6. Mental Clutter Card */}
            <div ref={card6} className="absolute z-10 w-[190px]">
              <Card className="border-neutral-500/15 p-4" glowColor="rgba(255, 255, 255, 0.02)">
                <div className="flex items-center gap-2 text-neutral-400">
                  <Smile className="h-4 w-4" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Clutter</span>
                </div>
                <p className="mt-1 text-[10px] text-neutral-500">
                  Did I close the garage? Call mom. Taxes due Friday.
                </p>
              </Card>
            </div>

            {/* Unified LifeOS Card */}
            <div ref={unifiedCard} className="absolute z-20 w-[290px] md:w-[320px]">
              <Card 
                className="border-accent/20 bg-brand-card/70 p-6 shadow-[0_15px_50px_rgba(255,93,34,0.1)]" 
                glowColor="rgba(255, 93, 34, 0.12)"
              >
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex items-center gap-2 text-accent">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-sans font-bold tracking-tight text-white">LifeOS Core</span>
                  </div>
                  <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[9px] font-semibold text-accent">
                    Unified
                  </span>
                </div>
                
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-500">{"Today's Focus"}</span>
                    <span className="font-medium text-white">Deep Work (v1)</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-500">Energy Level</span>
                    <span className="font-medium text-emerald-400">92% (High)</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-500">Next Reflection</span>
                    <span className="font-medium text-white">In 2 days</span>
                  </div>
                </div>

                <div className="mt-6 flex justify-center border-t border-white/5 pt-4">
                  <span className="text-[10px] text-neutral-500">
                    All nodes synchronized.
                  </span>
                </div>
              </Card>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
