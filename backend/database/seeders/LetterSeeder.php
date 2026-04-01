<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Letter;

class LetterSeeder extends Seeder
{
    public function run(): void
    {
        $letters = [
            ['name' => 'A',  'example_word' => 'Áo',    'sort_order' => 1],
            ['name' => 'Ă',  'example_word' => 'Ăn',    'sort_order' => 2],
            ['name' => 'Â',  'example_word' => 'Âu',    'sort_order' => 3],
            ['name' => 'B',  'example_word' => 'Bướm',  'sort_order' => 4],
            ['name' => 'C',  'example_word' => 'Cá',    'sort_order' => 5],
            ['name' => 'D',  'example_word' => 'Dưa',   'sort_order' => 6],
            ['name' => 'Đ',  'example_word' => 'Đèn',   'sort_order' => 7],
            ['name' => 'E',  'example_word' => 'Em bé', 'sort_order' => 8],
            ['name' => 'Ê',  'example_word' => 'Ếch',   'sort_order' => 9],
            ['name' => 'G',  'example_word' => 'Gà',    'sort_order' => 10],
            ['name' => 'H',  'example_word' => 'Hoa',   'sort_order' => 11],
            ['name' => 'I',  'example_word' => 'Ỉn',    'sort_order' => 12],
            ['name' => 'K',  'example_word' => 'Kẹo',   'sort_order' => 13],
            ['name' => 'L',  'example_word' => 'Lá',    'sort_order' => 14],
            ['name' => 'M',  'example_word' => 'Mèo',   'sort_order' => 15],
            ['name' => 'N',  'example_word' => 'Nón',   'sort_order' => 16],
            ['name' => 'O',  'example_word' => 'Ong',   'sort_order' => 17],
            ['name' => 'Ô',  'example_word' => 'Ốc',    'sort_order' => 18],
            ['name' => 'Ơ',  'example_word' => 'Ớt',    'sort_order' => 19],
            ['name' => 'P',  'example_word' => 'Pin',   'sort_order' => 20],
            ['name' => 'Q',  'example_word' => 'Quả',   'sort_order' => 21],
            ['name' => 'R',  'example_word' => 'Rắn',   'sort_order' => 22],
            ['name' => 'S',  'example_word' => 'Sao',   'sort_order' => 23],
            ['name' => 'T',  'example_word' => 'Thỏ',   'sort_order' => 24],
            ['name' => 'U',  'example_word' => 'Ú',     'sort_order' => 25],
            ['name' => 'Ư',  'example_word' => 'Ướt',   'sort_order' => 26],
            ['name' => 'V',  'example_word' => 'Voi',   'sort_order' => 27],
            ['name' => 'X',  'example_word' => 'Xe',    'sort_order' => 28],
            ['name' => 'Y',  'example_word' => 'Yêu',   'sort_order' => 29],
        ];

        foreach ($letters as $data) {
            Letter::create([
                'name'          => $data['name'],
                'example_word'  => $data['example_word'],
                'sort_order'    => $data['sort_order'],
                'image'         => null, // thêm hình sau
                'audio'         => null, // thêm âm thanh sau
                'example_image' => null,
            ]);
        }
    }
}
