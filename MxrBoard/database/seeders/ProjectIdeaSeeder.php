<?php

namespace Database\Seeders;

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
        for ($i=0; $i < 10; $i++) {
            Project_idea::create([
                'title' => $faker->word(),
                'project_id' => 1,
                'idea_type_id' => 1,
                'filePath' => $faker->word(),
                'text' => $faker->word()
            ]);
        }
    }
}
