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
            'type_name' => 'file',
            'allowed_file_types' => 'mp3, mp4, wav, m4a, png, gif, jpeg, jpg, svg, docx, pdf, txt'
        ]);
        Idea_type::create([
            'type_name' => 'link',
            'allowed_file_types' => ''
        ]);
    }
}
