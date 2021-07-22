<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Color extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'color_value', 'author_id'
    ];

    public function piles ()  {
        return $this->hasMany(Pile::class);
    }
}
