<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pile extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name', 'project_id', 'color_id', 'author_id'
    ];

    public function ideas () {
        return $this->hasMany(Project_idea::class);
    }

    public function color () {
        return $this->belongsTo(Color::class);
    }
}
