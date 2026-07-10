# Stage 1: Build React/Vite assets
FROM node:20-alpine AS node-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve the application using richarvey/nginx-php-fpm
FROM richarvey/nginx-php-fpm:php82

# Set work directory
WORKDIR /var/www/html

# Copy all application files
COPY . .

# Copy built frontend assets from the node stage
COPY --from=node-builder /app/public/build /var/www/html/public/build

# Install PHP dependencies in production mode
RUN composer install --no-dev --optimize-autoloader

# Configure richarvey/nginx-php-fpm environment variables
ENV WEBROOT=/var/www/html/public
ENV APP_ENV=production
ENV SKIP_COMPOSER=1
ENV RUN_SCRIPTS=1

# Expose port 80 for HTTP
EXPOSE 80
