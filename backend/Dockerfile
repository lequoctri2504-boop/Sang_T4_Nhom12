FROM php:8.2-apache

# Cài đặt các thư viện hệ thống và driver SQLite, MySQL, GD
RUN apt-get update && apt-get install -y \
    libsqlite3-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    && docker-php-ext-install pdo_mysql pdo_sqlite mbstring bcmath gd

# Copy Composer từ image chính thức
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
COPY . .

# Cài đặt các thư viện Laravel
RUN composer install --optimize-autoloader --no-dev

# Cấp quyền cho các thư mục quan trọng
RUN chown -R www-data:www-data storage bootstrap/cache database
RUN chmod -R 775 storage bootstrap/cache database

# Cấu hình Apache trỏ vào thư mục public của Laravel
RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf
RUN a2enmod rewrite

EXPOSE 80
CMD ["apache2-foreground"]
