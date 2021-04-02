<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Idea_type extends Model
{
    use HasFactory;

    protected $fillable = [
        'type_name'
    ];

    public function project_idea () {
        return $this->hasMany(Project_idea::class);
    }
}
