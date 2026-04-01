<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Letter extends Model
{
    protected $fillable = [
        'name', 'image', 'audio',
        'example_word', 'example_image', 'sort_order'
    ];

    // 1 chữ cái có nhiều câu quiz
    public function quizzes()
    {
        return $this->hasMany(Quiz::class);
    }
}
