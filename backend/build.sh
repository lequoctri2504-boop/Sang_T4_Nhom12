#!/usr/bin/env bash
# script chạy lúc deploy lên Render

# Cài đặt các thư viện composer
composer install --no-dev --optimize-autoloader --no-interaction

# Tạo app key nếu chưa có (Render sẽ tự set, nếu tự set thì bỏ qua)
# php artisan key:generate --force

# Xoá cache cũ và tạo cache mới để chạy nhanh hơn trên production
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Chạy migrate để tạo database (SQLite mặc định)
touch database/database.sqlite
php artisan migrate --force

# Tạo symlink cho storage nếu chưa có (để public file và hình ảnh)
php artisan storage:link
