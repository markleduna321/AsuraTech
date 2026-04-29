#!/usr/bin/env bash
set -e

cp .env.example .env
composer install
npm install
php artisan key:generate
php artisan migrate --seed
npm run dev

echo "Setup complete. Run 'php artisan serve' to start the app."