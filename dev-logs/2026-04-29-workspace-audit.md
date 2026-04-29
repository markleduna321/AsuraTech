### Phase 1: Workspace Audit

- **Timestamp:** 2026-04-29
- **Persona(s) Active:** Tech Lead + Backend + Frontend + QA
- **Files Modified/Created:**
  - dev-logs/2026-04-29-workspace-audit.md — created
- **Issues Encountered:**
  - No `routes/api.php` file found (API endpoints missing / not separated).
  - `resources/js/store/index.js` exists but is empty (no Redux/RTK configuration).
  - No RTK Query or Redux Toolkit usage detected (`createApi`, `fetchBaseQuery`, `createSlice`, `configureStore` not found).
  - `resources/js/components/ui` exists but is empty; many pages import `@/components/*` (e.g., `InputError`, `PrimaryButton`) but implementations are not present in `components/ui`.
  - Layouts & component naming mismatches: found `resources/js/components/layouts/MainLayout.jsx` (plural `layouts`) and pages import `@/Layouts/GuestLayout` (capitalized `Layouts`) — inconsistent structure.
  - Some page files are empty (e.g., `resources/js/pages/home-page/page.jsx`).
  - No Eloquent API Resources detected under `app/Http/Resources`.
  - RTK Query `credentials: 'include'` not found (frontend is using `axios` and Inertia forms).
- **Resolution:**
  - Inspected `routes/web.php` and confirmed Inertia usage only.
  - Inspected `app/Http/Requests` (ProfileUpdateRequest, Auth\LoginRequest) — Form Requests present.
  - Verified migrations include reversible `down()` methods.
  - Confirmed no TypeScript usage (`*.ts`/`*.tsx` not found) and `package.json` has no TypeScript dependency.
  - Found frontend uses Inertia forms and `axios` (see `resources/js/bootstrap.js`).
- **QA Checklist Result:** FAIL — several frontend/structure items need work.
- **Next Steps:**
  1. Add or move UI components into `resources/js/components/ui/` (implement `InputError`, `InputLabel`, `PrimaryButton`, `TextInput`, etc.).
  2. Implement `resources/js/store/index.js` with `@reduxjs/toolkit` and register RTK Query `createApi` slices as required.
  3. Add `routes/api.php` for JSON API endpoints and corresponding Controllers/Resources/Policies.
  4. Ensure naming conventions: normalize `components` vs `Components`, `layouts` vs `layout` and create `GuestLayout.jsx`.
  5. Add Eloquent API Resources under `app/Http/Resources` for any JSON responses.
  6. When adding RTK Query, set `fetchBaseQuery` `credentials: 'include'` and use `providesTags`/`invalidatesTags` per guidelines.

**End of Phase 1**
