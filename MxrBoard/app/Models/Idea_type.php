<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Idea_type extends Model
{
    use HasFactory;

    protected $fillable = [
        'type_name'
    ];

    public function project_idea () {
        return $this->belongsToMany(Project_idea::class);
    }
}
