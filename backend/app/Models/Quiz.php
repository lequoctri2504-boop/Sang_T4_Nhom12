<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    protected $fillable = [
        'letter_id', 'type', 'question', 'options', 'answer'
    ];

    protected $casts = [
        'options' => 'array', // Tự chuyển JSON thành mảng PHP
    ];

    // Câu quiz thuộc về 1 chữ cái
    public function letter()
    {
        return $this->belongsTo(Letter::class);
    }
}
