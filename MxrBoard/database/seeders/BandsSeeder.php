<?php

namespace Database\Seeders;

use App\Models\Band;
use Illuminate\Database\Seeder;

class BandsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        $faker = \Faker\Factory::create();
        for ($i=0; $i < 10; $i++) {
            Band::create([
                'name' => $faker->word(),
                'genre' => $faker->word()
            ]);
        }
    }
}
