<?php

namespace Database\Seeders;

use App\Models\Color;
use Illuminate\Database\Seeder;

class ColorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $red = new Color([
            'color_value' => '#F5512C',
            'author_id' => 1
        ]);
        $red->timestamps = false;
        $red->save();

        $blue = new Color([
            'color_value' => '#5520F5',
            'author_id' => 1
        ]);
        $blue->timestamps = false;
        $blue->save();

        $yellow = new Color([
            'color_value' => '#F5E545',
            'author_id' => 1
        ]);
        $yellow->timestamps = false;
        $yellow->save();

        $green = new Color([
            'color_value' => '#F5E545',
            'author_id' => 1
        ]);
        $green->timestamps = false;
        $green->save();

        $blue2 = new Color([
            'color_value' => '#0D8BA8',
            'author_id' => 1
        ]);
        $blue2->timestamps = false;
        $blue2->save();

        $green2 = new Color([
            'color_value' => '#2CF5AC',
            'author_id' => 1
        ]);
        $green2->timestamps = false;
        $green2->save();
    }
}
