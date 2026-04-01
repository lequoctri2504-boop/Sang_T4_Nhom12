<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,    // 1. Tạo user TRƯỚC (scores cần user_id)
            LetterSeeder::class,  // 2. Tạo chữ cái TRƯỚC (quizzes cần letter_id)
            QuizSeeder::class,    // 3. Tạo quiz sau khi có chữ cái
            StickerSeeder::class, // 4. Tạo sticker cuối cùng
        ]);
    }
}
