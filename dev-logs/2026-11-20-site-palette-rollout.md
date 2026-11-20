# Dev Log — Site-wide Plum & Mist rollout

Applies the home page design (black / mauve / plum backgrounds, mist text, magenta → iris accents) to the other public pages. Home page work is logged in `2026-11-20-home-palette-plum.md`.

**Your decisions:**
- **Scope:**
  - Shared header, footer and chat bubble.
  - About and What We Do.
  - Demos, Privacy and Terms.
  - TimeSync and GymAsura.
  - The public certificate page.
  - Login and admin are excluded.
- **Section rhythm:** black and mauve-with-glass sections alternate, with a plum closing CTA.
- **Products:** use the full site palette.
- **Phasing:** four phases.

### Phase 1: Shared parts (header, footer, chat bubble, credentials chip)

- **Timestamp:** 2026-11-20 19:15
- **Mode:** Edit access yes · Terminal yes
  - Commands run: `npm run build` (x2), mtime checks, and a browser check. No git commands.
- **Persona(s) Active:** 🏗️ Architect → 🎨 UI-UX build → QA by the orchestrator (token-light, with two small fixes applied directly)
- **Files Modified/Created:**
  - `resources/js/components/layout/LandingLayout.jsx` — `data-nav-theme="plum"` is now set on every route. Removed the `isHome` check and the `usePage` import.
  - `resources/css/app.css`:
    - A nav-scoped `--aurora` / `--aurora-deep` block.
    - The aurora classes and `.footer-aurora-*` now apply under `:is([data-theme="plum"],[data-nav-theme="plum"])`.
    - The header gets an aurora hairline, an aurora underline on the active link (desktop `.nav-link--active` and the new mobile `.nav-drawer-link--active`), and magenta-400 menu icons on hover and focus.
    - The page-body tokens and `:root` are unchanged.
  - `resources/js/components/layout/SiteHeader.jsx`:
    - Black frosted bar and black mega menus with plum-800/60 borders.
    - Mauve-300 labels, mist titles and mist focus rings.
    - Aurora-deep CTAs on desktop and in the drawer. Black drawer.
    - `data-cta` and aria attributes are unchanged.
  - `resources/js/components/layout/SiteFooter.jsx` — The black styling is now the only version. Removed the `tone` prop and the navy branch.
  - `resources/js/pages/home-page/page.jsx` — `<SiteFooter />`.
  - `resources/js/components/ui/ChatWidget.jsx`:
    - The bubble, user messages and send button use aurora-deep. The panel and input bar are black / plum-950.
    - Chips use `aurora-border--hover`. Inputs get a magenta-600 focus ring and error text is rose-400.
    - Added `motion-reduce` fallbacks for the panel transition, typing dots, ping and hover scale.
  - `resources/js/components/ui/CredentialsChip.jsx` — Plum-900/60 background, plum-800 border, mist text, mauve-300 label and a magenta-400 focus ring. Dropped `glass-chip`.
- **Issues Encountered:**
  1. The mega-menu panel was see-through: the page heading showed through `rgba(0,0,0,0.94)`. The nested `backdrop-filter` doesn't apply inside a header that already has one.
  2. The mobile drawer was squeezed to 71px. A `backdrop-filter` on `<header>` makes it the containing block for the `fixed` drawer.
  3. After the edits, the console showed a one-off "Invalid hook call" warning.
- **Resolution:**
  1. The panel background is now solid `#000`. Confirmed with a screenshot.
  2. Moved the header's background and blur onto an `aria-hidden` `absolute inset-0 -z-10` layer inside the header. The drawer is now 844px tall (full screen) and was confirmed with a screenshot. The header is still 72px and the bar is still `rgba(0,0,0,0.82)`.
  3. It came from Vite hot-reload. Clean loads of `/` and `/about` with console and pageerror listeners showed 0 errors.
- **QA Checklist Result:** ✅ Token-light QA by the orchestrator, with the 2 issues above fixed.
  - `npm run build` passes. Only the 7 blueprint files changed.
  - No indigo, violet, cyan, sky, blue-*, `var(--blue)`, `#060a18` or dark slate left in SiteHeader, SiteFooter, ChatWidget or CredentialsChip.
  - `/about`: black header, gradient underline on the active "About" link, restyled chat panel, black footer `rgb(0,0,0)`. The page body is unchanged until Phase 2.
  - `/login` has no `data-nav-theme` and no chat widget, so it is unaffected.
  - No horizontal overflow at 390.
- **Open warnings:**
  - About, What We Do, Products, Demos and Legal still show their old navy bodies inside the new header and footer until Phases 2–3.
  - The product pages have their own footers (Phase 3).
- **Next Steps:**
  - Phase 2: About and What We Do.
  - Awaiting your approval.

