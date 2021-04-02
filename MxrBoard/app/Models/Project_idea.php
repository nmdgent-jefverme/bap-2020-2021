<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Project_idea extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'project_id', 'idea_type_id', 'filePath', 'text'
    ];

    public function idea_type () {
        return $this->belongsTo(Idea_type::class);
    }

    public function project () {
        return $this->belongsTo(Pile::class);
    }
}
