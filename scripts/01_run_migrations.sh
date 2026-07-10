#!/bin/bash
echo "Running database migrations..."
php artisan migrate --force
echo "Migrations completed successfully!"
