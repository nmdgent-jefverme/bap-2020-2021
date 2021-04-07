<?php

namespace Database\Seeders;

use App\Models\Idea_type;
use App\Models\Pile;
use App\Models\Project;
use App\Models\Project_idea;
use Illuminate\Database\Seeder;

class ProjectIdeaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        $faker = \Faker\Factory::create();
        for ($i=0; $i < 50; $i++) {
            Project_idea::create([
                'pile_id' => Pile::all()->random()->id,
                'link' => 'https://www.youtube.com/watch?v=7LSbDdZLr1w',
                'title' => $faker->word()
            ]);
        }
    }
}
