FROM richarvey/nginx-php-fpm:latest

# Set work directory
WORKDIR /var/www/html

# Copy all application files (including local public/build compiled assets)
COPY . .

# Set write permissions for Laravel storage and cache directories
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache && \
    chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Ensure startup scripts are executable
RUN chmod +x /var/www/html/scripts/*.sh

# Install PHP dependencies in production mode
RUN composer install --no-dev --optimize-autoloader

# Configure environment variables
ENV WEBROOT=/var/www/html/public
ENV APP_ENV=production
ENV SKIP_COMPOSER=1
ENV RUN_SCRIPTS=1
ENV PHP_CATCHALL=1

EXPOSE 80
