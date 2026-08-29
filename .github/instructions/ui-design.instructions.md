---
name: Premium UI Design System — Modern Visual Design & Animation
description: >-
  Premium, modern visual design rules for producing beautiful, animated,
  high-end interfaces. Activates when writing or reviewing any JSX, component,
  page, or layout file. Covers dark-first design, glassmorphism, gradient
  systems, Framer Motion animations, micro-interactions, bento grids, premium
  typography, and ambient depth. The goal is an interface that feels like a
  world-class SaaS product — not a generic dashboard. Always apply before
  submitting any UI code.
applyTo: "resources/js/**"
---

# 🎨 Premium UI Design System — Modern & Animated

> **Design goal:** Interfaces that feel alive, intentional, and expensive.
> Every surface has depth. Every interaction has feedback.
> Motion is a layer of communication — not decoration.
> Dark is the primary canvas. Light is the exception.

---

## 1. Modern Design Philosophy

### The 5 Principles of Premium UI

1. **Depth over flatness** — Layers, blur, glow, and gradient create a sense of
   space. Flat cards with `border-slate-200` are dead. Glassmorphic panels
   with ambient light are alive.

2. **Motion is meaning** — Animation communicates state change, hierarchy, and
   causality. A button that physically responds to a click is more trustworthy
   than one that doesn't. Every interaction must have a reaction.

3. **Restraint in color, boldness in scale** — One dominant accent color.
   Everything else is dark neutral. The accent is used sparingly — when it
   appears, it commands attention. Typography is large and confident.

4. **Dark first** — Design for dark mode first. Light mode is the afterthought.
   Rich dark backgrounds with luminous foreground elements create premium depth
   that flat light UIs cannot.

5. **Micro-details win** — The gradient border on hover. The spring bounce on
   click. The staggered list reveal. These details are invisible individually
   but collectively define "premium."

### What to Stop Using (Old-Style Patterns)

| ❌ Old style | ✅ Modern replacement |
|---|---|
| `bg-white` cards on `bg-gray-50` | Glassmorphic panels on dark gradient canvas |
| `border border-slate-200` dividers | Gradient separators, spacing, or glow |
| `shadow-sm` everywhere | Ambient colored glow (`shadow-[0_0_30px_rgba(...)]`) |
| Flat, static hover states | Spring-animated scale + glow on hover |
| `rounded-lg` on everything | `rounded-2xl` / `rounded-3xl` for premium surfaces |
| Solid color backgrounds | Mesh gradients, noise texture, gradient overlays |
| Abrupt page/modal appearance | Framer Motion enter/exit with spring physics |
| `text-2xl font-bold` page titles | `text-4xl lg:text-5xl font-black` display headings |
| Skeleton loaders only | Skeleton + shimmer animation + staggered reveal |
| Single-column form layouts | Bento grid, asymmetric, overlapping sections |

---

## 2. Color System — Dark First

### Base Canvas

```js
// tailwind.config.js — extend colors
colors: {
  canvas: {
    DEFAULT: '#080C14',   // deepest background (page canvas)
    subtle:  '#0D1321',   // slightly lighter panels
    raised:  '#111827',   // raised surfaces
    overlay: '#1a2236',   // highest elevated surface
  },
  glass: {
    border:  'rgba(255,255,255,0.08)',
    border2: 'rgba(255,255,255,0.12)',
    bg:      'rgba(255,255,255,0.04)',
    bg2:     'rgba(255,255,255,0.07)',
  },
}
```

### Accent Color System
Pick **one** primary accent per project. All others are semantic.

| Accent option | Base | Glow color |
|---|---|---|
| Electric Blue | `#3B82F6` | `rgba(59,130,246,0.35)` |
| Violet | `#8B5CF6` | `rgba(139,92,246,0.35)` |
| Emerald | `#10B981` | `rgba(16,185,129,0.35)` |
| Rose | `#F43F5E` | `rgba(244,63,94,0.35)` |
| Amber | `#F59E0B` | `rgba(245,158,11,0.35)` |
| Cyan | `#06B6D4` | `rgba(6,182,212,0.35)` |

### Text Hierarchy on Dark

| Role | Class | Usage |
|---|---|---|
| Display / hero | `text-white` | Large headlines |
| Primary | `text-slate-100` | Body headings |
| Secondary | `text-slate-400` | Supporting text |
| Muted | `text-slate-500` | Captions, timestamps |
| Disabled | `text-slate-600` | Inactive elements |

### Semantic Colors (Dark Context)

