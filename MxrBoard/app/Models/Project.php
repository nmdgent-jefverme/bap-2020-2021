<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * Geeft aan welke kolommen ingevuld of gewijzigd mogen worden.
     */
    protected $fillable = [
        'title', 'author_id'
    ];

    /**
     * Definieert de een op veel relatie met stapels
     */
    public function piles () {
        return $this->hasMany(Pile::class);
    }

    /**
     * Definieert de veel op veel relatie met users_in_project
     */
    public function users_in_projects () {
        return $this->hasMany(users_in_projects::class);
    }

    /**
     * Definieert de een op veel relatie met de auteur
     */
    public function author () {
        return $this->belongsTo(User::class);
    }
}
