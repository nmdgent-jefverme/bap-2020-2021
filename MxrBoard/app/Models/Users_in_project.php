<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Users_in_project extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'project_id',
        'role'
    ];

    public $timestamps = false;
    protected $primaryKey = null;
    public $incrementing = false;

    public function project () {
        return $this->belongsTo(Project::class);
    }

    public function user () {
        return $this->belongsTo(User::class);
    }
}
