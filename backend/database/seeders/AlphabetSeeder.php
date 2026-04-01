<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Alphabet; // Nhớ thêm dòng này để dùng Model

class AlphabetSeeder extends Seeder
{
    public function run(): void
    {
        Alphabet::create([
            'letter' => 'A',
            'image_url' => 'https://bangchucai.gamer.gd/assets/img/apple.png',
            'audio_url' => 'https://bangchucai.gamer.gd/assets/audio/a.mp3',
            'description' => 'Chữ A - Quả táo'
        ]);

        Alphabet::create([
            'letter' => 'B',
            'image_url' => 'https://bangchucai.gamer.gd/assets/img/ball.png',
            'audio_url' => 'https://bangchucai.gamer.gd/assets/audio/b.mp3',
            'description' => 'Chữ B - Quả bóng'
        ]);
        
        // Bạn có thể thêm các chữ cái khác tương tự ở đây
        $data = [
        ['letter' => 'A', 'image_url' => 'assets/img/apple.png', 'audio_url' => 'assets/audio/a.mp3', 'description' => 'A - Quả táo'],
        ['letter' => 'Ă', 'image_url' => 'assets/img/moon.png', 'audio_url' => 'assets/audio/aw.mp3', 'description' => 'Ă - Mặt trăng'],
        ['letter' => 'Â', 'image_url' => 'assets/img/bear.png', 'audio_url' => 'assets/audio/aa.mp3', 'description' => 'Â - Con gấu'],
        ['letter' => 'B', 'image_url' => 'assets/img/ball.png', 'audio_url' => 'assets/audio/b.mp3', 'description' => 'B - Quả bóng'],
    ];

    foreach ($data as $item) {
        \App\Models\Alphabet::create($item);
    }

    }
}