<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UserSeeder::class);
        $this->call(BandsSeeder::class);
        $this->call(ProjectSeeder::class);
        $this->call(IdeaTypeSeeder::class);
        $this->call(ProjectIdeaSeeder::class);
    }
}
