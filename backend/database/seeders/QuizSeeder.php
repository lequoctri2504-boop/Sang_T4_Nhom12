<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Quiz;
use App\Models\Letter;

class QuizSeeder extends Seeder
{
    public function run(): void
    {
        // Lấy tất cả chữ cái, dùng tên làm key để tra cứu nhanh
        $letters = Letter::all()->keyBy('name');

        $quizzes = [
            // --- Loại VISUAL: nhìn hình → chọn đúng chữ cái ---
            ['letter'=>'A','type'=>'visual','question'=>'Bé hãy tìm chữ A nào!',  'options'=>['A','B','C','D'],'answer'=>'A'],
            ['letter'=>'B','type'=>'visual','question'=>'Bé hãy tìm chữ B nào!',  'options'=>['A','B','C','D'],'answer'=>'B'],
            ['letter'=>'C','type'=>'visual','question'=>'Bé hãy tìm chữ C nào!',  'options'=>['B','C','D','E'],'answer'=>'C'],
            ['letter'=>'D','type'=>'visual','question'=>'Bé hãy tìm chữ D nào!',  'options'=>['A','C','D','E'],'answer'=>'D'],
            ['letter'=>'E','type'=>'visual','question'=>'Bé hãy tìm chữ E nào!',  'options'=>['A','E','G','H'],'answer'=>'E'],
            ['letter'=>'G','type'=>'visual','question'=>'Bé hãy tìm chữ G nào!',  'options'=>['C','G','H','I'],'answer'=>'G'],
            ['letter'=>'H','type'=>'visual','question'=>'Bé hãy tìm chữ H nào!',  'options'=>['G','H','I','K'],'answer'=>'H'],
            ['letter'=>'I','type'=>'visual','question'=>'Bé hãy tìm chữ I nào!',  'options'=>['H','I','K','L'],'answer'=>'I'],
            ['letter'=>'K','type'=>'visual','question'=>'Bé hãy tìm chữ K nào!',  'options'=>['H','I','K','L'],'answer'=>'K'],
            ['letter'=>'L','type'=>'visual','question'=>'Bé hãy tìm chữ L nào!',  'options'=>['I','K','L','M'],'answer'=>'L'],
            ['letter'=>'M','type'=>'visual','question'=>'Bé hãy tìm chữ M nào!',  'options'=>['L','M','N','O'],'answer'=>'M'],
            ['letter'=>'N','type'=>'visual','question'=>'Bé hãy tìm chữ N nào!',  'options'=>['L','M','N','O'],'answer'=>'N'],
            ['letter'=>'O','type'=>'visual','question'=>'Bé hãy tìm chữ O nào!',  'options'=>['M','N','O','P'],'answer'=>'O'],

            // --- Loại AUDIO: nghe âm thanh → chọn đúng chữ cái ---
            ['letter'=>'A','type'=>'audio','question'=>'Chữ nào đọc là /a/?',    'options'=>['A','B','C','D'],'answer'=>'A'],
            ['letter'=>'B','type'=>'audio','question'=>'Chữ nào đọc là /bờ/?',   'options'=>['A','B','C','D'],'answer'=>'B'],
            ['letter'=>'C','type'=>'audio','question'=>'Chữ nào đọc là /cờ/?',   'options'=>['B','C','D','E'],'answer'=>'C'],
            ['letter'=>'D','type'=>'audio','question'=>'Chữ nào đọc là /dờ/?',   'options'=>['C','D','E','G'],'answer'=>'D'],
            ['letter'=>'M','type'=>'audio','question'=>'Chữ nào đọc là /mờ/?',   'options'=>['L','M','N','O'],'answer'=>'M'],
            ['letter'=>'N','type'=>'audio','question'=>'Chữ nào đọc là /nờ/?',   'options'=>['L','M','N','O'],'answer'=>'N'],
            ['letter'=>'S','type'=>'audio','question'=>'Chữ nào đọc là /sờ/?',   'options'=>['R','S','T','U'],'answer'=>'S'],
            ['letter'=>'T','type'=>'audio','question'=>'Chữ nào đọc là /tờ/?',   'options'=>['S','T','U','V'],'answer'=>'T'],
        ];

        foreach ($quizzes as $q) {
            // Bỏ qua nếu không tìm thấy chữ cái tương ứng
            if (!isset($letters[$q['letter']])) continue;

            Quiz::create([
                'letter_id' => $letters[$q['letter']]->id,
                'type'      => $q['type'],
                'question'  => $q['question'],
                'options'   => $q['options'],
                'answer'    => $q['answer'],
            ]);
        }
    }
}
