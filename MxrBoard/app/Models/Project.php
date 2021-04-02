<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;
    protected $fillable = [
        'title'
    ];

    public function piles () {
        return $this->hasMany(Pile::class);
    }

    public function users_in_projects () {
        return $this->hasMany(users_in_projects::class);
    }
}