### Phase 2: About + What We Do

- **Timestamp:** 2026-11-20 19:30
- **Mode:** Edit access yes · Terminal yes
  - Commands run: `npm run build`, mtime checks, and a browser check. No git commands.
- **Persona(s) Active:** 🏗️ Architect → 🎨 UI-UX build → QA by the orchestrator (token-light)
- **Files Modified/Created:**
  - `resources/js/pages/about/page.jsx`:
    - Wrapped in `data-theme="plum"`.
    - Sections re-colored: black hero ("fix your process" uses `.aurora-text`) → mauve story in a glass card → black team → mauve principles with glass cards and gradient icon tiles → black numbers in `.aurora-text` → plum-900 products → plum-900 final CTA. A faint border separates the two plum bands.
    - Product cards have a plum outline. Light glass over plum would put pink-800 small text at about 3.9:1.
    - Copy, links, aria attributes and conditional rendering are unchanged.
  - `resources/js/pages/what-we-do/page.jsx`:
    - Wrapped in `data-theme="plum"`.
    - Band order: black hero → black frosted sticky tab bar with an aurora underline on the active tab → service blocks alternating mauve (even index) and black (odd index).
    - The alternation is computed from `BLOCKS.length` through a `TONES` map, so it ignores the old `block.theme`. With 4 blocks, "How it connects" is mauve and "How we work" is black.
    - Then a black tech strip (with a faint top border) and a plum-900 closing CTA.
- **Issues Encountered:**
  1. The About products band and the final CTA are both plum-900.
  2. The tech strip follows a black band.
  3. `PIPELINE_STEPS.accent` still holds old hex values.
- **Resolution:**
  1. Added a faint border at the seam.
  2. Added a faint top border.
  3. Left as is. The field isn't rendered.
- **QA Checklist Result:** ✅ Token-light QA by the orchestrator.
  - `npm run build` passes. Only the 2 blueprint files changed.
  - No page errors.
  - `/about` section backgrounds: black, mauve, black, mauve, black, plum, plum.
  - `/what-we-do` section backgrounds: black, mauve, black, mauve, black, mauve, black, black, plum.
  - The sticky tab bar stays at `top: 72` across scroll, and the active tab follows the section.
  - Screenshots confirm the What We Do hero gradient phrase, the mauve glass service cards, the black service cards with gradient icons and CTA, and the About story glass card.
  - No horizontal overflow at 390 on either page.
- **Open warnings:**
  - If the About team list is empty, the two mauve bands would touch.
  - Headings changed from bold to semibold to match the home page.
  - Still to check in a browser: the overlap between the card hover ring and the focus ring.
- **Next Steps:**
  - Phase 3: TimeSync, GymAsura, Demos, Privacy, Terms and DarkPageShell.
  - Awaiting your approval.

### Phase 3: TimeSync, GymAsura, Demos, Privacy, Terms

- **Timestamp:** 2026-11-20 19:40
- **Mode:** Edit access yes · Terminal yes
  - Commands run: `npm run build`, mtime checks, and a browser check. No git commands.
- **Persona(s) Active:** 🏗️ Architect → 🎨 UI-UX build → QA by the orchestrator (token-light)
- **Files Modified/Created:**
  - `products/timesync/page.jsx`, `products/gymasura/page.jsx` — Wrapped in `data-theme="plum"`. Added `<SiteFooter />`; the product pages had no footer before.
  - `TimeSyncHero.jsx`, `GymAsuraHero.jsx`:
    - Black band with a plum/magenta glow.
    - "Live" badges in magenta with a motion-safe pulse. The key phrase uses `.aurora-text`.
    - Plum chips. `.aurora-btn` primary button and a mist-outline secondary button.
    - Plum browser-frame mock and skeletons.
    - Glass stat cards (`bg-white/90`, so small text stays ≥5.4:1).
    - Magenta/iris/mauve window dots. Carousel dots are mauve-700, magenta-400 when active.
    - The GymAsura photo tint is plum.
  - `TimeSyncFeatures.jsx`, `GymAsuraFeatures.jsx` — Mauve band with glass backdrop. Glass cards with a hover ring on a wrapper element. Aurora-deep icon tiles. The per-feature color map and `dark:` variants are removed.
  - `TimeSyncCTA.jsx`, `GymAsuraCTA.jsx` — Plum-900 band with low-opacity plum/magenta glows. "time tracking?" and "level up your gym?" use `.aurora-text`. `.aurora-btn` primary and mist-outline secondary buttons.
  - `components/layout/DarkPageShell.jsx` — Plum theme on black. The glow is plum/magenta. Mist headings, magenta-400 eyebrow, mauve-300 body text, plum-800/60 dividers, and magenta-400 links.
  - `legal/privacy/page.jsx` — Bold labels are now mist.
  - `legal/terms/page.jsx` — Unchanged. Its links come from DocSection.
  - `demo-portal/page.jsx` — Plum-950/60 cards with a hover ring. `.aurora-btn` buttons. Magenta dots.
  - `motion-reduce` guards were added to the pulses, shine, photo zoom and arrow nudges that were touched.
