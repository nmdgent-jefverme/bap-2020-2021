<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use App\Models\Users_in_project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        $faker = \Faker\Factory::create();
        for ($i=0; $i < 10; $i++) {
            Project::create([
                'title' => $faker->word(),
                'author_id' => 1
            ]);
        }
        for ($i=0; $i < 10; $i++) {
            $value = new Users_in_project([
                'project_id' => Project::all()->random()->id,
                'user_id' => User::all()->random()->id,
                'role' => 1
            ]);

            $value->timestamps = false;
            $value->save();
        }
    }
}
