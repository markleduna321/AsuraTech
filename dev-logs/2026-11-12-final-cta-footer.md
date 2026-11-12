# Dev Log — Final CTA, Lead Capture & Footer (Section 8)

### Phase 1: Section 8 — Final CTA, lead capture and footer (audit form, Demo Portal card, sticky CTA, site footer)

- **Timestamp:** 2026-11-12 17:18
- **Mode:** Edit access yes · Terminal yes
- **Persona(s) Active:** ⚙️ Backend + 🖥️ Frontend + 🎨 UI-UX build → 🧪 QA
- **Decisions you approved:**
  - A short audit form only, with no scheduler.
  - Each submission is saved as a Lead and sends a confirmation email. The success copy says we'll email within 24h to pick a time.
  - A migration is allowed. `php artisan migrate` was run.
  - The old Stats, Services, FeaturedProject, Contact and Footer sections were removed from `page.jsx`. Their files were kept.
  - All "Start Automating" and "Book a Consultation" CTAs now point to `#get-started`.
  - You confirmed the trust line "15 minutes. No obligation. No sales pressure." is true.
  - You gave standing permission to run `npm run build` for verification.
- **Files Modified/Created:**
  - New backend files:
    - `database/migrations/2026_11_12_170000_add_audit_fields_to_leads_table.php` — Adds these columns to `leads`:
      - `business_type` and `source` (`source` is indexed).
      - `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`.
      - `consented_at`.
      - `down()` reverses the migration.
    - `tests/Feature/LeadSubmissionTest.php` — 5 tests:
      - A valid audit submission returns 201 and stores attribution and consent. Mails are faked.
      - Returns 422 when `business_type` or consent is missing.
      - Returns 422 when the honeypot is filled.
      - A chat lead with no consent returns 201.
      - Returns 429 after 5 submissions in a minute.
  - New frontend files, all under `resources/js/pages/home-page/_sections/final-cta/`:
    - `finalCtaData.js` — Section copy, kept separate from the components:
      - Copy, business types and contact info.
      - Footer columns. The Ecosystem links carry UTM params.
      - `DEMO_PORTAL.url` and `credentials` are `null`, so the portal falls back to `#demos`.
      - `LEGAL_LINKS = []`.
    - `tracking.js` — Event and attribution helpers:
      - `track()` sends to `dataLayer` and dispatches an `asura:track` CustomEvent.
      - Captures first-touch UTM params in `sessionStorage`.
      - Records which CTA brought the visitor to the form (source attribution).
    - `AuditForm.jsx` — The audit form:
      - Fields: name, work email, business type, an optional "what are you trying to fix?", a consent checkbox and a honeypot.
      - Prefills from query params.
      - Inline validation that focuses the first error and links messages with `aria-describedby`.
      - Server 422 errors map to their fields. 429 and generic errors show in an alert.
      - A success state that receives focus.
      - Events: `audit_form_submit`, `audit_form_success`.
    - `FinalCtaSection.jsx` — Section wrapper (`section#get-started`, with a `#contact` alias anchor):
      - The audit card is the primary, with a CSS conic border sweep.
      - The Demo Portal card is the outline secondary. Its HRIS, Gym and Clinic tiles open in a new tab with `rel=noopener`.
      - Records which CTA was clicked, for source attribution.
      - Events: `audit_cta_click`, `demo_portal_click`, `demo_tile_click`.
    - `SiteFooter.jsx` — Brand and contact, Solutions / Ecosystem / Company columns, and the copyright line.
    - `StickyCta.jsx` — A "Book Free Audit" pill:
      - It shows after `#paths` and hides while `#get-started` or the footer is in view.
      - When hidden it is `aria-hidden` and `tabIndex=-1`.
      - On mobile it is offset so it doesn't overlap the chat bubble.
  - Changed backend files:
    - `app/Models/Lead.php` — New fillable fields and a `consented_at` cast.
    - `app/Http/Requests/StoreLeadRequest.php` — Validation for the audit form:
      - Business types and the audit rules.
      - Consent uses `exclude_unless` audit plus `accepted`.
      - A `website` honeypot (`prohibited`).
      - A regex for `source`.
      - Custom messages and a `leadAttributes()` helper.
    - `app/Http/Controllers/Api/LeadController.php` — Uses `leadAttributes()`.
    - `app/Providers/AppServiceProvider.php` — A `leads` rate limiter: 5 per minute and 30 per day per IP.
    - `routes/api.php` — Adds `throttle:leads` to `POST /leads`.
    - `resources/views/emails/new-lead.blade.php` — Adds Business and Source/UTM rows. The footer says whether the lead came from the audit form or the chatbot.
    - `resources/views/emails/lead-confirmation.blade.php` — Step 2 is now specific to audit leads.
    - `phpunit.xml` — Enables sqlite `:memory:`, so `RefreshDatabase` can't wipe the dev DB.
  - Changed frontend files:
    - `resources/css/app.css` — Added a "Section 8" block:
      - Grid mask, breathing glow, conic sweep and the sticky CTA states.
      - All motion sits under `prefers-reduced-motion: no-preference`.
    - `resources/js/pages/home-page/page.jsx` — Removed the old sections. Added `FinalCtaSection`, `SiteFooter` and `StickyCta`.
    - `Hero.jsx`, `platform/ValueStrip.jsx`, `connect/ConnectSection.jsx` — CTAs now go to `#get-started`.
    - `engineering/engineeringData.js` — The primary CTA goes to `#get-started`. "See how we work" goes to `#connected`, because `#case-study` was removed.
    - `ChoosePath.jsx` — The card Explore links now go to `#platform` and `#demos`. They pointed at `#contact`, which was removed.
    - `demos/DemoShowcase.jsx` — Now exports `CredentialsChip`.