| Semantic | Background | Text | Border |
|---|---|---|---|
| Success | `bg-emerald-500/10` | `text-emerald-400` | `border-emerald-500/20` |
| Warning | `bg-amber-500/10` | `text-amber-400` | `border-amber-500/20` |
| Danger | `bg-red-500/10` | `text-red-400` | `border-red-500/20` |
| Info | `bg-blue-500/10` | `text-blue-400` | `border-blue-500/20` |
| Neutral | `bg-slate-500/10` | `text-slate-400` | `border-slate-500/20` |

### Gradient Text (Use for Headlines and Accent Labels)

```jsx
// Blue → Violet
<h1 className="bg-gradient-to-r from-blue-400 to-violet-400
  bg-clip-text text-transparent">
  Premium Heading
</h1>

// White → Slate (subtle, professional)
<h2 className="bg-gradient-to-b from-white to-slate-400
  bg-clip-text text-transparent">
  Feature Title
</h2>

// Accent → White (product-specific)
<span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400
  bg-clip-text text-transparent">
  Highlighted Term
</span>
```

### Mesh Gradient Background (Page Canvas)

```jsx
// Page wrapper with ambient mesh
<div className="min-h-screen bg-[#080C14] relative overflow-hidden">
  {/* Ambient gradient orbs — position behind all content */}
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className="absolute -top-40 -right-40 w-[600px] h-[600px]
      rounded-full bg-blue-600/10 blur-[120px]" />
    <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px]
      rounded-full bg-violet-600/10 blur-[120px]" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
      w-[800px] h-[400px] rounded-full bg-cyan-600/5 blur-[150px]" />
  </div>
  {/* Content above */}
  <div className="relative z-10">...</div>
</div>
```

---

## 3. Typography — Premium Scale

### Display Headings (Hero / Landing Sections)

```jsx
// Hero title — massive, confident
<h1 className="text-5xl lg:text-7xl font-black tracking-tight text-white
  leading-[0.95]">
  Build something <br />
  <span className="bg-gradient-to-r from-blue-400 to-cyan-400
    bg-clip-text text-transparent">
    extraordinary.
  </span>
</h1>

// Section title — large, bold
<h2 className="text-3xl lg:text-4xl font-bold tracking-tight
  bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
  Section Heading
</h2>

// Eyebrow label (above titles)
<p className="text-xs font-semibold tracking-widest uppercase
  text-blue-400 mb-3">
  Platform Features
</p>
```

### Font Scale for App UI (Dashboard / Authenticated)

| Role | Classes |
|---|---|
| Page title | `text-2xl font-bold text-white` |
| Card title | `text-base font-semibold text-slate-100` |
| Body | `text-sm text-slate-400` |
| Label | `text-xs font-medium text-slate-500` |
| Caption | `text-xs text-slate-600` |
| Table head | `text-xs font-semibold text-slate-500 uppercase tracking-wider` |

### Animated Text Reveal (Framer Motion)

```jsx
import { motion } from 'framer-motion';

// Character-by-character reveal
const word = "Premium";
<div className="flex overflow-hidden">
  {word.split("").map((char, i) => (
    <motion.span
      key={i}
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: i * 0.04, duration: 0.5, ease: [0.33,1,0.68,1] }}
    >
      {char}
    </motion.span>
  ))}
</div>

// Fade-up reveal (words)
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.33,1,0.68,1] }
  })
};
```

---

## 4. Glassmorphism & Depth

The signature of premium dark UI. Glass panels feel like they float above the canvas.

### Glass Panel — Core Pattern

```jsx
// Standard glass card
<div className="relative rounded-2xl border border-white/10
  bg-white/[0.03] backdrop-blur-xl p-6
  shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_20px_50px_rgba(0,0,0,0.5)]">
  content
</div>

// Elevated glass card (higher prominence)
<div className="relative rounded-2xl border border-white/[0.08]
  bg-gradient-to-b from-white/[0.07] to-white/[0.02]
  backdrop-blur-2xl p-6
  shadow-[0_0_0_1px_rgba(255,255,255,0.07),0_30px_60px_rgba(0,0,0,0.6)]">
  content
</div>

// Glass card with accent glow (for featured/primary items)
<div className="relative rounded-2xl border border-blue-500/20
  bg-blue-500/[0.05] backdrop-blur-xl p-6
  shadow-[0_0_40px_rgba(59,130,246,0.15),0_0_0_1px_rgba(59,130,246,0.15)]">
  content
</div>
```

