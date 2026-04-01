<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    protected $fillable = ['name', 'email', 'password', 'role'];
    protected $hidden   = ['password'];

    // 1 ba mẹ có nhiều điểm số
    public function scores()
    {
        return $this->hasMany(Score::class);
    }

    // 1 ba mẹ có nhiều sticker đã mở khóa
    public function stickers()
    {
        return $this->belongsToMany(Sticker::class, 'user_stickers')
                    ->withPivot('unlocked_at');
    }

    // Kiểm tra có phải admin không
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }
}
