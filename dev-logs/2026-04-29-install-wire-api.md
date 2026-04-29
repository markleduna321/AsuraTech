### Phase 3: Install dependencies, wire Provider, add sample userApi

- **Timestamp:** 2026-04-29
- **Persona(s) Active:** Tech Lead + Frontend + Backend
- **Files Modified/Created:**
  - `package.json` — updated by `npm install` (added `@reduxjs/toolkit`, `react-redux`)
  - `resources/js/app.jsx` — wrapped Inertia app with Redux `Provider`
  - `resources/js/features/user/userApi.js` — sample RTK Query endpoints (updateUser)
- **Issues Encountered:**
  - `npm install` reported 2 moderate vulnerabilities (see `npm audit`).
- **Resolution:**
  - Dependencies installed; store wiring completed; sample API slice added using `api.injectEndpoints`.
- **QA Checklist Result:** Partial pass — frontend wiring present; ensure `store` is imported and used in root. Confirm all feature endpoints register via `api.injectEndpoints` and are included in build.
- **Next Steps:**
  1. Run `npm run dev` and verify the frontend builds and pages render.
  2. Replace remaining `axios` calls with RTK Query endpoints.
  3. Add tests and address `npm audit` issues as needed.

**End of Phase 3**
