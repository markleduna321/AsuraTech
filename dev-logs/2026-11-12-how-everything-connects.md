# Dev Log — How Everything Connects (Section 7)

### Phase 1: Section 7 — How everything connects (4-step connected flow, agencies-vs-partner comparison, CTAs)

- **Timestamp:** 2026-11-12 16:22
- **Mode:** Edit access yes · Terminal yes
- **Persona(s) Active:** 🎨 UI/UX + 🖥️ Frontend build → 🧪 QA
- **Files Modified/Created:**
  - New files, all under `resources/js/pages/home-page/_sections/connect/`:
    - `connectData.js` — Section copy, kept separate from the components:
      - `STEPS`, 4 steps:
        - Generate Leads → Diskobre.com, links to `#ecosystem`.
        - Capture & Nurture → Automation & AI, links to `#platform`.
        - Manage Operations → HRIS · Gym · Clinic (`#demos`) and Custom ERP (`#engineering`).
        - Scale Securely → Caleho.cloud (`#ecosystem`) and IT Consultancy (`#engineering`).
      - Accents are amber-400, indigo-400, slate-300 and cyan-400, reused from Sections 3 and 5.
      - `COMPARISON`: 4 rows (agencies vs partner). You confirmed all 4 stay.
    - `ConnectSection.jsx` — Section wrapper (`section#connected`):
      - Eyebrow "The unfair advantage" and H2 "One partner. One connected system. Zero hand-offs."
      - An `<ol role="list">` of 4 `<li>` steps. Each step has an icon node and a glass card containing an outline mono numeral, title, benefit line and accent tag links.
      - Each step has a line segment with a gradient from its accent to the next step's accent.
      - A one-off intro pulse travels node to node, then a soft 8s idle loop runs and pauses when offscreen.
      - The comparison is a `<table>` with an sr-only caption, `th scope` headers and ✕/✓ marks.
      - Closing CTAs "Start Automating" and "Book a Consultation" both go to `#contact`.
      - Reuses the `eng-blueprint` grid background.
  - Changed files:
    - `resources/css/app.css` — Added a "Section 7" block (lines ~570–752):
      - `.flow-seg`, `.flow-seg-line`, `.flow-seg-run`, `.flow-dot`, `.flow-node-ring`.
      - The line is vertical on mobile and horizontal at ≥1024px.
      - The line draws via scaleX/scaleY, and the pulses move via translateX/translateY.
      - Hover brightens the line using `:has`, and the card lifts.
      - All motion sits under `prefers-reduced-motion: no-preference`. Under reduced motion the line is fully drawn and static, with no pulses.
    - `resources/js/pages/home-page/page.jsx` — Renders `<ConnectSection />` after `<EngineeringSection />`.
- **Issues Encountered:**
  1. The node-ring animation used fill-mode `both`, which overrode the hover opacity.
  2. QA run 1 (FAIL): one ❌ on Rule 6. The builder ran `npm run build` for verification while the Vite dev server was running.
- **Resolution:**
  1. Switched the node-ring animation fill-mode to `backwards`, so hover opacity applies again.
  2. You explicitly waived the Rule 6 failure and granted standing permission to run `npm run build` for verification. QA run 2 then returned ✅ PASS.
- **QA Checklist Result:** ❌ run 1 FAIL (code ✅, Rule 6 ❌) → waived by you → ✅ run 2 PASS (0 ❌, 3 non-blocking ⚠️).
  - Puppeteer checks at 1440, 900 and 390 wide, and with reduced motion:
    - No horizontal overflow and zero console errors.
    - Segments span exactly from node centre to node centre in both orientations.
    - Hover brightens the incoming and outgoing segments.
    - Reduced motion shows a static line.
    - All anchors resolve.
  - Warnings (non-blocking):
    - `#060a18` is used as a page-wide dark constant rather than a token.
    - The idle loop is infinite, but faint, paused offscreen and disabled under reduced motion.
    - Some checks still need a real browser: focus rings, `:has` support and screen-reader reading of the table.
  - Earlier QA notes:
    - The line geometry is tied to `gap-8`/`lg:gap-6` and `h-10` node sizes.
    - The node-ring hover glow stays visible under reduced motion, but it is static.
  - Decisions to flag:
    - CSS-only, with no WebGL and no GSAP.
    - The line is drawn and pulsed with transforms instead of SVG `stroke-dashoffset`, following the project's transform/opacity-only animation rule.
    - Step 4 also links IT Consultancy to `#engineering`. Its Caleho tag still goes to `#ecosystem`.
- **Next Steps:**
  - Still pending from earlier:
    - The hero fold overflow fix (~21px), awaiting your approval.
    - The ChoosePath links to Diskobre and Caleho don't have UTM params.
    - Your confirmation of the Section 6 trust-strip claims.
  - Next phase: the Stats section, waiting on your spec — awaiting your approval.