### Gradient Border (Premium Detail)

```jsx
// Gradient border using pseudo-element approach via wrapper
<div className="p-px rounded-2xl bg-gradient-to-b
  from-white/20 to-white/5">
  <div className="rounded-2xl bg-canvas p-6">
    content
  </div>
</div>

// Animated gradient border on hover (Tailwind + CSS)
<div className="group relative rounded-2xl p-px
  bg-gradient-to-r from-blue-500/30 via-violet-500/30 to-cyan-500/30
  hover:from-blue-500 hover:via-violet-500 hover:to-cyan-500
  transition-all duration-500">
  <div className="rounded-2xl bg-[#0D1321] p-6">
    content
  </div>
</div>
```

### Ambient Glow (Colored Shadows)

```jsx
// Blue accent glow
className="shadow-[0_0_30px_rgba(59,130,246,0.25)]
  hover:shadow-[0_0_50px_rgba(59,130,246,0.4)]
  transition-shadow duration-500"

// Violet accent glow
className="shadow-[0_0_30px_rgba(139,92,246,0.25)]"

// Success glow
className="shadow-[0_0_20px_rgba(16,185,129,0.3)]"
```

---

## 5. Animation System (Framer Motion)

### Installation

```bash
npm install framer-motion
```

### Animation Presets — Import and Reuse

```js
// resources/js/lib/animations.js

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] }
  }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] }
  }
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.45, ease: [0.33, 1, 0.68, 1] }
  }
};

export const slideInRight = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.45, ease: [0.33, 1, 0.68, 1] }
  }
};

// Stagger container — apply to parent
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

// Spring — for physical interactions
export const spring = {
  type: "spring",
  stiffness: 400,
  damping: 30
};

export const softSpring = {
  type: "spring",
  stiffness: 200,
  damping: 25
};
```

### Usage Patterns

```jsx
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/animations';

// Single element reveal
<motion.div
  variants={fadeUp}
  initial="hidden"
  animate="visible"
>
  <Card />
</motion.div>

// Staggered list — parent + children
<motion.ul
  variants={staggerContainer}
  initial="hidden"
  animate="visible"
>
  {items.map(item => (
    <motion.li key={item.id} variants={fadeUp}>
      <ItemCard item={item} />
    </motion.li>
  ))}
</motion.ul>

// Scroll-triggered reveal
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const ref = useRef(null);
const isInView = useInView(ref, { once: true, margin: "-80px" });

<motion.div
  ref={ref}
  variants={fadeUp}
  initial="hidden"
  animate={isInView ? "visible" : "hidden"}
>
  content
</motion.div>
```

### Page / Route Transitions (Inertia + Framer Motion)

```jsx
// Wrap page content in MainLayout
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
  >
    {children}
  </motion.div>
);

// Use inside pages/[page]/page.jsx
const DashboardPage = () => (
  <PageTransition>
    {/* page content */}
  </PageTransition>
);
```

---

## 6. Micro-Interactions & Hover Effects

Every interactive element must physically respond. Static = cheap.

### Button Micro-Interactions

```jsx
import { motion } from 'framer-motion';

// Primary button — scale + glow on hover, press feedback on tap
<motion.button
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.97 }}
  transition={{ type: "spring", stiffness: 400, damping: 30 }}
  className="px-6 py-3 bg-blue-600 text-white text-sm font-semibold
    rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)]
    hover:shadow-[0_0_35px_rgba(59,130,246,0.5)]
    hover:bg-blue-500 transition-[box-shadow,background] duration-300"
>
  Get Started
</motion.button>

// Icon button — spring rotate
<motion.button
  whileHover={{ rotate: 15, scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  transition={{ type: "spring", stiffness: 400, damping: 20 }}
  className="p-2 rounded-xl text-slate-400 hover:text-white
    hover:bg-white/10 transition-colors"
>
  <Settings className="w-4 h-4" />
</motion.button>
```

### Card Hover Effects

