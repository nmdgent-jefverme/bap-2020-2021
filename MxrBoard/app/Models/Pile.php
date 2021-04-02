<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pile extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'project_id'
    ];

    public function ideas () {
        return $this->hasMany(Project_idea::class);
    }

    public function color () {
        return $this->belongsTo(Color::class);
    }
}
