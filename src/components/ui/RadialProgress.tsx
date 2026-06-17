"use client";

import React from "react";
import { motion } from "framer-motion";

interface RadialProgressProps {
  value: number; // Percentage value (0 - 100)
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export default function RadialProgress({
  value,
  size = 56,
  strokeWidth = 3,
  className = "",
}: RadialProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg className="-rotate-90" width={size} height={size}>
        {/* Background track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#1c1c21"
          strokeWidth={strokeWidth}
        />
        {/* Animated accent circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#ff5d22"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute text-[11px] font-semibold tracking-tighter text-foreground">
        {value}%
      </div>
      {/* Ambient background glow behind the indicator */}
      <div 
        className="absolute inset-0 -z-10 rounded-full bg-accent/10 blur-[8px]" 
        style={{ width: size, height: size }}
      />
    </div>
  );
}
