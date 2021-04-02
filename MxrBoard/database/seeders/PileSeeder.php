<?php

namespace Database\Seeders;

use App\Models\Color;
use App\Models\Pile;
use App\Models\Project;
use Illuminate\Database\Seeder;

class PileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();
        for ($i=0; $i < 20; $i++) {
            Pile::create([
                'project_id' => Project::all()->random()->id,
                'name' => $faker->word(),
                'color_id' => Color::all()->random()->id
            ]);
        }
    }
}