- **Issues Encountered:**
  1. Putting `aurora-border--hover` directly on `.glass-card` would override the card's own edge and shadow.
  2. GymAsura's Unsplash hero photo failed in the test browser with `net::ERR_BLOCKED_BY_ORB`.
- **Resolution:**
  1. The ring sits on a wrapper element instead.
  2. Not caused by this phase. It's an external image URL; see open warnings.
- **QA Checklist Result:** ✅ Token-light QA by the orchestrator.
  - `npm run build` passes.
  - 11 files changed, all within the blueprint.
  - No page errors.
  - TimeSync and GymAsura sections are black, mauve, then plum, and both now render a footer.
  - `/demos`, `/privacy` and `/terms` have a black shell and a footer.
  - No horizontal overflow at 390 on any of the 5 pages.
  - Screenshots confirm the TimeSync hero (gradient "Pay Accurately.", plum badge, gradient button) and the Terms page (black shell, magenta eyebrow, plum dividers).
- **Open warnings:**
  - The GymAsura photo depends on a hot-linked Unsplash URL. Consider self-hosting it.
  - The demo cards lost their old per-product spotlight.
  - Still to check in a browser: the feature-card hover ring, and the `#features` / `#contact` anchors now that the footer comes after them.
- **Next Steps:**
  - Phase 4: the public certificate verification page.
  - Awaiting your approval.

### Phase 4: Public certificate verification page

- **Timestamp:** 2026-11-20 19:45
- **Mode:** Edit access yes · Terminal yes
  - Commands run: `npm run build`, mtime checks, a read-only `php artisan tinker` lookup of a certificate UUID for testing, and a browser check. No git commands.
- **Persona(s) Active:** 🏗️ Architect → 🎨 UI-UX build → QA by the orchestrator (token-light)
- **Decisions you approved (recommended options):**
  - `CertificateCard.jsx` stays unchanged, because it is the downloadable certificate artwork.
  - The "Verified" badge stays green for trust semantics. Only its container styling is on-palette.
- **Files Modified/Created:**
  - `certificates/view/page.jsx`:
    - `data-theme="plum"` and a black root background.
    - Glows are plum-600/10 and magenta-500/5. A blue orb that wasn't listed in the plan also became plum.
    - The logo tile is a magenta-600→iris-600 gradient, and "TECH" uses `.aurora-text`.
    - Text: mist headings (the recipient name was a white→slate gradient), mauve-300 body, magenta-400 eyebrow. Mist focus rings.
    - The Download and error-state buttons use `.aurora-btn`. Loading skeletons are plum.
    - `useReducedMotion` now turns off the entrance and hover/tap motion when reduced motion is on.
  - `certificates/view/_sections/VerificationBadge.jsx` — The container has a plum-800/60 border and a plum-950/50 background with blur, plus a subtle emerald ring and glow. The emerald icon and the "Verified Certificate" text are unchanged. The date is mauve-300.
- **Issues Encountered:** The first load logged "Invalid hook call" errors from `qrcode.react`. The stack traces showed two different Vite dependency-optimizer hashes (`?v=f745a55f` vs `?v=7079fa0d`), meaning duplicate React chunks after Vite re-optimized its dependencies mid-session.
- **Resolution:** A dev-server cache artifact, not a code issue. Two clean reloads gave 0 page errors and the QR code rendered.
- **QA Checklist Result:** ✅ Token-light QA by the orchestrator.
  - `npm run build` passes. Only the 2 blueprint files changed.
  - Real certificate: black background `rgb(0,0,0)`, and the screenshot confirms the gradient logo, the green badge on a plum container, and the certificate unchanged.
  - The "not found" UUID shows "Certificate Not Found" with the gradient "Go to Homepage" button.
  - No horizontal overflow at 390.
- **Open warnings:**
  - Download wasn't clicked. The card's code wasn't touched, so the PNG output should be identical.
  - The error icon uses rose, which is a status color.
- **Rollout summary:**
  - Every public page now uses the Plum & Mist design: home, about, what-we-do, both product pages, demos, privacy, terms and the certificate page.
  - Login and admin are excluded, as you chose.


### Navbar: transparent over the hero, frosted on scroll

- **Timestamp:** 2026-11-20 19:50
- **Mode:** Edit access yes ? Terminal yes
  - Commands run: `npm run build` and a browser check. No git commands.
