# Dev Log — Live Demo Showcase (Section 4)

### Phase 1: Live demo showcase (tabbed demos, device stage, WebGL ambient glow)

- **Timestamp:** 2026-11-12 12:38
- **Mode:** Edit access yes · Terminal yes
- **Persona(s) Active:** 🏗️ Architect → 🎨 UI/UX + 🖥️ Frontend build → 🧪 QA
- **User decisions (from planning):**
  - Use HTML mock dashboards, not screenshots or video.
  - No demo credentials yet.
  - Leave the walkthrough link blank.
  - Clinic demo URL: `democlinic.asuratechsolutions.com`.
- **Files Modified/Created:**
  - New files, all under `resources/js/pages/home-page/_sections/demos/`:
    - `demoData.js` — Section data, so the copy and links can change without touching components:
      - `DEMOS` holds three entries: `hris` (TimeSync), `gym` (GymAsura) and `clinic`.
      - Each entry has outcome-led copy, bullets, a launch label, a URL and domain, and `credentials: null`.
      - Each tab has its own tint: blue-400, orange-400 or teal-400. Tints are space-separated RGB so they work in `rgb(var(--tint) / a)`.
      - `WALKTHROUGH_URL = null`, `TRUST_LINE = null` and `ROTATE_MS = 8000`.
    - `DemoTabs.jsx` — Accessible tab switcher:
      - A pill-style segmented control with `role="tablist"`, a roving `tabIndex` and Arrow/Home/End keys.
      - A sliding glow indicator moved with `translateX`.
      - Below `sm` the tabs scroll sideways. The active tab stays centred, and only the horizontal `scrollLeft` is changed.
      - An auto-rotate progress bar uses a `scaleX` keyframe. It can be paused and moves to the next tab on `animationend`.
    - `DeviceStage.jsx` — Decorative browser frame (`aria-hidden`):
      - Three dots and a URL bar with a lock icon and the demo domain.
      - HTML mock screens drawn at 880×550 and scaled to fit with a `ResizeObserver`.
      - A CSS 3D flip between screens. It uses `data-state` (active/in/out/hidden) and follows the direction of the tab change.
      - Pointer tilt through CSS variables, on desktop fine pointers only, plus a sheen.
    - `DemoMockScreens.jsx` — Decorative mock screens:
      - HRIS payroll run, Gym classes and billing, and a Clinic queue with an SMS reminder.
      - They reuse the existing `.stage-*` animations. All numbers are illustrative.
    - `DemoBackdrop.jsx` — Lazy-loaded Three.js ambient layer:
      - A glow shader whose colour eases to the active tab's tint, plus 24 points that drift on the GPU.
      - It renders only while in view and while the document is visible. DPR is capped at 1.75 and the edges fade out.
      - On unmount it disposes everything and calls `forceContextLoss`. It also handles `webglcontextlost`.
    - `DemoShowcase.jsx` — Section wrapper (`section#demos`):
      - Header: eyebrow "Live demos" and H2 "Click around the real thing."
      - Tabs, then a glass card. At `lg` the card is 2fr/3fr with text on the left and the device on the right. On mobile the device comes first and the CTA is full width.
      - Three `role="tabpanel"` panels. Their content rises 8px in a staggered sequence.
      - "Launch … Live Demo ↗" links use `target="_blank"` and `rel="noopener"`, with an sr-only "(opens in a new tab)".
      - A "Waking up the demo…" hint (`role="status"`) shows for 8s after a click.
      - The credentials chip, walkthrough link and trust line appear only when set in `demoData.js`.
      - Auto-rotate stops on any interaction. It pauses on mouse hover and when off-screen, and it is turned off for reduced motion.
      - WebGL runs only on desktop without reduced motion. Otherwise a CSS radial glow is shown. An error boundary wraps the WebGL layer.
  - Changed files:
    - `resources/css/app.css` — Added a "Live demo showcase (Section 4)" block:
      - The hidden screen state and the flip keyframes.
      - Transitions for the tab indicator, glow and sheen.
      - `demo-rise`, `stage-grow-y`, `demo-progress` and the waking dots.
      - All motion sits under `prefers-reduced-motion: no-preference`.
    - `resources/js/pages/home-page/page.jsx` — Imports `DemoShowcase` and renders `<DemoShowcase />` after `<PlatformSection />` and before `<Stats />`.