- **Issues Encountered:**
  1. PowerShell 5's `Get-Content -Raw` / `WriteAllText` broke the em dashes in `page.jsx`.
  2. During backend verification, `DB::beginTransaction` around a standalone kernel handle did not roll back, so 2 test leads were created in the dev DB.
  3. On desktop, the Demo card stretched to the height of the audit card and left a gap.
  4. QA run 1 (FAIL):
     - S1: `LandingLayout.jsx` showed a changed mtime.
     - #13: There were no feature tests.
     - #41: The placeholder text contrast was 3.45:1.
     - #42: White on indigo-500 was 4.47:1.
     - There were also warnings about the email copy.
  5. QA run 1 disclosed that the QA agent itself ran the read-only `php artisan migrate:status`, which is on the guarded list. No changes resulted.
- **Resolution:**
  1. Repaired the em dashes. File rewrites now use node `fs` or the edit tool.
  2. Deleted both test leads. The table is back to 0 rows. Feature tests on sqlite `:memory:` replace that approach.
  3. Switched the Demo card to `self-start`. The tiles now follow the portal button.
  4. QA run 1 fixes:
     - S1: Verified that `LandingLayout.jsx` is byte-identical to the git index. Only the timestamp changed.
     - #13: Added `LeadSubmissionTest` and the phpunit sqlite config.
     - #41: The placeholder now uses slate-400.
     - #42: The Section 8 buttons now use indigo-600 (6.29:1), with indigo-700 on hover.
     - The email copy warnings were also fixed.
  5. Recorded for transparency. No action needed.
