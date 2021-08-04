<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project_idea extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'link', 'idea_type_id', 'title', 'pile_id', 'author_id', 'start_point', 'file_id'
    ];

    public function idea_type () {
        return $this->belongsTo(Idea_type::class);
    }

    public function file () {
        return $this->belongsTo(File::class, 'file_id');
    }

    public function project () {
        return $this->belongsTo(Pile::class);
    }

    public function author () {
        return $this->belongsTo(User::class);
    }
}
