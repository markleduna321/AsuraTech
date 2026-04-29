### Phase 4: Complete template finalization

- **Timestamp:** 2026-04-29
- **Persona(s) Active:** Tech Lead + Frontend + Backend + QA
- **Files Modified/Created:**
  - `resources/js/components/layout/GuestLayout.jsx` — Guest layout component
  - `resources/js/components/layout/MainLayout.jsx` — Basic authenticated layout
  - `resources/js/Layouts/GuestLayout.jsx` — wrapper re-export
  - `resources/js/Layouts/MainLayout.jsx` — wrapper re-export
  - `app/Providers/AuthServiceProvider.php` — Registered policy mapping
  - `app/Providers/AppServiceProvider.php` — Removed policy registration
  - `resources/js/pages/Profile/Edit.jsx` — RTK Query-based profile page (sample)
  - `TEMPLATE_README.md` — Template quick start guide
  - `scripts/setup.ps1` / `scripts/setup.sh` — Setup helpers
- **Issues Encountered:** None blocking. Some pages were previously removed by user; added `Profile/Edit.jsx` as a working example.
- **Resolution:** Implemented layout wrappers and a sample profile page demonstrating RTK Query usage. Moved policy registration to `AuthServiceProvider` per Laravel conventions. Added template docs and setup scripts.
- **QA Checklist Result:** Mostly pass. Remaining manual actions before publishing as a template:
  - Ensure `composer install` and `php artisan migrate --seed` run in your environment.
  - Add more UI primitives and feature API slices as needed.
- **Next Steps:** Document CI and seeding strategy if this will be used as a public template.

**End of Phase 4**
