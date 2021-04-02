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
        // Idea_type::truncate();
        Idea_type::create([
            'type_name' => 'song',
            'allowed_file_types' => 'mp3, mp4, wav, m4a'
        ]);
        Idea_type::create([
            'type_name' => 'text',
            'allowed_file_types' => ''
        ]);
        Idea_type::create([
            'type_name' => 'image',
            'allowed_file_types' => 'png, gif, jpeg, jpg, svg'
        ]);
    }
}
