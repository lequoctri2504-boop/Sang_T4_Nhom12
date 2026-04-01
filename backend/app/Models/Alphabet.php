<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Alphabet extends Model
{
    //
    protected $fillable = ['letter', 'image_url', 'audio_url', 'description'];
}
