"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function DeepWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const timerTextRef = useRef<HTMLDivElement>(null);
  const bgFadeRef = useRef<HTMLDivElement>(null);

  const [seconds, setSeconds] = useState(2700); // 45:00 in seconds

  // Custom countdown simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 0) return 2700;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Setup master timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=185%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // 1. Darken background and scale up focus ring
      tl.to(bgFadeRef.current, {
        opacity: 1,
        duration: 1,
        ease: "none",
      })
      .to(circleRef.current, {
        scale: 2.2,
        opacity: 0.15,
        duration: 1.5,
        ease: "power2.inOut",
      }, 0)
      .to(timerTextRef.current, {
        scale: 1.15,
        letterSpacing: "0.1em",
        opacity: 1,
        duration: 1.2,
        ease: "power2.inOut",
      }, 0.2)
      .to(textRef.current, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out",
      }, 0.8);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} id="focus" className="relative z-10 bg-[#0B0B0D]">
      {/* Pure black backdrop that fades in on scroll */}
      <div 
        ref={bgFadeRef} 
        className="absolute inset-0 bg-[#000000] opacity-0 transition-opacity pointer-events-none" 
        aria-hidden="true"
      />

      <div 
        ref={triggerRef} 
        className="flex h-screen w-full flex-col items-center justify-center overflow-hidden px-4"
      >
        
        {/* Decorative Grid Lines that fade out */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_30%,#000_100%)] pointer-events-none" />

        {/* Visual Focus Ring */}
        <div className="relative z-10 flex h-72 w-72 items-center justify-center">
          <svg 
            ref={circleRef}
            className="absolute h-[360px] w-[360px] text-accent opacity-40" 
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.1"
              strokeDasharray="2 3"
            />
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.05"
            />
          </svg>

          {/* Core Countdown text */}
          <div 
            ref={timerTextRef} 
            className="text-center font-sans text-5xl font-extralight tracking-widest text-white md:text-7xl opacity-80"
          >
            {formatTime(seconds)}
          </div>
        </div>

        {/* Cinematic Minimal copy */}
        <div 
          ref={textRef} 
          className="absolute bottom-24 z-10 max-w-2xl px-4 text-center opacity-0 translate-y-8 filter blur-[4px]"
        >
          <p className="font-serif text-3xl font-light italic tracking-wide text-neutral-300 md:text-4xl">
            {"\"Attention is your most valuable resource.\""}
          </p>
          <span className="mt-4 block font-sans text-[10px] uppercase tracking-[0.25em] text-neutral-600">
            LifeOS Focus Protocol
          </span>
        </div>

      </div>
    </div>
  );
}
