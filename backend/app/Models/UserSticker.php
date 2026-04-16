<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserSticker extends Model
{
    public $timestamps  = false;
    protected $fillable = ['user_id', 'sticker_id', 'unlocked_at'];

    public function sticker()
    {
        return $this->belongsTo(Sticker::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
