"use client";

import React from "react";

export default function GrainOverlay() {
  return (
    <div 
      className="pointer-events-none fixed inset-0 z-50 h-full w-full select-none opacity-[0.022]" 
      aria-hidden="true"
    >
      <svg className="h-full w-full">
        <filter id="grainy-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#grainy-noise)" />
      </svg>
    </div>
  );
}
