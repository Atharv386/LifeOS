# LifeOS — The Operating System for Ambitious Lives

> **Run your life with the same intentionality you bring to your work.**

LifeOS is a breathtaking, Apple-event-quality product showcase website. It explores a design concept for a personal operating system that unifies goals, projects, focus, energy, reflection, and decisions into a single, calm ecosystem. 

Inspired by the design aesthetics of Apple, Linear, Arc Browser, and Nothing, this project focuses on exceptional frontend craftsmanship, motion design, and typography-driven storytelling.

---

## ✦ Core Features & Interaction Design

1. **Floating Fixa Navbar:** A translucent, frosted glass navbar (`bg-black/40 border-white/10 backdrop-blur-md`) that shrinks on scroll and features a magnetic indicator for active hover states.
2. **Cinematic Hero:** High-impact typography utilizing **Geist Sans** and **Instrument Serif** italic details. Built with a staggered word reveal transition and a breathing radial gradient.
3. **The Problem (Fragmentation Parallax):** Floating panels representing notes, todo lists, calendars, and mental clutter drift apart as the scroll port progresses, then elegantly converge into a single unified "LifeOS Core" card.
4. **Dashboard Reveal (3D Layered Pinning):** A mock application dashboard floats in 3D perspective space. Pinned scrolling animates the rotation to face straight-on, scales up, and separates individual widgets (Focus Timer, Circadian Chart, Decision Log) along the Z-axis to create physical depth.
5. **Deep Work (Focus Protocol):** Transition into a distraction-free space. The screen fades to absolute black, headers blur away, and a large minimal circle timer expands, prompting the core value: *"Attention is your most valuable resource."*
6. **Decision Journal (Interactive Timeline):** A vertical scrolling log of life experiments. Users can click decision nodes to reveal Context, Expected vs Actual outcomes, Lessons Learned, and radial SVG confidence indicators.
7. **Energy Layer (Circadian Rhythm):** A health-inspired layout showcasing circadian energy curve charts (animated SVG bezier vectors), stress gauges, and a weekly recovery heatmap.
8. **Reflection Prompts:** Intriguing prompts (e.g., *"What mattered this week?"*) that come into focus on hover while softening/blurring adjacent panels to focus user attention.
9. **Editorial Philosophy:** Large serif quotes and quiet transitions emphasizing clarity over complexity and systems that adapt to people.

---

## ⚙ Technology Stack

*   **Framework:** [Next.js 15](https://nextjs.org/) (App Router) & React 19
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [TailwindCSS](https://tailwindcss.com/)
*   **Scroll Motion & Pinning:** [GSAP](https://gsap.com/) & [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
*   **UI Micro-interactions:** [Framer Motion](https://www.framer.com/motion/)
*   **Smooth Scroll:** [Lenis](https://lenis.darkroom.engineering/) (`lenis/react`)
*   **Icons:** [Lucide React](https://lucide.dev/)

---

## 🛠 Local Development Setup

To run this showcase locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Atharv386/LifeOS.git
   cd LifeOS
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000).

---

## 📂 Project Architecture

```
src/
├── app/
│   ├── favicon.ico
│   ├── globals.css           # Ambient grain shader backdrop & layout styles
│   ├── layout.tsx            # Root layout, Lenis, and SEO metadata
│   ├── page.tsx              # Page aggregator assembling all sections
│   ├── sitemap.ts            # Dynamic sitemap config
│   └── robots.ts             # Robots.txt directives
├── components/
│   ├── ui/                   # Reusable premium primitives
│   │   ├── MagneticButton.tsx# Springs physics magnetic hover buttons
│   │   ├── Card.tsx          # Frosted spotlight hover cards
│   │   └── RadialProgress.tsx# Animated SVG confidence progress dials
│   ├── GrainOverlay.tsx      # SVG feTurbulence procedural grain overlay
│   ├── ReactLenis.tsx        # global Lenis smooth scrolling configuration
│   ├── Navbar.tsx            # Fixa floating menu header
│   ├── Hero.tsx              # Cinematic key phrase intro
│   ├── Problem.tsx           # Floating card convergence animation (GSAP)
│   ├── Dashboard.tsx         # 3D depth exploded dashboard widgets (GSAP)
│   ├── DeepWork.tsx          # Focus mode background dimming sequence
│   ├── DecisionJournal.tsx   # Interactive vertical timeline accordion logs
│   ├── EnergyLayer.tsx       # circade bezier graphs & heatmap grids
│   ├── Reflection.tsx        # Card prompts blur/focus layouts
│   ├── Philosophy.tsx        # Editorial guidelines layout
│   └── FinalCTA.tsx          # Deliberate CTA closing & footer links
```

---

## ⚡ Performance & Optimization Choices

*   **Procedural Backdrops:** The organic grain is procedurally generated using standard browser SVG filters (`feTurbulence`) inside `GrainOverlay.tsx` instead of large image assets. This ensures zero LCP delay and keeps initial page weight low.
*   **Vector Visualization:** Circadian rhythms are calculated as mathematical cubic bezier values and drawn dynamically inside SVGs rather than rendering heavy raster charts.
*   **Static Pre-rendering:** Configured as a fully static prerendered output in Next.js, optimizing delivery speeds.
