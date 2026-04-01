<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Progress extends Model
{
    //
    protected $fillable = ['child_id', 'activity_type', 'score', 'completed_letters'];
}
