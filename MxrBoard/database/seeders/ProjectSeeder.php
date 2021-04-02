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
            ]);
        }
        for ($i=0; $i < 10; $i++) {
            $value = new Users_in_project([
                'project_id' => Project::all()->random()->id,
                'user_id' => User::all()->random()->id,
            ]);

            $value->timestamps = false;
            $value->save();
        }
    }
}