```jsx
// Lift + glow on hover
<motion.div
  whileHover={{ y: -4, scale: 1.01 }}
  transition={{ type: "spring", stiffness: 300, damping: 25 }}
  className="rounded-2xl border border-white/10 bg-white/[0.03]
    backdrop-blur-xl p-6 cursor-pointer
    hover:border-blue-500/30
    hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]
    transition-[border-color,box-shadow] duration-300"
>
  content
</motion.div>

// Magnetic hover (subtle pull toward cursor)
import { useMotionValue, useSpring, motion } from 'framer-motion';

const x = useMotionValue(0);
const y = useMotionValue(0);
const springX = useSpring(x, { stiffness: 150, damping: 20 });
const springY = useSpring(y, { stiffness: 150, damping: 20 });

const handleMouse = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  x.set((e.clientX - cx) * 0.15);
  y.set((e.clientY - cy) * 0.15);
};

<motion.div
  style={{ x: springX, y: springY }}
  onMouseMove={handleMouse}
  onMouseLeave={() => { x.set(0); y.set(0); }}
>
  <button>Hover me</button>
</motion.div>
```

### Animated Number Counter

```jsx
import { useMotionValue, useSpring, useInView, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const AnimatedNumber = ({ target, prefix = '', suffix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (isInView) motionValue.set(target);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {prefix}
      <motion.span>{spring.get().toFixed(0)}</motion.span>
      {suffix}
    </span>
  );
};

// Usage in KPI cards
<AnimatedNumber target={48290} prefix="₱" />
<AnimatedNumber target={98.7} suffix="%" />
```

### Shimmer Loading Effect

```jsx
// Add to globals or as Tailwind plugin
// tailwind.config.js
keyframes: {
  shimmer: {
    '0%': { backgroundPosition: '-200% center' },
    '100%': { backgroundPosition: '200% center' },
  }
},
animation: {
  shimmer: 'shimmer 2s linear infinite',
}

// Usage
<div className="h-4 rounded-lg bg-gradient-to-r
  from-slate-800 via-slate-700 to-slate-800
  bg-[length:200%_100%] animate-shimmer" />
```

---

## 7. Premium Component Patterns

### KPI / Stat Card (Dark + Animated)

```jsx
<motion.div
  variants={fadeUp}
  initial="hidden"
  animate="visible"
  whileHover={{ y: -3 }}
  transition={{ type: "spring", stiffness: 300, damping: 25 }}
  className="relative rounded-2xl border border-white/[0.08]
    bg-gradient-to-b from-white/[0.06] to-white/[0.02]
    backdrop-blur-xl p-6 overflow-hidden"
>
  {/* Accent glow top-right */}
  <div className="absolute -top-4 -right-4 w-24 h-24
    rounded-full bg-blue-500/20 blur-2xl pointer-events-none" />

  <div className="flex items-center justify-between mb-4">
    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
      Total Revenue
    </p>
    <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
      <TrendingUp className="w-4 h-4 text-blue-400" />
    </div>
  </div>

  <AnimatedNumber
    target={48290}
    prefix="₱"
    className="text-3xl font-bold text-white"
  />

  <div className="mt-2 flex items-center gap-1.5">
    <span className="flex items-center gap-0.5 text-xs font-medium
      text-emerald-400">
      <TrendingUp className="w-3 h-3" /> +8.2%
    </span>
    <span className="text-xs text-slate-600">vs last month</span>
  </div>
</motion.div>
```

### Bento Grid (Modern Layout)

```jsx
// Asymmetric bento grid — feature showcase or dashboard overview
<div className="grid grid-cols-12 grid-rows-auto gap-4">

  {/* Large feature card — spans 8 cols, 2 rows */}
  <motion.div variants={fadeUp} className="col-span-12 md:col-span-8 row-span-2
    rounded-3xl border border-white/[0.08] bg-white/[0.03]
    backdrop-blur-xl p-8 min-h-[280px] overflow-hidden relative">
    {/* ambient orb */}
    <div className="absolute -top-20 -right-20 w-60 h-60
      rounded-full bg-blue-600/15 blur-[80px] pointer-events-none" />
    <div className="relative">
      <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">
        Core Feature
      </p>
      <h3 className="text-2xl font-bold text-white mb-2">Feature Headline</h3>
      <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
        Description that sells the value. Keep it one or two sentences.
      </p>
    </div>
  </motion.div>

  {/* Small stat card — spans 4 cols, 1 row */}
  <motion.div variants={fadeUp} className="col-span-12 md:col-span-4
    rounded-3xl border border-white/[0.08] bg-white/[0.03]
    backdrop-blur-xl p-6">
    stat content
  </motion.div>

  {/* Medium card — spans 4 cols, 1 row */}
  <motion.div variants={fadeUp} className="col-span-12 md:col-span-4
    rounded-3xl border border-white/[0.08] bg-white/[0.03]
    backdrop-blur-xl p-6">
    feature content
  </motion.div>

</div>
```

### Premium Table (Dark)

