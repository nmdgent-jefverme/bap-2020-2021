<?php

namespace Database\Seeders;

use App\Models\Idea_type;
use Illuminate\Database\Seeder;

class IdeaTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Idea_type::create([
            'type_name' => 'song'
        ]);
        Idea_type::create([
            'type_name' => 'text'
        ]);
        Idea_type::create([
            'type_name' => 'image'
        ]);
    }
}
