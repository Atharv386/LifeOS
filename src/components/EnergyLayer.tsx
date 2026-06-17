"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Activity, ShieldAlert, HeartPulse } from "lucide-react";
import Card from "./ui/Card";

interface DataPoint {
  time: string;
  energy: number;
  label: string;
}

const CIRCADIAN_DATA: DataPoint[] = [
  { time: "07:00", energy: 40, label: "Wake up & light rest" },
  { time: "09:00", energy: 90, label: "Peak focus window" },
  { time: "12:00", energy: 75, label: "Deep focus & fuel" },
  { time: "14:00", energy: 35, label: "Afternoon dip: recovery" },
  { time: "17:00", energy: 65, label: "Secondary creative wind" },
  { time: "21:00", energy: 20, label: "Wind down & digital fast" },
];

// 7 days x 4 weeks = 28 squares for the recovery heatmap
const HEATMAP_DAYS = Array.from({ length: 28 }, (_, i) => {
  const values = [72, 85, 45, 90, 60, 30, 95, 80, 88, 55, 68, 92, 40, 75, 82, 96, 64, 70, 89, 50, 62, 78, 85, 38, 91, 74, 86, 94];
  return {
    day: i + 1,
    recovery: values[i % values.length],
  };
});

export default function EnergyLayer() {
  const [activePoint, setActivePoint] = useState<DataPoint | null>(CIRCADIAN_DATA[1]);

  return (
    <section id="energy" className="relative z-10 bg-[#0B0B0D] py-32 px-4 md:px-8">
      
      {/* Background radial highlight */}
      <div 
        className="absolute top-1/3 right-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-accent-green/5 blur-[120px] pointer-events-none" 
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-center">
          
          {/* Left Description Column */}
          <div className="lg:col-span-5 text-left">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-green">
              The Energy Layer
            </span>
            <h2 className="mt-4 font-serif text-4xl font-light italic tracking-tight text-white md:text-5xl">
              {"\"Your energy deserves as much attention as your output.\""}
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-brand-textMuted md:text-base">
              Productivity is not a flat line. LifeOS map your schedule to your biology. Track circadian rhythms, recovery scores, and mood fluctuations to run your days intentionally.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-brand-textMuted md:text-base">
              Instead of forcing 8 hours of rigid optimization, align complex thinking with your peaks and rest during your troughs.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-green/10 text-accent-green">
                  <HeartPulse className="h-4 w-4" />
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-white">Biological alignment</p>
                  <p className="text-neutral-500">Auto-schedules deep work based on peak energy windows.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                  <ShieldAlert className="h-4 w-4" />
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-white">Burnout prevention</p>
                  <p className="text-neutral-500">Alerts when recovery patterns decline over consecutive days.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visualizations Column */}
          <div className="space-y-6 lg:col-span-7">
            
            {/* 1. Circadian Energy Rhythm Curve */}
            <Card className="p-6 border-white/[0.03] bg-brand-card/30" glowColor="rgba(82, 183, 136, 0.06)">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-accent-green" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">Circadian Flow</span>
                </div>
                <span className="text-[10px] text-neutral-500">{"Today's forecast"}</span>
              </div>

              {/* Dynamic SVG graph */}
              <div className="relative mt-8 h-44 w-full">
                <svg className="h-full w-full" viewBox="0 0 500 180" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="40" x2="500" y2="40" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="0" y1="90" x2="500" y2="90" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="0" y1="140" x2="500" y2="140" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

                  {/* Flowing curve */}
                  <motion.path
                    d="M 0 130 C 50 120, 80 40, 120 40 C 180 40, 220 120, 260 120 C 300 120, 320 65, 360 65 C 410 65, 450 150, 500 150"
                    fill="none"
                    stroke="url(#energyGradient)"
                    strokeWidth="2.5"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.8, ease: "easeInOut" }}
                  />

                  {/* Gradients definitions */}
                  <defs>
                    <linearGradient id="energyGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#ff5d22" />
                      <stop offset="30%" stopColor="#52b788" />
                      <stop offset="60%" stopColor="#52b788" />
                      <stop offset="100%" stopColor="#ff5d22" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Node Interactive dots */}
                {CIRCADIAN_DATA.map((pt, idx) => {
                  // Approximate X percentage mapping
                  const xPercent = (idx / (CIRCADIAN_DATA.length - 1)) * 94 + 3;
                  // Map energy (0-100) to Y percent (from bottom)
                  // Low energy (20) -> close to bottom, high energy (90) -> close to top
                  const energyY = 100 - pt.energy;
                  
                  return (
                    <button
                      key={pt.time}
                      onClick={() => setActivePoint(pt)}
                      className="absolute group z-20 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-transform duration-300 hover:scale-125"
                      style={{
                        left: `${xPercent}%`,
                        top: `${energyY}%`,
                      }}
                    >
                      <span className={`h-2.5 w-2.5 rounded-full border border-white/40 transition-colors ${
                        activePoint?.time === pt.time ? "bg-accent-green" : "bg-neutral-800 group-hover:bg-white"
                      }`} />
                    </button>
                  );
                })}
              </div>

              {/* Selected point details panel */}
              {activePoint && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={activePoint.time}
                  className="mt-6 rounded-xl border border-white/[0.03] bg-black/30 p-3.5 flex items-center justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                      {activePoint.time} Forecast
                    </span>
                    <p className="text-xs font-semibold text-white mt-1">
                      {activePoint.label}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-neutral-500 block">
                      Energy Level
                    </span>
                    <span className={`text-xs font-bold ${
                      activePoint.energy > 70 ? "text-accent-green" : activePoint.energy > 40 ? "text-amber-400" : "text-accent"
                    }`}>
                      {activePoint.energy}%
                    </span>
                  </div>
                </motion.div>
              )}
            </Card>

            {/* 2. Recovery Heatmap Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              
              <Card className="p-6 border-white/[0.03] bg-brand-card/30" glowColor="rgba(82, 183, 136, 0.05)">
                <div className="flex items-center gap-2 text-accent-green">
                  <Activity className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">Recovery Rhythm</span>
                </div>
                
                {/* 7x4 square layout */}
                <div className="mt-6 grid grid-cols-7 gap-2">
                  {HEATMAP_DAYS.map((d) => {
                    // Decide green opacity based on recovery score
                    const opacity = d.recovery / 100;
                    return (
                      <div
                        key={d.day}
                        style={{ backgroundColor: `rgba(82, 183, 136, ${opacity})` }}
                        className="h-6 w-full rounded-[4px] border border-white/[0.02] cursor-pointer transition-transform duration-200 hover:scale-110"
                        title={`Day ${d.day}: ${d.recovery}% Recovery`}
                      />
                    );
                  })}
                </div>

                <div className="mt-4 flex items-center justify-between text-[9px] text-neutral-500 font-medium">
                  <span>Stressful Days</span>
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded bg-accent-green/20" />
                    <span className="h-2 w-2 rounded bg-accent-green/50" />
                    <span className="h-2 w-2 rounded bg-accent-green" />
                  </div>
                  <span>Deep Recovery</span>
                </div>
              </Card>

              {/* Stress & Focus Balance Gauge */}
              <Card className="p-6 border-white/[0.03] bg-brand-card/30" glowColor="rgba(255, 255, 255, 0.01)">
                <div className="flex items-center gap-2 text-[#8e8e93]">
                  <Zap className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">Weekly Balance</span>
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <div className="flex justify-between text-[10px] text-neutral-400 mb-1.5">
                      <span>Stress Score (Avg)</span>
                      <span className="text-amber-400">Low (35/100)</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-neutral-900 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "35%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="h-full bg-amber-400 rounded-full" 
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] text-neutral-400 mb-1.5">
                      <span>Creative Rest (Hours)</span>
                      <span className="text-accent-green">14 hours (Optimal)</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-neutral-900 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "80%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="h-full bg-accent-green rounded-full" 
                      />
                    </div>
                  </div>

                  <p className="text-[10px] leading-relaxed text-neutral-500 pt-2 border-t border-white/5">
                    Your nervous system indicates high readiness for creative writing and architectural design today.
                  </p>
                </div>
              </Card>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