```jsx
<motion.div
  variants={fadeUp}
  initial="hidden"
  animate="visible"
  className="rounded-2xl border border-white/[0.08]
    bg-white/[0.02] backdrop-blur-xl overflow-hidden"
>
  <div className="px-6 py-4 border-b border-white/[0.06]
    flex items-center justify-between">
    <h3 className="text-base font-semibold text-slate-100">Table Title</h3>
    <button className="text-xs text-blue-400 hover:text-blue-300
      font-medium transition-colors">
      View all →
    </button>
  </div>
  <table className="w-full text-sm">
    <thead>
      <tr className="border-b border-white/[0.04]">
        <th className="text-left px-6 py-3 text-xs font-semibold
          text-slate-600 uppercase tracking-wider">
          Column
        </th>
      </tr>
    </thead>
    <motion.tbody
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="divide-y divide-white/[0.04]"
    >
      {rows.map((row, i) => (
        <motion.tr
          key={row.id}
          variants={fadeUp}
          className="hover:bg-white/[0.03] transition-colors duration-150
            group cursor-pointer"
        >
          <td className="px-6 py-4 text-slate-300">{row.value}</td>
        </motion.tr>
      ))}
    </motion.tbody>
  </table>
</motion.div>
```

### Premium Input (Dark)

```jsx
<div className="space-y-2">
  <label className="block text-xs font-semibold text-slate-400 uppercase
    tracking-wider">
    Field Label
  </label>
  <div className="relative">
    <input
      className="w-full px-4 py-3 text-sm text-slate-100
        bg-white/[0.04] border border-white/[0.08] rounded-xl
        placeholder:text-slate-600
        focus:outline-none focus:border-blue-500/50
        focus:ring-2 focus:ring-blue-500/20
        focus:bg-white/[0.06]
        transition-all duration-200"
    />
    {/* Error state — swap border-white/[0.08] with: */}
    {/* border-red-500/50 focus:ring-red-500/20 */}
  </div>
  <p className="text-xs text-red-400">Error message</p>
</div>
```

### Premium Badge (Dark Context)

```jsx
const badge = {
  success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  warning: "bg-amber-500/10  text-amber-400  border border-amber-500/20",
  danger:  "bg-red-500/10    text-red-400    border border-red-500/20",
  info:    "bg-blue-500/10   text-blue-400   border border-blue-500/20",
  neutral: "bg-slate-500/10  text-slate-400  border border-slate-500/20",
};

<span className={`inline-flex items-center gap-1 px-2.5 py-0.5
  rounded-full text-xs font-medium ${badge.success}`}>
  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
  Active
</span>
```

### Sidebar Navigation (Dark Premium)

```jsx
// Active link
<Link className="flex items-center gap-3 px-3 py-2.5 rounded-xl
  bg-blue-500/10 border border-blue-500/20
  text-blue-400 font-medium text-sm
  shadow-[0_0_15px_rgba(59,130,246,0.1)]">
  <Icon className="w-4 h-4 shrink-0" />
  <span>Dashboard</span>
</Link>

// Inactive link
<Link className="flex items-center gap-3 px-3 py-2.5 rounded-xl
  text-slate-500 hover:text-slate-200 hover:bg-white/[0.05]
  font-medium text-sm transition-colors duration-150 group">
  <Icon className="w-4 h-4 shrink-0 group-hover:text-slate-300
    transition-colors" />
  <span>Reports</span>
</Link>
```

---

## 8. Page Layout Patterns (Dark)

### Authenticated App Page

```jsx
<PageTransition>
  <div className="min-h-screen bg-[#080C14] relative">

    {/* Ambient background orbs */}
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px]
        rounded-full bg-blue-600/8 blur-[120px]" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px]
        rounded-full bg-violet-600/8 blur-[120px]" />
    </div>

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
      py-8 space-y-8">

      {/* Page header */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="flex items-start justify-between"
      >
        <div>
          <p className="text-xs font-semibold text-blue-400 uppercase
            tracking-widest mb-1">
            Section
          </p>
          <h1 className="text-3xl font-bold text-white">Page Title</h1>
          <p className="mt-1 text-sm text-slate-500">
            Supporting description
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-5 py-2.5
            bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold
            rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)]
            hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]
            transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </motion.button>
      </motion.div>

      {/* KPI row */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {kpis.map(kpi => <KpiCard key={kpi.id} {...kpi} />)}
      </motion.div>

      {/* Main content */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible">
        <PremiumTable data={data} />
      </motion.div>

    </div>
  </div>
</PageTransition>
```

