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
            'color_value' => '#F5512C'
        ]);
        $red->timestamps = false;
        $red->save();

        $blue = new Color([
            'color_value' => '#5520F5'
        ]);
        $blue->timestamps = false;
        $blue->save();

        $yellow = new Color([
            'color_value' => '#F5E545'
        ]);
        $yellow->timestamps = false;
        $yellow->save();

        $green = new Color([
            'color_value' => '#F5E545'
        ]);
        $green->timestamps = false;
        $green->save();

        $blue2 = new Color([
            'color_value' => '#0D8BA8'
        ]);
        $blue2->timestamps = false;
        $blue2->save();

        $green2 = new Color([
            'color_value' => '#2CF5AC'
        ]);
        $green2->timestamps = false;
        $green2->save();
    }
}
