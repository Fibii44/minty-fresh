FROM richarvey/nginx-php-fpm:latest

# Set work directory
WORKDIR /var/www/html

# Copy all application files (including local public/build compiled assets)
COPY . .

# Install PHP dependencies in production mode
RUN composer install --no-dev --optimize-autoloader

# Configure environment variables
ENV WEBROOT=/var/www/html/public
ENV APP_ENV=production
ENV SKIP_COMPOSER=1
ENV RUN_SCRIPTS=1

EXPOSE 80
