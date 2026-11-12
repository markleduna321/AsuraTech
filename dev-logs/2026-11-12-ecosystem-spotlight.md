# Dev Log — Ecosystem Spotlight (Section 5)

### Phase 1: Ecosystem spotlight (Diskobre + Caleho brand cards, connector, decorative mini-UIs)

- **Timestamp:** 2026-11-12 13:21
- **Mode:** Edit access yes · Terminal yes
- **Persona(s) Active:** 🎨 UI/UX + 🖥️ Frontend build → 🧪 QA
- **Files Modified/Created:**
  - New files, all under `resources/js/pages/home-page/_sections/ecosystem/`:
    - `ecosystemData.js` — Section data, so the copy and links can change without touching components:
      - `BRANDS` holds the copy for Diskobre and Caleho.
      - Accents are space-separated RGB: amber-400 for Diskobre and cyan-400 for Caleho.
      - Links carry UTM params `utm_source=asuratech&utm_medium=landing&utm_campaign=ecosystem`.
      - Base URLs: Diskobre `https://diskobre.com`, Caleho `https://www.caleho.cloud`.
    - `EcosystemVisuals.jsx` — Decorative mini-UIs (`aria-hidden`, labelled "Sample data"):
      - `LeadsVisual`: a +128 counter, an accent-coloured SVG sparkline and a looping lead feed.
      - `InfraVisual`: online/verified status rows with ping rings, a last-deploy card and a response latency bar.
    - `EcosystemSection.jsx` — Section wrapper:
      - Header: eyebrow, H2 and subtitle.
      - A 50/50 grid with a `Connector`: a "+" chip and a warm→cool line between the cards.
      - `BrandCard`: lockup with a PLATFORM tag, question H3, pitch, 3 proof checks, the mini-UI, and an accent CTA "↗".
      - The CTA uses `target="_blank"` and `rel="noopener"`, with sr-only "(opens in a new tab)" text.
      - Hover state is set through pointer events → `data-hover`.
      - Reuses `useInViewOnce`, `trackSpotlight`, `.glass-panel` and `.stage`.
  - Changed files:
    - `resources/css/app.css` — Added a "Section 5" block:
      - Accent-tinted spotlight and corner glows.
      - Hover dim, lift and connector brighten, only under `(hover: hover) and (pointer: fine)`.
      - `eco-feed` and `eco-ping` keyframes, gated by in-view state and `prefers-reduced-motion`.
    - `resources/js/pages/home-page/page.jsx` — Imports the ecosystem section and renders it after `<DemoShowcase />`.
- **Issues Encountered:**
  1. Content grounding:
     - The copy had to match the live sites. Diskobre: local business discovery by industry/location, hiring signals and AI-drafted outreach. Caleho: GitHub deploy with auto-pull, databases with export and custom domain verification.
     - No brand logos or palettes were found for either product.
  2. In the visual pass, "120 ms" wrapped onto two lines on mobile.
  3. QA run 1 failed one check:
     - **#29:** The dimmed card used opacity 0.72, which dropped `slate-400` text to 4.15:1 contrast.
  4. QA run 1 warnings:
     - The sparkline used a hard-coded amber instead of the card accent.
     - `eco-ping` wasn't gated by the stage's in-view state.
     - The connector had no stage-in animation.
  5. QA re-run warning:
     - **⚠️ #47:** The PLATFORM badge over the glow while the card is dimmed, at about 390px with a fine pointer, was estimated at 4.25:1.
- **Resolution:**
  1. Content grounding:
     - Only features seen on the live sites are claimed. No uptime or CRM-export claims.
     - Mini-UI numbers are labelled "Sample data".
     - Used amber/cyan accents with Lucide `Radar` and `Cloud` marks in place of logos.
  2. Added `whitespace-nowrap` to "120 ms".
  3. QA failure:
     - **#29:** Raised the dimmed opacity to 0.8 (4.87:1).
  4. QA warnings:
     - The sparkline now uses `rgb(var(--accent))`.
     - `eco-ping` is now gated by `.stage[data-active='true']`.
     - The connector now uses stage-in with `--d: 0.24s`.
  5. QA re-run warning:
     - **⚠️ #47:** Raised the badge to `text-slate-300` ahead of time. The rebuild passed.
- **QA Checklist Result:** ❌ run 1 (1 failure: #29) → fixed → ✅ re-run PASS (1 ⚠️: #47, fixed ahead of time).
  - `vite build` passes, including the rebuild after the #47 fix.
  - Puppeteer checks at 1440, 900 and 390 widths, and with reduced motion:
    - Zero horizontal overflow, zero console errors and no canvas.
    - UTM params, `target` and `rel` are correct on both CTAs.
    - Hover lifts the card by -5px, dims the other card and brightens that side of the connector.
    - The feed animation is `none` under reduced motion.
- **Next Steps:**
  - Things for you to do:
    - Optionally swap in real Diskobre and Caleho logos in place of the Lucide marks.
    - The ChoosePath links to Diskobre and Caleho don't have UTM params. This was out of scope for this phase.
  - Still pending from earlier: the hero fold overflow fix (~21px), awaiting your approval.
  - Next phase: Section 6 (Stats / "Proven Results"), awaiting your approval.