- **Persona(s) Active:** ??? Architect ? ??? Frontend + ?? UI-UX in parallel (disjoint files) ? QA by the orchestrator (token-light)
- **Files Modified/Created:**
  - `components/layout/SiteHeader.jsx` (???):
    - New `scrolled` state. It reads `scrollY > 8` on mount and updates through a passive, rAF-throttled scroll listener that is cleaned up on unmount.
    - `isSolid = scrolled || Boolean(openMenu) || drawerOpen` sets `data-scrolled` on `<header>`.
    - The bottom border is `border-transparent` until the header is solid.
    - The frosted layer fades with opacity over 300ms. The fade is off under reduced motion.
  - `components/layout/LandingLayout.jsx` (???) ? The wrapper is now `bg-black`, and `<main>` gets `-mt-[72px]` so page content slides under the sticky header.
  - `resources/css/app.css` (??) ? The aurora hairline `.site-header::after` is at opacity 0 until `[data-scrolled="true"]`. Its 300ms fade only runs when reduced motion is off.
  - Hero spacers (??) ? `<div aria-hidden="true" className="h-[72px]" />` as the first in-flow child of the first section in:
    - home `Hero.jsx`
    - `about/page.jsx`
    - `what-we-do/page.jsx`
    - `TimeSyncHero.jsx`
    - `GymAsuraHero.jsx`
    - `DarkPageShell.jsx`
- **Issues Encountered:**
  1. `GymAsuraHero` was a horizontal flex row with a fixed height, so a spacer would have become an empty column.
  2. During the parallel edits, the console showed one Vite HMR 500 error for `app.css`.
- **Resolution:**
  1. The section is now a vertical stack: a `shrink-0` spacer, then an inner `flex-1 lg:flex-row` row. The height went from `calc(100vh-4rem)` to `calc(100vh - 4rem + 72px)`, so the split and the centering are unchanged.
  2. It came from HMR catching a half-written file. The production build passes, and the new hairline rule is active in the browser.
- **QA Checklist Result:** ? Token-light QA by the orchestrator.
  - `npm run build` passes. Only the 9 blueprint files changed.
  - On /, /about, /what-we-do, /products/timesync, /products/gymasura and /privacy, at the top of the page:
    - `data-scrolled="false"`, frosted layer opacity 0, hairline opacity 0, border transparent.
    - The first section starts at y=0, behind the header.
  - After scrolling, the header is `true`, the frosted layer is at opacity 1 and the hairline at opacity 1.
  - An open mega menu at the top forces `true`. The mobile drawer is still full-height (844px) and forces `true`.
  - Screenshots confirm the transparent nav over the home hero grid and the frosted bar with hairline when scrolled.
- **Open warnings:**
  - Rule for future pages: any page using `LandingLayout` must start with a dark section, or the mist nav text will be unreadable at the top.
  - Hero content offset is unchanged by construction (spacer 72px = main pull-up 72px). It was not pixel-compared against pre-change screenshots.
- **Next Steps:** Awaiting your direction.


### Choose your path: Explore link destinations

- **Timestamp:** 2026-11-20 20:00
- **Mode:** Edit access yes ? Terminal yes
  - Commands run: `npm run build` and a browser check. No git commands.
- **Persona(s) Active:** ??? Architect ? ??? Frontend ? QA by the orchestrator (token-light)
- **Files Modified/Created:**
  - `home-page/_sections/platform/FeatureShowcase.jsx` ? The `SectionIntro` wrapper gets `id="inside-platform"` and `scroll-mt-24`.
  - `home-page/_sections/ChoosePath.jsx` ? Link changes:
    - "Automate Sales & Marketing" ? Explore now goes to `#inside-platform` (was `#platform`, the top of the stack-collapse animation).
    - "Launch Turnkey Industry Software" ? Explore now goes to `/demos` (was `#demos`, a dead link because DemoShowcase is commented out on the home page).
    - Internal page links render as Inertia `<Link>` through a `Tag` switch. Hash and external links stay `<a>`.
- **Issues Encountered:** The console logged one Vite HMR 500 for `ChoosePath.jsx?t=?` while the file was being edited.
- **Resolution:** It was an HMR artifact. Test runs after the build had 0 page errors.
- **QA Checklist Result:** ? Token-light QA by the orchestrator.
  - `npm run build` passes.
  - Clicking Explore on card 1 lands `#inside-platform` at 96px from the top (below the 72px header), with the heading fully visible at both 1440 and 390.
  - Clicking Explore on card 2 navigates to `/demos`. A window marker survived, which confirms Inertia client-side navigation with no full reload.
  - The other card links are unchanged: Diskobre, Caleho and `#engineering`.
- **Next Steps:** Awaiting your direction.
