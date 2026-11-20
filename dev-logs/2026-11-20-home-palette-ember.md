# Dev Log — Home Page Palette Trial (Orange × Navy)

### Phase 1: Home page palette trial — tokens and above-the-fold (Hero, ConnectedBackboneScene, ChoosePath, home-only nav CTA)

- **Timestamp:** 2026-11-20 15:58
- **Mode:** Edit access yes · Terminal yes
  - Commands run:
    - `npm run build`, run by the orchestrator under your standing permission. It passed. The only warning was the existing >500kB three.js chunk warning.
    - `php artisan test`, run by QA. 31 passed, 116 assertions.
    - QA also ran read-only searches and mtime checks.
  - No git commands were run.
- **Persona(s) Active:** 🏗️ Architect plan → 🎨 UI-UX build → 🧪 QA
- **Decisions you approved:**
  - Your palette: `#FF6500`, `#1E3E62`, `#0B192C` and `#000000`.
  - A near-complementary scheme (orange against navy).
  - A 60-30-10 split:
    - 60: `#0B192C` as the base.
    - 30: `#1E3E62` for surfaces.
    - 10: `#FF6500` as the accent.
  - Orange buttons use `#0B192C` text, because white on `#FF6500` is only 2.95:1.
  - The trial is limited to the home page with a `data-theme` attribute.
  - You approved the plan as written, with every row assigned to 🎨 UI-UX.
    - You asked whether the 🖥️ Frontend persona contributed. It didn't.
    - Splitting the work with 🖥️ Frontend was offered, and you didn't take it.
- **Files Modified/Created:**
  - `tailwind.config.js` — Added two colour scales:
    - `ember` (50–900). Key steps: 300 `#FF9A5C`, 400 `#FF7F2A`, 500 `#FF6500`.
    - `abyss` (50–950). Key steps: 700 `#1E3E62`, 900 `#0B192C`, 950 `#000000`.
  - `resources/css/app.css` — Three additions:
    - A `[data-theme="ember"]` block that overrides the tokens. `:root` is unchanged. `--gradient-brand` becomes `#FF6500` → `#FF8A3D`.
    - Home-only nav CTA rules, keyed on `[data-nav-theme="ember"]`.
    - Scoped ember overrides for the ChoosePath bento cards. They include `ember-*` recoloured copies of the badge and row glow keyframes, under `prefers-reduced-motion: no-preference`.
  - `resources/js/pages/home-page/page.jsx` — The sections are wrapped in `<div data-theme="ember">`.
  - `resources/js/pages/home-page/_sections/Hero.jsx` — Recoloured the hero:
    - Background, overlays and ring offsets use `abyss-900`.
    - A navy grid.
    - The poster glow has an orange core.
    - The heading phrase uses `ember-500`.
    - The primary CTA is `ember-500` with `#0B192C` text, and `ember-400` on hover.
    - The secondary CTA has a navy outline.
    - Focus rings are ember.
  - `resources/js/pages/home-page/_sections/ConnectedBackboneScene.jsx` — Recoloured the 3D scene:
    - The network is navy: blocks, edges, rings, grid, fog and ambient light.
    - The core and pulses are orange.
    - Labels are navy, with an ember border on the active label.
  - `resources/js/pages/home-page/_sections/ChoosePath.jsx` — Recoloured the section:
    - The section background is `abyss-900`.
    - The eyebrow, icons and links are ember.
    - Card eyebrows use `abyss-200`. Body text uses `slate-300`.
    - The flow track and dot are ember.
    - Flow labels now use `slate-400`. They were `slate-500`, about 3.7:1.
  - `resources/js/components/layout/LandingLayout.jsx` — Uses `usePage()` to set `data-nav-theme="ember"`, only when the URL is `/`.
- **Issues Encountered:**
  1. The 🎨 UI-UX subagent had no shell, so it could not run the build.
  2. The ChoosePath card colours are defined in `app.css`, not in the JSX. Recolouring them needed scoped CSS overrides and duplicated keyframes.
  3. The nav CTA is in `SiteHeader.jsx`, which wasn't in the blueprint.
  4. `--blue` could not simply be remapped to orange. StickyCta puts white text on `var(--blue)`, which would fail contrast on orange.
- **Resolution:**
  1. The orchestrator ran `npm run build`. It passed.
  2. Added the scoped `[data-theme="ember"]` overrides and the `ember-*` keyframe copies to `app.css`. The original rules were left in place.
  3. Recoloured the CTA with a CSS selector on its `bg-[var(--blue)]` class, under `[data-nav-theme="ember"]`. `SiteHeader.jsx` was not edited.
  4. Left `--blue` unchanged on purpose. StickyCta is part of Phase 2.
- **QA Checklist Result:** ✅ PASS on the first run (0 ❌, 10 ⚠️).
  - `npm run build` passes. The only warning is the existing three.js chunk-size warning.
  - `php artisan test`: 31 passed, 116 assertions.
  - Contrast checks:
    - `#0B192C` on `#FF6500` (primary CTA): 5.98:1.
    - `#0B192C` on `#FF7F2A` (CTA hover): 6.99:1.
    - `#FF6500` on `#0B192C`: 5.98:1.
    - `ember-300` links on the cards: at least 5.22:1.
    - `ember-400` focus rings: at least 5.0:1.
  - The mtime checks confirm that only the 7 blueprint files changed.
  - Open ⚠️ warnings:
    - W1: The trial can only partly be reversed with `data-theme`, because the JSX hardcodes `ember` and `abyss` classes.
    - W2: The nav CTA selector is fragile. Add a stable hook in `SiteHeader.jsx`, for example `data-cta="primary"`.
    - W3: The `[data-nav-theme] .nav-link--active` rule never applies, because there is no Home nav item.
    - W4: On the home page, the StickyCta and SiteFooter focus rings became `ember-400` through `var(--cyan)`.
    - W5: The original indigo bento rules and keyframes (`app.css` ~146–358) can no longer be reached on the home page. Delete them if you adopt the palette.
    - W6: The `indigo-400/60` dot at `TrustBar.jsx:89` shows in the hero.
    - W7: On `/`, the SiteHeader focus rings and mega-menu accents are still cyan.
    - W8: The glow keyframes animate paint properties. This was already the case; the motion itself is unchanged.
    - W9: The "View Demos" border (`abyss-500`) is 2.51:1 against `abyss-900`. Consider `abyss-400`.
    - W10: `public/hot` exists, so browser checks load the Vite dev assets.
  - Browser checks still needed:
    - Whether the 60-30-10 split feels right.
    - The 3D scene colours.
    - The nav CTA on `/` compared with other pages.
    - The card spotlight.
    - Focus rings.
    - Responsive layouts.
    - Reduced motion.
- **Next Steps:**
  - Phase 2: recolour the rest of the home page:
    - Platform, including CollapseScene.
    - Engineering, including ArchitectureScene.
    - Connect.
    - FinalCta.
    - The StickyCta blue pill.
    - SiteFooter on the home page.
  - Suggested additions for Phase 2:
    - The TrustBar dot (W6).
    - The "View Demos" border (W9).
    - Optional: recolour SiteHeader and add a stable CTA hook (W2, W7).
  - Phase 2 is awaiting your approval.
