"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, Zap, FolderKanban, HelpCircle, FileText } from "lucide-react";
import Card from "./ui/Card";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Dashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  // Widget Refs for 3D layered explode effect
  const widgetFocus = useRef<HTMLDivElement>(null);
  const widgetEnergy = useRef<HTMLDivElement>(null);
  const widgetDecisions = useRef<HTMLDivElement>(null);
  const widgetProjects = useRef<HTMLDivElement>(null);
  const widgetReflection = useRef<HTMLDivElement>(null);
  const bgPlateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial 3D rotated states
      gsap.set(boardRef.current, {
        transformPerspective: 1200,
        rotationX: 22,
        rotationY: -12,
        rotationZ: 4,
        scale: 0.82,
        z: -100,
      });

      // Layered depth positions (exploded offsets)
      // They will start flush or slightly exploded and animate based on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      tl.to(boardRef.current, {
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        scale: 1,
        z: 0,
        duration: 1,
        ease: "power2.out",
      })
      // Simultaneously explode widgets along their Z/Y axis for depth
      .to(widgetFocus.current, { z: 40, x: -15, y: -10, duration: 1, ease: "power2.out" }, 0)
      .to(widgetEnergy.current, { z: 50, x: 15, y: -15, duration: 1, ease: "power2.out" }, 0)
      .to(widgetDecisions.current, { z: 35, x: -20, y: 15, duration: 1, ease: "power2.out" }, 0)
      .to(widgetProjects.current, { z: 45, x: 20, y: 10, duration: 1, ease: "power2.out" }, 0)
      .to(widgetReflection.current, { z: 60, x: 0, y: 20, duration: 1, ease: "power2.out" }, 0)
      .to(bgPlateRef.current, { opacity: 0.9, duration: 1 }, 0);

      // Subtle mouse movement reactivity
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const width = window.innerWidth;
        const height = window.innerHeight;
        const xVal = (clientX - width / 2) / (width / 2); // -1 to 1
        const yVal = (clientY - height / 2) / (height / 2); // -1 to 1

        // Apply dynamic shift on hover
        gsap.to(boardRef.current, {
          rotationY: xVal * 6,
          rotationX: -yVal * 6,
          duration: 1.5,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative z-25 bg-[#0B0B0D]">
      <div ref={triggerRef} className="flex h-screen w-full flex-col items-center justify-center overflow-hidden py-16 px-4">
        
        {/* Intro Header */}
        <div className="mb-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Interactive Showcase
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-5xl">
            A calm workspace for your life.
          </h2>
        </div>

        {/* Dashboard 3D viewport */}
        <div className="relative flex h-[580px] w-full max-w-5xl items-center justify-center">
          
          {/* Main Board Container */}
          <div 
            ref={boardRef} 
            style={{ transformStyle: "preserve-3d" }}
            className="relative grid h-full w-full grid-cols-12 gap-4 rounded-3xl p-6 transition-shadow duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
          >
            
            {/* Background Plate */}
            <div 
              ref={bgPlateRef}
              style={{ transform: "translateZ(-30px)" }}
              className="absolute inset-0 rounded-3xl border border-white/[0.04] bg-[#0E0E11]/85 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-3xl"
            />

            {/* HEADER row of dashboard */}
            <div className="col-span-12 flex items-center justify-between border-b border-white/[0.05] pb-4 z-10">
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold tracking-tight text-white">LifeOS Dashboard</span>
                <span className="rounded-full bg-neutral-900 border border-white/5 px-2 py-0.5 text-[10px] text-neutral-400">
                  v1.0.0
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-brand-textMuted">
                <span>Wednesday, June 17</span>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </div>

            {/* LEFT Column: Today's Focus & Decision Log */}
            <div className="col-span-12 space-y-4 md:col-span-5 z-20">
              
              {/* Today's Focus Widget */}
              <div ref={widgetFocus} style={{ transformStyle: "preserve-3d" }}>
                <Card className="p-5 border-white/[0.03] bg-brand-card/30" glowColor="rgba(255, 93, 34, 0.04)">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-accent">
                      <Play className="h-4 w-4 fill-accent" />
                      <span className="text-[11px] font-bold uppercase tracking-wider">{"Today's Focus"}</span>
                    </div>
                    <span className="text-[10px] text-neutral-500">Active</span>
                  </div>
                  
                  <div className="mt-4 flex items-center gap-6">
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/5 bg-black/40">
                      <div className="absolute inset-2 rounded-full border border-dashed border-accent/20 animate-spin-slow" />
                      <span className="text-sm font-bold tracking-tight text-white">45:00</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Interface Engineering</h4>
                      <p className="text-[11px] text-neutral-400">Section 3: Dashboard Reveal</p>
                      <div className="mt-2 flex gap-1.5">
                        <span className="rounded bg-neutral-900 px-1.5 py-0.5 text-[9px] text-neutral-400">Focus Mode</span>
                        <span className="rounded bg-accent/10 px-1.5 py-0.5 text-[9px] text-accent">Sprint</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Decision Log Widget */}
              <div ref={widgetDecisions} style={{ transformStyle: "preserve-3d" }}>
                <Card className="p-5 border-white/[0.03] bg-brand-card/30" glowColor="rgba(255, 255, 255, 0.02)">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#8e8e93]">
                      <FileText className="h-4 w-4" />
                      <span className="text-[11px] font-bold uppercase tracking-wider">Decision Log</span>
                    </div>
                    <span className="text-[10px] text-accent">Recent</span>
                  </div>

                  <div className="mt-4 space-y-2.5">
                    <div className="flex items-start justify-between border-b border-white/[0.03] pb-2">
                      <div>
                        <p className="text-xs font-semibold text-white">Switch to Next.js 15</p>
                        <p className="text-[9px] text-neutral-500">Confidence: Very High</p>
                      </div>
                      <span className="text-[9px] rounded-full bg-emerald-500/10 px-2 py-0.5 text-emerald-400">
                        Resolved
                      </span>
                    </div>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-semibold text-white">UI Framework Selection</p>
                        <p className="text-[9px] text-neutral-500">Confidence: High</p>
                      </div>
                      <span className="text-[9px] rounded-full bg-amber-500/10 px-2 py-0.5 text-amber-400">
                        Pending
                      </span>
                    </div>
                  </div>
                </Card>
              </div>

            </div>

            {/* MIDDLE Column: Energy / Health viz & Projects */}
            <div className="col-span-12 space-y-4 md:col-span-7 z-30">
              
              <div className="grid grid-cols-2 gap-4">
                
                {/* Energy State Widget */}
                <div ref={widgetEnergy} style={{ transformStyle: "preserve-3d" }} className="col-span-2 sm:col-span-1">
                  <Card className="p-5 border-white/[0.03] bg-brand-card/30" glowColor="rgba(82, 183, 136, 0.05)">
                    <div className="flex items-center gap-2 text-accent-green">
                      <Zap className="h-4 w-4 fill-accent-green" />
                      <span className="text-[11px] font-bold uppercase tracking-wider">Energy Rhythm</span>
                    </div>
                    <p className="mt-3 text-2xl font-bold tracking-tight text-white">92%</p>
                    <p className="text-[10px] text-neutral-500">Peak Focus Window Open</p>
                    
                    {/* Tiny Health Graph simulation */}
                    <div className="mt-4 flex h-8 items-end gap-1">
                      <div className="h-[40%] w-full rounded bg-neutral-900" />
                      <div className="h-[60%] w-full rounded bg-neutral-900" />
                      <div className="h-[95%] w-full rounded bg-accent-green/80" />
                      <div className="h-[80%] w-full rounded bg-accent-green" />
                      <div className="h-[50%] w-full rounded bg-neutral-900" />
                      <div className="h-[30%] w-full rounded bg-neutral-900" />
                    </div>
                  </Card>
                </div>

                {/* Projects Widget */}
                <div ref={widgetProjects} style={{ transformStyle: "preserve-3d" }} className="col-span-2 sm:col-span-1">
                  <Card className="p-5 border-white/[0.03] bg-brand-card/30" glowColor="rgba(255, 255, 255, 0.02)">
                    <div className="flex items-center gap-2 text-blue-400">
                      <FolderKanban className="h-4 w-4" />
                      <span className="text-[11px] font-bold uppercase tracking-wider">Projects</span>
                    </div>
                    
                    <div className="mt-4 space-y-3">
                      <div>
                        <div className="flex justify-between text-[10px] text-neutral-400 mb-1">
                          <span>LifeOS Brand</span>
                          <span>85%</span>
                        </div>
                        <div className="h-1 w-full rounded-full bg-neutral-800">
                          <div className="h-1 rounded-full bg-blue-500" style={{ width: "85%" }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[10px] text-neutral-400 mb-1">
                          <span>Health Rhythms</span>
                          <span>40%</span>
                        </div>
                        <div className="h-1 w-full rounded-full bg-neutral-800">
                          <div className="h-1 rounded-full bg-blue-500" style={{ width: "40%" }} />
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

              </div>

              {/* Weekly Reflection Widget */}
              <div ref={widgetReflection} style={{ transformStyle: "preserve-3d" }} className="col-span-2">
                <Card className="p-5 border-white/[0.03] bg-brand-card/30" glowColor="rgba(255, 93, 34, 0.03)">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-purple-400">
                      <HelpCircle className="h-4 w-4" />
                      <span className="text-[11px] font-bold uppercase tracking-wider">Weekly Reflection</span>
                    </div>
                    <span className="text-[10px] text-neutral-500">Due Friday</span>
                  </div>

                  <div className="mt-4">
                    <p className="text-xs font-semibold text-neutral-300">
                      {"\"Where did you feel the most friction this week?\""}
                    </p>
                    <div className="mt-3 rounded-lg border border-white/[0.04] bg-black/40 p-3 text-[11px] text-neutral-500 italic">
                      {"The transition between client design and coding was messy. I need to define a hard boundary in my calendar next Monday..."}
                    </div>
                  </div>
                </Card>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
