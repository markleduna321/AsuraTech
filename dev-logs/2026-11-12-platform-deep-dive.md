# Dev Log — Platform Deep Dive (Section 3)

### Phase 1: All-in-one automation deep dive (stack collapse, feature showcase, value strip)

- **Timestamp:** 2026-11-12 11:38
- **Mode:** Edit access yes · Terminal yes
- **Persona(s) Active:** 🎨 UI/UX + 🖥️ Frontend, 🧪 QA
- **Files Modified/Created:**
  - New files, all under `resources/js/pages/home-page/_sections/platform/`:
    - `scrollHooks.js` — Shared helpers for the section:
      - `useMediaQuery`, `usePrefersReducedMotion` and `useInViewOnce`.
      - `trackSpotlight`, which writes `--mx`/`--my`.
      - Easing and clamping helpers: `clamp01`, `easeOutExpo`, `easeInOutCubic` and `smoothstep`.
    - `platformData.js` — Section data:
      - 10 generic tool chips with illustrative prices. The total is calculated from them and comes to $844/mo.
      - `PLATFORM_PRICE = null` as a placeholder.
      - `PLATFORM_INCLUDES`.
      - 5 `FEATURES`, each with a one-line benefit.
      - 4 `VALUE_POINTS`.
    - `CollapseScene.jsx` — Lazy-loaded Three.js layer for Beat 1:
      - Orthographic camera set up in pixel space.
      - Frosted-glass rounded plates drawn as an `InstancedMesh` with an SDF shader.
      - A glowing core with an emissive ring, lines from each chip to the core, and cyan pulses.
      - It has no render loop of its own; the parent drives it.
      - DPR is capped at 1.75. On unmount it disposes everything and calls `forceContextLoss`.
    - `StackCollapse.jsx` — Beat 1:
      - **Desktop:**
        - A 240vh scroll track with a sticky stage (`top-16`).
        - A smoothed `requestAnimationFrame` scroll-progress driver that also plays in reverse.
        - Sequence: chips appear with a running total, swirl into the core, then become a single platform card.
        - WebGL mounts only when the beat is near the viewport (IntersectionObserver `rootMargin`). It is unmounted and disposed afterwards.
        - HTML glass chips act as the fallback and poster image. An error boundary wraps the WebGL layer.
      - **Mobile (<1024px):** 2D chips in the normal page flow converge into the card. No WebGL.
      - **Reduced motion:** a static before → after.
    - `FeatureStages.jsx` — 5 mock product panels built in HTML/CSS:
      - **Lead Nurture:** Day 1/3/7 timeline with SMS, email and chat bubbles.
      - **Pipeline & CRM:** a kanban card slides to Won.
      - **Appointment Booking:** a slot fills and a confirmation toast appears.
      - **Reputation Management:** a rating ticker (4.6 → 4.9), a review request, rating breakdown bars and a 5-star review.
      - **AI Conversation Bots:** typing indicators, bot answers and a booking card.
    - `FeatureShowcase.jsx` — Beat 2:
      - **Desktop:**
        - A list of the 5 features on the left. The feature closest to the viewport centre is active (`aria-current="step"`); the others are dimmed with opacity.
        - A sticky glass stage on the right with a CSS perspective tilt. Pointer movement writes the `--rx`/`--ry` CSS variables directly.
      - **Mobile/tablet and reduced motion:** a stacked layout where each panel plays once, with two columns at `lg`.
    - `ValueStrip.jsx` — Beat 3:
      - Headline "One login. One inbox. One bill." and 4 stats in a monospace font.
      - A "Start Automating" CTA (`#contact`), identical to the hero CTA.
    - `PlatformSection.jsx` — Section wrapper (`#platform`):
      - Noise overlay and a hairline divider.
      - Header: eyebrow "ALL-IN-ONE AUTOMATION", headline "Replace your entire tool stack with one platform.", and your sub copy.
      - Switches between desktop, mobile and static modes.
      - Top and bottom padding `32`, `lg:40`.
      - `[overflow-x:clip]`, so sticky positioning still works.
  - Changed files:
    - `resources/css/app.css` — Added a Section 3 block:
      - The `--ease-expo` variable.
      - `.glass-panel`: gradient, ~9% inset 1px border, top highlight and a spotlight for fine pointers only.
      - `.glass-chip`.
      - `.pc-stage[data-gl='false']`, the chip fallback when WebGL is off.
      - `.noise-overlay`.
      - Stage animation keyframes: `stage-in`, `stage-grow`, `stage-fill`, `stage-toast`, `stage-typing`, `stage-slide`, `stars-clip`, `stars-inner` and `typing-dot`.
      - `.stage-layer` and `.stage-tilt`.
      - All motion sits under `prefers-reduced-motion: no-preference`. With reduced motion, typing indicators are hidden and stages show their static end states.
    - `resources/js/pages/home-page/page.jsx` — Imports `PlatformSection` and renders `<PlatformSection />` after `<ChoosePath />`.
