# Choose Your Path — Bento Grid

### Phase 1: "Choose Your Path" bento grid directly below the hero fold

- **Timestamp:** 2026-11-12 10:54
- **Mode:** Edit access yes · Terminal yes
- **Persona(s) Active:** 🎨 UI/UX + 🖥️ Frontend, 🧪 QA
- **Files Modified/Created:**
  - `resources/js/pages/home-page/_sections/ChoosePath.jsx` — New section (`#paths`) with 4 bento cards:
    - Automate Sales & Marketing: large `lg` 2×2 card with a decorative automation-flow visual.
    - Launch Turnkey Industry Software: medium card (Gym, HRIS, Clinic).
    - Power Up with Our Cloud & Lead Platforms: medium card with separate external Diskobre.com and Caleho.cloud links.
    - Build Custom Enterprise Software: full-width bottom card.
    - Each card has a Lucide icon, title, one-line benefit, 3–4 chips and a link.
    - Cards 1, 2 and 4 → `#contact`, as the user chose.
  - `resources/css/app.css` — Bento card styling:
    - Cursor-follow spotlight: `--mx`/`--my` drive a radial gradient on `::before`, only under `(hover:hover) and (pointer:fine)`.
    - Scroll "build" effect: staggered card rise, SVG outline draw, content reveal and a looping flow dot.
    - All motion and the hidden starting state sit inside `prefers-reduced-motion: no-preference`.
  - `resources/js/pages/home-page/page.jsx` — Section order is now Hero → ChoosePath (the "fold method": the lower sections are unchanged for now).
  - `public/build/*` — Rebuilt.
- **Issues Encountered:**
  1. The SVG `pathLength="1"` was ignored once the rect geometry was set in CSS, so the dash pattern became 1px and the outline was invisible.
  2. The flow labels were cut off at 390px wide.
  3. The large card had dead space below the flow visual.
  4. First QA run failed: `bento-flow` animated `top`, and there were one-off hex values (`#0a0f22`, `#0b1030`). QA also warned about a long stagger, `rounded-3xl`, `backdrop-filter`, and the spotlight transition not being guarded for reduced motion.
- **Resolution:**
  1. Switched to a fixed 4000px dash (larger than any card's perimeter). Added x/y/width/height attributes on the rect as a Safari fallback.
  2. Step meta text is hidden below `sm`.
  3. The flow visual now flexes to fill the card and centres its steps.
  4. The flow dot now moves via `transform` on `.bento-flow-track`; the hexes now use the established `#060a18`. Stagger is 80ms with a 450ms reveal, cards use `rounded-2xl`, the blur is removed, and the spotlight transition is moved under the guard.
- **QA Checklist Result:** ❌ → fixed → ✅ PASS on re-run.
  - Puppeteer at 1440×900, 390×844 and with reduced motion:
    - Layout spans are correct.
    - Cards build in from opacity 0 to 1 on scroll.
    - With reduced motion they are static and visible straight away.
    - Links and the spotlight work, with no console errors.
  - Still needs a real-browser check of animation feel and Safari.
- **Next Steps:** Continue the fold method with the next section below (currently `Stats`), and only after you approve its plan. The hero desktop padding fix (~21px over the fold at 1440×900) is still waiting for your approval.
