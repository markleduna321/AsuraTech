# AsuraTech Template Quick Start

This repository is a starter template combining Laravel + Inertia + React + Redux Toolkit (RTK Query).

Included:
- RTK store scaffold and example `user` API slice.
- UI primitives in `resources/js/components/ui/`.
- Example profile page using RTK Query: `resources/js/pages/Profile/Edit.jsx`.
- API routes and controller for `GET /api/user` and `PUT /api/user`.
- Policy and Resource examples for `User`.

Setup (local):

Windows (PowerShell):

```powershell
Copy-Item .env.example .env
composer install
npm install
php artisan key:generate
php artisan migrate --seed
npm run dev
php artisan serve
```

POSIX (macOS / Linux):

```bash
cp .env.example .env
composer install
npm install
php artisan key:generate
php artisan migrate --seed
npm run dev
php artisan serve
```

Notes:
- The RTK store is in `resources/js/store/index.js` and already sets `fetchBaseQuery({ credentials: 'include' })` for Sanctum cookie auth.
- Add feature API slices under `resources/js/features/*` and register via `api.injectEndpoints` where needed.
- UI primitives live in `resources/js/components/ui/`. Keep them dumb (no API or Redux logic).

If you want, I can also add a simple `artisan` command and CI pipeline next.