- **Issues Encountered:**
  1. GSAP/ScrollTrigger was the expected scroll library, but Rule 6 forbids `npm install` without an explicit instruction.
  2. The collapse scene needs WebGL. Sharing the hero's renderer would have meant refactoring the finished hero.
  3. No real platform price was available. The chip prices and the "<60 sec" and "24/7" claims aren't confirmed.
  4. The Reputation mock had a large empty gap.
  5. The value strip headline broke mid-phrase ("One / inbox").
  6. With reduced motion on desktop, the stacked stages stretched to full width.
  7. QA run 1 failed check #36: `FeatureCopy` animated the text and border colour on scroll.
  8. QA follow-ups:
     - Only 9 chips, which didn't match the "ten logins" copy.
     - The toast shadow was too heavy.
     - The tilt was driven by React state.
  9. During QA run 1, the QA agent ran read-only `git status`/`git diff --stat`, which breaks Rule 6.
- **Resolution:**
  1. Built with native `position: sticky` and a `requestAnimationFrame` scroll-progress driver. This gives the same scroll-driven, reversible pin-then-release behaviour. GSAP was not installed. If you still want it, you can approve `npm install gsap`.
  2. The collapse scene has its own renderer. It mounts lazily near the beat and is disposed afterwards. The hero already pauses when offscreen.
  3. No price was invented. `PLATFORM_PRICE = null` shows "One plan. One bill." The chip prices and the "<60 sec" and "24/7" claims need business sign-off.
  4. Added rating breakdown bars that animate in with `stage-grow` (`scaleX`).
  5. Wrapped each phrase in a `whitespace-nowrap` span.
  6. Added a two-column grid at `lg`.
  7. Replaced it with a static rail plus an indigo overlay and a text block. Only their opacity transitions now.
  8. Fixes for the follow-ups:
     - Added a 10th chip, "Form Builder".
     - Softened the toast shadow.
     - The tilt now writes CSS variables directly instead of using React state.
  9. The commands changed nothing. The QA re-run used no git.
- **QA Checklist Result:** ❌ run 1 (#36) → fixed → ✅ re-run PASS (0 ❌).
  - `npm run build` passes.
  - Puppeteer checks at 1440×900, at 390×844 and with reduced motion:
    - Zero console errors.
    - The pin holds at 64px and then releases. Scrolling back reverses the animation.
    - The canvas exists only near Beat 1 and is removed afterwards.
    - The sticky active index goes 0 → 4 and the matching stage layer shows.
    - No horizontal overflow on mobile.
    - With reduced motion: no canvas, no sticky, typing hidden and all reveals visible.
  - Non-blocking ⚠️:
    - No `md:` breakpoint classes. By design, 768–1023px uses the stacked/mobile mode; this needs a browser check.
    - The `components/ui` search wasn't documented.
    - The rating breakdown (86/10/3/1) averages about 4.8, but the ticker shows 4.9. A data tweak is optional.
    - The `typing-dot` loop keeps running invisibly after it fades out. A fix is optional.
  - Still needs a real-browser check:
    - Tablet (768–1023px).
    - The focus ring.
    - How the motion feels.
    - Frame rate on mid-range hardware.
- **Next Steps:** Use the fold method on the next section below the deep dive (Stats / "Proven Results" onward), awaiting your approval. Still pending from earlier: the hero fold overflow padding fix (~21px), also awaiting your approval.
