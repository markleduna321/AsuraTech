# Dev Log — Custom Engineering, ERP & AI Integration (Section 6)

### Phase 1: Section 6 — Custom engineering, ERP & AI integration (Three.js architecture scene, tabbed offers, trust strip, CTAs)

- **Timestamp:** 2026-11-12 14:07
- **Mode:** Edit access yes · Terminal yes
- **Persona(s) Active:** 🎨 UI/UX + 🖥️ Frontend build → 🧪 QA
- **Files Modified/Created:**
  - New files, all under `resources/js/pages/home-page/_sections/engineering/`:
    - `engineeringData.js` — Section copy, kept separate from the components:
      - `OFFERS`: `erp`, `apps`, `ai` and `consult`. Each has a title, an outcome, chips and a caption.
      - `TRUST`: 3 trust-strip items.
      - `PRIMARY_CTA`: `#contact`, "Book a Technical Consultation".
      - `SECONDARY_CTA`: `#case-study`, "See how we work".
    - `ArchitectureScene.jsx` — The lazy-loaded Three.js architecture scene:
      - Rendering: a `WebGLRenderer` with DPR capped at 1.5, plus a `CSS2DRenderer` for monospace labels.
      - Zone groups:
        - ERP: Finance, HR, Inventory and Sales slabs on a DB cylinder. The slabs explode apart when the zone is active.
        - Apps: browser and phone panels.
        - AI: an orb, an `InstancedMesh` node cluster and OpenAI/Claude/LLM chips. An additive billboard glow is the only bloom.
        - Consult: a wireframe shield.
      - Inactive zones dim to 25% through material opacity and colour.
      - Pulses travel along the links, drawn with an `InstancedMesh`.
      - Camera presets tween over 0.8s with a hand-written `easeInOutCubic`. No GSAP.
      - Slow drift and pointer parallax.
      - A blueprint floor grid drawn with `fwidth`, fading with distance.
      - rAF runs only while the scene is in view, the tab is visible, and reduced motion is off.
      - Reduced motion renders one static frame.
      - Has a fallback for WebGL context loss.
      - Disposes all GPU resources on unmount.
    - `ArchitectureIllustration.jsx` — An SVG version of the same zones. It is the poster, the mobile view and the WebGL fallback.
    - `EngineeringSection.jsx` — Section wrapper (`#engineering`):
      - 45/55 split layout.
      - Desktop: a vertical `role="tablist"` with Arrow/Home/End keys and a 140ms hover-intent preview for the mouse.
      - The tabpanel stage crossfades from the poster to WebGL.
      - WebGL is mounted once the section is within one viewport of the screen, and disposed when it is far away.
      - Mobile: the illustration plus an accordion.
      - Trust strip and both CTAs.
  - Changed files:
    - `resources/css/app.css` — Added a "Section 6" block:
      - `.eng-blueprint`.
      - `.eng-tab` states, including `.eng-tab-desc` and `.eng-tab-chips`.
      - `.arch-zone` and `.arch-label`.
      - Transitions guarded by `prefers-reduced-motion`.
    - `resources/js/pages/home-page/page.jsx` — Renders `<EngineeringSection />` after `<EcosystemSection />`.
    - `ChoosePath.jsx` — The custom card now links to `#engineering`, and the teaser links to the deep dive.
    - `FeaturedProject.jsx` — Added `id="case-study"` so the secondary CTA has a target.
- **Issues Encountered:**
  1. Test harness: Puppeteer element screenshots of the 1233px-tall section scrolled the page. The near-viewport observer then disposed the scene, as designed, which looked like a crash.
  2. QA run 1 (PASS with warnings):
     - A `<ul>` of chips sat inside `<button role="tab">`, which is invalid markup.
     - WebGL never mounted after the viewport crossed the 1024px breakpoint.
     - The order of the SVG modules didn't match the 3D scene.
  3. QA run 2 (FAIL):
     - The `.eng-tab-body ul` selector was dead once the chips became spans.
     - Also fixed in the same pass: the tabpanel's `aria-labelledby` and the mask fill `#fff`.
- **Resolution:**
  1. Test harness: this only affected the test, not the product. Switched to viewport screenshots.
  2. QA run 1 warnings:
     - Chips are now inline `<span>`s. The tab uses `aria-labelledby` for its title and `aria-describedby` for its description.
     - `useInView` gained an `enabled` (`isDesktop`) dependency, so WebGL mounts after crossing the breakpoint.
     - SVG modules now go Finance → Sales from bottom to top, matching the 3D scene.
  3. QA run 2 failure:
     - Replaced the dead selector with `.eng-tab-desc` and `.eng-tab-chips` classes.
     - The tabpanel's `aria-labelledby` now points to the title id.
     - Changed the mask fill from `#fff` to `white`.
- **QA Checklist Result:** ✅ run 1 PASS with ⚠️ warnings → fixed → ❌ run 2 FAIL (dead `.eng-tab-body ul` selector) → fixed → ✅ run 3 PASS.
  - `vite build` passes.
  - Puppeteer checks at 1440 wide (800 tall), then resized to 390 wide, and with reduced motion:
    - No horizontal overflow and zero console errors.
    - The canvas mounts on desktop only.
    - All 4 tabs, arrow keys and the hover preview work.
    - The mobile accordion works.
    - The trust strip reveals.
  - Decisions to flag:
    - No GSAP, because it isn't installed. The tweens are hand-written.
    - Driven by clicks and hover, with no scroll pinning. Sections 1 and 3 already pin.
    - The scene uses its own WebGL context, mounted only near the viewport, because there is no shared renderer.
    - Bloom is faked with an additive billboard.
    - "See how we work" links to `#case-study`.
    - The CTA uses indigo-500 (4.47:1), consistent with the rest of the page.
- **Next Steps:**
  - Things for you to do:
    - Confirm the trust-strip claims: least-privilege access, and that source, docs and credentials are handed over.
  - Still pending from earlier:
    - The hero fold overflow fix (~21px), awaiting your approval.
    - The ChoosePath links to Diskobre and Caleho don't have UTM params.
  - Next phase: the Stats section, waiting on your spec — awaiting your approval.
