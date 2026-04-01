<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Score extends Model
{
    protected $fillable = [
        'user_id', 'player_name', 'correct', 'total', 'stars'
    ];

    // Điểm số thuộc về 1 tài khoản ba mẹ
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