### Empty State (Dark)

```jsx
<motion.div
  variants={scaleIn}
  initial="hidden"
  animate="visible"
  className="flex flex-col items-center justify-center py-24 text-center"
>
  <div className="relative mb-6">
    <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.08]
      flex items-center justify-center">
      <FolderOpen className="w-7 h-7 text-slate-600" />
    </div>
    <div className="absolute inset-0 rounded-2xl bg-blue-500/10 blur-xl" />
  </div>
  <h3 className="text-lg font-semibold text-slate-200">Nothing here yet</h3>
  <p className="mt-2 text-sm text-slate-500 max-w-xs leading-relaxed">
    Get started by creating your first item.
  </p>
  <motion.button
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.96 }}
    className="mt-6 inline-flex items-center gap-2 px-5 py-2.5
      bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold
      rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)]
      transition-all duration-300"
  >
    <Plus className="w-4 h-4" /> Create Item
  </motion.button>
</motion.div>
```

---

## 9. CSS Animations (No Library Required)

Add these to your global CSS for pure CSS animation effects:

```css
/* Floating animation — for decorative elements */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-12px); }
}
.animate-float { animation: float 4s ease-in-out infinite; }

/* Shimmer — skeleton loaders */
@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
}
.animate-shimmer {
  background: linear-gradient(90deg,
    #1e2a3a 25%, #243040 50%, #1e2a3a 75%);
  background-size: 200% 100%;
  animation: shimmer 2s linear infinite;
}

/* Gradient border pulse */
@keyframes gradient-rotate {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.animate-gradient-border {
  background: linear-gradient(270deg, #3B82F6, #8B5CF6, #06B6D4);
  background-size: 300% 300%;
  animation: gradient-rotate 4s ease infinite;
}

/* Pulse glow — for active indicators */
@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 10px rgba(59,130,246,0.3); }
  50%       { box-shadow: 0 0 25px rgba(59,130,246,0.6); }
}
.animate-glow-pulse { animation: glow-pulse 2s ease-in-out infinite; }

/* Typing cursor */
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
.cursor { animation: blink 1s step-end infinite; }
```

---

## 10. Animation Rules

- **Always use Framer Motion for component animations** — not Tailwind alone for
  multi-property animations.
- **Spring physics over linear easing** — springs feel physical; linear feels robotic.
  Default: `stiffness: 300-400, damping: 25-30`.
- **Duration budget:** 200–500ms for UI elements. 600–900ms for page-level transitions.
  Never over 1s for interactive feedback.
- **Stagger delay:** 60–100ms between children. More than 120ms feels slow.
- **`once: true` on scroll triggers** — never re-trigger on scroll-up.
- **`will-change: transform`** on heavily animated elements for GPU compositing.
- **Respect reduced motion:**
  ```jsx
  import { useReducedMotion } from 'framer-motion';
  const reduce = useReducedMotion();
  const variants = reduce ? {} : fadeUp;
  ```
- Only animate `transform` (translate, scale, rotate) and `opacity` for performance.
  Never animate `width`, `height`, `top`, `left`, or layout properties.
- **`layout` prop** on Framer Motion elements whose size/position changes
  dynamically (e.g. list items being added/removed).

---

## 11. Anti-Patterns — Never Do These

| ❌ Never | ✅ Modern replacement |
|---|---|
| `bg-white` cards | Glass panels on dark canvas |
| `shadow-sm` only | Ambient colored glow shadows |
| `rounded-lg` on cards | `rounded-2xl` / `rounded-3xl` |
| `border-slate-200` separators | `border-white/[0.08]` on dark |
| Static hover — color only | Scale + glow + color shift together |
| `transition-all duration-300` blindly | Specific props: `transition-[box-shadow,transform]` |
| CSS animation on layout props | Only `transform` and `opacity` |
| `animate-spin` for loading | Shimmer skeleton that matches content shape |
| Multiple accent colors | One accent, semantic colors for status only |
| `text-black` | `text-white` or `text-slate-100` on dark |
| No page transition | Framer Motion `fadeUp` on every page mount |
| Instant list render | Staggered `variants` on list containers |
| `font-bold` everywhere | `font-black` for display, `font-semibold` for UI |
| Gradient text on body copy | Gradient text on headlines and key labels only |
| `blur-sm` glassmorphism | `backdrop-blur-xl` minimum for real glass effect |
| Colored backgrounds in tables | Dark neutral rows; color only in badges |