- **QA Checklist Result:** ❌ run 1 FAIL (S1, #13, #41, #42) → fixed → ✅ run 2 PASS.
  - `npm run build` passes.
  - `php artisan test --filter=LeadSubmissionTest`: 5 passed, 25 assertions.
  - Puppeteer checks at 1440, 768 and 390 wide:
    - No horizontal overflow.
    - The sticky CTA shows and hides correctly.
    - Prefill works.
    - UTM and source values appear in the request body.
    - Inline errors show and the first error receives focus.
    - Server 422 errors show inline.
    - The success state receives focus.
    - Reduced motion disables the sweep, glow and sticky transitions.
    - There are no dead hash links.
- **Next Steps:**
  - Known gaps from this phase:
    - There is no scheduler, so there is no slot picker, calendar invite or `slot_selected` event.
    - There are no Privacy or Terms pages, so there are no legal links and the consent text doesn't link to a privacy policy.
    - There is no Demo Portal URL or credentials yet. Set `DEMO_PORTAL.url` and `credentials` in `finalCtaData.js`.
    - Social links were dropped, because the old ones were `'#'`.
    - There is no status line, because there is no status page.
    - The nav Services dropdown in `LandingLayout` still points to `#services`, which no longer exists on the home page.
    - The CTAs in Sections 1–7 still use indigo-500 (4.47:1). A site-wide token change needs your approval.
    - The audit form's requirements field is capped at 500 characters on the client but 5000 on the server, because it shares the chat field.
  - Still pending from earlier:
    - The hero fold overflow fix (~21px), awaiting your approval.
    - The ChoosePath links to Diskobre and Caleho don't have UTM params.
    - Your confirmation of the Section 6 trust-strip claims.
  - Next phase: the home page redesign (Sections 1–8) is complete. The next phase is your choice from the open items above — awaiting your approval.

### Phase 8 revision: critic fixes (legal pages, demo portal, success copy, nav)

- **Timestamp:** 2026-11-12 18:09
- **Mode:** Edit access yes · Terminal yes
  - Commands run: `npm run build` (under your standing permission), `php artisan test` and Puppeteer verification.
  - No git commands were run by the builders.
- **Persona(s) Active:** 🖥️ Frontend + 🎨 UI-UX + ⚙️ Backend (routes and test) → 🧪 QA
- **Files Modified/Created:**
  - This phase covers five critic items:
    1. Add Privacy Policy and Terms pages, and link them from the footer.
    2. Link the consent label to `/privacy`.
    3. Rewrite the success copy.
    4. Make the Demo Portal button open a new `/demos` page.
    5. Repoint the nav Services menu, because `#services` was removed.
  - New files:
    - `routes/web.php` (new routes added to the existing file):
      - `/demos`, named `demos`.
      - `/privacy`, named `legal.privacy`.
      - `/terms`, named `legal.terms`.
    - `resources/js/components/layout/DarkPageShell.jsx` — The shared dark page shell used by the new standalone pages.
    - `resources/js/pages/legal/privacy/page.jsx` — The Privacy Policy page (item 1). It includes a Technical data bullet and a Cookies section.
    - `resources/js/pages/legal/terms/page.jsx` — The Terms page (item 1).
    - `resources/js/pages/demo-portal/page.jsx` — The new `/demos` portal page (item 4).
    - `resources/js/components/ui/SectionLink.jsx` — Links to a section of a page:
      - On the page that has the section, it renders a plain `<a href="#x">`.
      - On any other page, it renders an Inertia `<Link href="/#x">`.
      - This avoids remounting the 3D scenes.
    - `resources/js/components/ui/CredentialsChip.jsx` — Moved out of `DemoShowcase` so the home page and `/demos` can both use it.
    - `resources/js/features/site/siteConfig.js` — Site-wide config: `CONTACT`, `FOOTER_COLUMNS` and `LEGAL_LINKS`.
    - `tests/Feature/PublicPagesTest.php` — Feature tests for the new public pages.
  - Moved files (`Move-Item`, a non-destructive move, not a deletion), so the new pages don't import from `pages/home-page/_sections/*`:
    - `resources/js/pages/home-page/_sections/final-cta/SiteFooter.jsx` → `resources/js/components/layout/SiteFooter.jsx`. The footer now includes the legal links (item 1).
    - `resources/js/pages/home-page/_sections/final-cta/tracking.js` → `resources/js/features/analytics/tracking.js`.
    - `resources/js/pages/home-page/_sections/demos/demoData.js` → `resources/js/features/demos/demoData.js`.
  - Changed files:
    - `resources/js/pages/home-page/_sections/final-cta/finalCtaData.js` — Now holds only `AUDIT`, `DEMO_PORTAL` and `BUSINESS_TYPES`. `DEMO_PORTAL.url` is `'/demos'`. Contact info, footer columns and legal links moved to `siteConfig.js`.
    - `resources/js/pages/home-page/_sections/final-cta/AuditForm.jsx` — Three changes:
      - Item 2: The consent label links to `/privacy`. It opens in a new tab and has an sr-only note saying so.
      - Item 3: The success heading is now "You're all set. We'll email you to pick a time."
      - Item 3: The success body is now "Within 24 hours on business days, we'll email you a few times to choose from for your 15-minute audit."
      - The success heading gets focus with `focus({ preventScroll: true })` followed by `scrollIntoView`. Under reduced motion it scrolls with `behavior: 'auto'`.
    - `resources/js/pages/home-page/_sections/final-cta/FinalCtaSection.jsx` — Two changes:
      - The Demo Portal button opens `/demos` in a new tab (item 4).
      - The layout is now a flex-col wrapper with a `flex-1` article, as part of the success-state fix.
    - `resources/js/pages/home-page/_sections/demos/DemoShowcase.jsx` — Now imports `CredentialsChip` and `demoData` from their new locations.
    - `resources/js/pages/home-page/page.jsx` — Updated imports for the moved footer and shared modules.
    - `resources/js/components/layout/LandingLayout.jsx` — The nav Services menu now points to `/#platform`, `/#demos`, `/#ecosystem` and `/#engineering` through `SectionLink`. These replace the old infrastructure and hardware items (item 5).
    - `resources/css/app.css` — Two changes:
      - Smooth scrolling now only applies under `prefers-reduced-motion: no-preference`.
      - `.cta-sweep` now uses `overflow: clip`.
- **Issues Encountered:**
  1. A bug in the success state:
     - Focusing the success heading scrolled the `.cta-sweep` wrapper, which had `overflow: hidden`.
     - That moved the card about 150px up.
  2. QA revision run 1 FAILED on 4 items:
     - #7: Links to `/#…` from other pages used plain `<a>`, so they did a full page reload.
     - #13: The new pages imported shared modules from `pages/home-page/_sections/*`.
     - #22: The smooth `scrollIntoView` ignored reduced motion.
     - #25: The privacy text said the IP is "used briefly". But `SESSION_DRIVER=database` stores the IP and user agent.
  3. QA run 1 itself ran `git status` and `git log`, which breaks Rule 6. QA reported this itself. Nothing changed as a result.
  4. QA run 2 flagged an outdated comment in `siteConfig.js` about a `base` prop that had been removed.
- **Resolution:**
  1. The success state now has:
     - `overflow: clip` on `.cta-sweep`.
     - A flex-col wrapper with a `flex-1` article.
     - Focus with `focus({ preventScroll: true })`, then `scrollIntoView`.
     - A screenshot confirmed the fix.
  2. QA run 1 fixes:
     - #7: Links to other pages now use `SectionLink`.
     - #13: The shared modules moved to `components/` and `features/`, as listed above.
     - #22: `scrollIntoView` uses `behavior: 'auto'` under reduced motion, and the CSS media guard was added.
     - #25: Rewrote the Technical data bullet and added a Cookies section. It covers the session and XSRF cookies. A check confirmed the site loads no ad or analytics scripts.
  3. QA run 2 ran no git commands.
  4. Corrected the comment.
- **QA Checklist Result:** ❌ revision run 1 FAIL (#7, #13, #22, #25) → fixed → ✅ re-run 2 PASS (0 ❌, 9 ⚠️).
  - `npm run build` passes.
  - `php artisan test`: 31 passed, 116 assertions.
  - Puppeteer checks:
    - No horizontal overflow at 1440 and 390 wide on `/demos`, `/privacy` and `/terms`.
    - No console errors.
    - Footer links are plain `#x` on the home page and `/#x` on other pages.
    - On `/terms`, Services → Custom Engineering does a client-side Inertia visit and lands on `#engineering`.
    - The success state was confirmed with a screenshot.
  - Approved exception: two internal links use `<a target="_blank">` on purpose, because the `<Link>` in Inertia 2.3.21 ignores `target`:
    - The consent label links to `/privacy`, so a half-filled form isn't lost.
    - The Demo Portal button links to `/demos`, as approved in item 4.
  - Open ⚠️ warnings, out of scope for this phase:
    - The nav "Contact" `<Link href="#contact">` triggers an Inertia visit to the same page on home. It should switch to `SectionLink`.
    - The Services and Products dropdowns open on hover only, so keyboard users can't open them.
    - `_sections/Footer.jsx` and `_sections/Contact.jsx` are unused files.
    - The legal text needs review by counsel.
    - The "Book Your Free Audit" button on `/demos` has no `data-cta-source` attribution.
    - The `#demos` fallback in `DemoCard` can never be reached.
- **Next Steps:**
  - You set:
    - Demo credentials in `resources/js/features/demos/demoData.js`, if the portals need a login.
  - Still not built:
    - There is still no booking calendar or calendar invite. The team replies by email.
  - Still pending from earlier:
    - The hero fold overflow fix (~21px).
    - UTM params on the ChoosePath links to Diskobre and Caleho.
    - Your confirmation of the Section 6 trust-strip claims.
    - Moving the Section 1–7 CTAs off indigo-500 for contrast.
  - Next phase: any follow-up phase is your choice from the open ⚠️ warnings and pending items above — awaiting your approval.
