FROM php:8.3-apache

# 1. Cài đặt các công cụ hệ thống và PHP extension cần thiết
RUN apt-get update && apt-get install -y \
    libsqlite3-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    && docker-php-ext-install pdo_sqlite mbstring exif pcntl bcmath gd

# 2. Copy Composer từ image chính thức
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 3. Thiết lập thư mục làm việc
WORKDIR /var/www/html
COPY . .

# 4. Cài đặt các thư viện PHP (Laravel)
# Thêm --no-interaction để tránh bị dừng chờ lệnh
RUN composer install --optimize-autoloader --no-dev --no-scripts --no-interaction

# 5. Quan trọng: Tạo file database và CẤP QUYỀN ghi cho thư mục chứa nó
# SQLite cần quyền ghi vào cả file .sqlite VÀ thư mục database/ để tạo file tạm khi chạy
RUN mkdir -p database storage bootstrap/cache
RUN touch database/database.sqlite
RUN chown -R www-data:www-data /var/www/html
RUN find /var/www/html -type d -exec chmod 775 {} \;
RUN find /var/www/html -type f -exec chmod 664 {} \;

# 6. Cấu hình Apache trỏ vào thư mục /public
RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf
RUN a2enmod rewrite

# 7. Mở cổng 80
EXPOSE 80

# 8. Lệnh khởi chạy: Đảm bảo APP_KEY đã tồn tại rồi mới chạy migrate
CMD php artisan migrate --force && apache2-foreground
