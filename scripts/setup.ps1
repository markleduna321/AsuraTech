# PowerShell setup script for AsuraTech template
Write-Host "Copying .env.example to .env"
Copy-Item -Path .env.example -Destination .env -Force

Write-Host "Installing Composer dependencies (requires Composer)..."
composer install

Write-Host "Installing NPM dependencies..."
npm install

Write-Host "Generating app key and running migrations"
php artisan key:generate
php artisan migrate --seed

Write-Host "Build frontend assets"
npm run dev

Write-Host "Done. Run php artisan serve to start the app."