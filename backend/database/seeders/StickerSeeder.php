<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Sticker;

class StickerSeeder extends Seeder
{
    public function run(): void
    {
        // Danh sách sticker đúng với trang trang_phan_thuong của frontend
        $stickers = [
            ['name' => 'Quả Táo',    'icon' => '🍎', 'stars_required' => 0],   // Mở sẵn
            ['name' => 'Con Ong',    'icon' => '🐝', 'stars_required' => 0],   // Mở sẵn
            ['name' => 'Con Mèo',    'icon' => '🐱', 'stars_required' => 0],   // Mở sẵn
            ['name' => 'Khủng Long', 'icon' => '🦖', 'stars_required' => 50],  // Cần 50 sao
            ['name' => 'Tên Lửa',    'icon' => '🚀', 'stars_required' => 100], // Cần 100 sao
            ['name' => 'Kem Bơ',     'icon' => '🍦', 'stars_required' => 150], // Cần 150 sao
            ['name' => 'Cầu Vồng',   'icon' => '🌈', 'stars_required' => 200], // Cần 200 sao
            ['name' => 'Vương Miện', 'icon' => '👑', 'stars_required' => 300], // Cần 300 sao
        ];

        foreach ($stickers as $s) {
            Sticker::create($s);
        }
    }
}
