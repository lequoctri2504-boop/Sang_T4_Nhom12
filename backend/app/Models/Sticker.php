<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sticker extends Model
{
    protected $fillable = ['name', 'icon', 'stars_required'];

    // 1 sticker có thể được mở bởi nhiều bé
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_stickers')
                    ->withPivot('unlocked_at');
    }
}
