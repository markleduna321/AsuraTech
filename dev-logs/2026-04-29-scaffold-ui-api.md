### Phase 2: Scaffold UI components, RTK store, API + Policy

- **Timestamp:** 2026-04-29
- **Persona(s) Active:** Tech Lead + Frontend + Backend + QA
- **Files Modified/Created:**
  - `resources/js/components/ui/InputError.jsx` — UI component
  - `resources/js/components/ui/InputLabel.jsx` — UI component
  - `resources/js/components/ui/PrimaryButton.jsx` — UI component
  - `resources/js/components/ui/TextInput.jsx` — UI component
  - `resources/js/components/ui/Checkbox.jsx` — UI component
  - `resources/js/components/InputError.jsx` — wrapper re-export
  - `resources/js/components/InputLabel.jsx` — wrapper re-export
  - `resources/js/components/PrimaryButton.jsx` — wrapper re-export
  - `resources/js/components/TextInput.jsx` — wrapper re-export
  - `resources/js/components/Checkbox.jsx` — wrapper re-export
  - `resources/js/store/index.js` — RTK store + RTK Query scaffold
  - `routes/api.php` — API routes for user endpoints
  - `app/Http/Controllers/Api/UserController.php` — API controller (me, update)
  - `app/Http/Resources/UserResource.php` — Eloquent API Resource
  - `app/Policies/UserPolicy.php` — Policy for `User`
  - `app/Providers/AppServiceProvider.php` — registered `User` policy mapping
- **Issues Encountered:** None blocking. Verified existing `ProfileUpdateRequest` reused for update validation.
- **Resolution:** Created components and backend scaffolding. Registered policy mapping in `AppServiceProvider`.
- **QA Checklist Result:** Partial pass — backend API and resource present; frontend RTK scaffolded but project needs `@reduxjs/toolkit` and RTK Query packages installed and components wired into pages.
- **Next Steps:**
  - Install dependencies: `npm install @reduxjs/toolkit` and `@reduxjs/toolkit/query` (or `npm i @reduxjs/toolkit react-redux`), and wire `store` into the app root.
  - Replace any remaining direct `axios` calls for server-state with RTK Query endpoints in `resources/js/features/`.
  - Add more UI components to `resources/js/components/ui/` as needed and remove ambiguous wrapper paths once `components/ui` imports are standardized.

**End of Phase 2**
