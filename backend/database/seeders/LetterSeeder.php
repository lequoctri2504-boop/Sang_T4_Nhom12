<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Letter;

class LetterSeeder extends Seeder
{
    public function run(): void
    {
        $letters = [
            ['name' => 'A',  'example_word' => 'Áo',    'sort_order' => 1,  'audio' => 'audio/a.mp3'],
          //  ['name' => 'Ă',  'example_word' => 'Ăn',    'sort_order' => 2,  'audio' => 'audio/aa.mp3'],
           // ['name' => 'Â',  'example_word' => 'Âu',    'sort_order' => 3,  'audio' => 'audio/aw.mp3'],
             ['name' => 'Ă',  'example_word' => 'Ăn',    'sort_order' => 2,  'audio' => 'audio/aw.mp3'],
            ['name' => 'Â',  'example_word' => 'Âu',    'sort_order' => 3,  'audio' => 'audio/aa.mp3'],
            
            ['name' => 'B',  'example_word' => 'Bướm',  'sort_order' => 4,  'audio' => 'audio/b.mp3'],
            ['name' => 'C',  'example_word' => 'Cá',    'sort_order' => 5,  'audio' => 'audio/c.mp3'],
            ['name' => 'D',  'example_word' => 'Dưa',   'sort_order' => 6,  'audio' => 'audio/d.mp3'],
            ['name' => 'Đ',  'example_word' => 'Đèn',   'sort_order' => 7,  'audio' => 'audio/d.mp3'],
            ['name' => 'E',  'example_word' => 'Em bé', 'sort_order' => 8,  'audio' => 'audio/e.mp3'],
            ['name' => 'Ê',  'example_word' => 'Ếch',   'sort_order' => 9,  'audio' => 'audio/ee.mp3'],
            ['name' => 'G',  'example_word' => 'Gà',    'sort_order' => 10, 'audio' => 'audio/g.mp3'],
            ['name' => 'H',  'example_word' => 'Hoa',   'sort_order' => 11, 'audio' => 'audio/h.mp3'],
            ['name' => 'I',  'example_word' => 'Ỉn',    'sort_order' => 12, 'audio' => 'audio/i.mp3'],
            ['name' => 'K',  'example_word' => 'Kẹo',   'sort_order' => 13, 'audio' => 'audio/k.mp3'],
            ['name' => 'L',  'example_word' => 'Lá',    'sort_order' => 14, 'audio' => 'audio/l.mp3'],
            ['name' => 'M',  'example_word' => 'Mèo',   'sort_order' => 15, 'audio' => 'audio/m.mp3'],
            ['name' => 'N',  'example_word' => 'Nón',   'sort_order' => 16, 'audio' => 'audio/n.mp3'],
            ['name' => 'O',  'example_word' => 'Ong',   'sort_order' => 17, 'audio' => 'audio/o.mp3'],
            ['name' => 'Ô',  'example_word' => 'Ốc',    'sort_order' => 18, 'audio' => 'audio/oo.mp3'],
            ['name' => 'Ơ',  'example_word' => 'Ớt',    'sort_order' => 19, 'audio' => 'audio/ow.mp3'],
            ['name' => 'P',  'example_word' => 'Pin',   'sort_order' => 20, 'audio' => 'audio/p.mp3'],
            ['name' => 'Q',  'example_word' => 'Quả',   'sort_order' => 21, 'audio' => 'audio/q.mp3'],
            ['name' => 'R',  'example_word' => 'Rắn',   'sort_order' => 22, 'audio' => 'audio/r.mp3'],
            ['name' => 'S',  'example_word' => 'Sao',   'sort_order' => 23, 'audio' => 'audio/s.mp3'],
            ['name' => 'T',  'example_word' => 'Thỏ',   'sort_order' => 24, 'audio' => 'audio/t.mp3'],
            ['name' => 'U',  'example_word' => 'Ú',     'sort_order' => 25, 'audio' => 'audio/u.mp3'],
            ['name' => 'Ư',  'example_word' => 'Ướt',   'sort_order' => 26, 'audio' => 'audio/uw.mp3'],
            ['name' => 'V',  'example_word' => 'Voi',   'sort_order' => 27, 'audio' => 'audio/v.mp3'],
            ['name' => 'X',  'example_word' => 'Xe',    'sort_order' => 28, 'audio' => 'audio/x.mp3'],
            ['name' => 'Y',  'example_word' => 'Yêu',   'sort_order' => 29, 'audio' => 'audio/y.mp3'],
        ];

        foreach ($letters as $data) {
            Letter::create([
                'name'          => $data['name'],
                'example_word'  => $data['example_word'],
                'sort_order'    => $data['sort_order'],
                'image'         => null,
                'audio'         => $data['audio'],
                'example_image' => null,
            ]);
        }
    }
}
