<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Jef Vermeire',
            'email' => 'jefvermeireown@gmail.com',
            'password' => Hash::make('Azerty123'),
            'instruments' => 'Gitaar, Piano'
        ]);
    }
}
