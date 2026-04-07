FROM php:8.3-apache

# Cài đặt driver SQLite tối giản
RUN apt-get update && apt-get install -y \
    libsqlite3-dev \
    zip \
    unzip \
    && docker-php-ext-install pdo_sqlite

# Copy Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
COPY . .

# Cài đặt Laravel (Bỏ qua các lệnh script để tránh lỗi environment)
RUN composer install --optimize-autoloader --no-dev --no-scripts

# Cấp quyền cho thư mục
# Cấp quyền cho thư mục và tạo file sqlite trống
RUN touch database/database.sqlite
RUN chown -R www-data:www-data storage bootstrap/cache database
RUN chmod -R 775 storage bootstrap/cache database

# Cấu hình Apache
RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf
RUN a2enmod rewrite

EXPOSE 80
CMD ["apache2-foreground"]