- **Issues Encountered:**
  1. Checks on the live demos:
     - The HRIS demo redirects to `/login`, and the Gym demo has a password field. So "No signup required" can't be claimed.
     - `democlinic.asuratechsolutions.com` doesn't resolve in DNS.
  2. `BarChart3` isn't exported by the installed `lucide-react` 1.14.
  3. Comma-separated tint values don't work inside `rgb(var(--tint) / a)`.
  4. Problems found in the visual pass:
     - The overflow-x scroller clipped the tab indicator's glow into a rectangle.
     - The WebGL glow had a hard top edge.
     - The HRIS toast overlapped the last table row.
  5. QA run 1 failed two checks:
     - **#20:** `DeviceStage` used one-off hex values (`#0a1024`, `#070c1d`).
     - **#21:** The bullet check badges were indigo.
  6. QA run 1 warnings:
     - The CSS glow fallback could disappear if WebGL unmounted on resize.
     - The waking hint timer didn't restart on repeat clicks.
     - The `CredentialsChip` timer ref wasn't cleared on unmount.
     - Hover-pause didn't cover both the tabs and the card.
- **Resolution:**
  1. Demo checks:
     - `TRUST_LINE` stays `null`, so no "No signup required" claim is shown.
     - You asked to keep the Clinic link, so it stays. The DNS problem is flagged in Next Steps.
  2. Used `ChartColumn` instead of `BarChart3`.
  3. Changed all tints to space-separated RGB.
  4. Visual pass fixes:
     - The tabs now scroll sideways only below `sm`, with extra vertical padding so the glow isn't clipped.
     - Added an edge falloff to the shader.
     - Cut the HRIS table to 3 rows.
  5. QA failures:
     - **#20:** The bezel now uses `bg-slate-900` and the viewport uses `#060a18`.
     - **#21:** The badges now use a neutral style: white at 6% with `slate-300`.
  6. QA warnings:
     - The CSS glow stays visible unless WebGL is both enabled and ready (`!(glReady && useGl)`).
     - The waking hint timer restarts on repeat clicks because it is now keyed with a `{ key }` object.
     - The `CredentialsChip` timer ref is cleared on unmount.
     - Hover-pause now covers the tabs and the card.
- **QA Checklist Result:** ❌ run 1 (2 failures: #20, #21) → fixed → ✅ re-run PASS.
  - `npm run build` succeeded ("built in 6.57s").
  - Puppeteer checks at 1440×900, 390×844 and 900×900, and with reduced motion:
    - Zero console errors and no horizontal overflow.
    - On mobile the tab row scrolls (453px wide in a 390px viewport).
    - Arrow keys switch tabs and panels.
    - The flip states go from out/in to active.
    - The canvas appears only on desktop without reduced motion.
    - Auto-rotate moved from HRIS to Gym after about 8s and stopped after an interaction. It doesn't run with reduced motion.
    - The link `href`, `target` and `rel` are correct, and the waking hint appears.
  - Open ⚠️ warnings (non-blocking):
    - **W1:** The shared CTA is white on indigo-500 with a contrast of 4.47:1, just under 4.5:1. This is a site-wide token.
    - **W2:** The copied-check icon should be emerald-400. It isn't used yet because there are no credentials.
    - **W3:** No `md:` classes. The 900px width was checked.
    - **W4:** The hover colour fades don't have `motion-reduce:transition-none`. This matches the Hero.
    - **W5:** If the trust line is turned on, `text-slate-500` would be about 4.1:1. Use `slate-400` instead.
    - **W6:** The tab buttons are 40px tall, under the 44px touch-target size.
    - **W7:** Auto-rotate has no visible pause button. It stops when you interact.
    - **W8:** If the walkthrough link points inside the site, it will need Inertia `<Link>`.
    - **W9:** The `components/ui` search wasn't documented. Nothing there could be reused, because `Button.jsx` renders only a `<button>`.
- **Next Steps:**
  - Things for you to do:
    - Add demo credentials in `demoData.js`. The credentials chip appears automatically.
    - Fix DNS for `democlinic.asuratechsolutions.com`.
    - Optionally set `WALKTHROUGH_URL` and `TRUST_LINE`. If you set the trust line, use `slate-400` (W5).
    - Optionally replace the HTML mocks with real screenshots or MP4 loops.
  - Still pending from earlier: the hero fold overflow fix (~21px), awaiting your approval.
  - Next phase: the section below the demos (Stats / "Proven Results"), awaiting your approval.
