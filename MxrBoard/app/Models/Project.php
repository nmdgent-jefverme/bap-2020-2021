<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'title', 'author_id'
    ];

    public function piles () {
        return $this->hasMany(Pile::class);
    }

    public function users_in_projects () {
        return $this->hasMany(users_in_projects::class);
    }

    public function author () {
        return $this->belongsTo(User::class);
    }
}
